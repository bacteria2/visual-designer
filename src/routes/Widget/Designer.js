import React from 'react'
import { Card, Button, Row, Col, Spin, notification, message,Icon,Radio} from 'antd'
import { connect } from 'react-redux'
import { PropertyPage, SelectMenu, ChartRender, HeaderControl, DataBindPage, DataStylePage } from '../../components/Widget'
import VmColorMapping from '../../components/VmColorMapping'
import { submitProperty, enableDisabledProperty,deleteProperty, updateProperty, deleteDataItems, fetchWidget,ChangeWidget,submitProperty2Series,enableDisabledSeriesProperty,deleteSeriesProperty,ChangeDataLoading} from '../../store/Widget/action'
import { ChangeControlMenu, RemoveControlMenu } from '../../store/Global/action'
import { requestPropertyPagesByName ,saveWidget} from '../../service/widget'
import styles from './Designer.css'
import CubeSchema from '../DataSource/Cube/CubeSchema'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'immutable';
import {set} from 'lodash'
import {loadDataSet} from '../../service/mdxService'
import Immutable from 'immutable'

/**
 * 实例设计器:
 * 从store获取到实例id,加载实例数据到组件
 * */

@DragDropContext(HTML5Backend)
class Designer extends React.PureComponent {
  constructor (props) {
      super(props)
      let {id} = props.match.params
      let controlList = [
          {action:this.handleSaveWidget, text: '保存', icon: 'save'},
          {action:()=>console.log(''), text: '同步数据', icon: 'sync',fontSize:'28px'},
          {action:()=>this.handleShowProperty(true), text: '通用样式设置', icon: 'setting'},
          {action:()=>this.handleShowProperty(false), text: '数据设置', icon: 'api'},
          {action:()=>this.props.history.push('/widget/list/2d'), text: '退出', icon: 'logout',fontSize:'28px'},
      ]
              props.dispatch({type: ChangeControlMenu, payload: <HeaderControl itemList={controlList}/>})
      if (id)
          props.dispatch(fetchWidget(id))

  }
  //life cycle
  componentWillUnmount () {
    this.props.dispatch({type: RemoveControlMenu})
  }

  showDataLoading = () =>{
      this.props.dispatch({type:ChangeDataLoading, payload:true})
  }

  hideDataLoading = () =>{
      this.props.dispatch({type:ChangeDataLoading, payload:false})
  }

  state = {
    showProperty: false,
    rendering: true,
    loadingProperty: false,
    propertyPage: {
      properties: null,
      layout: null,
    },
    dataStylePage:{
        dataItemId:null,
        curSeriesType:'',
        widgetTypes:[],
    },
    dataStyleDefine:{},
    visualItemVnodes:[],
    isDataStyleSetting:false,
    curVisualMap:{
        vmType:'',
        field:'',
        data:'',
        configData:{},
    },
  }
  //
  handleShowProperty = (showProperty) => this.setState({showProperty: showProperty})

  //处理序列样式
  handleSubmitProperty2Series =(value,key) => this.props.dispatch(submitProperty2Series(this.props.currentWidget,key, value))
  handleDisabledSeriesProperty = (disabled, key) =>disabled?
        this.props.dispatch(deleteSeriesProperty(this.props.currentWidget,key)):
        this.props.dispatch(enableDisabledSeriesProperty(this.props.currentWidget,key))

  //处理公共样式
  handleSubmitProperty = (value, key) =>this.props.dispatch(submitProperty(this.props.currentWidget,key, value))

  handleDisabledProperty = (disabled, key) =>disabled?
    this.props.dispatch(deleteProperty(this.props.currentWidget,key)):
    this.props.dispatch(enableDisabledProperty(this.props.currentWidget,key))

