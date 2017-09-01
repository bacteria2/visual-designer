<template>
  <div>
    <property-select label="显示"
                     option-key="radar.splitArea.show" :options="[{text:'是',value:true},{text:'否',value:false}]">
    </property-select>

    <property-color  label="区域颜色"
                     option-key="radar.splitArea.areaStyle.color"></property-color>

    <property-number label="阴影模糊大小"  option-key="radar.splitArea.areaStyle.shadowBlur" ></property-number>
    <property-color  label="阴影颜色"  option-key="radar.splitArea.areaStyle.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="radar.splitArea.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="radar.splitArea.shadowOffsetY" ></property-number>
    <property-number label="透明度（0~1）"
                     option-key="radar.splitArea.areaStyle.opacity"></property-number>
   </div>
</template>
<script>
  export default {
    name:'EchartsRadarSplitArea',
  }
</script>
