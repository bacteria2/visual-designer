/**
 * Created by lenovo on 2017/5/18.
 */
import Vue from 'vue'
import {mergeWith} from '../../utils'

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
  updateRawData({rawData}, {key, value}){
    if (rawData.hasOwnProperty(key)) {
      rawData[key] = value
    }
  },
  //注册charts组件
  registryInstance(state,instance){
    if (instance){
      state.chartComponent=instance
    }
  },
  //更新option
  updateOption(state, payload){
    if (payload && typeof payload === 'object')
      if (state.config.merge) {
        state.option=mergeWith(state.option,payload)
      }else {
        state.option=payload
      }
    }
  }
