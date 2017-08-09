import {loadRemoteData} from '@/services/WidgetInstanceService'
import { debounceExec, merge,mergeWith, forOwn,set } from '@/utils'
import dropRight from 'lodash/dropRight'
import dataModel from '@/model/src/dataModel'
import Vue from 'vue'

export default {getOption:getOption,dataCollection:dataCollection,getOptionData:getOptionData}
/**
 * 根据dataset配置，生成option
 */
export async function getOption(dataSet,dimension){
  let dataObj =await dataCollection(dataSet);
  let dataoption = getOptionData(dimension,dataObj);
 return dataoption;
}

/**
 * 获取组件的内部数据集和远程数据，生成键值对
 */
export async function dataCollection(dataSet){

    let dataObj = {};
    //内部数据集取数
    let embedSource = dataSet.filter(el => el.type == 1);
    /*
         * 首先循环每一个source,将内部的维度再循环
         * 如果维度需要合并成object则根据列名合并成object，在组装成数组
         * */
    embedSource.forEach(source => {
      let sourceId = source.id;
      let headers = source.columns.map(el => el.name);
      let data = dropRight(source.data);

      //({name:sourceId+"-"+item.id,columns:[],merged:false})
      //将维度转化为列表
      let beforeExtract = source.dataItems.map((item) => {
        let id = sourceId + '-' + item.id;
        if (item.type === 1)
          id += '-gen';
        let operation = _extract;
        let index = item.columnNames;

        //自定义的维度数据才会跨列和产生合并的情况
        if (item.type === 2 && item.transferToObject) {
          operation = _mergedExtract
        }
        dataObj[id] = [];
        return {id, operation, headers, index}
      })
      //循环原始数据,提取
      data.forEach(row => {
        beforeExtract.forEach(opt => {
          dataObj[opt.id].push(opt.operation(row, opt.index, opt.headers))
        })
      })
    })
    /**
     * 从结尾开始循环数组，获取最早一个不为undefined null 和""的数据,排除
     * */
    forOwn(dataObj, _popNull);

    //远程接口取数
    let remoteSource = dataSet.filter(el=>el.type == 2);
    if(remoteSource&&remoteSource.length>0){

      let  result = await loadRemoteData(remoteSource),
        remoteDataItems = [];
      if(result.success){
        remoteDataItems = result.data;
        forOwn(remoteDataItems,function (v, k) {
          set(dataObj,k,v)
        })
      }

    }


    function _popNull (column) {
      let len = column.length
      for (let i = len; i > 0; i--) {
        if (!column[i - 1])
          column.pop()
        else
          break
      }
    }

    /**
     * 普通的抽取数据的函数
     * */
    function _extract (row, index) {
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
    function _mergedExtract (row, index, headers) {
      let obj = {};
      // console.log(row,index,headers);
      index.forEach(el => {
        let key = headers[el];
        let value = row[el];
        //key或者value为空
        if (!key || (!value&&typeof value!=='boolean'))
          obj = null
        else
          obj[key] = value
      })
      return obj
    }

    return dataObj;
  }
// 根据数据项定义合并数据
export function getOptionData(dimensions,sourceData){
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