import store from "@/store"

export function getValueFromStore (key,seriesIndex,componentType) {
  if(store.getters.isShowSetting){ //在设置可配置项，忽略该方法
    return
  }
  //如果不存在值,则添加该值
  if(componentType && componentType.startsWith('series') /*&& typeof seriesIndex =="number"*/){
    return store.state.echarts.series[seriesIndex][key]
  }else{
    return store.state.echarts.rawData[key];
  }
}

export function updateOption (key,value,seriesIndex,componentType) {
  if(store.getters.isShowSetting){ //在设置可配置项，忽略该方法
    return
  }
  if(componentType && componentType.startsWith('series') /*&& typeof seriesIndex =="number"*/){
    store.dispatch('updateSeries',{key,value,seriesIndex})
  }else{
    store.dispatch('updateCharts',{key,value})
  }
}

export function showProperty (key,componentType) {
  if(store.getters.isShowSetting){ //在设置可配置项，所有属性可见
    return true;
  }
  if(componentType && componentType.startsWith('series')){//生成show的时候要确保series[componentType.slice(-(componentType.length-7))]被创建
    return store.state.echarts.show.series[componentType.slice(-(componentType.length-7))][key]
  }else{
    return store.state.echarts.show[key];
  }
}


export function isShowSetting(){
  return store.getters.isShowSetting;
}

/**
 * 性能有问题，不show的属性也调用这个方法
 * @param key
 * @param seriesIndex
 * @param componentType
 * @returns {boolean}
 */
export function isDisabled (key,seriesIndex,componentType) {
  let isShowSetting = store.getters.isShowSetting;
  if(isShowSetting){
    if(componentType && componentType.startsWith('series')){
      let seriesType = componentType.slice(-(componentType.length-7));
      return !store.state.echarts.showSetting.series[seriesType][key]
    }else{
      return !store.state.echarts.showSetting[key];
    }
  }else{
    if(componentType && componentType.startsWith('series')){
      let result = store.state.echarts.seriesDisabled[seriesIndex][key];
      return result
    }else{
      return !!store.state.echarts.disabled[key];
    }
  }
}

export function updateDisable (key,value,seriesIndex,componentType) {
  //showSettingHandler
  let isShowSetting = store.getters.isShowSetting;
  if(isShowSetting){
      store.commit("updateShowSetting",{key,show:!value,componentType});
  }else{
    //DisableHandler
    if(componentType && componentType.startsWith('series')){
      store.commit("updateSeriesDisabled",{index:seriesIndex,key,disabled:!!value});
    }else{
      store.commit("updateDisabled",{key,disabled:!!value});
    }
    store.dispatch("refreshChartAsync")
  }

}

export function allDisabled (keyArray) {
  if(store.getters.isShowSetting){ //在设置可配置项，所有属性可见
    return true;
  }
  if(Array.isArray(keyArray)){

  }
}