  //selectMenu
  handlePropertySpecified = async (name,index) => {
    //name不为空请求后台,获取property页面
    if (name) {
      this.setState({loadingProperty: true})
      let {code, success, data, msg} = await requestPropertyPagesByName(name,index)
      if (success && data) {
        let {properties, layout} = data
        this.setState({
          propertyPage: {
            properties: properties,
            layout: layout,
          },
        })
      } else {
        notification.error({
          message: 'Load property error',
          description: `Maybe property ${name} is not found or server has an error. Detail: msg:${msg}, code:${code}.`,
          duration: 6,
        })

        this.setState({
          propertyPage: {
            properties: null,
            layout: null,
          },
        })
      }
      this.setState({loadingProperty: false})
    } else {
      //name为空则清除property页面
      this.setState({
        propertyPage: {
          properties: null,
          layout: null,
        },
      })
    }

  }
  onAddableDelete = (key) => {
    //不显示properties
    this.setState({propertyPage: {properties: null, layout: null}})
    //删除property
    this.props.dispatch(deleteProperty(this.props.currentWidget,key))
  }

  //数据项删除
  handleDataItemRemove = async (dataItemId) => {
      this.showDataLoading()
     let {currentWidget} = this.props
     const {0:willDeleteDataItemIndex,1:dataItem} =  currentWidget.getIn(['dataOption','dataItems']).findEntry(dataItem => dataItem.get('id') === dataItemId),
            dataMetaItem = this.getDataMetaItem(dataItem,currentWidget)
     //删除dataItem配置
      currentWidget =  currentWidget.deleteIn(['dataOption','dataItems',willDeleteDataItemIndex])
     //处理series
      if(dataMetaItem.seriesType){
          const seriesIndex = currentWidget.getIn(['data','series']).findIndex(seriesItem => seriesItem.get('dataItemId') === dataItemId)
          if(seriesIndex != -1){
              currentWidget = currentWidget.deleteIn(['data','series',seriesIndex])
          }
          //删除VM设置

      }else{
          const isSeriiesCommon = dataMetaItem.target === 'series'?true:false, key = dataMetaItem.key;
          if(isSeriiesCommon){
              let newSeries = List()
              const series = currentWidget.getIn(['data','series'])
              series.forEach(seriesItem => {const item = seriesItem.deleteIn(key.split('.'))
                  newSeries = newSeries.push(item)
              })
              currentWidget = currentWidget.setIn(['data','series'],newSeries)
          }else{
              currentWidget = currentWidget.deleteIn(['data'].concat(key.split('.')))
          }
      }
      const field =  dataMetaItem.value.alias
      currentWidget = await this.handleDeleteDimension(currentWidget,field)
      //提交Widget
      this.handleSubmitWidget(currentWidget)
      //关闭数据属性面板
      this.handleDataStylePageHide()
      this.hideDataLoading()
  }

  //处理增加Dimemsion
  handleAddDimemsion = async (widget,dim) =>{
      let dimensions = this.dataInfo.getIn(['queryInfo','dimensions'])||List()
      if(!dimensions.find(item => item.get('alias') === dim.alias)){//如果发生变化
          dimensions = dimensions.push(Immutable.fromJS(dim))
          this.setDataInfo(['queryInfo','dimensions'],dimensions)
          const rep = await loadDataSet(this.dataInfo.toJS());
          if(rep.success){
              const {arrayData,columns} = rep.data
              let dataSet = {source:arrayData,dimensions:columns}
              widget = widget.setIn(['dataOption','dataInfo'],this.dataInfo).setIn(['data','dataset'],Immutable.fromJS(dataSet))
          }else{
              message.error(`处理新增数据项失败:${rep.msg}`)
          }
      }
      return widget
  }

