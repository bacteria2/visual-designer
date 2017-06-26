import Vue from 'vue'
import { mergeWith,get,forOwn,uniqBy,remove,clone} from '../../utils'


export default {
  chartConfigUpdate(state, payload){
    state.config = Object.assign({}, state.config, payload)
  },
  //新增rawData
  addRawData(state, {node, value}){
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
    console.warn("method deprecated");
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
  //从option 和 Show的定义中加载数据都series中
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
    forOwn(state.show.series[type], function (v, k) {
      tempSerie[k] = undefined;
    });
    state.series.push(tempSerie);
    //搞demension
    //根据key去重
    let demensionItems =clone(uniqBy(state.demension.filter((item) => {
        return item.type == type;
      }), 'key')) ,
    curSeriesIndex = state.series.length - 1;
    demensionItems.forEach((item) => {
      item.index = curSeriesIndex;
      state.demension.push(item);
    })
  }
  ,
  //删除序列
  delSerial(state,{realIndex}){
    //删series
    state.series.splice(realIndex,1);
    //删demension
    remove(state.demension,(item)=>{
      return item.index == realIndex;
    });
    state.demension = clone(state.demension);
  },
  //修改维度
  updateDemension({demension},{key,value}){
    demension[key] = value
  },
  deleteDemension({demension},key){
    delete demension[key] ;
  }



}
