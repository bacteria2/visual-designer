/**
 * Created by lenovo on 2017/5/18.
 */
import Vue from 'vue'


export default {
  chartConfigUpdate(state,payload){
    state.config=Object.assign ({},state.config,payload)
  },
  //新增rawData
  addRawData(state,{node,options}){
    Vue.set(state.rawData,node,options)
  },
  //更新rawData
  updateRawData({rawData},{key,value}){
    if(rawData.hasOwnProperty(key)){
      rawData[key]=value;
    }
  }
}
