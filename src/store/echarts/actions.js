/**
 * Created by lenovo on 2017/5/18.
 */
import { debounceExec,mergeWith } from '@/utils'


export default{
  saveToServer({commit}, payload){
    debounceExec(commit('submitOptions', payload), 500)
  },
  updateCharts({commit, getters, state},payload){
    commit('updateRawData', payload);
    let option = mergeWith({},state.option,getters.getOptionsFromRaw)
    //console.log(option);
    if (state.chartComponent)
      state.chartComponent.updateChart(option)
  },
  updateDemension({commit},payload){
    commit('updateDemension', payload);
  },
  deleteDemension({commit},key){
    commit('deleteDemension', key);
  }

}
