/**
 * Created by lenovo on 2017/6/14.
 */
import store from "@/store"




export function getValueFromStore (key) {
  //如果不存在值,则添加该值
  if(!store.state.echarts.rawData.hasOwnProperty(key)){
    store.commit("addRawData",{node:key,value:undefined})
  }
  return store.state.echarts.rawData[key];
}

export function updateOption (key,value) {
  store.dispatch('updateCharts',{key,value})
}

export function showProperty (key) {
  return store.state.echarts.show[key];
}

export function isDisabled (key) {
  return !!store.state.echarts.disabled[key];
}
export function updateDisable (key,value) {
  store.commit("updateDisabled",{key,disabled:!!value});
  store.dispatch("refreshChartAsync")
}
