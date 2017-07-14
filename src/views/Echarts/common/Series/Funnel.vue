<template>
  <template>
    <div>
      <subheader text="漏斗图设置（针对本系列）"/>
      <property-select label="数据排序方式"  option-key="series.sort"  :options="[{text:'升序',value:'ascending'},{text:'降序',value:'descending'}]"></property-select>
      <property-number label="漏斗条的间距"  unit="px" option-key="series.gap" :min="0" :max="30" :step="1"></property-number>
      <divider/>
      <subheader text="漏斗位置（针对本系列）"/>
      <property-switch label="左上角横坐标（x1）" :ui="['number-px','number-%']"   :min="0" :max="150" :step="1" option-key="series.x" ></property-switch>
      <property-switch label="左上角纵坐标（y1）" :ui="['number-px','number-%']"  option-key="series.y" ></property-switch>
      <property-switch label="左上角横坐标（x2）" :ui="['number-px','number-%']"   :min="0" :max="150" :step="1" option-key="series.x1" ></property-switch>
      <property-switch label="左上角纵坐标（y2）" :ui="['number-px','number-%']"  option-key="series.y2" ></property-switch>
      <property-switch label="宽度（启用此项则x2失效）" :ui="['number-px','number-%']"  :min="0" :max="1200" :step="1" option-key="series.width" ></property-switch>
      <property-switch label="高度（启用此项则y2失效）" :ui="['number-px','number-%']"  :min="0" :max="1000" :step="1" option-key="series.height" ></property-switch>

      <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
        <div  class="content" slot="normal">
          <property-color label="系列特定主色" option-key="series.itemStyle.normal.color"></property-color>
          <subheader text="数据项标签"/>
          <property-select label="数据项标签是否显示"  option-key="series.itemStyle.normal.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
          <!--更多选项开始-->
          <property-select label="数据项标签位置"  option-key="series.itemStyle.normal.label.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
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
          <subheader text="数据项标签"/>
          <property-select label="数据项标签是否显示"  option-key="series.itemStyle.emphasis.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
          <!--更多选项开始-->
          <property-select label="数据项标签位置"  option-key="series.itemStyle.emphasis.label.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
          <property-text label="文本标签内容模板" option-key="series.itemStyle.emphasis.label.formatter"></property-text>
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
      <property-select label="显示标线" option-key="series.markLine._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    </div>
  </template>
</template>
<script>
  export default {
    name:'Series-pie',
  }
</script>
