/**
 * Created by lenovo on 2017/5/18.
 */
import { forOwn, set } from '@/utils'

import isUndefined from 'lodash/isUndefined'

export default {
  getChartConfig({config}){
    return config
  },
  getOptionsFromRaw({rawData,disabled}){
    let raw=Object.assign({},rawData),option={};
    forOwn(raw,(value,key)=>{
      //值不为undefined并且disabled列表内的值不为true
      if(!isUndefined(value)&&!disabled[key]){
        set(option,key,value)
      }
    });
    return option
  },
  getSeries({option}){
    let series = option['series'];
    return series
  }
}
