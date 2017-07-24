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
  getSeriesObj({series,seriesDisabled}){
    let option = {series:[]};
    series.forEach((s,index)=>{
      option.series.push({});
      forOwn(s,(v,k)=>{
        if(!isUndefined(v)&&!seriesDisabled[index][k]){
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
  },
  /**
   * 获取显示设置
   * @param showSetting
   * @returns {*}
   */
  getShowSettingAllShow({showSetting}){
    return showSetting
  },

  /**
   *获取与组件实例调整后的数据
   */
   getWidgetInstanceProperty({option,dataSet,demension,rawData,show,series,disabled,seriesDisabled,extJs}){
        return {fOption:JSON.stringify(option),
          fDataOption:JSON.stringify({dataSet,'dimension':demension}),
          fSetting:JSON.stringify({rawData,show,series,disabled,seriesDisabled,extJs})
        }
  },

  /**
   * 获取合并后的option
   */
  getMergedOption({chartComponent}){
      if(chartComponent){
        return chartComponent.mergedOption
      }
  }
}
