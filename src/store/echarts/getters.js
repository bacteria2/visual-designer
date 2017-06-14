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
      if(v&&v.trim()!==""){
        set(option,k,v)
      }else{
        delete raw[k]
      }
    });
    return option
  }
}
