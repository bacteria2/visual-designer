<template>
  <div>
    <subheader text="漏斗图设置"/>
    <property-select label="数据排序方式" :component-type="type" :series-index="index" :options="[{text:'升序',value:'ascending'},{text:'降序',value:'descending'}]"
                     option-key="sort" ></property-select>
    <property-number label="漏斗条的间距"  unit="px" :component-type="type" :series-index="index"
                     option-key="gap"></property-number>

    <property-number label="左边距" :component-type="type" :series-index="index" unit="%"
                     option-key="left"></property-number>

    <property-number label="上边距" :component-type="type" :series-index="index" unit="%"
                     option-key="top"></property-number>

    <property-number label="宽" :component-type="type" :series-index="index" unit="%"
                     option-key="width"></property-number>

    <property-number label="高" :component-type="type" :series-index="index" unit="%"
                     option-key="height"></property-number>
    <divider/>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="系列特定主色" :component-type="type" :series-index="index"
                        option-key="itemStyle.normal.color"></property-color>
        <subheader text="边框属性"/>

        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>

        <property-color label="边框颜色" :component-type="type" :series-index="index"
                        option-key="itemStyle.normal.borderColor"></property-color>

        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="label.normal.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="label.normal.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>

        <property-text label="内容" :component-type="type" :series-index="index"
                         option-key="label.normal.formatter"></property-text>

        <property-color label="文本颜色"   :component-type="type" :series-index="index"
                        option-key="label.normal.color"></property-color>

        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontSize" unit="px"></property-number>

        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>

        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

        <subheader text="标签视觉引导线"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-number label="引导线长度"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.length" ></property-number>

        <property-color label="颜色"   :component-type="type" :series-index="index"
                         option-key="labelLine.normal.lineStyle.color"></property-color>

        <property-number label="线宽"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.lineStyle.width" ></property-number>

        <property-select label="类型"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>

        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.lineStyle.shadowBlur" ></property-number>

        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.lineStyle.shadowOffsetX" ></property-number>

        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.lineStyle.shadowOffsetY" ></property-number>

        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="labelLine.normal.lineStyle.shadowColor"></property-color>

        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="labelLine.normal.lineStyle.opacity" :max="1" :step="0.1"></property-number>
      </div>

      <div class="content" slot="emphasis">
        <property-color label="系列特定主色" :component-type="type" :series-index="index"
                        option-key="itemStyle.emphasis.color"></property-color>
        <subheader text="边框属性"/>

        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>

        <property-color label="边框颜色" :component-type="type" :series-index="index"
                        option-key="itemStyle.emphasis.borderColor"></property-color>

        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>

        <property-text label="内容" :component-type="type" :series-index="index"
                         option-key="label.emphasis.formatter"></property-text>

        <property-color label="文本颜色"   :component-type="type" :series-index="index"
                        option-key="label.emphasis.color"></property-color>

        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontSize" unit="px"></property-number>

        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>

        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

        <subheader text="标签视觉引导线"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-number label="引导线长度"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.length" ></property-number>

        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="labelLine.emphasis.lineStyle.color"></property-color>

        <property-number label="线宽"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.lineStyle.width" ></property-number>

        <property-select label="类型"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>

        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.lineStyle.shadowBlur" ></property-number>

        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.lineStyle.shadowOffsetX" ></property-number>

        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.lineStyle.shadowOffsetY" ></property-number>

        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="labelLine.emphasis.lineStyle.shadowColor"></property-color>

        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="labelLine.emphasis.lineStyle.opacity" :max="1" :step="0.1"></property-number>
      </div>
    </Group>
  </div>
</template>
<script>
  import PropertyText from "../../../../components/InputCollector/src/PropertyText";
  export default {
    components: {PropertyText}, name:'Series-funnel',
    props:{
      index:Number
    },
    data(){return{type:'series-funnel'}},
  }
</script>
