<template>
  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <property-select label="是否显示分隔区域"   option-key="yAxis.splitArea.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
    <divider/>
    <property-number label="坐标轴分隔线的显示间隔"  unit="px" option-key="yAxis.splitArea.interval"></property-number>
    <subheader text="线条特定样式设置"/>
    <property-color label="分隔区域颜色" option-key="yAxis.splitArea.areaStyle.color"></property-color>
    <property-number label="图形阴影的模糊大小"  unit="px" option-key="yAxis.splitArea.areaStyle.shadowBlur" ></property-number>
    <property-color label="阴影颜色"  option-key="yAxis.splitArea.areaStyle.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="yAxis.splitArea.areaStyle.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="yAxis.splitArea.areaStyle.shadowOffsetY" ></property-number>
    <property-number label="图形透明度"  unit="" option-key="yAxis.splitArea.areaStyle.opacity" :min="0" :max="1" :step="0.01"></property-number>
  </div>
</template>
