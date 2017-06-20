/**
 * Created by lenovo on 2017/5/18.
 */
import debounce from 'lodash/debounce';
import { mergeWith } from '../../utils'


export default{

  /*更新rawData数据,合并option,并且刷新图表*/
  updateCharts:debounce(({commit,dispatch},payload)=>{
    /*更新rawData*/
    commit('updateRawData', payload);
    dispatch('refreshChartAsync')
  },1000,{leading:true}),

  refreshChartAsync:debounce(({state,getters})=>{
    /*从rawData中获取option,并且和原始数据合并*/
    let option = mergeWith ({},state.option,getters.getOptionsFromRaw)
    if (state.chartComponent)
      state.chartComponent.updateChart(option)
  },500)

}
