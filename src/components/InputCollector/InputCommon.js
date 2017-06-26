import store from "@/store"

export function getValueFromStore (key,seriesIndex,componentType) {
  //如果不存在值,则添加该值
  if(componentType && componentType.startsWith('series') && typeof seriesIndex =="number"){
    console.log();
    return store.state.echarts.series[seriesIndex][key]
  }else{
    if(!store.state.echarts.rawData.hasOwnProperty(key)){
      store.commit("addRawData",{node:key,value:undefined})
    }
    return store.state.echarts.rawData[key];
  }
}

export function updateOption (key,value,seriesIndex,componentType) {
  if(componentType && componentType.startsWith('series') && typeof seriesIndex =="number"){
    store.dispatch('updateSeries',{key,value,seriesIndex})
  }else{
    store.dispatch('updateCharts',{key,value})
  }
}

export function showProperty (key,componentType) {
  if(componentType && componentType.startsWith('series')){
    return store.state.echarts.show.series[componentType.slice(-(componentType.length-7))][key]
  }else{
    return store.state.echarts.show[key];
  }
}

export function isDisabled (key) {
  return !!store.state.echarts.disabled[key];
}

export function updateDisable (key,value) {
  store.commit("updateDisabled",{key,disabled:!!value});
  store.dispatch("refreshChartAsync")
}
