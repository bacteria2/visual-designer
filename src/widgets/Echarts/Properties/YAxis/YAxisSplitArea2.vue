<template>
  <div>
    <property-select label="显示分隔区域"   option-key="yAxis[1].splitArea.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <property-number label="分隔线的显示间隔"  unit="px" option-key="yAxis[1].splitArea.interval"></property-number>
    <subheader text="线条特定样式设置"/>
    <property-color label="分隔区域颜色" option-key="yAxis[1].splitArea.areaStyle.color"></property-color>
    <property-number label="阴影的模糊大小"  unit="px" option-key="yAxis[1].splitArea.areaStyle.shadowBlur" ></property-number>
    <property-color label="阴影颜色"  option-key="yAxis[1].splitArea.areaStyle.shadowColor"></property-color>
    <property-number label="阴影水平偏移距离"  unit="px" option-key="yAxis[1].splitArea.areaStyle.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直偏移距离"  unit="px" option-key="yAxis[1].splitArea.areaStyle.shadowOffsetY" ></property-number>
    <property-number label="透明度(0~1)"  unit="" option-key="yAxis[1].splitArea.areaStyle.opacity" :min="0" :max="1"></property-number>
  </div>
</template>
<script>
  export default {
    name:'EchartsYAxisSplitArea2',
  }
</script>
