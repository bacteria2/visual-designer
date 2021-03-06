import Vue from 'vue'
import { mergeWith,get,forOwn,uniqBy,remove,clone,uuid,checkedControlItem} from '../../utils'


export default {
  chartConfigUpdate(state, payload){
    state.config = Object.assign({}, state.config, payload)
  },
  //新增rawData
  addRawData(state, {node, value}){
    console.info('addRawData',node,value)
    if (node && typeof node === `string`)
      Vue.set(state.rawData, node, value)
  },
  //更新rawData
  updateRawData(state, {key, value}){
    if (state.rawData.hasOwnProperty(key)) {
      state.rawData[key] = value
    }else {
      Vue.set(state.rawData, key, value)
    }
  },
  //注册charts组件
  registryInstance(state, instance){
    if (instance) {
      state.chartComponent = instance
    }
  },
  //更新option
  updateOption(state, payload){
   // console.warn("method deprecated");
    if (payload && typeof payload === 'object')
      if (state.config.merge) {
        state.option = mergeWith(state.option, payload)
      } else {
        state.option = payload
      }
  },
  /*更新disabled*/
  updateDisabled(state, {key,disabled}){
    //不存在属性则添加
    if(!state.disabled.hasOwnProperty(key)){
      Vue.set(state.disabled,key,disabled)
    }else
      state.disabled[key]=disabled
  },
  /**从option 和 Show的定义中加载数据都series中
  loadSeriesFromOption(state){
     if(state.series.length == 0) {
     let baseSeries = state.option.series;
         baseSeries.forEach((serie,index)=>{
         let type = serie.type,
             baseSeries = true,
             tempSerie={type,baseSeries};
         forOwn(state.show.series[type],function (v,k) {
           tempSerie[k] = get(serie,k);});
           state.series.push(tempSerie)
       })
     }
  },
  */
   //更新SeriesData
  updateSeriesData(state,{key,value,seriesIndex}){
   /* console.info(key,value,seriesIndex)*/
    if (state.series[seriesIndex].hasOwnProperty(key)) {
         state.series[seriesIndex][key] = value
    }
  },
  //增加序列
  addSerial(state,{type}){
    //搞series
    let tempSerie = {type};
    let disabledSetting = {};
    forOwn(state.show.series[type], function (v, k) {
      Vue.set(tempSerie,k,undefined)
      Vue.set(disabledSetting,k,true)
      //tempSerie[k] = undefined;
    });
    state.series.push(tempSerie);
    state.seriesDisabled.push(disabledSetting);
    //搞demension
    //根据key去重
    let demensionItems =clone(uniqBy(state.demension.filter((item) => {
        return item.type == type;
      }), 'key')) ,
    curSeriesIndex = state.series.length - 1;
    demensionItems.forEach((item) => {
      item.index = curSeriesIndex;
      item.id=uuid();
      state.demension.push(item);
    })
  }
  ,
  //删除序列
  delSerial(state,{realIndex}){
    //删series
    state.series.splice(realIndex,1);
    //删禁用设定
    state.seriesDisabled.splice(realIndex,1);
    //删demension
    remove(state.demension,(item)=>{
      return item.index == realIndex;
    });
    state.demension = clone(state.demension);
  },
  //修改维度
  updateDemension({demension},{key,value}){
   /* demension[key] = value*/
   demension.filter((item)=>{return item.id == key})[0].dataItem = value;
  },
  deleteDemension({demension},key){
    demension.filter((item)=>{return item.id == key})[0].dataItem = '';
  },
  addDemensionIds({demension}){
    demension.forEach((item)=>{
        if(!item.id){
          item.id = uuid();
        }
    })
  },
  setPropertyCheckedControl(state,{type}){
    state.propertyCheckedControl = checkedControlItem[type];
  },
  updateShowSetting({showSetting},{key,show,componentType}){
    if(!show){show = undefined} //如果是false，设置成undefined
    if(componentType && componentType.startsWith('series')){//如果是序列
      let seriesType = componentType.slice(-(componentType.length-7));
      if(!showSetting.series[seriesType].hasOwnProperty(key)){
          Vue.set(showSetting.series[seriesType],key,show)
        }else{
          showSetting.series[seriesType][key] = show
      }
    }else{//不是序列
      if(!showSetting.hasOwnProperty(key)){
        Vue.set(showSetting,key,show)
      }else{
        showSetting[key]=show
      }
    }
  },
  updateShowSettingBatch({showSetting},{showConfigObj,seriesType}){
    let {isShowAll,keys} = showConfigObj;
    if(!isShowAll){isShowAll = undefined}
    if(seriesType){//如果是序列
      keys.forEach((item)=>{
        if(!showSetting.series[seriesType].hasOwnProperty(item)){
          Vue.set(showSetting.series[seriesType],item,isShowAll)
        }else{
          showSetting.series[seriesType][item]=isShowAll
        }
      })
    }else{//其他
      keys.forEach((item)=>{
        if(!showSetting.hasOwnProperty(item)){
          Vue.set(showSetting,item,isShowAll)
        }else{
          showSetting[item]=isShowAll
        }
      })
    }
  },
  initShowSetting({showSetting},{seriesTypes}){
    console.info(seriesTypes)
    seriesTypes.forEach((type)=>{
      ///2
      if(!showSetting.series.hasOwnProperty(type)){//判断一下有没有该类型的定义,没有就设一个
        Vue.set(showSetting.series,type,{})
      }
    })
  },
  //从数据库中还原
  loadShowSetting(state,{sSetting}){
    Vue.set(state,'showSetting',JSON.parse(sSetting))
  },

  saveDataSet(state,dataSet){
    state.dataSet=clone(dataSet);
  },
  /**
   * 保存sourceData,
   * payload:
   *   sourceData；
   *   merged=false;
   * */
  saveSourceData(state,{sourceData,merged=false}){
    if(merged){
      state.sourceData= mergeWith(sourceData,state.sourceData)
    }
    state.sourceData=sourceData;
  },
  /**
   * 清除sourceData
   * */
  clearSourceData(state){
    state.sourceData={};
  },
  /**
   * widgetInstance 创建前初始化State数据
   * @param state
   * @param widgetInstance
   * 写成屎，有空重写
   */
  initEchartState(state,{widgetInstance}){
    let optionStr = widgetInstance.fOption,
        dataOptionStr = widgetInstance.fDataOption,
        settingStr = widgetInstance.fSetting;
       let optionObj = JSON.parse(optionStr),
        dataOptionObj = JSON.parse(dataOptionStr),
        settingObj = JSON.parse(settingStr);
        if(optionObj){
          Vue.set(state,'option',optionObj)
        }
        let {dataSet,dimension} = dataOptionObj
        if(dataSet){
          Vue.set(state,'dataSet',dataSet)
        }
        if(dimension){
          Vue.set(state,'demension',dimension)
        }
        let {rawData,show,series,disabled,seriesDisabled,extJs} = settingObj
        if(rawData){
          Vue.set(state,'rawData',rawData)
        }
        if(show){
          Vue.set(state,'show',show)
        }
        if(series){
          Vue.set(state,'series',series)
        }
        if(disabled){
          Vue.set(state,'disabled',disabled)
        }
       if(seriesDisabled){
         Vue.set(state,'seriesDisabled',seriesDisabled)
        }
      if(extJs){
        Vue.set(state,'extJs',extJs)
      }
  },

  /*更新disabled*/
  updateSeriesDisabled(state, {index,key,disabled}){
    Vue.set(state.seriesDisabled[index], key, disabled)
  }
}
