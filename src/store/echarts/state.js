/**
 * Created by lenovo on 2017/5/18.
 */
import {forOwn,checkedControlItem} from '@/utils'
export default {

  chartComponent:undefined,
  config:{
    merge:true,
    debounceTime:1000
  },
  /**
   * 原始数据的option 来自原生组件设置原汁原味，不会发生改变*/
  option:{},
  /**
   * 合并了rawdata的option，保存起来用于展示
   */
  mergedOption:{},
  /**
   * 组件显示的集中控制
   * */
  show:{},
  /**
   * 原始的option值
   * */
  rawData:{},
  /**
   * 控制属性是否启用
   * */
  disabled:{},
  /**
   * series的临时数据
   */
  series:[],
  /**
   * 控制序列数据的禁用
   */
  seriesDisabled:[],
  /**
   * 维度信息
   */
  demension:[],
  /**
   * 控制属性控件checkBox的作用开关
   * 0:控制属性是否可用,影响state.disabled，
   * 1:控制属性是否可见,影响state.showSeting
   */
  propertyCheckedControl:checkedControlItem[0],
  /**
   * 用于配置可见属性项
   */
  showSetting:{series:{}},
  /**
   * DataSet,用以维护数据源信息
   * */
  dataSet:[],
  /**
   * 数据源data
   * 相关方法:
   * action:
   *  updateSourceData():根据dataSet信息更新数据源
   * mutation:
   *  saveSourceData({sourceData,merged=false}):保存新的data
   *  clearSourceData():清除现有的数据
   * */
  sourceData:{},
  /**
   * 扩展脚本
   */
  extJs:'',

  /**
   * 正在删除序列中
   */
  seriesItemHandlerState:false

}


