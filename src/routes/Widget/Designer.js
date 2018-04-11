import React from 'react'
import { Card, Button, Row, Col, Spin, notification, message, Icon, Radio } from 'antd'
import { connect } from 'react-redux'
import {
  PropertyPage,
  SelectMenu,
  ChartRender,
  HeaderControl,
  DataBindPage,
  DataStylePage,
  ConditionList,
} from '../../components/Widget'
import VmColorMapping from '../../components/VmColorMapping'
import {
  submitProperty,
  enableDisabledProperty,
  deleteProperty,
  updateProperty,
  deleteDataItems,
  fetchWidget,
  ChangeWidget,
  submitProperty2Series,
  enableDisabledSeriesProperty,
  deleteSeriesProperty,
  ChangeDataLoading,
} from '../../store/Widget/action';
import CondtionItemPropertyPage from './CondtionItemPropertyPage';
import { ChangeControlMenu, RemoveControlMenu } from '../../store/Global/action'
import { requestPropertyPagesByName, saveWidget } from '../../service/widget'
import styles from './Designer.css'
import CubeSchema from '../DataSource/Cube/CubeSchema'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import { List,Map } from 'immutable';
import {set} from 'lodash'
import {loadDataSet,saveInstance} from '../../service/mdxService'
import Immutable from 'immutable'
import Slicer from '../../components/Slicer'
import  FieldsType from '../../../src/routes/DataSource/Cube/FieldsType'
import isArray from 'lodash/isArray'
import DynamicSeriesEditorModal from '../../components/DynamicSeries/DynamicSeriesEditorModal'
import {splitSeries,handleDynamicSeriesConditionStyle} from '../../utils/renderUtil'
import uuid from 'uuid/v1'

/**
 * 实例设计器:
 * 从store获取到实例id,加载实例数据到组件
 * */

const conditionItemKey = ['conditionItemList']
const condtionStyleKey=(dataItemId,index)=>[dataItemId,index,'style']

function switchDisplay (key) {
  return {
    showProperty: 'showProperty' === key,
    showCondition: 'showCondition' === key,
    showStyleSetting: 'showStyleSetting' === key,
  }
}

/**
 * 编号规则:两位数不同数字代表状态
 * 十位数字表示3种样式
 *  1:数据样式
 *  2:条件样式
 *  3:基础样式
 * 个位数表示展开属性页
 *  0：不展开
 *  1：展开
 * */
function getDesignerState (state) {
  const {showProperty, showCondition, showStyleSetting} = state
  //状态1-0 全为false ,展示数据样式
  if (!showProperty && !showCondition && !showStyleSetting)
    return '10'
  //状态1-0 展示数据样式,打开属性页
  if (!showProperty && !showCondition && showStyleSetting)
    return '11'
  //状态2-0 展示条件样式
  if (!showStyleSetting && showCondition)
    return '20'
  //状态2-1 展示条件样式,打开属性页
  if (showStyleSetting && showCondition)
    return '21'
  //状态3-1 展示基础样式,打开属性页
  if (showProperty)
    return '31'
}

@DragDropContext(HTML5Backend)
class Designer extends React.PureComponent {
  constructor (props) {
    super(props)
    let {id} = props.match.params
    let controlList = [
      {action: this.handleSaveWidget, text: '保存', icon: 'save'},
      {action: ()=>console.info('同步数据'), text: '同步数据', icon: 'sync', fontSize: '28px'},
      {action: () => this.setState({showProperty: true}), text: '通用样式设置', icon: 'setting'},
      {
        action: () => this.setState({showProperty: false, showCondition: false, showStyleSetting: false}),
        text: '数据设置',
        icon: 'api',
      },
      {action: () => this.props.history.push('/widget/list/2d'), text: '退出', icon: 'logout', fontSize: '28px'},
      //{action: () => this.handleShowConditionItemList(), text: '条件设置', icon: 'api'},
    ]
    props.dispatch({type: ChangeControlMenu, payload: <HeaderControl itemList={controlList}/>})
    if (id)
      props.dispatch(fetchWidget(id))

  }

  //life cycle
  componentWillUnmount () {
    this.props.dispatch({type: RemoveControlMenu})
  }

  showDataLoading = () => {
    this.props.dispatch({type: ChangeDataLoading, payload: true})
  }

  hideDataLoading = () => {
    this.props.dispatch({type: ChangeDataLoading, payload: false})
  }

  state = {
    showProperty: false,
    showCondition: false,
    showStyleSetting: false,
    loadingProperty: false,
    rendering: true,
    propertyPage: {
      properties: null,
      layout: null,
    },
    dataStylePage: {
      dataItemId: null,
      curSeriesType: '',
      widgetTypes: [],
    },
    dataStyleDefine: {},
    visualItemVnodes: [],
    curVisualMap: {
      vmType: '',
      field: '',
      data: '',
      configData: {},
    },
    conditionItemIndex:-1,
    dynamicState:{editing:false},
    curDynamicStylePage:'',
  }

  //处理序列样式
  handleSubmitProperty2Series = (value, key) => this.props.dispatch(submitProperty2Series(this.props.currentWidget, key, value))
  handleDisabledSeriesProperty = (disabled, key) => disabled ? this.props.dispatch(deleteSeriesProperty(this.props.currentWidget, key)) : this.props.dispatch(enableDisabledSeriesProperty(this.props.currentWidget, key))

  //处理公共样式
  handleSubmitProperty = (value, key) => this.props.dispatch(submitProperty(this.props.currentWidget, key, value))

  handleDisabledProperty = (disabled, key) => disabled ? this.props.dispatch(deleteProperty(this.props.currentWidget, key)) : this.props.dispatch(enableDisabledProperty(this.props.currentWidget, key))