  handleDeleteDimension = async (widget,field) =>{
      let {dataItems,dataInfo} = widget.get('dataOption').toObject()
      //检测移除的数据字段是否还被图形引用，如果已经不需要就在dataInfo和dataSet剔除
      if(this.handleCheckFieldNotNeed(dataItems,field)){
          //处理dataInfo
          const tempDimensions = dataInfo.getIn(['queryInfo','dimensions'])
          if(!tempDimensions) return widget
          const dimensionsIndex =tempDimensions.findIndex(dim => dim.get('alias') === field)
          if(dimensionsIndex == -1) return widget
          dataInfo = dataInfo.deleteIn(['queryInfo','dimensions',dimensionsIndex])
          this.setDataInfo(['queryInfo','dimensions'],dataInfo.get('dimensions'))
          widget = widget.setIn(['dataOption','dataInfo'],dataInfo)
          //处理dataSet
          const rep = await loadDataSet(dataInfo.toJS());
          let dataset = Immutable.Map()
          if(rep.success) {
              const {arrayData,columns} = rep.data
              dataset = dataset.set('source',Immutable.fromJS(arrayData)).set('dimensions',Immutable.fromJS(columns))
              widget = widget.setIn(['data','dataset'],dataset)
          }
      }
      return widget
  }

  //处理提交widgei
  handleSubmitWidget = (widget) =>{
      this.props.dispatch({type:ChangeWidget, payload:widget})
  }

  //获取数据配置项详细数据
  getDataMetaItem(dataItem,currentWidget){
      const  dataBindItem = currentWidget.getIn(['widgetMeta','dataMeta']).find(metaItem =>metaItem.get('uniqueId') === dataItem.get('key'))
      const dataBindItemJs = dataBindItem ? dataBindItem.toJS():{}, dataItemJs = dataItem.toJS()
      return {...dataBindItemJs, ...dataItemJs};
  }

  //数据项新增
  handleDataItemAdd = async (data) =>  {
      this.showDataLoading()
      let {currentWidget} = this.props
      const dataMetaItem = this.getDataMetaItem(data,currentWidget),{type,key} = dataMetaItem,{value:{alias}} = dataMetaItem, ftype = dataMetaItem.isMeasure ? 'measure':'dimension'
      // 添加数据项记录
      data = data.set('operateType',type)
      currentWidget = currentWidget.updateIn(['dataOption','dataItems'],(list=List())=>list.push(data))
      // 处理dataInfo、dataset
      currentWidget = await this.handleAddDimemsion(currentWidget,{alias, ftype})
      // 添加序列数据
      if(type === 'series'){
          //存在seriesType的数据项表示作用于序列
          const {seriesType,id:dataItemId} = dataMetaItem, seriesItem = {name:alias,type:seriesType,dataItemId};
                //使用lodash 设定值
                set(seriesItem,key,alias);
                //检测并处理存在针对序列的公共设置
               const seriesCommondataItems =  currentWidget.getIn(['dataOption','dataItems'])?
                                               currentWidget.getIn(['dataOption','dataItems']).filter(item => item.get('operateType') === 'seriesCommon'):List()
               seriesCommondataItems.forEach(item =>{
                   const {key:key1,value:{alias}} = item.toJS()
                   set(seriesItem,key1,alias);
               })
                //更新序列列表
                currentWidget = currentWidget.updateIn(['data','series'],(list=List())=>list.push(Immutable.fromJS(seriesItem)))
      }
      if(type === 'seriesCommon'){
              let series = currentWidget.getIn(['data','series'])?currentWidget.getIn(['data','series']).toJS():List();
              series.forEach(s =>{set(s,key,alias)})
              //更新序列
              currentWidget = currentWidget.setIn(['data','series'],Immutable.fromJS(series))
      }
      if(type === 'common'){
          currentWidget = currentWidget.setIn(['data'].concat(key.split('.')),alias)
      }

     //提交Widget
     this.handleSubmitWidget(currentWidget)
     this.hideDataLoading()

    //拖进数据时打开数据样式界面
      if(type === 'series') this.handleDataItemClick(key,data.get('id'))
  }

  //数据项点击
  handleDataItemClick = async (key,dataItemId) => {
        const {currentWidget} = this.props;
        const dataStyleConfig = currentWidget.getIn(['widgetMeta','dataMeta']).find(item=>item.get('uniqueId') === key).toJS();
        const {seriesType,bindVisualItems} = currentWidget.getIn(['dataOption','dataItems']).find(item=>item.get('id') === dataItemId).toJS();
        let { success, data } = await requestPropertyPagesByName(seriesType)
        if(success){
            this.setState({dataStylePage:{dataItemId,widgetTypes:dataStyleConfig.widgetTypes,curSeriesType:seriesType},dataStyleDefine:data,visualItemVnodes:bindVisualItems})
        }else{
            message.warning('获取可视元素配置失败')
        }
  }

