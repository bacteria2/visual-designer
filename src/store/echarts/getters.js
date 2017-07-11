/**
 * Created by lenovo on 2017/5/18.
 */
import { forOwn, set,checkedControlItem } from '@/utils'

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

  getSeries({series}){
    return series
  },
  //得到用于合并的series
  getSeriesObj({series,disabled}){
    let option = {series:[]};
    series.forEach((s,index)=>{
      option.series.push({});
      forOwn(s,(v,k)=>{
        if(!isUndefined(v)&&!disabled[k]){
          set(option.series[index],k,v);
        }
      });
    });
    return option;
  },
  //Demensions
  getDemension({demension}){
    return demension;
  },
  /**
  * 控制属性控件checkBox的作用开关
  * 0:控制属性是否可用,影响state.disabled，
* 1:控制属性是否可见,影响state.showSeting
*/
  isShowSetting({propertyCheckedControl}){
    return propertyCheckedControl == checkedControlItem[1];
  },

  getDataSet({dataSet}){
    return dataSet
  },
  /**
   * 获取显示设置
   * @param showSetting
   * @returns {*}
   */
  getShowSetting({showSetting}){
    return showSetting
  }


}
