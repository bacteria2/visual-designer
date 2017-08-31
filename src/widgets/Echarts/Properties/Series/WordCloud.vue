<template>
  <div>
    <subheader text="位置"/>

    <property-switch    label="水平位置"     :ui="['select','number-%']" :component-type="type" :series-index="index"
                        option-key="left"
                        :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch    label="垂直位置"     :ui="['select','number-%']" :component-type="type" :series-index="index"
                        option-key="top"
                        :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>

    <property-number label="宽度"  unit="%"  :component-type="type" :series-index="index"
                     option-key="width" ></property-number>

    <property-number label="高度"  unit="%"  :component-type="type" :series-index="index"
                     option-key="height" ></property-number>

    <divider/>
    <subheader text="字符大小"/>
    <property-number label="最小值"  unit="px" :component-type="type" :series-index="index"
                     option-key="sizeRange[0]"></property-number>
    <property-number label="最大值"  unit="px" :component-type="type" :series-index="index"
                     option-key="sizeRange[1]"></property-number>
    <divider/>
    <subheader text="旋转范围"/>
    <property-number label="开始" :component-type="type" :series-index="index"
                     option-key="rotationRange[0]"></property-number>
    <property-number label="结束" :component-type="type" :series-index="index"
                     option-key="rotationRange[1]"></property-number>
    <property-number label="步长" :component-type="type" :series-index="index"
                     option-key="rotationStep"></property-number>
    <divider/>
    <property-number label="字符间隔" :component-type="type" :series-index="index"
                     option-key="gridSize"></property-number>

    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="文本颜色"   option-key="textStyle.normal.color" :component-type="type" :series-index="index"></property-color>
        <property-number label="字体大小"  unit="px" option-key="textStyle.normal.fontSize" :component-type="type" :series-index="index"></property-number>
        <property-text label="字体系列"    option-key="textStyle.normal.fontFamily" :component-type="type" :series-index="index"></property-text>
        <property-select label="字体样式"  option-key="textStyle.normal.fontStyle" :component-type="type" :series-index="index"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
        </property-select>
        <property-select label="字体粗细"  option-key="textStyle.normal.fontWeight" :component-type="type" :series-index="index"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <property-number label="阴影大小"  unit="px" option-key="textStyle.normal.shadowBlur" :component-type="type" :series-index="index"></property-number>
        <property-color label="阴影颜色"   option-key="textStyle.normal.shadowColor" :component-type="type" :series-index="index"></property-color>
      </div>

      <div class="content" slot="emphasis">
        <property-color label="文本颜色"   option-key="textStyle.emphasis.color" :component-type="type" :series-index="index"></property-color>
        <property-number label="字体大小"  unit="px" option-key="textStyle.emphasis.fontSize" :component-type="type" :series-index="index"></property-number>
        <property-text label="字体系列"    option-key="textStyle.emphasis.fontFamily" :component-type="type" :series-index="index"></property-text>
        <property-select label="字体样式"  option-key="textStyle.emphasis.fontStyle"  :component-type="type" :series-index="index"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">

        </property-select>
        <property-select label="字体粗细"  option-key="textStyle.emphasis.fontWeight" :component-type="type" :series-index="index"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <property-number label="阴影大小"  unit="px" option-key="textStyle.emphasis.shadowBlur" :component-type="type" :series-index="index"></property-number>
        <property-color label="阴影颜色"   option-key="textStyle.emphasis.shadowColor" :component-type="type" :series-index="index"></property-color>
      </div>
    </Group>


  </div>
</template>
<script>
  export default {
    name:'Series-wordCloud',
    props:{
        index:Number
    },
    data(){return{type:'series-wordCloud'}},
  }
</script>