  //隐藏数据样式面板
  handleDataStylePageHide=()=>{
      this.setState({'dataStylePage':{}, 'dataStyleDefine':{},'visualItemVnodes':[]})
  }

  //获取数据连接信息
  handleGetDsInfo = (value) =>{
      const {mdx:schema,connInfo:connect,cubeId} = value
      this.dataInfo = this.dataInfo.set('dsInfo',{schema,connect,cubeId})
      let {currentWidget} = this.props;
      currentWidget = currentWidget.setIn(['dataOption','dataInfo'],this.dataInfo)
      this.handleSubmitWidget(currentWidget)
  }

  //设置数据连接信息
  setDataInfo = (key,value) =>{
      this.dataInfo = this.dataInfo.setIn(key,value)
  }

  //数据样式中表现形式改变的处理方法
   handleWidgetTypeChange = async (name,dataItemId)=>{
      let { success, data } = await requestPropertyPagesByName(name)
           if(success){
               this.setState({dataStyleDefine:data})
           }
           //修改按钮状态
           this.setState((preState)=>{
               return {dataStylePage:{ ...preState.dataStylePage,curSeriesType:name}}
           })
           let {currentWidget} = this.props;
           const DataItemEntry = currentWidget.getIn(['dataOption','dataItems']).findEntry(item=>item.get('id') === dataItemId)
           if(!DataItemEntry){
               message.error('fail to get DataItem ');
               return
           }
           const {0:dataItemIndex,1:dataItem} = DataItemEntry
           //设定新值
           //数据项
           const  newDataItem = dataItem.set('seriesType',name)
           currentWidget = currentWidget.setIn(['dataOption','dataItems',dataItemIndex],newDataItem)
           //序列
           const seriesItemEntry = currentWidget.getIn(['data','series']).findEntry(item=>item.get('dataItemId') === dataItemId)
           if(!seriesItemEntry){
               message.error('fail to get SeriesItem ');
               return
           }
           const {0:seriesIndex,1:seriesItem} = seriesItemEntry,
           newSeriesItem = seriesItem.set('type',name)
           currentWidget = currentWidget.setIn(['data','series',seriesIndex],newSeriesItem)
           this.handleSubmitWidget(currentWidget)
   }

   //处理可视项点击（普通）
   handleVisualItemClick = (configItem,dataItemId) =>{
       const {page,label} = configItem
       if(page){
           this.handleOthersSettingClick(page,dataItemId,label)
       }
   }

   //处理其他设置
   handleOthersSettingClick = (target,dataItemId,label='其他设置') =>{
       const {currentWidget} = this.props,
       seriesIndex = currentWidget.getIn(['data','series']).findIndex(s => s.get('dataItemId') === dataItemId )
       if(seriesIndex !== -1){
            this.handleLoadDataStyleSettingPage(target,seriesIndex,label)
       }
   }

   //加载数据样式的样式设置
   handleLoadDataStyleSettingPage = async (name,index,label)=>{
       let propertyPage = {properties: null,layout: null}
       const curVisualMap = Immutable.fromJS({field:label})
       if (name) {
           this.setState({loadingProperty: true})
           let {code, success, data, msg} = await requestPropertyPagesByName(name,index)
           if (success && data) {
               let {properties, layout} = data
               propertyPage = {properties, layout}
           }else{
               message.warning(`请求数据异常:${msg}`)
           }
       }
       this.setState(preState => {
           let curState = Immutable.fromJS(preState)
           curState = curState.set('propertyPage',Immutable.fromJS(propertyPage))
                              .set('isDataStyleSetting',true)
                              .set('curVisualMap',curVisualMap)
                              .set('loadingProperty',false)
           return curState.toJS()
       })
   }

