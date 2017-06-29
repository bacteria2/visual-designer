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
   * 原始数据的option*/
  option:{backgroundColor: '#7fcdc9',title:{text:"test"},tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{feature:{mark:{show:true},dataView:{show:true,readOnly:true},magicType:{show:false,type:["line","bar"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value",name:"°C"}],series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10]},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0]}],color:["rgb(209, 117, 117)","rgb(146, 78, 219)"],grid:{x:47,y:64,x2:124,y2:27}},
  /**
   * 组件显示的集中控制
   * */
  show:{
    'series[1].symbolSize':true,
    'calculable': true,
    'calculableColor': true,
    'calculableHolderColor': true,
    'animation': true,
    'animationThreshold': true,
    'animationDuration': true,
    'animationEasing': true,
    'grid.x': true,
    'grid.y': true,
    'grid.x2': true,
    'grid.y2': true,
    'grid.width': true,
    'grid.height': true,
    'grid.backgroundColor': true,
    'grid.borderWidth': true,
    'grid.borderColor': true,
    'backgroundColor': true,
    'legend.show': true,
    'legend.selectedMode': true,
    'legend.x': true,
    'legend.y': true,
    'legend.orient': true,
    'legend.backgroundColor': true,
    'legend.borderWidth': true,
    'legend.borderColor': true,
    'legend.padding': true,
    'legend.itemWidth': true,
    'legend.itemHeight': true,
    'legend.itemGap': true,
    'legend.textStyle.color': true,
    'legend.textStyle.fontSize': true,
    'legend.textStyle.fontStyle': true,
    'legend.textStyle.fontWeight': true,
    'legend.textStyle.align': true,
    'legend.textStyle.baseline': true,
    'legend.zlevel': true,
    'legend.z': true,
    'legend.formatter': true,
    'legend.inactiveColor': true,
    'legend.align': true,
    'legend.left': true,
    'legend.top': true,
    'legend.right': true,
    'legend.bottom': true,
    'legend.shadowBlur': true,
    'legend.shadowColor': true,
    'legend.shadowOffsetX': true,
    'legend.shadowOffsetY': true,
    'title.show': true,
    'title.text': true,
    'title.link': true,
    'title.target': true,
    'title.subtext': true,
    'title.sublink': true,
    'title.subtarget': true,
    'title.textAlign': true,
    'title.textBaseline': true,
    'title.backgroundColor': true,
    'title.borderWidth': true,
    'title.borderColor': true,
    'title.padding': true,
    'title.textStyle.color': true,
    'title.textStyle.fontSize': true,
    'title.textStyle.fontFamily': true,
    'title.textStyle.fontStyle': true,
    'title.textStyle.fontWeight': true,
    'title.textStyle.align': true,
    'title.textStyle.baseline': true,
    'title.subtextStyle.color': true,
    'title.subtextStyle.fontSize': true,
    'title.subtextStyle.fontFamily': true,
    'title.subtextStyle.fontStyle': true,
    'title.subtextStyle.fontWeight': true,
    'title.subtextStyle.align': true,
    'title.subtextStyle.baseline': true,
    'title.itemGap': true,
    'title.zlevel': true,
    'title.z': true,
    'title.left': true,
    'title.top': true,
    'title.right': true,
    'title.bottom': true,
    'title.shadowBlur': true,
    'title.shadowColor': true,
    'title.shadowOffsetX': true,
    'title.shadowOffsetY': true,
    'toolbox.show': true,
    'toolbox.x': true,
    'toolbox.y': true,
    'toolbox.orient': true,
    'toolbox.feature.mark.show': true,
    'toolbox.feature.dataZoom.show': true,
    'toolbox.feature.dataView.show': true,
    'toolbox.feature.magicType.show': true,
    'toolbox.feature.restore.show': true,
    'toolbox.feature.saveAsImage.show': true,
    'toolbox.backgroundColor': true,
    'toolbox.borderWidth': true,
    'toolbox.borderColor': true,
    'toolbox.padding': true,
    'toolbox.itemSize': true,
    'toolbox.itemGap': true,
    'toolbox.showTitle': true,
    'toolbox.textStyle.fontSize': true,
    'toolbox.textStyle.fontStyle': true,
    'toolbox.textStyle.fontWeight': true,
    'toolbox.iconStyle.normal.color': true,
    'toolbox.iconStyle.normal.borderColor': true,
    'toolbox.iconStyle.normal.borderWidth': true,
    'toolbox.iconStyle.normal.borderType': true,
    'toolbox.iconStyle.normal.shadowBlur': true,
    'toolbox.iconStyle.normal.shadowColor': true,
    'toolbox.iconStyle.normal.shadowOffsetX': true,
    'toolbox.iconStyle.normal.shadowOffsetY': true,
    'toolbox.iconStyle.normal.opacity': true,
    'toolbox.iconStyle.normal.textPosition': true,
    'toolbox.iconStyle.normal.textAlign': true,
    'toolbox.iconStyle.emphasis.color': true,
    'toolbox.iconStyle.emphasis.borderColor': true,
    'toolbox.iconStyle.emphasis.borderWidth': true,
    'toolbox.iconStyle.emphasis.borderType': true,
    'toolbox.iconStyle.emphasis.shadowBlur': true,
    'toolbox.iconStyle.emphasis.shadowColor': true,
    'toolbox.iconStyle.emphasis.shadowOffsetX': true,
    'toolbox.iconStyle.emphasis.shadowOffsetY': true,
    'toolbox.iconStyle.emphasis.opacity': true,
    'toolbox.zlevel': true,
    'toolbox.z': true,
    'toolbox.left': true,
    'toolbox.top': true,
    'toolbox.right': true,
    'toolbox.bottom': true,
    'tooltip.show': true,
    'tooltip.formatter': true,
    'tooltip.islandFormatter': true,
    'tooltip.backgroundColor': true,
    'tooltip.borderWidth': true,
    'tooltip.borderColor': true,
    'tooltip.borderRadius': true,
    'tooltip.padding': true,
    'tooltip.textStyle.color': true,
    'tooltip.textStyle.fontSize': true,
    'tooltip.textStyle.fontStyle': true,
    'tooltip.textStyle.fontWeight': true,
    'tooltip.textStyle.align': true,
    'tooltip.textStyle.baseline': true,
    'tooltip.trigger': true,
    'tooltip.axisPointer.type': true,
    'tooltip.axisPointer.lineStyle.color': true,
    'tooltip.axisPointer.lineStyle.width': true,
    'tooltip.axisPointer.lineStyle.type': true,
    'tooltip.axisPointer.areaStyle.type': true,
    'tooltip.axisPointer.areaStyle.color': true,
    'tooltip.showDelay': true,
    'tooltip.hideDelay': true,
    'tooltip.transitionDuration': true,
    'xAxis.position': true,
    'xAxis.name': true,
    'xAxis.nameLocation': true,
    'xAxis.nameTextStyle.color': true,
    'xAxis.textStyle.fontSize': true,
    'xAxis.textStyle.fontStyle': true,
    'xAxis.textStyle.fontWeight': true,
    'xAxis.textStyle.align': true,
    'xAxis.textStyle.baseline': true,
    'xAxis.scale': true,
    'xAxis.min': true,
    'xAxis.max': true,
    'xAxis.boundaryGap': true,
    'xAxis.splitNumber': true,
    'xAxis.show': true,
    'xAxis.inverse': true,
    'xAxis.triggerEvent': true,
    'xAxis.zlevel': true,
    'xAxis.z': true,
    'xAxis.gridIndex': true,
    'xAxis.offset': true,
    'xAxis.nameGap': true,
    'xAxis.nameRotate': true,
    'xAxis.minInterval': true,
    'xAxis.interval': true,
    'xAxis.logBase': true,
    'xAxis.silent': true,
    'xAxis.type': true,
    'xAxis.axisLabel.show': true,
    'xAxis.axisLabel.interval': true,
    'xAxis.axisLabel.rotate': true,
    'xAxis.axisLabel.margin': true,
    'xAxis.axisLabel.formatter': true,
    'xAxis.axisLabel.textStyle.color': true,
    'xAxis.axisLabel.textStyle.fontSize': true,
    'xAxis.axisLabel.textStyle.fontFamily': true,
    'xAxis.axisLabel.textStyle.fontStyle': true,
    'xAxis.axisLabel.textStyle.fontWeight': true,
    'xAxis.axisLabel.textStyle.align': true,
    'xAxis.axisLabel.textStyle.baseline': true,
    'xAxis.axisLabel.inside': true,
    'xAxis.axisLabel.showMinLabel': true,
    'xAxis.axisLabel.showMaxLabel': true,
    'xAxis.axisLine.show': true,
    'xAxis.axisLine.lineStyle.color': true,
    'xAxis.axisLine.lineStyle.width': true,
    'xAxis.axisLine.lineStyle.type': true,
    'xAxis.axisLine.lineStyle.shadowBlur': true,
    'xAxis.axisLine.lineStyle.shadowColor': true,
    'xAxis.axisLine.lineStyle.shadowOffsetX': true,
    'xAxis.axisLine.lineStyle.shadowOffsetY': true,
    'xAxis.axisLine.lineStyle.opacity': true,
    'xAxis.axisLine.onZero': true,
    'xAxis.splitArea.show': true,
    'xAxis.splitArea.interval': true,
    'xAxis.splitArea.areaStyle.color': true,
    'xAxis.splitArea.areaStyle.shadowBlur': true,
    'xAxis.splitArea.areaStyle.shadowColor': true,
    'xAxis.splitArea.areaStyle.shadowOffsetX': true,
    'xAxis.splitArea.areaStyle.shadowOffsetY': true,
    'xAxis.splitArea.areaStyle.opacity': true,
    'xAxis.splitLine.show': true,
    'xAxis.splitLine.interval': true,
    'xAxis.splitLine.lineStyle.color': true,
    'xAxis.splitLine.lineStyle.width': true,
    'xAxis.splitLine.lineStyle.type': true,
    'xAxis.splitLine.lineStyle.shadowBlur': true,
    'xAxis.splitLine.lineStyle.shadowColor': true,
    'xAxis.splitLine.lineStyle.shadowOffsetX': true,
    'xAxis.splitLine.lineStyle.shadowOffsetY': true,
    'xAxis.splitLine.lineStyle.opacity': true,
    'xAxis.axisTick.show': true,
    'xAxis.axisTick.interval': true,
    'xAxis.axisTick.inside': true,
    'xAxis.axisTick.length': true,
    'xAxis.axisTick.lineStyle.color': true,
    'xAxis.axisTick.lineStyle.width': true,
    'xAxis.axisTick.lineStyle.type': true,
    'xAxis.axisTick.lineStyle.shadowBlur': true,
    'xAxis.axisTick.lineStyle.shadowColor': true,
    'xAxis.axisTick.lineStyle.shadowOffsetX': true,
    'xAxis.axisTick.lineStyle.shadowOffsetY': true,
    'xAxis.axisTick.lineStyle.opacity': true,
    'xAxis.axisTick.alignWithLabel': true,
    'yAxis.position': true,
    'yAxis.name': true,
    'yAxis.nameLocation': true,
    'yAxis.nameTextStyle.color': true,
    'yAxis.textStyle.fontSize': true,
    'yAxis.textStyle.fontStyle': true,
    'yAxis.textStyle.fontWeight': true,
    'yAxis.textStyle.align': true,
    'yAxis.textStyle.baseline': true,
    'yAxis.scale': true,
    'yAxis.min': true,
    'yAxis.max': true,
    'yAxis.boundaryGap': true,
    'yAxis.splitNumber': true,
    'yAxis.show': true,
    'yAxis.inverse': true,
    'yAxis.triggerEvent': true,
    'yAxis.zlevel': true,
    'yAxis.z': true,
    'yAxis.gridIndex': true,
    'yAxis.offset': true,
    'yAxis.nameGap': true,
    'yAxis.nameRotate': true,
    'yAxis.minInterval': true,
    'yAxis.interval': true,
    'yAxis.logBase': true,
    'yAxis.silent': true,
    'yAxis.type': true,
    'yAxis.axisLabel.show': true,
    'yAxis.axisLabel.interval': true,
    'yAxis.axisLabel.rotate': true,
    'yAxis.axisLabel.margin': true,
    'yAxis.axisLabel.formatter': true,
    'yAxis.axisLabel.textStyle.color': true,
    'yAxis.axisLabel.textStyle.fontSize': true,
    'yAxis.axisLabel.textStyle.fontFamily': true,
    'yAxis.axisLabel.textStyle.fontStyle': true,
    'yAxis.axisLabel.textStyle.fontWeight': true,
    'yAxis.axisLabel.textStyle.align': true,
    'yAxis.axisLabel.textStyle.baseline': true,
    'yAxis.axisLabel.inside': true,
    'yAxis.axisLabel.showMinLabel': true,
    'yAxis.axisLabel.showMaxLabel': true,
    'yAxis.axisLine.show': true,
    'yAxis.axisLine.lineStyle.color': true,
    'yAxis.axisLine.lineStyle.width': true,
    'yAxis.axisLine.lineStyle.type': true,
    'yAxis.axisLine.lineStyle.shadowBlur': true,
    'yAxis.axisLine.lineStyle.shadowColor': true,
    'yAxis.axisLine.lineStyle.shadowOffsetX': true,
    'yAxis.axisLine.lineStyle.shadowOffsetY': true,
    'yAxis.axisLine.lineStyle.opacity': true,
    'yAxis.axisLine.onZero': true,
    'yAxis.splitArea.show': true,
    'yAxis.splitArea.interval': true,
    'yAxis.splitArea.areaStyle.color': true,
    'yAxis.splitArea.areaStyle.shadowBlur': true,
    'yAxis.splitArea.areaStyle.shadowColor': true,
    'yAxis.splitArea.areaStyle.shadowOffsetX': true,
    'yAxis.splitArea.areaStyle.shadowOffsetY': true,
    'yAxis.splitArea.areaStyle.opacity': true,
    'yAxis.splitLine.show': true,
    'yAxis.splitLine.interval': true,
    'yAxis.splitLine.lineStyle.color': true,
    'yAxis.splitLine.lineStyle.width': true,
    'yAxis.splitLine.lineStyle.type': true,
    'yAxis.splitLine.lineStyle.shadowBlur': true,
    'yAxis.splitLine.lineStyle.shadowColor': true,
    'yAxis.splitLine.lineStyle.shadowOffsetX': true,
    'yAxis.splitLine.lineStyle.shadowOffsetY': true,
    'yAxis.splitLine.lineStyle.opacity': true,
    'yAxis.axisTick.show': true,
    'yAxis.axisTick.interval': true,
    'yAxis.axisTick.inside': true,
    'yAxis.axisTick.length': true,
    'yAxis.axisTick.lineStyle.color': true,
    'yAxis.axisTick.lineStyle.width': true,
    'yAxis.axisTick.lineStyle.type': true,
    'yAxis.axisTick.lineStyle.shadowBlur': true,
    'yAxis.axisTick.lineStyle.shadowColor': true,
    'yAxis.axisTick.lineStyle.shadowOffsetX': true,
    'yAxis.axisTick.lineStyle.shadowOffsetY': true,
    'yAxis.axisTick.lineStyle.opacity': true,
    'yAxis.axisTick.alignWithLabel': true,
    series:{line:{'seriesIndex':true,'data':true,'itemStyle.normal.color':true}}
  },
  /**
   * 原始的option值
   * */
  rawData:{
    'calculable': undefined,
    'calculableColor': undefined,
    'calculableHolderColor': undefined,
    'animation': undefined,
    'animationThreshold': undefined,
    'animationDuration': undefined,
    'animationEasing': undefined,
    'grid.x': undefined,
    'grid.y': undefined,
    'grid.x2': undefined,
    'grid.y2': undefined,
    'grid.width': undefined,
    'grid.height': undefined,
    'grid.backgroundColor': undefined,
    'grid.borderWidth': undefined,
    'grid.borderColor': undefined,
    'backgroundColor': undefined,
    'legend.show': undefined,
    'legend.selectedMode': undefined,
    'legend.x': undefined,
    'legend.y': undefined,
    'legend.orient': undefined,
    'legend.backgroundColor': undefined,
    'legend.borderWidth': undefined,
    'legend.borderColor': undefined,
    'legend.padding': undefined,
    'legend.itemWidth': undefined,
    'legend.itemHeight': undefined,
    'legend.itemGap': undefined,
    'legend.textStyle.color': undefined,
    'legend.textStyle.fontSize': undefined,
    'legend.textStyle.fontStyle': undefined,
    'legend.textStyle.fontWeight': undefined,
    'legend.textStyle.align': undefined,
    'legend.textStyle.baseline': undefined,
    'legend.zlevel': undefined,
    'legend.z': undefined,
    'legend.formatter': undefined,
    'legend.inactiveColor': undefined,
    'legend.align': undefined,
    'legend.left': undefined,
    'legend.top': undefined,
    'legend.right': undefined,
    'legend.bottom': undefined,
    'legend.shadowBlur': undefined,
    'legend.shadowColor': undefined,
    'legend.shadowOffsetX': undefined,
    'legend.shadowOffsetY': undefined,
    'title.show': undefined,
    'title.text': undefined,
    'title.link': undefined,
    'title.target': undefined,
    'title.subtext': undefined,
    'title.sublink': undefined,
    'title.subtarget': undefined,
    'title.textAlign': undefined,
    'title.textBaseline': undefined,
    'title.backgroundColor': undefined,
    'title.borderWidth': undefined,
    'title.borderColor': undefined,
    'title.padding': undefined,
    'title.textStyle.color': undefined,
    'title.textStyle.fontSize': undefined,
    'title.textStyle.fontFamily': undefined,
    'title.textStyle.fontStyle': undefined,
    'title.textStyle.fontWeight': undefined,
    'title.textStyle.align': undefined,
    'title.textStyle.baseline': undefined,
    'title.subtextStyle.color': undefined,
    'title.subtextStyle.fontSize': undefined,
    'title.subtextStyle.fontFamily': undefined,
    'title.subtextStyle.fontStyle': undefined,
    'title.subtextStyle.fontWeight': undefined,
    'title.subtextStyle.align': undefined,
    'title.subtextStyle.baseline': undefined,
    'title.itemGap': undefined,
    'title.zlevel': undefined,
    'title.z': undefined,
    'title.left': undefined,
    'title.top': undefined,
    'title.right': undefined,
    'title.bottom': undefined,
    'title.shadowBlur': undefined,
    'title.shadowColor': undefined,
    'title.shadowOffsetX': undefined,
    'title.shadowOffsetY': undefined,
    'toolbox.show': undefined,
    'toolbox.x': undefined,
    'toolbox.y': undefined,
    'toolbox.orient': undefined,
    'toolbox.feature.mark.show': undefined,
    'toolbox.feature.dataZoom.show': undefined,
    'toolbox.feature.dataView.show': undefined,
    'toolbox.feature.magicType.show': undefined,
    'toolbox.feature.restore.show': undefined,
    'toolbox.feature.saveAsImage.show': undefined,
    'toolbox.backgroundColor': undefined,
    'toolbox.borderWidth': undefined,
    'toolbox.borderColor': undefined,
    'toolbox.padding': undefined,
    'toolbox.itemSize': undefined,
    'toolbox.itemGap': undefined,
    'toolbox.showTitle': undefined,
    'toolbox.textStyle.fontSize': undefined,
    'toolbox.textStyle.fontStyle': undefined,
    'toolbox.textStyle.fontWeight': undefined,
    'toolbox.iconStyle.normal.color': undefined,
    'toolbox.iconStyle.normal.borderColor': undefined,
    'toolbox.iconStyle.normal.borderWidth': undefined,
    'toolbox.iconStyle.normal.borderType': undefined,
    'toolbox.iconStyle.normal.shadowBlur': undefined,
    'toolbox.iconStyle.normal.shadowColor': undefined,
    'toolbox.iconStyle.normal.shadowOffsetX': undefined,
    'toolbox.iconStyle.normal.shadowOffsetY': undefined,
    'toolbox.iconStyle.normal.opacity': undefined,
    'toolbox.iconStyle.normal.textPosition': undefined,
    'toolbox.iconStyle.normal.textAlign': undefined,
    'toolbox.iconStyle.emphasis.color': undefined,
    'toolbox.iconStyle.emphasis.borderColor': undefined,
    'toolbox.iconStyle.emphasis.borderWidth': undefined,
    'toolbox.iconStyle.emphasis.borderType': undefined,
    'toolbox.iconStyle.emphasis.shadowBlur': undefined,
    'toolbox.iconStyle.emphasis.shadowColor': undefined,
    'toolbox.iconStyle.emphasis.shadowOffsetX': undefined,
    'toolbox.iconStyle.emphasis.shadowOffsetY': undefined,
    'toolbox.iconStyle.emphasis.opacity': undefined,
    'toolbox.zlevel': undefined,
    'toolbox.z': undefined,
    'toolbox.left': undefined,
    'toolbox.top': undefined,
    'toolbox.right': undefined,
    'toolbox.bottom': undefined,
    'tooltip.show': undefined,
    'tooltip.formatter': undefined,
    'tooltip.islandFormatter': undefined,
    'tooltip.backgroundColor': undefined,
    'tooltip.borderWidth': undefined,
    'tooltip.borderColor': undefined,
    'tooltip.borderRadius': undefined,
    'tooltip.padding': undefined,
    'tooltip.textStyle.color': undefined,
    'tooltip.textStyle.fontSize': undefined,
    'tooltip.textStyle.fontStyle': undefined,
    'tooltip.textStyle.fontWeight': undefined,
    'tooltip.textStyle.align': undefined,
    'tooltip.textStyle.baseline': undefined,
    'tooltip.trigger': undefined,
    'tooltip.axisPointer.type': undefined,
    'tooltip.axisPointer.lineStyle.color': undefined,
    'tooltip.axisPointer.lineStyle.width': undefined,
    'tooltip.axisPointer.lineStyle.type': undefined,
    'tooltip.axisPointer.areaStyle.type': undefined,
    'tooltip.axisPointer.areaStyle.color': undefined,
    'tooltip.showDelay': undefined,
    'tooltip.hideDelay': undefined,
    'tooltip.transitionDuration': undefined,
    'xAxis.position': undefined,
    'xAxis.name': undefined,
    'xAxis.nameLocation': undefined,
    'xAxis.nameTextStyle.color': undefined,
    'xAxis.textStyle.fontSize': undefined,
    'xAxis.textStyle.fontStyle': undefined,
    'xAxis.textStyle.fontWeight': undefined,
    'xAxis.textStyle.align': undefined,
    'xAxis.textStyle.baseline': undefined,
    'xAxis.scale': undefined,
    'xAxis.min': undefined,
    'xAxis.max': undefined,
    'xAxis.boundaryGap': undefined,
    'xAxis.splitNumber': undefined,
    'xAxis.show': undefined,
    'xAxis.inverse': undefined,
    'xAxis.triggerEvent': undefined,
    'xAxis.zlevel': undefined,
    'xAxis.z': undefined,
    'xAxis.gridIndex': undefined,
    'xAxis.offset': undefined,
    'xAxis.nameGap': undefined,
    'xAxis.nameRotate': undefined,
    'xAxis.minInterval': undefined,
    'xAxis.interval': undefined,
    'xAxis.logBase': undefined,
    'xAxis.silent': undefined,
    'xAxis.type': undefined,
    'xAxis.axisLabel.show': undefined,
    'xAxis.axisLabel.interval': undefined,
    'xAxis.axisLabel.rotate': undefined,
    'xAxis.axisLabel.margin': undefined,
    'xAxis.axisLabel.formatter': undefined,
    'xAxis.axisLabel.textStyle.color': undefined,
    'xAxis.axisLabel.textStyle.fontSize': undefined,
    'xAxis.axisLabel.textStyle.fontFamily': undefined,
    'xAxis.axisLabel.textStyle.fontStyle': undefined,
    'xAxis.axisLabel.textStyle.fontWeight': undefined,
    'xAxis.axisLabel.textStyle.align': undefined,
    'xAxis.axisLabel.textStyle.baseline': undefined,
    'xAxis.axisLabel.inside': undefined,
    'xAxis.axisLabel.showMinLabel': undefined,
    'xAxis.axisLabel.showMaxLabel': undefined,
    'xAxis.axisLine.show': undefined,
    'xAxis.axisLine.lineStyle.color': undefined,
    'xAxis.axisLine.lineStyle.width': undefined,
    'xAxis.axisLine.lineStyle.type': undefined,
    'xAxis.axisLine.lineStyle.shadowBlur': undefined,
    'xAxis.axisLine.lineStyle.shadowColor': undefined,
    'xAxis.axisLine.lineStyle.shadowOffsetX': undefined,
    'xAxis.axisLine.lineStyle.shadowOffsetY': undefined,
    'xAxis.axisLine.lineStyle.opacity': undefined,
    'xAxis.axisLine.onZero': undefined,
    'xAxis.splitArea.show': undefined,
    'xAxis.splitArea.interval': undefined,
    'xAxis.splitArea.areaStyle.color': undefined,
    'xAxis.splitArea.areaStyle.shadowBlur': undefined,
    'xAxis.splitArea.areaStyle.shadowColor': undefined,
    'xAxis.splitArea.areaStyle.shadowOffsetX': undefined,
    'xAxis.splitArea.areaStyle.shadowOffsetY': undefined,
    'xAxis.splitArea.areaStyle.opacity': undefined,
    'xAxis.splitLine.show': undefined,
    'xAxis.splitLine.interval': undefined,
    'xAxis.splitLine.lineStyle.color': undefined,
    'xAxis.splitLine.lineStyle.width': undefined,
    'xAxis.splitLine.lineStyle.type': undefined,
    'xAxis.splitLine.lineStyle.shadowBlur': undefined,
    'xAxis.splitLine.lineStyle.shadowColor': undefined,
    'xAxis.splitLine.lineStyle.shadowOffsetX': undefined,
    'xAxis.splitLine.lineStyle.shadowOffsetY': undefined,
    'xAxis.splitLine.lineStyle.opacity': undefined,
    'xAxis.axisTick.show': undefined,
    'xAxis.axisTick.interval': undefined,
    'xAxis.axisTick.inside': undefined,
    'xAxis.axisTick.length': undefined,
    'xAxis.axisTick.lineStyle.color': undefined,
    'xAxis.axisTick.lineStyle.width': undefined,
    'xAxis.axisTick.lineStyle.type': undefined,
    'xAxis.axisTick.lineStyle.shadowBlur': undefined,
    'xAxis.axisTick.lineStyle.shadowColor': undefined,
    'xAxis.axisTick.lineStyle.shadowOffsetX': undefined,
    'xAxis.axisTick.lineStyle.shadowOffsetY': undefined,
    'xAxis.axisTick.lineStyle.opacity': undefined,
    'xAxis.axisTick.alignWithLabel': undefined,
    'yAxis.position': undefined,
    'yAxis.name': undefined,
    'yAxis.nameLocation': undefined,
    'yAxis.nameTextStyle.color': undefined,
    'yAxis.textStyle.fontSize': undefined,
    'yAxis.textStyle.fontStyle': undefined,
    'yAxis.textStyle.fontWeight': undefined,
    'yAxis.textStyle.align': undefined,
    'yAxis.textStyle.baseline': undefined,
    'yAxis.scale': undefined,
    'yAxis.min': undefined,
    'yAxis.max': undefined,
    'yAxis.boundaryGap': undefined,
    'yAxis.splitNumber': undefined,
    'yAxis.show': undefined,
    'yAxis.inverse': undefined,
    'yAxis.triggerEvent': undefined,
    'yAxis.zlevel': undefined,
    'yAxis.z': undefined,
    'yAxis.gridIndex': undefined,
    'yAxis.offset': undefined,
    'yAxis.nameGap': undefined,
    'yAxis.nameRotate': undefined,
    'yAxis.minInterval': undefined,
    'yAxis.interval': undefined,
    'yAxis.logBase': undefined,
    'yAxis.silent': undefined,
    'yAxis.type': undefined,
    'yAxis.axisLabel.show': undefined,
    'yAxis.axisLabel.interval': undefined,
    'yAxis.axisLabel.rotate': undefined,
    'yAxis.axisLabel.margin': undefined,
    'yAxis.axisLabel.formatter': undefined,
    'yAxis.axisLabel.textStyle.color': undefined,
    'yAxis.axisLabel.textStyle.fontSize': undefined,
    'yAxis.axisLabel.textStyle.fontFamily': undefined,
    'yAxis.axisLabel.textStyle.fontStyle': undefined,
    'yAxis.axisLabel.textStyle.fontWeight': undefined,
    'yAxis.axisLabel.textStyle.align': undefined,
    'yAxis.axisLabel.textStyle.baseline': undefined,
    'yAxis.axisLabel.inside': undefined,
    'yAxis.axisLabel.showMinLabel': undefined,
    'yAxis.axisLabel.showMaxLabel': undefined,
    'yAxis.axisLine.show': undefined,
    'yAxis.axisLine.lineStyle.color': undefined,
    'yAxis.axisLine.lineStyle.width': undefined,
    'yAxis.axisLine.lineStyle.type': undefined,
    'yAxis.axisLine.lineStyle.shadowBlur': undefined,
    'yAxis.axisLine.lineStyle.shadowColor': undefined,
    'yAxis.axisLine.lineStyle.shadowOffsetX': undefined,
    'yAxis.axisLine.lineStyle.shadowOffsetY': undefined,
    'yAxis.axisLine.lineStyle.opacity': undefined,
    'yAxis.axisLine.onZero': undefined,
    'yAxis.splitArea.show': undefined,
    'yAxis.splitArea.interval': undefined,
    'yAxis.splitArea.areaStyle.color': undefined,
    'yAxis.splitArea.areaStyle.shadowBlur': undefined,
    'yAxis.splitArea.areaStyle.shadowColor': undefined,
    'yAxis.splitArea.areaStyle.shadowOffsetX': undefined,
    'yAxis.splitArea.areaStyle.shadowOffsetY': undefined,
    'yAxis.splitArea.areaStyle.opacity': undefined,
    'yAxis.splitLine.show': undefined,
    'yAxis.splitLine.interval': undefined,
    'yAxis.splitLine.lineStyle.color': undefined,
    'yAxis.splitLine.lineStyle.width': undefined,
    'yAxis.splitLine.lineStyle.type': undefined,
    'yAxis.splitLine.lineStyle.shadowBlur': undefined,
    'yAxis.splitLine.lineStyle.shadowColor': undefined,
    'yAxis.splitLine.lineStyle.shadowOffsetX': undefined,
    'yAxis.splitLine.lineStyle.shadowOffsetY': undefined,
    'yAxis.splitLine.lineStyle.opacity': undefined,
    'yAxis.axisTick.show': undefined,
    'yAxis.axisTick.interval': undefined,
    'yAxis.axisTick.inside': undefined,
    'yAxis.axisTick.length': undefined,
    'yAxis.axisTick.lineStyle.color': undefined,
    'yAxis.axisTick.lineStyle.width': undefined,
    'yAxis.axisTick.lineStyle.type': undefined,
    'yAxis.axisTick.lineStyle.shadowBlur': undefined,
    'yAxis.axisTick.lineStyle.shadowColor': undefined,
    'yAxis.axisTick.lineStyle.shadowOffsetX': undefined,
    'yAxis.axisTick.lineStyle.shadowOffsetY': undefined,
    'yAxis.axisTick.lineStyle.opacity': undefined,
    'yAxis.axisTick.alignWithLabel': undefined,
  },
  /**
   * 控制某个值是否启用
   * */
  disabled:{

  },
  /**
   * series的数据
   */
  series:[],

  /**
   * 维度信息
   */
  demension:[{
    id:'sdfsdfsdg',
    label:'名称',
    key:'XAxis.data',
    required:false,
    type:'common',
    measured:true,
    dataItem:'dataitemName'
  },
    {
      id:'',
      label:'序列1data',
      key:'data',
      required:true,
      type:'bar',
      index:0,
      measured:true,
      dataItem:''
    },
    {
      id:'',
      label:'序列1data',
      key:'gggg',
      required:true,
      type:'bar',
      index:0,
      measured:true,
      dataItem:''
    },
    {
      id:'',
      label:'序列1data',
      key:'data',
      required:true,
      type:'bar',
      index:1,
      measured:true,
      dataItem:''
    },
    {
      id:'',
      label:'序列1data',
      key:'gggg',
      required:true,
      type:'bar',
      index:1,
      measured:true,
      dataItem:''
    }
  ],

  /**
   * 控制属性控件checkBox的作用开关
   * 0:控制属性是否可用,影响state.disabled，
   * 1:控制属性是否可见,影响state.showSeting
   */
  propertyCheckedControl:checkedControlItem[0],

  showSetting:{
    series:{
    }
  }

}


