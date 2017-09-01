<template>
  <div>
    <property-select label="显示"
                     option-key="radar.axisTick.show" :options="[{text:'是',value:true},{text:'否',value:false}]">
    </property-select>

    <property-select label="刻度朝内"
                     option-key="radar.axisTick.inside" :options="[{text:'是',value:true},{text:'否',value:false}]">
    </property-select>

    <property-number label="轴线长度"  unit="px"
                     option-key="radar.axisTick.length"></property-number>

    <property-color  label="轴线颜色"
                     option-key="radar.axisTick.lineStyle.color"></property-color>

    <property-number label="线宽"  unit="px"
                     option-key="radar.axisTick.lineStyle.width"></property-number>

    <property-select label="线条类型"
                     option-key="radar.axisTick.lineStyle.type" :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点状线',value:'dotted'}]">
    </property-select>

    <property-number label="阴影模糊大小"  option-key="radar.axisTick.lineStyle.shadowBlur" ></property-number>
    <property-color  label="阴影颜色"  option-key="radar.axisTick.lineStyle.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="radar.axisTick.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="radar.axisTick.shadowOffsetY" ></property-number>
    <property-number label="透明度（0~1）"
                     option-key="radar.axisTick.lineStyle.opacity"></property-number>
  </div>
</template>
<script>
  export default {
    name:'EchartsRadarAxisTick',
  }
</script>
