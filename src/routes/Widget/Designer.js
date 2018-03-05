import React from 'react'
import { Card, Button, Row, Col, Spin, notification, message} from 'antd'
import { connect } from 'react-redux'
import { PropertyPage, SelectMenu, ChartRender, HeaderControl, DataBindPage, DataStylePage } from '../../components/Widget'
import { submitProperty, enableDisabledProperty,deleteProperty, updateProperty, deleteDataItems, fetchWidget,ChangeWidget} from '../../store/Widget/action'
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
let controlList = [
  {action (e) {console.log(e)}, text: '保存', icon: 'save'},
]


@DragDropContext(HTML5Backend)
class Designer extends React.PureComponent {
  constructor (props) {
      super(props)

      let {id} = props.match.params
      //工具栏绑定方法
      controlList[0].action = this.handleSaveWidget
      props.dispatch({type: ChangeControlMenu, payload: <HeaderControl itemList={controlList}/>})
      if (id)
          props.dispatch(fetchWidget(id))

  }
  //life cycle
  componentWillUnmount () {
    this.props.dispatch({type: RemoveControlMenu})
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
  }
  //
  handleShowProperty = () => this.setState({showProperty: !this.state.showProperty})

  //
  handleSubmitProperty = (value, key) =>this.props.dispatch(submitProperty(this.props.currentWidget,key, value))

  handleDisabledProperty = (disabled, key) =>disabled?
    this.props.dispatch(deleteProperty(this.props.currentWidget,key)):
    this.props.dispatch(enableDisabledProperty(this.props.currentWidget,key))

