import { debounceExec, merge,mergeWith, forOwn,set } from '@/utils'
import debounce from 'lodash/debounce'
import dropRight from 'lodash/dropRight'
import {loadRemoteData} from '@/services/WidgetInstanceService'

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
  refreshChartAsync: debounce(({state, getters},payload) => {
    /*从rawData中获取option,并且和原始数据合并*/
    let optionRaw = mergeWith({}, getters.getOptionsFromRaw, getters.getSeriesObj)
    let option = mergeWith({}, state.option, optionRaw)
    if(payload && payload.optionData){
      //合并数据
      forOwn(payload.optionData,function (v, k) {
           set(option,k,v)
      })
    }
    if (state.chartComponent)
      state.chartComponent.updateChart(option)
  }, 500),

  /**
   * 更新数据SourceData
   * */
async  updateSourceData({state, commit}){
    /**
     * 普通的抽取数据的函数
     * */
    function extract (row, index) {
      if (index.length < 2) {
        let i = index[0]
        return row[i]
      }
      else {
        let data = []
        index.forEach(el => data.push(row[el]))
        return data
      }
    }

    /**
     * 合并的抽取函数
     * */
    function mergedExtract (row, index, headers) {
      let obj = {}
      index.forEach(el => {
        let key = headers[el]
        let value = row[el]
        //key或者value为空
        if (key || (value&&typeof value!=='boolean'))
          obj = null
        else
          obj[key] = value
      })
      return obj
    }

    function popNull (column) {
      let len = column.length
      for (let i = len; i > 0; i--) {
        if (!column[i - 1])
          column.pop()
        else
          break
      }
    }

    //获取embed类型的数据源
    let embedSource = state.dataSet.filter(el => el.type == 1)
    let bigTable = {}
    /*
     * 首先循环每一个source,将内部的维度再循环
     * 如果维度需要合并成object则根据列名合并成object，在组装成数组
     * */
    embedSource.forEach(source => {
      let sourceId = source.id
      let headers = source.columns.map(el => el.name)
      let data = dropRight(source.data)

      //({name:sourceId+"-"+item.id,columns:[],merged:false})
      //将维度转化为列表
      let beforeExtract = source.dataItems.map((item) => {
        let id = sourceId + '-' + item.id
        if (item.type === 1)
          id += '-gen'
        let operation = extract
        let index = item.columnNames

        //自定义的维度数据才会跨列和产生合并的情况
        if (item.type === 2 && item.transferToObject) {
          operation = mergedExtract
        }
        bigTable[id] = []
        return {id, operation, headers, index}
      })
      //循环原始数据,提取
      data.forEach(row => {
        beforeExtract.forEach(opt => {
          bigTable[opt.id].push(opt.operation(row, opt.index, opt.headers))
        })
      })
    })
    /**
     * 从结尾开始循环数组，获取最早一个不为undefined null 和""的数据,排除
     * */
    forOwn(bigTable, popNull)

    //远程数据接口
    let remoteSource = state.dataSet.filter(el=>el.type == 2),
     result = await loadRemoteData(remoteSource),
     remoteDataItems = []
    if(result.success){
      remoteDataItems = result.data
      forOwn(remoteDataItems,function (v, k) {
        set(bigTable,k,v)
      })
    }
    console.log(bigTable)
        /**
     * 保存提交bigTable
     * */
    commit('saveSourceData', {sourceData: bigTable})
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
  }
}
