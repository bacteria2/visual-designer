<template>
  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <property-select label="是否显示坐标轴轴线"  option-key="xAxis.axisLine.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
    <divider/>
    <subheader text="线条特定样式设置"/>
    <property-color label="线条颜色" option-key="xAxis.axisLine.lineStyle.color"></property-color>
    <property-number label="线条宽度"  unit="px" option-key="xAxis.axisLine.lineStyle.width" :min="0" :max="300" :step="1"></property-number>
    <property-select label="坐标轴线线的类型" option-key="xAxis.axisLine.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-number label="图形阴影的模糊大小"  unit="px" option-key="xAxis.axisLine.lineStyle.shadowBlur" ></property-number>
    <property-color label="阴影颜色" option-key="xAxis.axisLine.lineStyle.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="xAxis.axisLine.lineStyle.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="xAxis.axisLine.lineStyle.shadowOffsetY" ></property-number>
    <property-number label="图形透明度"  unit="" option-key="xAxis.axisLine.lineStyle.opacity" :min="0" :max="1" :step="0.01"></property-number>
    <subheader text="其他"/>
    <property-select label="X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上"  option-key="xAxis.axisLine.onZero"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
  </div>
</template>

