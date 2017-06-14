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
  updateOption(state, payload){
    if (payload && typeof payload === 'object')
      if (state.config.merge) {
        merge(state.options.options,payload)
      }else {
        state.options=payload
      }
    }
  }
