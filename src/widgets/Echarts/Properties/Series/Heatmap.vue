<template>
  <div>
    <property-select label="多X轴时本系列使用哪个X轴"  option-key="series.xAxisIndex"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
    <property-select label="多Y轴时本系列使用哪个Y轴"  option-key="series.yAxisIndex"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
    <property-number label="每个点模糊的大小" unit="px" option-key="series.blurSize"></property-number>
    <property-number label="最小的透明度" unit="px" option-key="series.minOpacity"></property-number>
    <property-number label="最大的透明度" unit="px" option-key="series.maxOpacity"></property-number>
    <divider/>
    <subheader text="数据标注设置"/>
    <property-select label="显示数据标注" option-key="series.markPoint._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <subheader text="标线设置"/>
    <property-select label="显示标线" option-key="series.markLine._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <subheader text="热力图提示框"/>
    <property-number label="提示框位置（X坐标）" option-key="series.tooltip.position.x"  unit="px"  :min="0" :max="1400" :step="1"></property-number>
    <property-number label="提示框位置（Y坐标）" option-key="series.tooltip.position.y"  unit="px"  :min="0" :max="800" :step="1"></property-number>
    <property-text label="提示框内容模板"  option-key="series.tooltip.formatter" ></property-text>
    <property-color  label="提示框浮层的背景颜色"  option-key="series.tooltip.backgroundColor"></property-color>
    <property-color  label="提示框浮层的边框颜色"  option-key="series.tooltip.borderColor"></property-color>
    <property-number label="提示框浮层的边框宽" option-key="series.tooltip.borderWidth"  unit="px"  :min="0" :max="30" :step="1"></property-number>
    <property-number label="提示框浮层内边距" option-key="series.tooltip.padding"></property-number>
    <divider/>
    <subheader text="提示框浮层的文本样式"/>
    <property-color label="文本颜色"   option-key="series.tooltip.textStyle.color"></property-color>
    <property-number label="字体大小"  option-key="series.tooltip.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  option-key="series.tooltip.textStyle.fontStyle"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="series.tooltip.textStyle.fontWeight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

  </div>
</template>
<script>
  export default {
    name:'Series-pie',
  }
</script>