   //处理可视化选项拖进东西
   handleVisualItemDrop = async (obj) =>{
      this.showDataLoading()
      const {key,label,type,dataItemId,value ,fType,groupName} = obj,
          bindVisualItems = {key,label,type,value}
       let   {currentWidget} = this.props
       const {0:dataItemIndex} = currentWidget.getIn(['dataOption','dataItems']).findEntry(item =>item.get('id') === dataItemId)
        let   bindVisualItemsTemp = currentWidget.getIn(['dataOption','dataItems',dataItemIndex,'bindVisualItems']),vmItemIndex = -1
       // 防止拖进相同的数据项
       if(bindVisualItemsTemp && bindVisualItemsTemp.includes(Immutable.fromJS(bindVisualItems))){
          return
       }
       // 处理绑定数据项
       if(type == 'vm' && bindVisualItemsTemp &&  (vmItemIndex = bindVisualItemsTemp.findIndex(item => item.get('key') === key )) != -1){
           const willDeleteVmItemAlias = bindVisualItemsTemp.getIn([vmItemIndex,'value','alias'])
           //先删除先前的vmItem
           bindVisualItemsTemp = bindVisualItemsTemp.delete(vmItemIndex)
           currentWidget = currentWidget.setIn(['dataOption','dataItems',dataItemIndex,'bindVisualItems'],bindVisualItemsTemp)
           const willDeleteViaulMapIndex = currentWidget.getIn(['data','visualMap']).findIndex(vm=>vm.get('dimension') === willDeleteVmItemAlias && vm.get('dataItemId') === dataItemId)
           if(willDeleteViaulMapIndex != -1){
               currentWidget = currentWidget.deleteIn(['data','visualMap',willDeleteViaulMapIndex])
           }
           //删除先前的数据
           currentWidget = await this.handleDeleteDimension(currentWidget,willDeleteVmItemAlias)
       }
           currentWidget = currentWidget.updateIn(['dataOption','dataItems',dataItemIndex,'bindVisualItems'],(list=List())=>list.push(Immutable.fromJS(bindVisualItems)))
           // 处理dataInfo，dataset
           currentWidget = await this.handleAddDimemsion(currentWidget,{alias:value.alias,ftype:fType,groupName})

       // 处理data的series
       let {0:seriesIndex,1:seriesItem} = currentWidget.getIn(['data','series']).findEntry(item =>item.get('dataItemId') === dataItemId)
       switch(type){
           case "vm":
               //获取数据
               const field = value.alias,
               columnIndex = currentWidget.getIn(['data','dataset','dimensions']).findIndex(dim => dim === field),
               columnValue = currentWidget.getIn(['data','dataset','source']).map(data => data.get(columnIndex)),
               vmObj = {dataItemId,seriesIndex,dimension:field}
               let defauleValue = {'color':{type:'continuous', show: false, min:columnValue.min(), max:columnValue.max(), splitNumber:5,
                   inRange:{color:['#4575b4', '#abd9e9', '#ffffbf', '#fdae61',  '#a50026']}},
                                  'size':{}}
               this.setState(preState => {
                    let curState = Immutable.fromJS(preState)
                        curState = curState.set('curVisualMap',Immutable.fromJS({vmType:key, field, data:columnValue, configData:{...defauleValue[key],...vmObj},
                    }))
                   return curState.toJS()
               })
               if(currentWidget.get('data').has('visualMap')) {
                   currentWidget = currentWidget.updateIn(['data', 'visualMap'], (value = List()) => {
                       return value.push(Immutable.fromJS({...defauleValue[key], ...vmObj, columnValue}))
                   })
               }else{
                   let value = [{...defauleValue[key], ...vmObj, columnValue}]
                   currentWidget = currentWidget.setIn(['data', 'visualMap'], Immutable.fromJS(value))
               }
                   break;
           case "ec":
                seriesItem = seriesItem.updateIn(['encode',key],(list=List())=>list.push(value.alias))
               if(key === 'label' &&  (!seriesItem.has('label') || seriesItem.getIn(['label','show']) == false)){
                    seriesItem = seriesItem.setIn(['label','show'],true)
               }
               currentWidget = currentWidget.setIn(['data','series',seriesIndex],seriesItem)
               break;
           default:
       }
      //提交变更
       this.handleSubmitWidget(currentWidget)
       this.hideDataLoading()
   }

