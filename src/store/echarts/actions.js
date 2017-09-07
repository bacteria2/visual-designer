import { debounceExec, merge,mergeWith, forOwn,set,get } from '@/utils'
import debounce from 'lodash/debounce'
import topairs  from 'lodash/topairs'
import fromPairs from 'lodash/fromPairs'
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
    let option = mergeWith({},state.mergedOption, optionRaw)
    if(payload && payload.optionData){
      //合并数据
      forOwn(payload.optionData,function (v, k) {
           set(option,k,v)
      })
    }
    //处理扩展脚本
    if(state.extJs){
      let extJs = eval(state.extJs)
      if (extJs && typeof extJs == 'function') {
        let OptionData = payload ? payload.optionData : null
        option = extJs.apply(this, [option, OptionData])
      }
    }
    //合并数据的数据把数据直接记录到mergedOption中
    commit('updateMergedOption',option)
    if (state.chartComponent){
       state.chartComponent.renderWidget(option)
    }
  }, 500),

  /**
   * 更新数据SourceData
   * */
   async updateSourceData({state, commit}){
    let bigTable =await dataCollection(state.dataSet);

        /**
     * 保存提交bigTable
     * */
    commit('saveSourceData', {sourceData: bigTable});
    if(bigTable.dynamicOption_0101){//如果是动态序列数据集，直接更新mergedOption
      let option = mergeWith({}, state.option,bigTable.dynamicOption_0101)
      commit('updateMergedOption',option)
    }
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
    //console.log(names)
    if(legendIsSeriesName){
      commit('setMergedOptionValueByPath',{path:'legend.data',value:names})
      //检测是否存在图例定义，有则清空
      state.demension.forEach(dim=>{
           if(dim.key == 'legend.data'){
               dim.dataItem = null
           }
      })
    }
  },
  /**
   * 清理ShowSetting
   * @param commit
   */
  deleteShowSetting({commit},{seriesTypes}){
    commit("clearShowSetting");
    commit("initShowSetting",{seriesTypes})
  },
  /**
   * 处理增加序列数据属性配置
   */
  beforeSettingDataAttr({state,commit},{seriesIndex,keys}){
       //if(!state.seriesDisabled[seriesIndex].hasOwnProperty(keys[0])){//判断是否没有预配置
          let disableKeys = [],enableKeys =[];
           keys.forEach(k=>{
               let value = get(state.option.series[seriesIndex],k);
               if(typeof value !== 'undefined'){
                 enableKeys.push(k);
                 commit('updateSeriesData',{key:k,value,seriesIndex})
               }else{
                 disableKeys.push(k)
               }
           })
           commit('updateSeriesDisabledBatch',{seriesIndex,keys:enableKeys,disabled:false})
           commit('updateSeriesDisabledBatch',{seriesIndex,keys:disableKeys,disabled:true})
       //}
  }
}
