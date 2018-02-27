import React from 'react'
import { Card, Button, Row, Col, Spin, notification, message} from 'antd'
import { connect } from 'react-redux'
import { PropertyPage, SelectMenu, ChartRender, HeaderControl, DropBox, DataBindPage, DataStylePage } from '../../components/Widget'
import { submitProperty, enableDisabledProperty,deleteProperty, updateProperty, deleteDataItems, fetchWidget,  WidgetUpdateDeep,WidgetSubmitDeep} from '../../store/Widget/action'
import { ChangeControlMenu, RemoveControlMenu } from '../../store/Global/action'
import { requestPropertyPagesByName} from '../../service/widget'
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
const controlList = [
  {action (e) {console.log(1)}, text: 'test1', icon: 'plus'},
  {action (e) {console.log(2)}, text: 'test2', icon: 'check'},
]



@DragDropContext(HTML5Backend)
class Designer extends React.PureComponent {
  constructor (props) {
    super(props)
    props.dispatch({type: ChangeControlMenu, payload: <HeaderControl itemList={controlList}/>})
    let {id} = props.match.params
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
  handleSubmitProperty = (value, key) => this.props.dispatch(submitProperty(key, value))
  handleDisabledProperty = (disabled, key) =>disabled?this.props.dispatch(deleteProperty(key)):this.props.dispatch(enableDisabledProperty(key))

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
    this.props.dispatch(deleteProperty(key))
  }

  //数据项删除
  handleDataItemRemove = (key,field) => {
    let list=this.props.currentWidget.getIn(['dataOption','dataItems']);
    if(list){
      const index=list.findIndex(el=>el.get('key')===key&&el.getIn(['value','field'])===field)
      if(index>-1){
          this.props.dispatch(deleteDataItems(index));
          this.operation = 'handleDataItemChange'
      }
    }
  }
  //数据项新增
  handleDataItemAdd = (data) => {
    this.operation = 'handleDataItemChange'
    this.props.dispatch({type: WidgetUpdateDeep,key:['currentWidget','dataOption','dataItems'], value:(list=List())=>list.push(data)});
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

  //获取数据连接信息
  handleGetDsInfo = (value) =>{
      this.DsInfo = value
  }

  //数据项改变后的处理方法
   handleDataItemChange = async()=>{
     let {currentWidget} = this.props
     let dataBinditems = currentWidget.getIn(['widgetMeta','dataMeta']).toJS(),
            dataItems = currentWidget.getIn(['dataOption','dataItems']).toJS(),
          mergedDataItems = []
      //1、合并配置项
       dataItems.forEach(dItem =>{
              let dataBindItem = dataBinditems.filter(dbi =>{return dbi.uniqueId === dItem.key})[0]
              mergedDataItems.push({...dItem,...dataBindItem })
       })
      const series = mergedDataItems.filter(mdi =>{return mdi.type === 'series'});
      const common = mergedDataItems.filter(mdi =>{return mdi.type === 'common'});

      //存放需要dispatch的内容
      let submit = new Map();
      const keyPrefix = ['currentWidget','data']

     //2、处理序列数据变化
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
      //3、处理公共数据变化
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
           const {mdx:schema,connInfo:connect} = this.DsInfo
           const requestData = {dsInfo:{schema,connect},queryInfo:{slicerFilters:[],dimensions}}


           const rep = await loadDataSet(requestData);
           if(rep.success){
               const {arrayData,columns} = rep.data
               dataset.source = arrayData;
               dataset.dimensions = columns;
               submit.set([...keyPrefix,'dataset'],dataset)
               //保存一份queryInfo备用
               this.queryInfo = requestData.queryInfo
           }else{
               notification['error']({message:"错误",description:rep.msg})
           }
       }

      //5、提交数据到store
       submit.forEach((v,k)=>{
           this.props.dispatch({type: WidgetSubmitDeep,key:k,value:Immutable.fromJS(v)})
       })

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

           const {currentWidget} = this.props;

           const DataItemEntry = currentWidget.getIn(['dataOption','dataItems']).findEntry(item=>item.get('id') === dataItemId)
           if(!DataItemEntry){
               message.error('fail to get DataItem ');
               return
           }
           //获取下标和数据
           const {0:dataItemIndex,1:dataItem} = DataItemEntry

           //设定新值
           const  newDataItem = dataItem.set('seriesType',name)

           //提交更改store dataItems
           this.props.dispatch({ type:WidgetSubmitDeep,key:['currentWidget','dataOption','dataItems',dataItemIndex],value:newDataItem })

           //提交更改 store data series
           const seriesItemEntry = currentWidget.getIn(['data','series']).findEntry(item=>item.get('dataItemId') === dataItemId)

           if(!seriesItemEntry){
               message.error('fail to get SeriesItem ');
               return
           }

           //获取下标和数据
           const {0:seriesIndex,1:seriesItem} = seriesItemEntry,
           newSeriesItem = seriesItem.set('type',name)
          //提交更改store series
          this.props.dispatch({ type:WidgetSubmitDeep,key:['currentWidget','data','series',seriesIndex],value:newSeriesItem })

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
      //更新绑定数据项
      this.props.dispatch({type:WidgetUpdateDeep,
                           key:['currentWidget','dataOption','dataItems',dataItemIndex,'bindVisualItems'],
                           value:(list=List())=>list.push(Immutable.fromJS(bindVisualItems))})


       //更新data的dataset
       const {mdx:schema,connInfo:connect} = this.DsInfo
       const dim = {alias:value.alias,ftype:fType,groupName}
       let {slicerFilters,dimensions}  = this.queryInfo
       dimensions.push(dim)
       const requestData = {dsInfo:{schema,connect},queryInfo:{slicerFilters,dimensions}}
       const rep = await loadDataSet(requestData);
       if(rep.success){
           const {arrayData,columns} = rep.data
           let dataset = {}
           dataset.source = arrayData;
           dataset.dimensions = columns;
           this.props.dispatch({type:WidgetSubmitDeep,
               key:['currentWidget','data','dataset'],
               value:dataset})
       }
       let {0:seriesIndex,1:seriesItem} = currentWidget.getIn(['data','series']).findEntry(item =>item.get('dataItemId') === dataItemId)
       ////更新data的series
       switch(type){
           case "vm":
               break;
           case "ec":
                seriesItem = seriesItem.updateIn(['encode',key],(list=List())=>list.push(value.alias))
               if(key === 'label' &&  !seriesItem.has('label')){
                    seriesItem = seriesItem.updateIn(['label','show'],()=>true)
               }
               this.props.dispatch({type:WidgetSubmitDeep,
                   key:['currentWidget','data','series',seriesIndex],
                   value:seriesItem})
               break;
           default:
       }
   }

