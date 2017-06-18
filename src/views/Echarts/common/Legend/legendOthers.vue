<template>
  <div>
    <property-number label="所有图形的 zlevel 值"  option-key="legend.zlevel"></property-number>
    <property-number label="所有图形的z值"         option-key="legend.z" ></property-number>
    <property-text   label="格式化图例文本"        option-key="legend.formatter"></property-text>
    <property-color  label="图例关闭时的颜色"      option-key="legend.inactiveColor"></property-color>
    <property-switch label="图例标记和文本的对齐"  :ui="['select','number-px','number-%']" option-key="legend.align"
                     :options="[{text:'左',value:'left'},{text:'自动',value:'auto'},{text:'右',value:'right'}]"></property-switch>
    <property-switch label="图例组件离容器左侧的距离"  :ui="['select','number-px','number-%']"  option-key="legend.left"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch label="图例组件离容器上侧的距离"  :ui="['select','number-px','number-%']"  option-key="legend.top"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
    <property-switch label="图例组件离容器右侧的距离"  :ui="['select','number-px','number-%']"  option-key="legend.right"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch label="图例组件离容器下侧的距离"  :ui="['select','number-px','number-%']"  option-key="legend.bottom"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
    <property-number label="图形阴影的模糊大小"   option-key="legend.shadowBlur" unit="px"></property-number>
    <property-color  label="阴影颜色"             option-key="legend.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="legend.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="legend.shadowOffsetY" ></property-number>
  </div>
</template>
<script>
  export default {
    name:'EchartsLegendOthers',
  }
</script>
