/**
 * Created by lenovo on 2017/5/18.
 */
import Vue from 'vue'
import { mergeWith } from '../../utils'


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
  }
}