   //保存组件
    handleSaveWidget = async () =>{
        let {currentWidget,match:{params:{id}}} = this.props
        currentWidget = currentWidget.delete('widgetMeta')
        const rep = await saveWidget(id,currentWidget)
        if(rep.success){
            message.success("保存成功");
        }else{
            message.warning(rep.msg)
        }
    }

    //删除绑定的可视化选项
    handleBindVisualItemDelete = async (params) =>{
       this.showDataLoading()
       const {dataItemId,vItem:{value:{alias:field},type,key},index:bindVisualItemIndex} = params
       let {currentWidget} = this.props,{data,dataOption} = currentWidget.toObject()
        let {dataItems,dataInfo} = dataOption.toObject()
        let {series} = data.toObject()
      //处理dataItems
        let {0:dataItemIndex,1:dataItemValue} = dataItems.findEntry(item => item.get('id') === dataItemId)
        if(dataItemValue){
            dataItemValue = dataItemValue.deleteIn(['bindVisualItems',bindVisualItemIndex])
            dataItems = dataItems.setIn([dataItemIndex],dataItemValue)
        }else{
            return
        }
      //处理序列
        let {0:seriesIndex,1:seriesItem} = series.findEntry(seriesItem => seriesItem.get('dataItemId') === dataItemId)
        switch(type){
            case "vm":
                let visualMapItemIndex = currentWidget.getIn(['data','visualMap']).findIndex( vmEntry => vmEntry.get('dataItemId') === dataItemId && vmEntry.get('dimension') === field )
                if(visualMapItemIndex !== -1){
                    if(currentWidget.getIn(['data','visualMap']).size > 1){
                        currentWidget = currentWidget.deleteIn(['data','visualMap',visualMapItemIndex])
                    }else{
                        currentWidget = currentWidget.deleteIn(['data','visualMap'])
                    }
                }
                //清除可能打开的样式设置面板
                this.handleCloseDataStyleSetting()
                break;
            case "ec":
                if(seriesItem){
                   const encodeValueIndex = seriesItem.getIn(['encode',key]).findIndex(item=>item === field)
                    seriesItem = seriesItem.deleteIn(['encode',key,encodeValueIndex])
                    if(key === 'label' && seriesItem.getIn(['encode',key]).size === 0){
                        seriesItem = seriesItem.setIn(['label','show'],false)
                    }
                    series = series.setIn([seriesIndex],seriesItem)
                }
                break;
            default:
        }
        let commitObj = currentWidget.setIn(['data','series'],series).setIn(['dataOption','dataItems'],dataItems)
        commitObj = await this.handleDeleteDimension(commitObj,field)
        this.handleSubmitWidget(commitObj)
        this.hideDataLoading()
    }

  //检测数据字段是否不再需要
    handleCheckFieldNotNeed(dataItems,fieldName){
        const items = dataItems.toJS()
        for(const i in items){
            const item = items[i]
            const {value:{alias},bindVisualItems} = item
            if(alias === fieldName) return false
            if(bindVisualItems){
                for(const j in  bindVisualItems){
                    const bindVisualItem = bindVisualItems[j],
                    {value:{alias}} = bindVisualItem
                    if(alias === fieldName) return false
                }
            }
        }
        return true
    }

    //关闭数据样式设置面板
    handleCloseDataStyleSetting=()=>{
        const propertyPage = Immutable.fromJS({properties: null,layout: null})
        this.setState(preState =>{
            let curState = Immutable.fromJS(preState)
            curState = curState.set('curVisualMap',Immutable.Map()).set('propertyPage',propertyPage).set('isDataStyleSetting',false)
            return curState.toJS()
        })
    }

