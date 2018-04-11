import Immutable from 'immutable'
import {List,Map} from 'immutable'
import {set} from 'lodash'

function splitSeries(widget,setConditionStyleNow = false){
      if(!widget instanceof Immutable.Map){
          widget = Immutable.fromJS(widget)
      }
    const dataItems = widget.getIn(['dataOption','dataItems'])
    const seriesItems =  dataItems ? dataItems.filter(item => item.get('operateType') === 'series'):List()
    const seriesCommonItems =  dataItems ? dataItems.filter(item => item.get('operateType') === 'seriesCommon'):List()
    const splitSeries = widget.getIn(['data','dataset','splitSeries']) || Immutable.Map()
    let series = []
    seriesItems.forEach(seriesItem => {
        const {id,seriesType:type,key,value:{alias:dataItemName}} = seriesItem.toJS(),
               refSplitSeries = splitSeries.get(dataItemName) || List()
               refSplitSeries.forEach( seriesName => {
                   let s = {name:seriesName,type,dataItemId:id}
                    set(s,key,seriesName)
                    seriesCommonItems.forEach(sci => {
                        const {key:commonKey,value:{alias}} = sci.toJS()
                        set(s,commonKey,alias);
            })
            series.push(s)
        })
    })
    if(setConditionStyleNow){
        series = handleDynamicSeriesConditionStyle(series,widget.getIn(['data','dataset']),widget.get('conditionItemList'))
    }
    return widget.setIn(['data','series'],Immutable.fromJS(series))
}

//添加条件样式
function handleDynamicSeriesConditionStyle (series,dataSet,conditionItemList = Map()) {
    if(series.length === 0 || Object.keys(dataSet).length === 0 || conditionItemList.size === 0) return series
    //获取每个条件
    const dynamicDataItemIds = Object.keys(conditionItemList)
    let styleRefList = []
    for(const dataItemIdIndex in dynamicDataItemIds){
        //获取条件列表
        const dataItemId = dynamicDataItemIds[dataItemIdIndex]
        const condItems = conditionItemList[dataItemId] || []
        if(condItems.length === 0) continue
        //生成绑定对象列表
        const binds = []
            series.forEach((s,i)=>{
            if(s.dataItemId === dataItemId){
                binds.push(getBindObjItem(s,i,dataSet))
            }
        })
        //处理每个条件样式
        for(const cond in condItems){
            const {condition = '',style = {}} = condItems[cond]
            if(condition.trim().length === 0 || Object.keys(style).length === 0) continue
             const seriesIndexs = evelCondition(binds,condition)
             if(seriesIndexs.length > 0){
                 styleRefList.push({seriesIndexs,style})
             }
        }
    }
    let conditionSeriesStyles = {}
    styleRefList.forEach( define =>{
        const style = define.style
        define.seriesIndexs.forEach(seriesIndex => {
            if(conditionSeriesStyles[seriesIndex]){
                conditionSeriesStyles[seriesIndex] = {...conditionSeriesStyles[seriesIndex],...style}
            }else{
                conditionSeriesStyles[seriesIndex] = style
            }
        })
    })

     Object.keys(conditionSeriesStyles).forEach(
         seriesIndex => {
             series[seriesIndex] = {...series[seriesIndex],...conditionSeriesStyles[seriesIndex]}
         }
     )

    return series
}

function evelCondition(binds,condition) {
    let seriesIndexs = []
    const fun = eval(`(series)=>{ 
                                  try{
                                          const cnd = ${condition};
                                          if(typeof cnd === 'boolean'){ return cnd }
                                          return false
                                       }
                                       catch(e){
                                           return false
                                       }
                                       }`)
    if(binds && binds.length > 0){
        binds.forEach(bindItem => {
            if(fun(bindItem)){
                seriesIndexs.push(bindItem.index)
            }
        })
    }
   return seriesIndexs
}

function getBindObjItem(seriesItem,index,dataset){
    let objItem = {index,name:seriesItem.name}
    const {source=[],dimensions=[]} = dataset
    const columnsIndex =  dimensions.findIndex(item => item === objItem.name)
    let valueSum = 0
    const value = source.map(row => { const v = row[columnsIndex]
        valueSum += v
        return v
    })
    objItem.value = value
    objItem.max = Math.max(...value)
    objItem.min = Math.min(...value)
    objItem.avg = Math.ceil(valueSum/value.length)
    return objItem
}

export {splitSeries,handleDynamicSeriesConditionStyle}