<template>
  <div>
    <property-select label="多X轴时本系列使用哪个X轴"  :component-type="type" :series-index="index" option-key="seriesIndex"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
    <property-select label="多Y轴时本系列使用哪个Y轴"  :component-type="type" :series-index="index" option-key="yAxisIndex"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
    <divider/>
    <subheader text="柱外观设置（针对本系列）"/>
    <property-switch label="同类目柱间距离" :ui="['number-px','number-%']"   :component-type="type" :series-index="index" option-key="barGap" ></property-switch>
    <property-switch label="不同类目柱间距离" :ui="['number-px','number-%']"   :component-type="type" :series-index="index" option-key="barCategoryGap" ></property-switch>
    <property-number label="柱条最小高度"  unit="px" :min="0" :max="50" :step="1" :component-type="type" :series-index="index" option-key="barMinHeight" ></property-number>
    <property-number label="柱条宽度"  unit="px"  :component-type="type" :series-index="index" option-key="barWidth" ></property-number>

    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="系列特定主色" :component-type="type" :series-index="index" option-key="itemStyle.normal.color"></property-color>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderColor"></property-color>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderRadius" :min="0" :max="15" :step="1"></property-number>

        <subheader text="数据项标签"/>
        <property-select label="数据项标签是否显示"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="数据项标签位置"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
        <property-select label="文本标签内容模板" :component-type="type" :series-index="index" option-key="itemStyle.normal.label.formatter"></property-select>
        <property-color label="文本颜色"   :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>
      <div class="content" slot="emphasis">
        <property-color label="系列特定主色" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.color"></property-color>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderColor"></property-color>
        <property-number label="边框圆角"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderRadius" :min="0" :max="15" :step="1"></property-number>

        <subheader text="数据项标签"/>
        <property-select label="数据项标签是否显示"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="数据项标签位置"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
        <property-text label="文本标签内容模板" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.formatter"></property-text>
        <property-color label="文本颜色"   :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>
    </Group>
    <property-text label="堆积命名（同名系列会被堆积）" :component-type="type" :series-index="index" option-key="stack"></property-text>
    <divider/>
    <subheader text="数据标注设置"/>
    <property-select label="显示数据标注" :component-type="type" :series-index="index" option-key="markPoint._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <subheader text="标线设置"/>
    <property-select label="显示数据标注" :component-type="type" :series-index="index" option-key="markLine._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>


  </div>
</template>
<script>
  export default {
    name:'Series-bar',
    props:{
        index:Number
    },
    data(){return{type:'series-bar'}},
  }
</script>