  //selectMenu
  handlePropertySpecified = async (name, index) => {
    //name不为空请求后台,获取property页面
    if (name) {
      this.setState({loadingProperty: true})
      let {code, success, data, msg} = await requestPropertyPagesByName(name, index)
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
    this.props.dispatch(deleteProperty(this.props.currentWidget, key))
  }

  //打开条件样式窗口
  handleShowConditionItemList = () => {
    this.setState(switchDisplay('showCondition'))
  }

  //处理条件样式新增
  handleConditionItemAdd = (widget,dataItemId) => {
    const newWidget = widget.updateIn(conditionItemKey.concat(dataItemId),  (list=List()) => list.push(Map({name: '条件名', condition: ''})))
    this.handleSubmitWidget(newWidget)
  }

  //处理条件样式删除
  handleConditionItemRemove = (widget, index, dataItemId) => {
    const newWidget = widget.updateIn(conditionItemKey.concat(dataItemId), (list = List()) => list.delete(index))
    this.handleSubmitWidget(newWidget)
    this.handleMergeConditionStyle(newWidget)
    this.setState({showStyleSetting: false,conditionItemIndex:-1})
  }

  //处理条件样式更新
  handleConditionItemUpdate = (widget, index, {name,condition},dataItemId) => {
    const newWidget = widget.updateIn(conditionItemKey.concat(dataItemId), (list = List()) => list.update(index, (item=Map()) =>item.set('name',name).set('condition',condition)))
    this.handleSubmitWidget(newWidget)
  }

  //处理条件样式属性页加载
  handleConditionItemClick = (index,condtionStylePage) => {
    this.setState({showStyleSetting: true,conditionItemIndex:index,curDynamicStylePage:condtionStylePage})
  }

  handleCondtionRawOptionSubmit=(widget,value,key,dataItemId)=>{
    const {conditionItemIndex}=this.state;
    const newWidget=widget.updateIn(conditionItemKey.concat(condtionStyleKey(dataItemId,conditionItemIndex)).concat(key.split('.')),v=>value)
    this.handleSubmitWidget(newWidget)
  }

  handleCondtionRawOptionDisable=(widget,disabled,key,dataItemId)=>{
    const {conditionItemIndex}=this.state;
    let path = conditionItemKey.concat(condtionStyleKey(dataItemId,conditionItemIndex)).concat(key.split('.'))
    const newWidget=widget.setIn(path,disabled?undefined:null)
    this.handleSubmitWidget(newWidget)
  }

  dataItemAddCommon = (data) =>{
      let {currentWidget} = this.props
      const dataMetaItem = this.getDataMetaItem(data,currentWidget),
          {type,key,groupName,isCategory,dataType,value:{alias},fType:ftype} = dataMetaItem
      data = data.set('operateType',type)
      if(isCategory){
          data = data.set('isCategory',true)
      }
      currentWidget = currentWidget.updateIn(['dataOption','dataItems'],(list=List())=>list.push(data))
      return {currentWidget,dataMetaItem}
  }

    //数据项新增
  handleDataItemAdd = async (data) =>  {
        this.showDataLoading()
        let {currentWidget,dataMetaItem} = this.dataItemAddCommon(data),
            {type,key,groupName,dataType,value:{alias},fType:ftype} = dataMetaItem
        // 处理dataInfo、dataset
        currentWidget = await this.handleAddDimemsion(currentWidget,{alias,ftype,groupName,dataType})
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
            let series = currentWidget.getIn(['data','series'])?currentWidget.getIn(['data','series']).toJS():[];
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
        if (type === 'series') this.handleDataItemClick(key, data.get('id'))
    }

  //数据项删除
  handleDataItemRemove = async (dataItemId) => {
    this.showDataLoading()
    let {currentWidget} = this.props
    const {0: willDeleteDataItemIndex, 1: dataItem} = currentWidget.getIn(['dataOption', 'dataItems']).findEntry(dataItem => dataItem.get('id') === dataItemId),
      dataMetaItem = this.getDataMetaItem(dataItem, currentWidget)
    //删除dataItem配置
    currentWidget = currentWidget.deleteIn(['dataOption', 'dataItems', willDeleteDataItemIndex])
    //处理series
    if (dataMetaItem.seriesType) {
      const seriesIndex = currentWidget.getIn(['data', 'series']).findIndex(seriesItem => seriesItem.get('dataItemId') === dataItemId)
      if (seriesIndex != -1) {
        currentWidget = currentWidget.deleteIn(['data', 'series', seriesIndex])
      }
    //删除VM设置
        let visualMapItems = currentWidget.getIn(['data','visualMap']);
            visualMapItems = visualMapItems?visualMapItems.filter(vmEntry => vmEntry.get('dataItemId') !== dataItemId):List()
            currentWidget = currentWidget.setIn(['data','visualMap'],visualMapItems)
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
      if(dataMetaItem.seriesType){
          this.handleDataStylePageHide()
      }
      this.hideDataLoading()
  }

  //处理添加动态序列项
  handleDynamicDataItemAdd = async (data) =>{
      this.showDataLoading()
      let {currentWidget,dataMetaItem} = this.dataItemAddCommon(data),
          {groupName,dataType,value:{alias},fType:ftype} = dataMetaItem,
          dim = {alias,ftype,groupName,dataType,isDynamic:true}
      //不加载dataSet
      currentWidget = await this.handleAddDimemsion(currentWidget,dim,true)
      this.handleSubmitWidget(currentWidget)
      this.hideDataLoading()
  }

  //处理删除动态序列项
  handleDynamicDataItemRemove = async (dataItemId) =>{
      let {currentWidget} = this.props,
           dataItem = currentWidget.getIn(['dataOption','dataItems'])?currentWidget.getIn(['dataOption','dataItems']).find(item => item.get('id') === dataItemId):null
           if(!dataItem) return
      this.showDataLoading()
      dataItem = dataItem.toJS()
      //删除series
      currentWidget = currentWidget.updateIn(['data','series'],(series = List()) => series.filter(item => item.get('dataItemId') !== dataItemId))
      //删除dataItem
      currentWidget = currentWidget.updateIn(['dataOption','dataItems'],(items = List()) => items.filter(item => item.get('id') !== dataItemId))
      //删除dataInfo queryInfo dim
      const {value:{alias}} = dataItem
      currentWidget =await this.handleDeleteDimension(currentWidget,alias)
      //删除条件样式
      currentWidget = currentWidget.deleteIn(['conditionItemList',dataItemId])
      //清除合并条件样式序列
      this.handleClearMergedSeriesAndConditionList()
      //提交变更到store
      this.handleSubmitWidget(currentWidget)
      this.hideDataLoading()
  }

  //加载dataset
  handleLoadDataSet= async(widget)=>{
        let dataInfo = widget.getIn(['dataOption','dataInfo'])
        if(!dataInfo) {
            message.error('获取连接信息异常')
            return widget
        }
        //处理categorys
        let dataItems = widget.getIn(['dataOption','dataItems'])
        if(dataItems && dataItems.size > 0){
            let categorys = dataItems.filter(item => item.get('isCategory') === true).map(item => {
                let result = Immutable.Map()
                result = result.set('name', item.getIn(['value','alias']))
                if(item.get('groupName')){
                    result = result.set('groupName',item.get('groupName'))
                }
                return result
            } )
            if(categorys){
                dataInfo = dataInfo.setIn(['queryInfo','categorys'],categorys)
                widget = widget.setIn(['dataOption','dataInfo'],dataInfo)
            }
        }
        //请求前判断是否已经没有使用数据
        if(dataInfo.getIn(['queryInfo','dimensions']) && dataInfo.getIn(['queryInfo','dimensions']).size === 0){
            return widget
        }
        const rep = await loadDataSet(dataInfo.toJS());
        if(rep.success){
            const {arrayData,columns,chartSchema,mdxs,dimMember,splitColumns} = rep.data
            let dataSet = {source:arrayData,dimensions:columns,splitSeries:splitColumns}
            widget = widget
                .setIn(['data','dataset'],Immutable.fromJS(dataSet))
                .set('chartSchema',chartSchema)
                .set('mdxs',Immutable.fromJS(mdxs))
                .set('dimMember',Immutable.fromJS(dimMember))
        }else{
            message.error(`加载数据失败:${rep.msg}`)
        }
        return widget
    };

  //处理增加Dimemsion
  handleAddDimemsion = async (widget,dim,noLoadDataSet) =>{
      let dimensions = widget.getIn(['dataOption','dataInfo','queryInfo','dimensions'])||List()
      if(!dimensions.find(item => item.get('alias') === dim.alias)){//如果发生变化
          dim.id = uuid()
          dimensions = dimensions.push(Immutable.fromJS(dim))
          widget = widget.setIn(['dataOption','dataInfo','queryInfo','dimensions'],dimensions)

          if(!widget.getIn(['dataOption','dataInfo','queryInfo','widgetName'])){
              widget = widget.setIn(['dataOption','dataInfo','queryInfo','widgetName'],widget.get('name'))
          }
          if(!noLoadDataSet) {
              widget = await this.handleLoadDataSet(widget)
          }
      }
      return widget
  }

  handleDeleteDimension = async (widget,field,noLoadDataSet) =>{
      let {dataItems,dataInfo} = widget.get('dataOption').toObject()
      //检测移除的数据字段是否还被图形引用，如果已经不需要就在dataInfo和dataSet剔除
      if(this.handleCheckFieldNotNeed(dataItems,field)){
          //处理dataInfo
          const tempDimensions = dataInfo.getIn(['queryInfo','dimensions'])
          if(!tempDimensions) return widget
          const dimensionsIndex =tempDimensions.findIndex(dim => dim.get('alias') === field)
          if(dimensionsIndex == -1) return widget
          dataInfo = dataInfo.deleteIn(['queryInfo','dimensions',dimensionsIndex])
          widget = widget.setIn(['dataOption','dataInfo'],dataInfo)
          if(!noLoadDataSet){
              widget = await this.handleLoadDataSet(widget)
          }
      }
      return widget
  }



  //处理提交widgei
  handleSubmitWidget = (widget) => {
    this.props.dispatch({type: ChangeWidget, payload: widget})
  }

  //获取数据配置项详细数据
  getDataMetaItem (dataItem, currentWidget) {
    const dataBindItem = currentWidget.getIn(['widgetMeta', 'dataMeta']).find(metaItem => metaItem.get('uniqueId') === dataItem.get('key'))
    const dataBindItemJs = dataBindItem ? dataBindItem.toJS() : {}, dataItemJs = dataItem.toJS()
    return {...dataBindItemJs, ...dataItemJs}
  }

  //数据项点击
  handleDataItemClick = async (key, dataItemId) => {
    const {currentWidget} = this.props
    const dataStyleConfig = currentWidget.getIn(['widgetMeta', 'dataMeta']).find(item => item.get('uniqueId') === key).toJS()
    const {seriesType, bindVisualItems} = currentWidget.getIn(['dataOption', 'dataItems']).find(item => item.get('id') === dataItemId).toJS()
    let {success, data} = await requestPropertyPagesByName(seriesType)
    if (success) {
      this.setState({
        dataStylePage: {dataItemId, widgetTypes: dataStyleConfig.widgetTypes, curSeriesType: seriesType},
        dataStyleDefine: data,
        visualItemVnodes: bindVisualItems,
      })
    } else {
      message.warning('获取可视元素配置失败')
    }
  }

  //动态序列项
  handleDynamicItemClick = async (key,dataItemId) =>{
     // this.showDataLoading()
      const {currentWidget} = this.props
      const dataStyleConfig = currentWidget.getIn(['widgetMeta', 'dataMeta']).find(item => item.get('uniqueId') === key).toJS()
      const {seriesType} = currentWidget.getIn(['dataOption', 'dataItems']).find(item => item.get('id') === dataItemId).toJS()
      let {success, data} = await requestPropertyPagesByName(seriesType)
      if(success){
          this.setState({
              dataStylePage: {dataItemId, widgetTypes: dataStyleConfig.widgetTypes, curSeriesType: seriesType},
              showProperty: false,
              showCondition: true,
              showStyleSetting: false,
              dataStyleDefine: data,
          })
      }
     // this.hideDataLoading()
  }

  //隐藏数据样式面板
  handleDataStylePageHide = () => {
    this.setState({showProperty: false, showCondition: false, showStyleSetting: false,dataStylePage: {}, dataStyleDefine: {}, visualItemVnodes: []})
  }

  //获取数据连接信息
  handleCubeChange = (value) =>{
      this.handleClearWidgetSetting()
      this.handleCubeUpdate(value)
  }


  handleCubeUpdate =(value)=>{
      const {mdx:schema,connInfo:connect,cubeId,schemaId,cube} = value
      this.cube = cube
      let {currentWidget} = this.props;
      currentWidget = currentWidget.setIn(['dataOption','dataInfo','dsInfo'],Immutable.fromJS({schema,connect,cubeId,schemaId}))
      this.handleSubmitWidget(currentWidget)
  }

    //清空widget配置
  handleClearWidgetSetting=()=>{
        let {currentWidget} = this.props;
        currentWidget = currentWidget.set('data',Immutable.Map())
            .setIn(['dataOption','dataInfo'],Immutable.Map())
            .setIn(['dataOption','dataItems'],List())
        this.handleSubmitWidget(currentWidget)
        this.handleDataStylePageHide()
    }

  //数据样式中表现形式改变的处理方法
  handleWidgetTypeChange = async (name, dataItemId) => {
    let {success, data} = await requestPropertyPagesByName(name)
    if (success) {
      this.setState({dataStyleDefine: data})
    }
    //修改按钮状态
    this.setState((preState) => {
      return {dataStylePage: {...preState.dataStylePage, curSeriesType: name}}
    })
    let {currentWidget} = this.props
    const DataItemEntry = currentWidget.getIn(['dataOption', 'dataItems']).findEntry(item => item.get('id') === dataItemId)
    if (!DataItemEntry) {
      message.error('fail to get DataItem ')
      return
    }
    const {0: dataItemIndex, 1: dataItem} = DataItemEntry
    //设定新值
    //数据项
    const newDataItem = dataItem.set('seriesType', name)
    currentWidget = currentWidget.setIn(['dataOption', 'dataItems', dataItemIndex], newDataItem)
    //序列
    const seriesItemEntry = currentWidget.getIn(['data', 'series']).findEntry(item => item.get('dataItemId') === dataItemId)
    if (!seriesItemEntry) {
      message.error('fail to get SeriesItem ')
      return
    }
    const {0: seriesIndex, 1: seriesItem} = seriesItemEntry,
      newSeriesItem = seriesItem.set('type', name)
    currentWidget = currentWidget.setIn(['data', 'series', seriesIndex], newSeriesItem)
    this.handleSubmitWidget(currentWidget)
  }

  //处理可视项点击（普通）
  handleVisualItemClick = (configItem, dataItemId) => {
    const {page, label} = configItem
    if (page) {
      this.handleOthersSettingClick(page, dataItemId, label)
    }
  }

  //处理其他设置
  handleOthersSettingClick = (target, dataItemId, label = '其他设置') => {
    const {currentWidget} = this.props,
      seriesIndex = currentWidget.getIn(['data', 'series']).findIndex(s => s.get('dataItemId') === dataItemId)
    if (seriesIndex !== -1) {
      this.handleLoadDataStyleSettingPage(target, seriesIndex, label)
    }
  }

  //加载数据样式的样式设置
  handleLoadDataStyleSettingPage = async (name, index, label) => {
    let propertyPage = {properties: null, layout: null}
    const curVisualMap = Immutable.fromJS({field: label})
    if (name) {
      this.setState({loadingProperty: true})
      let {code, success, data, msg} = await requestPropertyPagesByName(name, index)
      if (success && data) {
        let {properties, layout} = data
        propertyPage = {properties, layout}
      } else {
        message.warning(`请求数据异常:${msg}`)
      }
    }
    this.setState(preState => {
      let curState = Immutable.fromJS(preState)
      curState = curState.set('propertyPage', Immutable.fromJS(propertyPage))
        .set('showStyleSetting', true)
        .set('curVisualMap', curVisualMap)
        .set('loadingProperty', false)
      return curState.toJS()
    })
  }

   //处理可视化选项拖进东西
   handleVisualItemDrop = async (obj) =>{
      this.showDataLoading()
      const {key,label,type,dataItemId,value,fType,groupName,fieldId,vmId,dataType} = obj,
          bindVisualItems = {key,label,type,value,fieldId,vmId}
      let   {currentWidget} = this.props
      const {0:dataItemIndex} = currentWidget.getIn(['dataOption','dataItems']).findEntry(item =>item.get('id') === dataItemId)
      let   bindVisualItemsTemp = currentWidget.getIn(['dataOption','dataItems',dataItemIndex,'bindVisualItems']),vmItemIndex = -1
       // 防止拖进相同的数据项
      if(bindVisualItemsTemp && bindVisualItemsTemp.find(item => item.get('key') === key && item.get('fieldId') === fieldId)){
          this.hideDataLoading()
          return
      }
       // 处理绑定数据项
      if(type == 'vm' && bindVisualItemsTemp &&  (vmItemIndex = bindVisualItemsTemp.findIndex(item => item.get('key') === key )) != -1){
           const {vmId:willDeleteVmId,value:{alias:willDeleteVmItemAlias}} = bindVisualItemsTemp.get(vmItemIndex).toJS()
           //先删除先前的vmItem
           bindVisualItemsTemp = bindVisualItemsTemp.delete(vmItemIndex)
           currentWidget = currentWidget.setIn(['dataOption','dataItems',dataItemIndex,'bindVisualItems'],bindVisualItemsTemp)
           const willDeleteVisualMapIndex = currentWidget.getIn(['data','visualMap']).findIndex(vm=>vm.get('vmId') === willDeleteVmId)
           if(willDeleteVisualMapIndex != -1){
               currentWidget = currentWidget.deleteIn(['data','visualMap',willDeleteVisualMapIndex])
           }
           //删除先前的数据
           currentWidget = await this.handleDeleteDimension(currentWidget,willDeleteVmItemAlias)
       }
           currentWidget = currentWidget.updateIn(['dataOption','dataItems',dataItemIndex,'bindVisualItems'],(list=List())=>list.push(Immutable.fromJS(bindVisualItems)))
           // 处理dataInfo，dataset
           currentWidget = await this.handleAddDimemsion(currentWidget,{alias:value.alias,ftype:fType,groupName,dataType})

    // 处理data的series
    let {0: seriesIndex, 1: seriesItem} = currentWidget.getIn(['data', 'series']).findEntry(item => item.get('dataItemId') === dataItemId)
    switch (type) {
      case 'vm':
        //获取数据
        const field = value.alias,
          columnIndex = currentWidget.getIn(['data', 'dataset', 'dimensions']).findIndex(dim => dim === field),
          columnValue = currentWidget.getIn(['data', 'dataset', 'source']).map(data => data.get(columnIndex)),
          vmObj = {dataItemId, seriesIndex, dimension: field}
        let defauleValue = {
          'color': {
            type: 'continuous', show: false, min: columnValue.min(), max: columnValue.max(), splitNumber: 5,
            inRange: {color: ['#4575b4', '#abd9e9', '#ffffbf', '#fdae61', '#a50026']},
          },
          'size': {inRange:{symbolSize:[10,50]},show: false,splitNumber: 5,type: 'continuous',min: columnValue.min(), max: columnValue.max()},
        }
        this.setState(preState => {
          let curState = Immutable.fromJS(preState)
          curState = curState.set('curVisualMap', Immutable.fromJS({
            vmType: key, field, data: columnValue, configData: {...defauleValue[key], ...vmObj},
          }))
          return curState.toJS()
        })
          const visualMapItem = Immutable.fromJS({...defauleValue[key], ...vmObj, columnValue,vmId})
        if (currentWidget.get('data').has('visualMap')) {
          currentWidget = currentWidget.updateIn(['data', 'visualMap'], (value = List()) => {
            return value.push(visualMapItem)
          })
        } else {
          currentWidget = currentWidget.setIn(['data', 'visualMap'], List().push(visualMapItem))
        }
        break
      case 'ec':
        seriesItem = seriesItem.updateIn(['encode', key], (list = List()) => list.push(value.alias))
        if (key === 'label' && (!seriesItem.has('label') || seriesItem.getIn(['label', 'show']) == false)) {
            //调整label属性项
          seriesItem = seriesItem.setIn(['label', 'show'], true)
        }
          if (key === 'tooltip') {
              let tooltip = currentWidget.getIn(['rawOption','tooltip'],Map())
              if(tooltip.get('show') === false){
                  tooltip = tooltip.set('show',true)
                  seriesItem = seriesItem.setIn(['tooltip', 'show'], true)
                  currentWidget = currentWidget.setIn(['rawOption','tooltip'],tooltip)
              }
          }

        currentWidget = currentWidget.setIn(['data', 'series', seriesIndex], seriesItem)
        break
      default:
    }
    //提交变更
    this.handleSubmitWidget(currentWidget)
    this.hideDataLoading()
  }

    //删除绑定的可视化选项
   handleBindVisualItemDelete = async (params) =>{
       this.showDataLoading()
       const {dataItemId,vItem:{value:{alias:field},type,key,vmId},index:bindVisualItemIndex} = params
       let {currentWidget} = this.props,{data,dataOption} = currentWidget.toObject()
        let {dataItems,dataInfo} = dataOption.toObject()
        let {series} = data.toObject()
      //处理dataItems
        let {0:dataItemIndex,1:dataItemValue} = dataItems.findEntry(item => item.get('id') === dataItemId)
        if(dataItemValue){
            dataItemValue = dataItemValue.deleteIn(['bindVisualItems',bindVisualItemIndex])
            dataItems = dataItems.setIn([dataItemIndex],dataItemValue)
        }else{
            this.hideDataLoading()
            return
        }
      //处理序列
        let {0:seriesIndex,1:seriesItem} = series.findEntry(seriesItem => seriesItem.get('dataItemId') === dataItemId)
        switch(type){
            case "vm":
               const visualMapItemIndex = currentWidget.getIn(['data','visualMap']).findIndex( vm => vm.get('vmId') === vmId)
                //let visualMapItemIndex = currentWidget.getIn(['data','visualMap']).findIndex( vmEntry => vmEntry.get('dataItemId') === dataItemId && vmEntry.get('dimension') === field )
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
                    if(seriesItem.getIn(['encode',key]).size === 0){
                        seriesItem = seriesItem.setIn([key,'show'],false)
                    }
                    series = series.setIn([seriesIndex],seriesItem)
                }
                break;
            default:
        }
        let commitObj = currentWidget.setIn(['data','series'],series).setIn(['dataOption','dataItems'],dataItems)
        commitObj = await this.handleDeleteDimension(commitObj,field)
        this.handleSubmitWidget(commitObj)
        this.handleCloseDataStyleSetting()
        this.hideDataLoading()
    }

    //保存组件
   handleSaveWidget = async () =>{
        let {currentWidget,match:{params:{id}}} = this.props
        currentWidget = currentWidget.delete('widgetMeta')
        const rep = await saveWidget(id,currentWidget)
        if(rep.success){
            const {dataOption,name,mdxs,chartSchema} = currentWidget.toObject(),
                schemaId = dataOption.getIn(['dataInfo','dsInfo','schemaId']),
                json = {schemaId,widgetName:name,chartSchema,mdxs:mdxs.toJS()}
            saveInstance({json})
            message.success("保存成功");
        }else{
            message.warning(rep.msg)
        }
    }

  //检测数据字段是否不再需要
   handleCheckFieldNotNeed (dataItems, fieldName) {
    const items = dataItems.toJS()
    for (const i in items) {
      const item = items[i]
      const {value: {alias}, bindVisualItems} = item
      if (alias === fieldName) return false
      if (bindVisualItems) {
        for (const j in  bindVisualItems) {
          const bindVisualItem = bindVisualItems[j],
            {value: {alias}} = bindVisualItem
          if (alias === fieldName) return false
        }
      }
    }
    return true
  }

    //获取已经使用的数据字段
   getUsedFieldIds(dataItems){
        if(dataItems && dataItems.size > 0){
            let usedFieldIds = new Set()
            dataItems.forEach(item =>{
                usedFieldIds.add(item.get('fieldId'))
                const bindVisualItems = item.get('bindVisualItems')
                if(bindVisualItems && bindVisualItems.size > 0){
                    bindVisualItems.forEach( bvi => {
                        usedFieldIds.add(bvi.get('fieldId'))
                    })
                }
            })
            return Array.from(usedFieldIds)
        }
        return []
    }

    //关闭数据样式设置面板
   handleCloseDataStyleSetting=()=>{
        const propertyPage = Immutable.fromJS({properties: null,layout: null})
        this.setState(preState =>{
            let curState = Immutable.fromJS(preState)
            curState = curState.set('curVisualMap',Immutable.Map()).set('propertyPage',propertyPage).set('showStyleSetting',false)
            return curState.toJS()
        })
    }

   //打开数据样式设置面板
   handleShowDataStyleSetting = (params) => {
    const {dataItemId, vItem: {type, key, value}} = params
    if (type === 'vm') {
      const {currentWidget} = this.props
      let vmItem = currentWidget.getIn(['data', 'visualMap']).find(vmItem => vmItem.get('dataItemId') === dataItemId && vmItem.get('dimension') === value.alias)
      if (vmItem) {
        this.setState(preState => {
          let curState = Immutable.fromJS(preState)
          const curVisualMap = {vmType: key, field: value.alias, data: vmItem.get('columnValue'), configData: vmItem}
          curState = curState.set('curVisualMap', Immutable.fromJS(curVisualMap)).set('showStyleSetting', true)
          return curState.toJS()
        })
      }
    }
  }

   //处理visualMap
   handleVisualMapSetting = (value) => {
    let {currentWidget} = this.props
    const {dimension, dataItemId} = value
    if (dimension && dataItemId) {
      const vmItemIndex = currentWidget.getIn(['data', 'visualMap']).findIndex(vmItem => vmItem.get('dimension') === dimension && vmItem.get('dataItemId') === dataItemId)
      if (vmItemIndex !== -1) {
        currentWidget = currentWidget.setIn(['data', 'visualMap', vmItemIndex], Immutable.fromJS(value))
      }
      this.handleSubmitWidget(currentWidget)
    }

  }

   //处理过滤器拖进东西
   handleSlicerOnDrop= async (monitor)=>{
      this.showDataLoading()
        const {field:{field,alias,fieldId,fType},groupName,groupFields} = monitor
              let {currentWidget} = this.props,
                slicerFilters = currentWidget.getIn(['dataOption','dataInfo','queryInfo','slicerFilters'])?
                             currentWidget.getIn(['dataOption','dataInfo','queryInfo','slicerFilters']):List()
                  if(slicerFilters.size > 0 && slicerFilters.find(item => item.get('fieldId') === fieldId)){
                        message.warning('过滤器中不允许拖进相同的字段')
                        return
                  }

                let newFilterDimension = {alias,field,fieldId,hide:false,fType};
                if(groupName && isArray(groupFields)){
                             newFilterDimension.groupName = groupName;
                             newFilterDimension.groupFields = groupFields.map(e=>e.alias);
                }

                const slicerFilterItem = Immutable.fromJS({...newFilterDimension,values:[]})
                currentWidget  = currentWidget.setIn(['dataOption','dataInfo','queryInfo','slicerFilters'],
                                                       slicerFilters.push(slicerFilterItem))
                currentWidget = await this.handleLoadDataSet(currentWidget)
                this.handleSubmitWidget(currentWidget)
                this.hideDataLoading()
  }

   //处理过滤器设置改变
   handleSlicerOnChange= async (slicerFilters)=>{
      this.showDataLoading()
      let {currentWidget} = this.props
      currentWidget  = currentWidget.setIn(['dataOption','dataInfo','queryInfo','slicerFilters'], Immutable.fromJS(slicerFilters))
      currentWidget = await this.handleLoadDataSet(currentWidget)
      this.handleSubmitWidget(currentWidget)
      this.hideDataLoading()
   }

   handleConfirmSetDynamic = async ()=>{
      this.handleDataStylePageHide()
      let {currentWidget} = this.props;
      //找出operateType == 'series' 的dataItems
      let dataItems = currentWidget.getIn(['dataOption','dataItems']) || List(),
      dataItemFields = dataItems.filter( item => item.get('operateType') === 'series').map(item => item.getIn(['value','alias']))
      if(dataItemFields.size > 0){
          dataItems = dataItems.filter( item => item.get('operateType') !== 'series')
          currentWidget = currentWidget.setIn(['dataOption','dataItems'],dataItems).set('data',Immutable.Map())
          dataItemFields = dataItemFields.toObject()
          for(let fieldIndex in  dataItemFields){
              //处理dataInfo，不马上进行dataSet加载操作
              currentWidget = await this.handleDeleteDimension(currentWidget,dataItemFields[fieldIndex],true)
          }
      }
      if(currentWidget.get('isDynamic') === true){
          //清除条件样式
          this.handleClearMergedSeriesAndConditionList()
          currentWidget = currentWidget.set('conditionItemList',Map())
      }
      currentWidget = currentWidget.update('isDynamic',(value=false)=> !value)
      this.handleSubmitWidget(currentWidget)
  }

   //处理动态序列
   handleDynamicSettingCommit =async (setting)=>{
       if(!setting) return
       this.handleCancelDynamicSplit()
       this.showDataLoading()
       const dimId = setting.id
       let {currentWidget} = this.props
       const dimIndex =  currentWidget.getIn(['dataOption','dataInfo','queryInfo','dimensions']).findIndex( dim => dim.get('id') === dimId)
       if(dimIndex !== -1){
           currentWidget = currentWidget.setIn(['dataOption','dataInfo','queryInfo','dimensions',dimIndex],Immutable.fromJS(setting))
           currentWidget = await this.handleLoadDataSet(currentWidget)
           currentWidget = this.handleSplitSeries(currentWidget)
           this.handleSubmitWidget(currentWidget)
           //重算条件样式
           this.handleMergeConditionStyle(currentWidget)
       }
       this.hideDataLoading()
  }

   //这个方法要提到共用
   handleSplitSeries =(widget)=>{
       return splitSeries(widget)
 }

   handleOpenDynamicSplit =(id,field)=>{
        this.setState({dynamicState:{editing:true,dataItemId:id,editingfield:field}})
  }

   handleCancelDynamicSplit =()=>{
        this.setState(preState => {
            let curState = Immutable.fromJS(preState)
            curState = curState.setIn(['dynamicState','editing'],false)
            return curState.toJS()
        })
 }

   //动态序列表现形式改变的处理方法
   handleDynamicSeriesTypeChange=async(name,dataItemId)=>{
        //更改dataItem
    this.showDataLoading()
    let {success, data} = await requestPropertyPagesByName(name)
    if (success) {
        this.setState((preState)=>{
            return {dataStylePage: {...preState.dataStylePage, curSeriesType: name},dataStyleDefine: data}
        })
    }
    let {currentWidget} = this.props
    const dataItemIndex = currentWidget.getIn(['dataOption', 'dataItems'],List()).findIndex(item => item.get('id') === dataItemId)
    //设定新值
    currentWidget = currentWidget.setIn(['dataOption', 'dataItems', dataItemIndex,'seriesType'], name)

    currentWidget.getIn(['data','series'],List()).forEach((seriesItem,index) => {
        if(seriesItem.get('dataItemId') === dataItemId){
            currentWidget = currentWidget.updateIn(['data','series',index],s=>s.set('type',name))
        }
    })
    this.handleMergeConditionStyle(currentWidget)
    this.handleSubmitWidget(currentWidget)
    this.hideDataLoading()
}

handleMergeConditionStyle=(widget)=>{
       const currentWidget = widget || this.props.currentWidget
       const data = currentWidget.get('data') || Map()
       const conditionItemList = currentWidget.get('conditionItemList') || Map()
       let {series,dataset} = data.toJS()
       series = handleDynamicSeriesConditionStyle(series,dataset,conditionItemList.toJS())
       this.handleUpdatemergedSeries(series)
}

handleUpdatemergedSeries=(series)=>{
    this.setState({mergedSeries:series})
}

handleClearMergedSeriesAndConditionList=()=>{
    this.setState({
        dataStylePage: {},
        showProperty: false,
        showCondition: false,
        showStyleSetting: false,
        dataStyleDefine: {},
        mergedSeries:[],
    })
}

  render () {
    let panelHeight = 'calc(100vh - 130px)'
    let {currentWidget, loading, dispatch} = this.props
    if (loading)
      return <div className={styles.loading}><Spin size='large' tip="Loading Widget..."/></div>

    let {rawOption, data, script, widgetMeta, dataOption,conditionItemList = Map(),dimMember=Immutable.Map(),isDynamic} = currentWidget.toObject()
    let {propertyPage, loadingProperty,showStyleSetting, showProperty,dataStylePage,curVisualMap,conditionItemIndex,dataStyleDefine,curDynamicStylePage} = this.state
    let itemList=dataOption.get('dataItems')||List();
    let usedFieldIds = this.getUsedFieldIds(itemList)

    const cubeId = dataOption.getIn(['dataInfo','dsInfo','cubeId']);
    const visualItemVnodesTemp =itemList ? itemList.find(item => item.get('id') === dataStylePage.dataItemId):null
    let visualItemVnodes = []
    if (visualItemVnodesTemp) {
      visualItemVnodes = visualItemVnodesTemp.get('bindVisualItems') ? visualItemVnodesTemp.get('bindVisualItems').toJS() : []
    }

    //this.dataInfo = dataOption.get( 'dataInfo') || Immutable.Map()
    let dataStyleSettingComponent = null
    if (showStyleSetting) {
      if (curVisualMap.data) {
          dataStyleSettingComponent = (<VmColorMapping data={curVisualMap.data}
                                                       onChange={(v) => {this.handleVisualMapSetting(v)}}
                                                       vm={curVisualMap.configData} graphic={curVisualMap.vmType === 'size'} />)
      } else {
        dataStyleSettingComponent = (<PropertyPage onPropChange={this.handleSubmitProperty2Series}
                                                   onPropDisable={this.handleDisabledSeriesProperty}
                                                   getValue={key => data.getIn(['series', ...key.split('.')], null)}
                                                   getEnabled={key => undefined !== data.getIn(['series', ...key.split('.')])}
                                                   loading={loadingProperty}
                                                   layout={propertyPage.layout}
                                                   properties={propertyPage.properties}/>)
      }
    }
    //const RadioGroup = Radio.Group,RadioButton = Radio.Button
    const {dimensions,source} = data.get('dataset')? data.get('dataset').toJS():{}
    const slicerFilters= dataOption.getIn(['dataInfo','queryInfo','slicerFilters'])?dataOption.getIn(['dataInfo','queryInfo','slicerFilters']).toJS():[]
    const statusCode = getDesignerState(this.state)
    const {commonStylePage = '',condtionStylePage = ''} = dataStyleDefine.dynamicConfig || {dynamicConfig:{}}
    const dataItemId = dataStylePage?dataStylePage.dataItemId:null;
    const dynamicDataItemConfig = isDynamic?{
        dataItemId:dataItemId,
        condtionStylePage:condtionStylePage,
        dynamicSeriesTypeChange:this.handleDynamicSeriesTypeChange,
        widgetTypes:dataStylePage.widgetTypes ,
        curSeriesType:dataStylePage.curSeriesType}:{}
    const columns = {
      '1': {
        first: {
          content:dataItemId?<DataStylePage
            dataItemId={dataItemId}
            widgetTypes={dataStylePage.widgetTypes}
            curSeriesType={dataStylePage.curSeriesType}
            widgetTypeChange={this.handleWidgetTypeChange}
            dataStyleDefine={this.state.dataStyleDefine}
            visualItemClick={this.handleVisualItemClick}
            othersSettingClick={this.handleOthersSettingClick}
            visualDataItems={visualItemVnodes}
            onBindVisualItemClick={this.handleShowDataStyleSetting}
            onBindVisualItemDeleteClick={this.handleBindVisualItemDelete}
            onDrop={this.handleVisualItemDrop}
          />:null,
          title: '数据',
        }, second: {
          content: dataStyleSettingComponent,
          title: `数据样式 > ${curVisualMap.field}`,
          control:<Button icon='close'
                          size='small'
                          style={{marginTop: '3px', marginRight: '5px', float: 'right'}}
                          onClick={this.handleCloseDataStyleSetting}
          />,
        },
      },
      '2': {
        first: {
          content: <ConditionList
            itemList={conditionItemList.get(dataItemId)||List()}
            onAddClick={e => this.handleConditionItemAdd(currentWidget,dataItemId)}
            onItemClick={this.handleConditionItemClick}
            onRemoveClick={index => this.handleConditionItemRemove(currentWidget, index,dataItemId)}
            onUpdateClick={(index, value) => this.handleConditionItemUpdate(currentWidget, index, value,dataItemId)}
            dynamicDataItemConfig ={dynamicDataItemConfig}
            onMergeConditionStyle = {this.handleMergeConditionStyle}
          />,
          title: '条件',
        },
        second: {
          content: curDynamicStylePage?<CondtionItemPropertyPage
            propertyPageName={curDynamicStylePage}
            dataItemId = {dataItemId}
            conditionItemList={conditionItemList}
            currentIndex={conditionItemIndex}
            onConditionPropertyDisable={(value,key)=>this.handleCondtionRawOptionDisable(currentWidget,value,key,dynamicDataItemConfig.dataItemId)}
            onConditionPropertySubmit={(value,key)=>this.handleCondtionRawOptionSubmit(currentWidget,value,key,dynamicDataItemConfig.dataItemId)}
          />:null,
          title: `条件样式调整>${conditionItemList.getIn([dataItemId,conditionItemIndex,'name'],conditionItemIndex)}`,
          control:<Button icon='close'
                          size='small'
                          style={{marginTop: '3px', marginRight: '5px', float: 'right'}}
                          onClick={_=>this.setState({showStyleSetting:false})}
          />,
        },
      },
      '3': {
        first: {
          content: <SelectMenu
            optionMeta={widgetMeta.get('optionMeta')}
            rawOption={rawOption}
            onAddableAdd={key => dispatch(updateProperty(this.props.currentWidget, key, (list = List()) => list.push({})))}
            onAddableDelete={this.onAddableDelete}
            onPropertySpecified={this.handlePropertySpecified}
          />,
          title: '普通',
        },
        second: {
          content: <PropertyPage onPropChange={this.handleSubmitProperty}
                                 onPropDisable={this.handleDisabledProperty}
                                 getValue={key => rawOption.getIn(key.split('.'), null)}
                                 getEnabled={key => undefined !== rawOption.getIn(key.split('.'))}
                                 loading={loadingProperty}
                                 layout={propertyPage.layout}
                                 properties={propertyPage.properties}/>,
          title: '属性调整',
        },
      },
    }
    const dsInfo = dataOption.getIn(['dataInfo','dsInfo']) || Immutable.Map(),
          {editing,editingfield} = this.state.dynamicState,
        editDimension = dataOption.getIn(['dataInfo','queryInfo','dimensions']) ? dataOption.getIn(['dataInfo','queryInfo','dimensions']).find(dim => dim.get('isDynamic') === true && dim.get('alias') === editingfield ) : Immutable.Map()
    const DynamicSeriesEdit = (isDynamic && editDimension && editDimension.size > 0) ? (<DynamicSeriesEditorModal key = "editor"
                                                                           dsInfo = {dsInfo}
                                                                           cube = {this.cube}
                                                                           visible = {editing}
                                                                           dimension = {editDimension.toJS()}
                                                                           onOK = {this.handleDynamicSettingCommit}
                                                                           onCancel = {this.handleCancelDynamicSplit}/>):null
    const currentColomn = columns[statusCode[0]]
     const  {mergedSeries} = this.state
    if(isDynamic && mergedSeries && mergedSeries.length > 0){
        data = data.set('series',Immutable.fromJS(mergedSeries))
    }

    return (
      <Row className={styles.noScrollBar}>
        {DynamicSeriesEdit}
        <Col span={15}>
          <Card className={styles.area} style={{height: panelHeight, marginRight: '24px'}}>
            <ChartRender
              script={script + ';' + widgetMeta.get('render')}
              rawOption={rawOption}
              data={data}
              style={{height: 'calc(100vh - 312px)'}}/>
          </Card>
        </Col>
        <Col span={3}>
          <Card style={{height: panelHeight, overflowY: 'auto',backgroundColor:'#fbfbfb'}}>
            <h3 className={styles.areaTitle}>{currentColomn.first.title}样式</h3>
            {currentColomn.first.content}
          </Card>
        </Col>
        <Col span={statusCode[1] === '1' ? 6 : 0}>
          <Card style={{height: panelHeight,backgroundColor:'#fbfbfb'}} bodyStyle={{padding: '12px 0'}}>
            <h3 className={styles.areaTitle} style={{margin: '-12px 0 8px'}}>
              {currentColomn.second.title}
              {currentColomn.second.control}
              </h3>
            <div style={{maxHeight:'calc(100vh - 170px)',overflowY: 'auto'}}>
              {currentColomn.second.content}
            </div>
          </Card>
        </Col>
        <Col span={statusCode[1] === '0' ? 3 : 0}>
          <Card style={{height: panelHeight,backgroundColor:'#fbfbfb'}}>
            <h3 className={styles.areaTitle}>数据</h3>
            <DataBindPage
              dataBindItems={widgetMeta.get('dataMeta').toJS()}
              itemList={itemList}
              onDeleteClick={this.handleDataItemRemove}
              onDeleteDynamicItem = {this.handleDynamicDataItemRemove}
              onItemClick={this.handleDataItemClick}
              onDynamicItemClick = {this.handleDynamicItemClick}
              onDrop={this.handleDataItemAdd}
              dataItemId={this.state.dataStylePage.dataItemId}
              isDynamic = {isDynamic}
              handleConfirmSetDynamic={this.handleConfirmSetDynamic}
              handleDynamicSplit = {this.handleOpenDynamicSplit}
              onDynamicDrop = {this.handleDynamicDataItemAdd}
            />

          </Card>
        </Col>
        <Col span={statusCode[1] === '0' ? 3 : 0}>
          <div style={{display: 'flex', width: '100%', height: 'calc(100vh - 300px)'}}>
            <CubeSchema onChange={this.handleCubeChange} onUpdate={this.handleCubeUpdate}  cubeId = {cubeId}
                        unEditFields = {usedFieldIds}/>
          </div>
          <div style={{height:170,width:'100%',border:'1px solid #eee'}}>
              <h3 className={styles.areaTitle} style={{margin:0,width:'100%'}}>过滤器</h3>
              <div style={{display:'flex',overflow:'auto',width:'100%',height:'calc(100% - 32px)',backgroundColor:'#fbfbfb'}}>
              <Slicer accepts={[FieldsType.DIMENSION,'level']}
                      onDrop={this.handleSlicerOnDrop}
                      data={dimMember.toJS()}
                      filterData={slicerFilters}
                      onChange={this.handleSlicerOnChange} />
              </div>
          </div>
        </Col>
      </Row>)
  }
}

export default connect(state => state.get('widget').toObject())(Designer)