  //selectMenu
  handlePropertySpecified = async (name) => {
    //name不为空请求后台,获取property页面
    if (name) {
      this.setState({loadingProperty: true})
      let {code, success, data, msg} = await requestPropertyPagesByName(name)
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
  }

  //处理增加Dimemsion
  handleAddDimemsion = async (widget,dim) =>{
      let dimensions = this.dataInfo.getIn(['queryInfo','dimensions'])
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
          const dimensionsIndex = dataInfo.getIn(['queryInfo','dimensions']).findIndex(dim => dim.get('alias') === field)
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
  handleDataItemAdd = async (data) => {
      let {currentWidget} = this.props
      const dataMetaItem = this.getDataMetaItem(data,currentWidget)
      // 添加数据项记录
      currentWidget = currentWidget.updateIn(['dataOption','dataItems'],(list=List())=>list.push(data))
      // 处理dataInfo、dataset
      const {value:{alias}} = dataMetaItem, ftype = dataMetaItem.isMeasure ? 'measure':'dimension'
      currentWidget = await this.handleAddDimemsion(currentWidget,{alias, ftype})
      // 添加序列数据
      if(dataMetaItem.seriesType){
          //存在seriesType的数据项表示作用于序列
          const {seriesType,id:dataItemId} = dataMetaItem, seriesItem = {name:alias,type:seriesType,dataItemId};
                //使用lodash 设定值
                set(seriesItem,dataMetaItem.key,alias);
                //更新序列列表
                currentWidget = currentWidget.updateIn(['data','series'],(list=List())=>list.push(Immutable.fromJS(seriesItem)))
      }else{
          //没有seriesType的数据项表示作用于公共
          const isSeriiesCommon = dataMetaItem.target === 'series'?true:false, key = dataMetaItem.key;
          if(isSeriiesCommon){ // 如果是对应所有序列的设定
              let series = currentWidget.getIn(['data','series']).toJS();
              series.forEach(s =>{set(s,key,alias)})
              //更新序列
              currentWidget = currentWidget.setIn(['data','series'],Immutable.fromJS(series))
          }else{
              currentWidget = currentWidget.setIn(['data'].concat(key.split('.')),alias)
          }
      }

     //提交Widget
     this.handleSubmitWidget(currentWidget)

    //拖进数据时打开数据样式界面
    const {key,id,seriesType} = data.toObject()
      if(seriesType) this.handleDataItemClick(key,id)
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
      this.setDataInfo(['dsInfo'],{schema,connect,cubeId})
  }

  //设置数据连接信息
  setDataInfo = (key,value) =>{
      this.dataInfo = this.dataInfo.setIn(key,value)
  }

  //数据项改变后的处理方法
   /*handleDataItemChange = async()=>{
     let {currentWidget} = this.props
     const keyPrefix = ['currentWidget','data']
     //存放需要dispatch的内容
     let submit = new Map();
     // 1、合并配置项
     const  dataBinditems = currentWidget.getIn(['widgetMeta','dataMeta']).toJS(),
              dataItems = currentWidget.getIn(['dataOption','dataItems']).toJS()
     let mergedDataItems = []
       dataItems.forEach(dItem =>{
              let dataBindItem = dataBinditems.filter(dbi =>{return dbi.uniqueId === dItem.key})[0]
              mergedDataItems.push({...dItem,...dataBindItem })
       })
      const series = mergedDataItems.filter(mdi =>{return mdi.type === 'series'});
      const common = mergedDataItems.filter(mdi =>{return mdi.type === 'common'});

      // 2、处理序列数据变化
      let dataSeries = [],
           dimensions = []
      series.forEach(s => {
        const ftype = s.isMeasure ? 'measure':'dimension',
              {value:{alias},seriesType,id:dataItemId} = s,
              dim = {alias, ftype},
              seriesItem = {name:alias,type:seriesType,dataItemId};
              set(seriesItem,s.key,alias);
              dataSeries.push(seriesItem);
              dimensions.push(dim);
      })
      // 3、处理公共数据变化
      common.forEach(c =>{
          const isSeriiesCommon = c.target === 'series'?true:false,
                 {value:{alias}} = c,
                 ftype = c.isMeasure ? 'measure':'dimension',
                 dim = {alias, ftype},
                 key = c.key;
          if(isSeriiesCommon){ // 如果是对应所有序列的设定
              dataSeries.forEach(s =>{
                set(s,key,alias)
              })
          }else{
              submit.set(keyPrefix.concat(key.split('.')) ,alias)
          }
          dimensions.push(dim);
      })

       submit.set([...keyPrefix,'series'],dataSeries)

      //4、请求cube数据
       let dataset = {source:[],dimensions:[]}
       if(dimensions.length > 0){
           this.setDataInfo(['queryInfo','dimensions'],Immutable.fromJS(dimensions))
           //临时
           this.setDataInfo(['queryInfo','slicerFilters'],List)
           const rep = await loadDataSet(this.dataInfo.toJS());
           if(rep.success){
               const {arrayData,columns} = rep.data
               dataset.source = arrayData;
               dataset.dimensions = columns;
               //储存requestBody
               submit.set(['currentWidget','dataOption','dataInfo'],this.dataInfo)
               submit.set([...keyPrefix,'dataset'],dataset)
           }else{
               notification['error']({message:"错误",description:rep.msg})
           }
       }

      //5、提交数据到store
       submit.forEach((v,k)=>{
           this.props.dispatch({type: WidgetSubmitDeep,key:k,value:Immutable.fromJS(v)})
       })

  }*/

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
       console.log("handleVisualItemClick",configItem,dataItemId)
   }

   //处理其他设置
   handleOthersSettingClick = (target,dataItemId) =>{
      console.log("handleOthersSettingClick",target,dataItemId)
   }

   //处理可视化选项拖进东西
   handleVisualItemDrop = async (obj) =>{
      const {key,label,type,dataItemId,value ,fType,groupName} = obj,
          bindVisualItems = {key,label,type,value}
       let   {currentWidget} = this.props
       const {0:dataItemIndex} = currentWidget.getIn(['dataOption','dataItems']).findEntry(item =>item.get('id') === dataItemId)
       // 处理绑定数据项
       currentWidget = currentWidget.updateIn(['dataOption','dataItems',dataItemIndex,'bindVisualItems'],(list=List())=>list.push(Immutable.fromJS(bindVisualItems)))
       // 处理dataInfo，dataset
       currentWidget = await this.handleAddDimemsion(currentWidget,{alias:value.alias,ftype:fType,groupName})
       // 处理data的series
       let {0:seriesIndex,1:seriesItem} = currentWidget.getIn(['data','series']).findEntry(item =>item.get('dataItemId') === dataItemId)
       switch(type){
           case "vm":
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
       const {dataItemId,vItem:{value:{alias:field},type,key},index:bindVisualItemIndex} = params
       const {currentWidget} = this.props,{data,dataOption} = currentWidget.toObject()
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

  render () {
    let panelHeight = 'calc(100vh - 130px)'
    let {currentWidget, loading, dispatch} = this.props;
    /*if(this.operation){
        const operationName = this.operation
        this.operation = undefined;
        this[operationName]();
    }*/
    if(loading)
      return <div className={styles.loading}><Spin size='large' tip="Loading Widget..."/></div>

    let {rawOption, data, script, widgetMeta, dataOption} = currentWidget.toObject()
    let {propertyPage, loadingProperty, showProperty,dataStylePage} = this.state
    let itemList=dataOption.get('dataItems');
    const cubeId = dataOption.getIn(['dataInfo','dsInfo','cubeId']);
    const visualItemVnodesTemp = itemList.find(item => item.get('id') === dataStylePage.dataItemId)
    let visualItemVnodes = []
    if(visualItemVnodesTemp){
        visualItemVnodes = visualItemVnodesTemp.get('bindVisualItems')?visualItemVnodesTemp.get('bindVisualItems').toJS():[];
    }
    this.dataInfo = dataOption.get( 'dataInfo') || Immutable.Map()
    return (
      <Row className={styles.noScrollBar}>
        <Col span={15}>
          <Card>
            <ChartRender
              script={script+";"+widgetMeta.get('render')}
              rawOption={rawOption}
              data={data}
              style={{height: 'calc(100vh - 312px)'}}/>
          </Card>
          <Card style={{height: 120, marginTop: 12}}>
            <Button onClick={this.handleShowProperty}>测试窗口</Button>
            <Button onClick={this.handleShowProperty}>测试窗口</Button>
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
                      onBindVisualItemDeleteClick = {this.handleBindVisualItemDelete}
                      onDrop = {this.handleVisualItemDrop}
                  />}
              </Card>
          </Col>
        <Col span={showProperty ? 0 : 3}>
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
        <Col span={showProperty ? 0 : 3}>
          {/*<Card style={{height: panelHeight}} bodyStyle={{padding: 0,width:'100%',height:'100%'}}>*/}
              <div style={{display:'flex',width:'100%',height:panelHeight}}>
                  <CubeSchema getData={this.handleGetDsInfo} cubeId = {cubeId}/>
              </div>
          {/*</Card>*/}
        </Col>
      </Row>)
  }
}

export default connect(state => state.get('widget').toObject())(Designer)