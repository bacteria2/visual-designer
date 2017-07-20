/**
 * Created by lenovo on 2017/7/19.
 */
import store from '@/store'
import dataModel from '@/model/src/dataModel'
import Vue from 'vue'

export function mergeDataAndRefreshShow() {

  function getOptionData(dimensions,sourceData){
    let optionDatas = {}
    dimensions.forEach((dimensionItem)=>{
      let odItem = dataModel.optionDataItem({key:dimensionItem.key,value:sourceData[dimensionItem.dataItem.key]})
      if(odItem.key&&odItem.value){
        if(!optionDatas.hasOwnProperty(odItem.key)){
          Vue.set(optionDatas, odItem.key, odItem.value)
        }
      }
    })
    return optionDatas
  }

  store.dispatch("updateSourceData")//加载数据
  let data = store.state.echarts.sourceData,
    dimension = store.getters.getDemension,
    optionData =  getOptionData(dimension,data);
  //合并数据更新图形显示
  store.dispatch("refreshChartAsync",{optionData})
}
