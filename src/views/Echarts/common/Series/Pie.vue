<template>
  <div>
    <divider/>
    <subheader text="饼图设置（针对本系列）"/>
    <property-select label="南丁格尔玫瑰图模式"  option-key="series.roseType"  :options="[{text:'半径模式',value:'radius'},{text:'面积模式',value:'area'}]"></property-select>
    <subheader text="饼图圆心坐标"/>
    <property-switch label="X:"  option-key="series.center.x"  :ui="['number-px','number-%']" :min="0" :max="1400" :step="1"></property-switch>
    <property-switch label="Y:"  option-key="series.center.y" :ui="['number-px','number-%']" :min="0" :max="1400" :step="1"></property-switch>
    <divider/>
    <property-switch label="饼图半径"  option-key="series.radius" :ui="['number-px','number-%']" :min="0" :max="400" :step="1"></property-switch>
   <!-- <property-switch label="内:"  option-key="series.center.x"  :ui="['number-px','number-%']" :min="0" :max="1400" :step="1"></property-switch>
    <property-switch label="外:"  option-key="series.center.y" :ui="['number-px','number-%']" :min="0" :max="100" :step="1"></property-switch>-->
    <property-number label="饼图起始角度"  option-key="series.startAngle" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <property-number label="饼图最小角度"  option-key="series.minAngle" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <property-select label="鼠标点选模式"  option-key="series.selectedMode" :options="[{text:'不可选',value:false},{text:'单选',value:'single'},{text:'多选',value:'multiple'}]"></property-select>
    <property-number label="选中时扇区偏移量"  option-key="series.selectedOffset" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="系列特定主色" option-key="series.itemStyle.normal.color"></property-color>
        <property-select label="显示标签视觉导引线"  option-key="series.itemStyle.normal.labelLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" option-key="series.itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" option-key="series.itemStyle.normal.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="数据项标签是否显示"  option-key="series.itemStyle.normal.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="数据项标签位置"  option-key="series.itemStyle.normal.label.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
        <property-text label="文本标签距圆心距离与半径比值" option-key="series.itemStyle.normal.label.distance"></property-text>
        <property-select label="文本标签内容模板" option-key="series.itemStyle.normal.label.formatter"></property-select>
        <property-color label="文本颜色"   option-key="series.itemStyle.normal.label.textStyle.color"></property-color>
        <property-number label="字体大小"  option-key="series.itemStyle.normal.label.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  option-key="series.itemStyle.normal.label.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  option-key="series.itemStyle.normal.label.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>

      <div class="content" slot="emphasis">
        <property-color label="系列特定主色" option-key="series.itemStyle.emphasis.color"></property-color>
        <property-select label="显示标签视觉导引线"  option-key="series.itemStyle.emphasis.labelLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" option-key="series.itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" option-key="series.itemStyle.emphasis.borderColor"></property-color>

        <subheader text="数据项标签"/>
        <property-select label="数据项标签是否显示"  option-key="series.itemStyle.emphasis.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="数据项标签位置"  option-key="series.itemStyle.emphasis.label.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
        <property-text label="文本标签距圆心距离与半径比值" option-key="series.itemStyle.emphasis.label.distance"></property-text>
        <property-select label="文本标签内容模板" option-key="series.itemStyle.emphasis.label.formatter"></property-select>
        <property-color label="文本颜色"   option-key="series.itemStyle.emphasis.label.textStyle.color"></property-color>
        <property-number label="字体大小"  option-key="series.itemStyle.emphasis.label.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  option-key="series.itemStyle.emphasis.label.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  option-key="series.itemStyle.emphasis.label.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>
    </Group>
    <subheader text="数据标注设置"/>
    <property-select label="显示数据标注" option-key="series.markPoint._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <subheader text="标线设置"/>
    <property-select label="显示数据标注" option-key="series.markLine._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>


  </div>
</template>
<script>
  export default {
    name:'EchartsPie',
  }
</script>
