/**
 * Created by lenovo on 2017/5/18.
 */
import { debounceExec,mergeWith } from '@/utils'


export default{

  /*更新rawData数据,合并option,并且刷新图表*/
  updateCharts:debounce(({commit,dispatch},payload)=>{
    /*更新rawData*/
    commit('updateRawData', payload);
    let option = mergeWith({},state.option,getters.getOptionsFromRaw)
    //console.log(option);
    dispatch('refreshChartAsync')
  },1000,{leading:true}),

  updateSeries:debounce(({commit,dispatch},payload)=>{
    /*更新series*/
    commit('updateSeriesData', payload);
    dispatch('refreshChartAsync')
  },1000,{leading:true}),

  updateDemension({commit},payload){
    commit('updateDemension', payload);
  },

  deleteDemension({commit},key){
    commit('deleteDemension', key);
  },
  refreshChartAsync:debounce(({state,getters})=>{
    /*从rawData中获取option,并且和原始数据合并*/
    let optionRaw = mergeWith({},getters.getOptionsFromRaw,getters.getSeriesObj);
    let option = mergeWith ({},state.option,optionRaw);

    if (state.chartComponent)
      state.chartComponent.updateChart(option)
  },500)

}
