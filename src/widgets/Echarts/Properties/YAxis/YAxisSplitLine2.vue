<template>
  <div>
    <property-select label="网格线是否显示"  option-key="yAxis[1].splitLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <property-number label="坐标轴分隔线的显示间隔"  unit="px" option-key="yAxis[1].splitLine.interval"></property-number>
    <subheader text="线条特定样式设置"/>
    <property-color label="分隔线颜色" option-key="yAxis[1].splitLine.lineStyle.color"></property-color>
    <property-number label="分隔线线宽"  unit="px" option-key="yAxis[1].splitLine.lineStyle.width" :min="0" :max="20"></property-number>
    <property-select label="分隔线线的类型"  option-key="yAxis[1].splitLine.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-number label="阴影的模糊大小"  unit="px" option-key="yAxis[1].splitLine.lineStyle.shadowBlur" ></property-number>
    <property-color label="阴影颜色" option-key="yAxis[1].splitLine.lineStyle.shadowColor"></property-color>
    <property-number label="阴影水平偏移距离"  unit="px" option-key="yAxis[1].splitLine.lineStyle.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直偏移距离"  unit="px" option-key="yAxis[1].splitLine.lineStyle.shadowOffsetY" ></property-number>
    <property-number label="透明度"  unit="" option-key="yAxis[1].splitLine.lineStyle.opacity" :min="0" :max="1"></property-number>
  </div>
</template>
<script>
  export default {
    name:'EchartsYAxisSplitLine2',
  }
</script>