  render () {
    let panelHeight = 'calc(100vh - 130px)'
    let {currentWidget, loading, dispatch} = this.props;
    if(this.operation){
        const operationName = this.operation
        this.operation = undefined;
        this[operationName]();
    }
    if(loading)
      return <div className={styles.loading}><Spin size='large' tip="Loading Widget..."/></div>

    let {rawOption, data, script, widgetMeta, dataOption} = currentWidget.toObject()
    let {propertyPage, loadingProperty, showProperty,dataStylePage} = this.state
    let itemList=dataOption.get('dataItems');

    const visualItemVnodesTemp = itemList.find(item => item.get('id') === dataStylePage.dataItemId)
      let visualItemVnodes = []
    if(visualItemVnodesTemp){
        visualItemVnodes = visualItemVnodesTemp.get('bindVisualItems') ?  visualItemVnodesTemp.get('bindVisualItems').toJS():[];
    }
    return (
      <Row className={styles.noScrollBar}>
        <Col span={15}>
          <Card>
            <ChartRender
              script={script}
              rawOption={rawOption}
              data={data}
              style={{height: 'calc(100vh - 312px)'}}
            />
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
              onAddableAdd={key =>dispatch(updateProperty(key,(list=List())=>list.push({})))}
              onAddableDelete={this.onAddableDelete}
              onPropertySpecified={this.handlePropertySpecified}
            />
          </Card>
        </Col>
        <Col span={showProperty ? 6 : 0}>
          <Card style={{height: panelHeight, overflowY: 'auto'}} bodyStyle={{padding: '12px 0'}}>
            <h3 className={styles.areaTitle} style={{margin: '-12px 0 8px'}}>属性调整</h3>
            <PropertyPage
              onPropChange={this.handleSubmitProperty}
              onPropDisable={this.handleDisabledProperty}
              getValue={key => rawOption.getIn(key.split('.'), null)}
              getEnabled={key => undefined !==  rawOption.getIn(key.split('.'))}
              loading={loadingProperty}
              layout={propertyPage.layout}
              properties={propertyPage.properties}
            />
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
                  dataItemId={this.state.dataStylePage.dataItemId}
              />
          </Card>
        </Col>
        <Col span={showProperty ? 0 : 3}>
          {/*<Card style={{height: panelHeight}} bodyStyle={{padding: 0,width:'100%',height:'100%'}}>*/}
              <div style={{display:'flex',width:'100%',height:panelHeight}}>
                  <CubeSchema getData={this.handleGetDsInfo}/>
              </div>
          {/*</Card>*/}
        </Col>
      </Row>)
  }
}

export default connect(state => state.get('widget').toObject())(Designer)