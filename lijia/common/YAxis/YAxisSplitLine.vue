<template>
  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <property-select label="网格线是否显示"  option-key="yAxis.splitLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <property-number label="坐标轴分隔线的显示间隔"  unit="px" option-key="yAxis.splitLine.interval"></property-number>
    <subheader text="线条特定样式设置"/>
    <property-color label="分隔线颜色" option-key="yAxis.splitLine.lineStyle.color"></property-color>
    <property-number label="分隔线线宽"  unit="px" option-key="yAxis.splitLine.lineStyle.width" :min="0" :max="20" :step="1"></property-number>
    <property-select label="分隔线线的类型"  option-key="yAxis.splitLine.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-number label="图形阴影的模糊大小"  unit="px" option-key="yAxis.splitLine.lineStyle.shadowBlur" ></property-number>
    <property-color label="阴影颜色" option-key="yAxis.splitLine.lineStyle.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="yAxis.splitLine.lineStyle.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="yAxis.splitLine.lineStyle.shadowOffsetY" ></property-number>
    <property-number label="图形透明度"  unit="" option-key="yAxis.splitLine.lineStyle.opacity" :min="0" :max="1" :step="0.01" ></property-number>
  </div>
</template>
<script>
  export default {
    name:'EchartsYAxisSplitLine',
  }
</script>
