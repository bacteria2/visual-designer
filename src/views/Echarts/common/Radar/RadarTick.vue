<template>
  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <property-select label="是否显示坐标轴刻度"  option-key="radar.axisTick.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
    <divider/>
    <property-select label="坐标轴刻度是否朝内" option-key="radar.axisTick.inside" :options="[{text:'在内部',value:'false'},{text:'在外部',value:'true'}]"></property-select>
    <property-number label="坐标轴刻度的长度"  unit="px" option-key="radar.axisTick.length"></property-number>
    <subheader text="线条特定样式设置"/>
    <property-color label="线条颜色" option-key="radar.axisTick.lineStyle.color"></property-color>
    <property-number label="线条宽度"  unit="px" option-key="radar.axisTick.lineStyle.width" :min="0" :max="20" :step="1"></property-number>
    <property-select label="坐标轴刻度线的类型"  option-key="radar.axisTick.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-number label="图形阴影的模糊大小"  unit="px" option-key="radar.axisTick.lineStyle.shadowBlur" ></property-number>
    <property-color label="阴影颜色" option-key="radar.axisTick.lineStyle.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="radar.axisTick.lineStyle.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="radar.axisTick.lineStyle.shadowOffsetY" ></property-number>
    <property-number label="图形透明度"  unit="" option-key="radar.axisTick.lineStyle.opacity"  :min="0" :max="1" :step="0.01"></property-number>
    <subheader text="其他"/>
    <property-select label="刻度线和标签是否对齐"  option-key="radar.axisTick.alignWithLabel"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
  </div>
</template>

