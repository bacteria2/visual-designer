import { debounceExec, merge,mergeWith, forOwn,set } from '@/utils'
import debounce from 'lodash/debounce'
import dropRight from 'lodash/dropRight'
import {loadRemoteData} from '@/services/WidgetInstanceService'

import { dataCollection } from '@/utils/widgetDataHandler.js'

export default{

  /*更新rawData数据,合并option,并且刷新图表*/
  updateCharts: debounce(({commit, dispatch}, payload) => {
    /*更新rawData*/
    commit('updateRawData', payload)
    dispatch('refreshChartAsync')
  }, 1000, {leading: true}),

  updateSeries: debounce(({commit, dispatch}, payload) => {
    /*更新series*/
    commit('updateSeriesData', payload)
    dispatch('refreshChartAsync')
  }, 1000, {leading: true}),

  updateDemension({commit}, payload){
    commit('updateDemension', payload)
  },

  deleteDemension({commit}, key){
    commit('deleteDemension', key)
  },
  refreshChartAsync: debounce(({state, getters,commit},payload) => {
    /*从rawData中获取option,并且和原始数据合并*/
    let optionRaw = mergeWith({}, getters.getOptionsFromRaw, getters.getSeriesObj)
    let option = mergeWith({}, state.mergedOption, optionRaw)
    if(payload && payload.optionData){
      //合并数据
      forOwn(payload.optionData,function (v, k) {
           set(option,k,v)
      })
    }
    //合并数据的数据把数据直接记录到mergedOption中
    commit('updateMergedOption',option)
    if (state.chartComponent)
      //state.chartComponent.updateChart(option)
      state.chartComponent.renderWidget(option)
  }, 500),

  /**
   * 更新数据SourceData
   * */
   async updateSourceData({state, commit}){


    let bigTable =await dataCollection(state.dataSet);

    //console.log('qweqw',bigTable)
        /**
     * 保存提交bigTable
     * */
    commit('saveSourceData', {sourceData: bigTable});
    return new Promise((resolve)=>resolve(bigTable));
  },

  /**
   * 序列命名处理
   */
  seriesRenameSaveHandler({state, commit},{config}){
    let {legendIsSeriesName,reSeriesName} = config
    reSeriesName.forEach((name,index)=>{
        if(name && name.trim !==''){
          state.series[index]['name'] = name
        }
    })
    let names = state.series.map(({name})=>{
        return name
    })
    console.log(names)
    if(legendIsSeriesName){
      commit('addRawData',{node:'legend.data',value:names})
    }
  },
  /**
   * 清理ShowSetting
   * @param commit
   */
  deleteShowSetting({commit},{seriesTypes}){
    commit("clearShowSetting");
    commit("initShowSetting",{seriesTypes})
  }
}
