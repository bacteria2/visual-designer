/**
 * Created by lenovo on 2017/7/19.
 */
import store from '@/store'
import dataModel from '@/model/src/dataModel'
import Vue from 'vue'

export async function mergeDataAndRefreshShow() {

  function getOptionData(dimensions,sourceData){
    let optionDatas = {}
    dimensions.forEach((dimensionItem)=>{
      if(dimensionItem.key && dimensionItem.dataItem && dimensionItem.dataItem.key){
        let odItem = dataModel.optionDataItem({key:dimensionItem.key,value:sourceData[dimensionItem.dataItem.key]})
        if(odItem.key&&odItem.value){
          Vue.set(optionDatas, odItem.key, odItem.value)
        }
      }
    })
    return optionDatas
  }
  await store.dispatch("updateSourceData")//加载数据
  let data = store.state.echarts.sourceData,
    dimension = store.getters.getDemension,
    optionData =  getOptionData(dimension,data);
    console.log('optionData',optionData)
  //合并数据更新图形显示
  store.dispatch("refreshChartAsync",{optionData})
}
