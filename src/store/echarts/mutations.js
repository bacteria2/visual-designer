/**
 * Created by lenovo on 2017/5/18.
 */
import Vue from 'vue'
import {merge} from '@/utils'

export default {
  chartConfigUpdate(state, payload){
    state.config = Object.assign({}, state.config, payload)
  },
  //新增rawData
  addRawData(state, {node, options}){
    if (node && typeof node === `string`)
      Vue.set(state.rawData, node, options)
  },
  //更新rawData
  updateRawData({rawData}, {key, value}){
    if (rawData.hasOwnProperty(key)) {
      rawData[key] = value
    }
  },
  //
  registryInstance(state,payload){
    if (payload)
      state.echartsInstance=payload
  },
  //更新option
  updateOption(state, payload){
    if (payload && typeof payload === 'object')
      if (state.config.merge) {
        merge(state.option,payload)
      }else {
        state.option=payload
      }
    }
  }
