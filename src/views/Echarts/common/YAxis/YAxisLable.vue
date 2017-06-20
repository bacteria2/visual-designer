<template>

  <div>
    <property-select label="坐标轴文本标签是否显示"  option-key="yAxis.axisLabel.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>

    <subheader text="线条特定样式设置"/>
    <property-number label="坐标轴文本标签显示间隔"  unit="px" option-key="yAxis.axisLabel.interval"></property-number>
    <property-number label="坐标轴文本标签旋转角度"  unit="°" option-key="yAxis.axisLabel.rotate" :min="-180" :max="180" :step="1"></property-number>
    <property-number label="坐标轴文本标签与坐标轴的间距"  unit="px" option-key="yAxis.axisLabel.margin"></property-number>
    <property-text label="坐标轴文本标签内容模板"  option-key="yAxis.axisLabel.formatter"></property-text>

    <subheader text="坐标轴文本标签文本样式"/>
    <property-color label="文本颜色"  option-key="yAxis.axisLabel.textStyle.color"></property-color>
    <property-number label="字体大小" unit="px" option-key="yAxis.axisLabel.textStyle.fontSize" ></property-number>
    <property-text label="字体系列" option-key="yAxis.axisLabel.textStyle.fontFamily" ></property-text>
    <property-select label="字体样式"  option-key="yAxis.axisLabel.textStyle.fontStyle"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细" option-key="yAxis.axisLabel.textStyle.fontWeight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-select label="文本水平对齐方式" option-key="yAxis.axisLabel.textStyle.align"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-select>
    <property-select label="文本垂直对齐方式"  option-key="yAxis.axisLabel.textStyle.baseline"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-select>
    <divider/>

    <subheader text="其他"/>
    <property-select label="刻度标签是否朝内"  option-key="yAxis.axisLabel.inside"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="是否显示最小 tick 的 label"  option-key="yAxis.axisLabel.showMinLabel"  :options="[{text:'是',value:true},{text:'否',value:false},{text:'空',value:null}]"></property-select>
    <property-select label="是否显示最大 tick 的 label"  option-key="yAxis.axisLabel.showMaxLabel"  :options="[{text:'是',value:true},{text:'否',value:false},{text:'空',value:null}]"></property-select>

  </div>
</template>
<script>
  export default {
    name:'EchartsYAxisLable',
  }
</script>