    //打开数据样式设置面板
    handleShowDataStyleSetting=(params)=>{
        const {dataItemId,vItem:{type,key,value}} = params
        if(type === 'vm'){
            const {currentWidget} = this.props
            let vmItem = currentWidget.getIn(['data','visualMap']).find(vmItem => vmItem.get('dataItemId') === dataItemId && vmItem.get('dimension') === value.alias)
            if(vmItem){
                this.setState(preState =>{
                    let curState = Immutable.fromJS(preState)
                    const curVisualMap={vmType:key,field:value.alias,data:vmItem.get('columnValue'),configData:vmItem}
                    curState = curState.set('curVisualMap',Immutable.fromJS(curVisualMap)).set('isDataStyleSetting',true)
                    return curState.toJS()
                })
            }
        }
    }

    //处理visualMap
    handleVisualMapSetting=(value)=>{
        let {currentWidget} = this.props
        const {dimension,dataItemId} = value
        if(dimension && dataItemId){
            const vmItemIndex = currentWidget.getIn(['data', 'visualMap']).findIndex(vmItem => vmItem.get('dimension') === dimension && vmItem.get('dataItemId') === dataItemId)
            if (vmItemIndex !== -1) {
                currentWidget = currentWidget.setIn(['data', 'visualMap', vmItemIndex], Immutable.fromJS(value))
            }
            this.handleSubmitWidget(currentWidget)
        }

    }

