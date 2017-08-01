<template>
  <div>
      <property-select label="多X轴时本系列使用哪个X轴"  :component-type="type" :series-index="index" option-key="xAxisIndex"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
      <property-select label="多Y轴时本系列使用哪个Y轴"  :component-type="type" :series-index="index" option-key="yAxisIndex"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
      <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
        <div  class="content" slot="normal">
          <property-color label="系列特定主色" :component-type="type" :series-index="index" option-key="itemStyle.normal.color"></property-color>
          <subheader text="小标志边框属性"/>
          <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>
          <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderColor"></property-color>
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
          <subheader text="小标志边框属性"/>
          <property-number label="边框线框"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderWidth" :min="0" :max="20" :step="1"></property-number>
          <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderColor"></property-color>
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
      <subheader text="小标志设置"/>
      <property-select label="数据项标签位置"  :component-type="type" :series-index="index" option-key="symbol" :options="[{text:'心形',value:'heart'},{text:'水滴',value:'droplet'},{text:'标注',value:'pin'},{text:'箭头',value:'arrow'},{text:'星形',value:'star'},{text:'菱形',value:'diamond'},{text:'圆形',value:'circle'},{text:'矩形',value:'rectangle'},{text:'三角形',value:'itriangle'},{text:'空心圆',value:'emptyCircle'},{text:'空心矩形',value:'emptyRectangle'},{text:'空心三角',value:'emptyTriangle'},{text:'空心菱形',value:'emptyDiamond'}]"></property-select>
      <property-number label="小标志大小"  :component-type="type" :series-index="index" option-key="symbolSize" unit="px" :min="0" :max="80" :step="1" ></property-number>
      <property-number label="小标志图形旋转角度"  :component-type="type" :series-index="index" option-key="symbolRotate" unit="°" :min="-180" :max="180" :step="1" ></property-number>
      <divider/>
      <subheader text="数据标注设置"/>
      <property-select label="显示数据标注" :component-type="type" :series-index="index" option-key="markPoint._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
      <divider/>
      <subheader text="标线设置"/>
      <property-select label="显示标线" :component-type="type" :series-index="index" option-key="markLine._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
  </div>
</template>
 <script>
  export default {
    name:'Series-scatter',
    props:{
      index:Number
    },
    data(){return{type:'series-scatter'}},
  }
</script>

