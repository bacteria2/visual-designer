<template>
  <div>
    <property-select label="是否显示图例"  option-key="legend.show"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="图例选择模式"  option-key="legend.selectedMode"
                     :options="[{text:'不可选',value:false},{text:'单选',value:'single'},{text:'多选',value:'multiple'}]"></property-select>
    <property-select label="图例类型"  option-key="legend.type"
                     :options="[{text:'普通',value:'plain'},{text:'滚动',value:'scroll'}]"></property-select>
    <divider/>
    <subheader text="图例位置"/>
    <property-switch label="水平安放位置"  :ui="['number-px','select']"  option-key="legend.x"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"
                     :min="0" :max="2000" :step="20">
    </property-switch>
    <property-switch label="垂直安放位置" :ui="['number-px','select']"   option-key="legend.y"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]" :min="0" :max="2000" :step="20"
    ></property-switch>
    <property-select  label="水平放置还是垂直放置"  option-key="legend.orient"
                      :options="[{text:'水平放置',value:'horizontal'},{text:'垂直放置',value:'vertical'}]"></property-select>
    <divider/>
    <subheader text="图例外观"/>
    <property-color  label="图例背景颜色" option-key="legend.backgroundColor"></property-color>
    <property-number label="图例边框线宽" option-key="legend.borderWidth" unit="px" :min="0" :max="30"></property-number>
    <property-color  label="图例边框颜色" option-key="legend.borderColor"></property-color>
    <property-number label="图例内边距"   option-key="legend.padding" unit="px" :min="0" :max="10"></property-number>
    <property-number label="图例项宽度"   option-key="legend.itemWidth" unit="px"></property-number>
    <property-number label="图例项高度"   option-key="legend.itemHeight" unit="px"></property-number>
    <property-number label="图例各项之间间隔"   option-key="legend.itemGap" unit="px"></property-number>
    <divider/>
    <subheader text="图例文字样式"/>
    <property-color label="文本颜色"   option-key="legend.textStyle.color"></property-color>
    <property-number label="字体大小"  option-key="legend.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  option-key="legend.textStyle.fontStyle"
                 :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="legend.textStyle.fontWeight"
                 :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-select label="文本水平对齐方式"  option-key="legend.textStyle.align"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-select>
    <property-select label="文本垂直对齐方式"  option-key="legend.textStyle.baseline"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-select>
  </div>
</template>
<script>
  export default {
    name:'EchartsLegendBasic',
  }
</script>


