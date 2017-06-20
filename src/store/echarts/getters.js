/**
 * Created by lenovo on 2017/5/18.
 */
import {forOwn,set} from '@/utils'

export default {
  getChartConfig({config}){
    return config;
  },
  getOptionsFromRaw({rawData}){
    let raw=Object.assign({},rawData),option={};
    forOwn(raw,(v,k)=>{
      if(typeof(v) != "undefined"){
        set(option,k,v)
      }else{
        delete raw[k]//干掉 undefined 的属性
      }
    });
    return option
  },
  getSeries({option}){
    let series = option['series'];
    return series
  }
}
