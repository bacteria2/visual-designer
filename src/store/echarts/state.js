/**
 * Created by lenovo on 2017/5/18.
 */
import raw from './rawData'
import {forOwn} from '@/utils'

let show=raw();
let rawData=raw();
forOwn(show,function(value, key) {
  show[key]=true;
});



export default{
  config:{
    merge:false,
    debounceTime:1000,
    echartsInstance:null,
  },
  /**
   * 最终运行的options*/
  options:{backgroundColor: '#42cd43',tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{feature:{mark:{show:true},dataView:{show:true,readOnly:true},magicType:{show:false,type:["line","bar"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value",name:"°C"}],series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10]},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0]}],color:["rgb(209, 117, 117)","rgb(146, 78, 219)"],grid:{x:47,y:64,x2:124,y2:27}},
  /**
   * 组件显示的集中控制
   * */
  show,
  /**
   * 原始的options
   * */
  rawData,
}