  render () {
    let panelHeight = 'calc(100vh - 130px)'
    let {currentWidget, loading, dispatch} = this.props;
    if(loading)
      return <div className={styles.loading}><Spin size='large' tip="Loading Widget..."/></div>

    let {rawOption, data, script, widgetMeta, dataOption} = currentWidget.toObject()
    let {propertyPage, loadingProperty, showProperty,dataStylePage,isDataStyleSetting,curVisualMap} = this.state
    let itemList=dataOption.get('dataItems')||List();
    const cubeId = dataOption.getIn(['dataInfo','dsInfo','cubeId']);
    const visualItemVnodesTemp =itemList ? itemList.find(item => item.get('id') === dataStylePage.dataItemId):null
    let visualItemVnodes = []
    if(visualItemVnodesTemp){
        visualItemVnodes = visualItemVnodesTemp.get('bindVisualItems')?visualItemVnodesTemp.get('bindVisualItems').toJS():[];
    }
    this.dataInfo = dataOption.get( 'dataInfo') || Immutable.Map()

    let dataStyleSettingComponent = null
    if(isDataStyleSetting){
        if(curVisualMap.data){
            switch(curVisualMap.vmType){
                case 'color':
                    dataStyleSettingComponent = (<VmColorMapping data={curVisualMap.data}
                                                                 onChange={(v)=>{this.handleVisualMapSetting(v)}}
                                                                 vm={curVisualMap.configData}/>)
                    break;
                case 'size':
                    break;
            }
        }else{
            dataStyleSettingComponent =  (<PropertyPage onPropChange={this.handleSubmitProperty2Series}
                                                       onPropDisable={this.handleDisabledSeriesProperty}
                                                       getValue={key => data.getIn(['series',...key.split('.')] , null)}
                                                       getEnabled={key => undefined !==  data.getIn(['series',...key.split('.')])}
                                                       loading={loadingProperty}
                                                       layout={propertyPage.layout}
                                                       properties={propertyPage.properties}/>)
        }
    }
      //const RadioGroup = Radio.Group,RadioButton = Radio.Button
      return (
          <Row className={styles.noScrollBar}>
        <Col span={15}>
          <Card className={styles.area} style={{height: panelHeight, marginRight:'24px'}}>
              {/*<RadioGroup onChange={v => console.log(v)} defaultValue="a">
                  <RadioButton value="a"><Icon type="area-chart" /></RadioButton>
                  <RadioButton value="b"><Icon type="table" /></RadioButton>
                  <RadioButton value="c"><Icon type="layout" /></RadioButton>
              </RadioGroup>*/}
            <ChartRender
              script={script+";"+widgetMeta.get('render')}
              rawOption={rawOption}
              data={data}
              style={{height: 'calc(100vh - 312px)'}}/>
          </Card>
        </Col>
        <Col span={showProperty ? 3 : 0}>
          <Card style={{height: panelHeight, overflowY: 'auto'}}>
            <h3 className={styles.areaTitle}>样式</h3>
            <SelectMenu
              optionMeta={widgetMeta.get('optionMeta')}
              rawOption={rawOption}
              onAddableAdd={key =>dispatch(updateProperty(this.props.currentWidget,key,(list=List())=>list.push({})))}
              onAddableDelete={this.onAddableDelete}
              onPropertySpecified={this.handlePropertySpecified}
            />
          </Card>
        </Col>
        <Col span={showProperty ? 6 : 0}>
          <Card style={{height: panelHeight, overflowY: 'auto'}} bodyStyle={{padding: '12px 0'}}>
            <h3 className={styles.areaTitle} style={{margin: '-12px 0 8px'}}>属性调整</h3>
            <PropertyPage onPropChange={this.handleSubmitProperty}
              onPropDisable={this.handleDisabledProperty}
              getValue={key => rawOption.getIn(key.split('.'), null)}
              getEnabled={key => undefined !==  rawOption.getIn(key.split('.'))}
              loading={loadingProperty}
              layout={propertyPage.layout}
              properties={propertyPage.properties}/>
          </Card>
        </Col>
          <Col span={showProperty ? 0 : 3}>
              <Card style={{height: panelHeight}}>
                  <h3 className={styles.areaTitle}>数据样式</h3>
                  {(dataStylePage.dataItemId) && <DataStylePage
                      dataItemId={dataStylePage.dataItemId}
                      widgetTypes={dataStylePage.widgetTypes}
                      curSeriesType = {dataStylePage.curSeriesType}
                      widgetTypeChange={this.handleWidgetTypeChange}
                      dataStyleDefine ={this.state.dataStyleDefine}
                      visualItemClick ={this.handleVisualItemClick}
                      othersSettingClick = {this.handleOthersSettingClick}
                      visualDataItems = {visualItemVnodes}
                      onBindVisualItemClick = {this.handleShowDataStyleSetting}
                      onBindVisualItemDeleteClick = {this.handleBindVisualItemDelete}
                      onDrop = {this.handleVisualItemDrop}
                  />}
              </Card>
          </Col>
          <Col span={isDataStyleSetting&&!showProperty ? 6 : 0}>
              <Card style={{height: panelHeight, overflowY: 'auto'}} bodyStyle={{padding: '12px 0'}}>
              <h3 className={styles.areaTitle} style={{margin: '-12px 0 8px'}}>{ `数据样式 > ${curVisualMap.field}`}
              <Button icon='close' size='small' style={{marginTop: '3px',marginRight: '5px',float: 'right'}}
                onClick={this.handleCloseDataStyleSetting}
              />
              </h3>
                  {dataStyleSettingComponent}
              </Card>
          </Col>
        <Col span={isDataStyleSetting || showProperty ? 0 : 3}>
          <Card style={{height: panelHeight}}>
            <h3 className={styles.areaTitle}>数据</h3>
              <DataBindPage
                  dataBindItems = {widgetMeta.get('dataMeta').toJS()}
                  itemList = {itemList}
                  onDeleteClick = {this.handleDataItemRemove}
                  onItemClick = {this.handleDataItemClick}
                  onDrop = {this.handleDataItemAdd}
                  dataItemId={this.state.dataStylePage.dataItemId}/>
          </Card>
        </Col>
        <Col span={showProperty || isDataStyleSetting ? 0 : 3}>
              <div style={{display:'flex',width:'100%',height:panelHeight}}>
                  <CubeSchema getData={this.handleGetDsInfo} cubeId = {cubeId}/>
              </div>
        </Col>
      </Row>)
  }
}

export default connect(state => state.get('widget').toObject())(Designer)