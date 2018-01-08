<template>
  <div>
        <property-number label="序列索引" option-key="visualMap.seriesIndex"/>
        <property-number label="数据索引" option-key="visualMap.dimension"/>

       <subheader text="范围设定"/>
        <property-number label="最小值" option-key="visualMap.min"/>
        <property-number label="最大值" option-key="visualMap.max"/>
       <divider/>

       <subheader text="映射设定"/>
        <property-number label="分段数" option-key="visualMap.splitNumber"/>
        <property-color-list label="范围内颜色列表" option-key="inRange.color" :isGaugeColors="false"/>
        <property-color-list label="范围外颜色列表" option-key="outOfRange.color" :isGaugeColors="false"/>
       <divider/>

       <subheader text="位置"/>
        <property-number label="上边距" option-key="visualMap.top" unit="%"/>
        <property-number label="左边距" option-key="visualMap.left" unit="%"/>
       <divider/>

       <subheader text="文字标签"/>
        <property-select label="是否显示" option-key="visualMap.showLabel"
                     :options="[{text: '是', value: true}, {text: '否', value: false}]"/>
        <property-text label="上标签内容" option-key="visualMap.text[0]"></property-text>
        <property-text label="下标签内容" option-key="visualMap.text[1]"></property-text>
        <property-color label="字体颜色" option-key="visualMap.textStyle.color"/>


  </div>
</template>
<script>
  export default {
    name:'EchartsVisualMap'
  }
</script>
