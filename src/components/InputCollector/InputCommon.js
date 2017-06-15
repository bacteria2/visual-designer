/**
 * Created by lenovo on 2017/6/14.
 */
import store from "@/store"

export function getValueFromStore (key) {
 // console.log("getValueFromStore",key,store)
  return store.state.echarts.rawData[key];
}

export function updateOption (key,value) {
 // console.log("updateOption",key,value)
  store.dispatch('updateCharts',{key,value})
}

export function showProperty (key) {
  //console.log("showProperty",key)
  return store.state.echarts.show[key];
}
