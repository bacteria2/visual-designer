<template>
  <div>
    <property-text label="名称" :component-type="type" :series-index="seriesIndex" :option-key="`data[${dataIndex}].name`"></property-text>
    <divider/>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="seriesIndex"
                         :option-key="`data[${dataIndex}].label.normal.show`"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-select label="位置"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.normal.position`
                         :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].label.normal.textStyle.color`></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.normal.textStyle.fontSize` unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.normal.textStyle.fontStyle`
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.normal.textStyle.fontWeight`
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <property-select label="显示标签导引线"  :component-type="type" :series-index="index" :option-key=`data[${dataIndex}].labelLine.normal.show`  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="图形样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].itemStyle.normal.color`></property-color>
        <property-color label="描边颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].itemStyle.normal.borderColor`></property-color>
        <property-number label="描边线宽"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.normal.borderWidth` unit="px"></property-number>
        <property-select label="边框类型"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.normal.borderType`  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},,{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.normal.shadowBlur` ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.normal.shadowOffsetX` ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.normal.shadowOffsetY` ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].itemStyle.normal.shadowColor`></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.normal.opacity` :max="1" :step="0.1"></property-number>
      </div>
      <div class="content" slot="emphasis">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="seriesIndex"
                         :option-key="`data[${dataIndex}].label.emphasis.show`"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-select label="位置"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.emphasis.position`
                         :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].label.emphasis.textStyle.color`></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.emphasis.textStyle.fontSize` unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.emphasis.textStyle.fontStyle`
                         :options="[{text:'普通',value:'emphasis'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].label.emphasis.textStyle.fontWeight`
                         :options="[{text:'普通',value:'emphasis'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <property-select label="显示标签导引线"  :component-type="type" :series-index="index" :option-key=`data[${dataIndex}].labelLine.emphasis.show`  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="图形样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].itemStyle.emphasis.color`></property-color>
        <property-color label="描边颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].itemStyle.emphasis.borderColor`></property-color>
        <property-number label="描边线宽"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.emphasis.borderWidth` unit="px"></property-number>
        <property-select label="边框类型"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.emphasis.borderType`  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},,{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.emphasis.shadowBlur` ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.emphasis.shadowOffsetX` ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.emphasis.shadowOffsetY` ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        :option-key=`data[${dataIndex}].itemStyle.emphasis.shadowColor`></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         :option-key=`data[${dataIndex}].itemStyle.emphasis.opacity` :max="1" :step="0.1"></property-number>
      </div>
    </Group>
  </div>
</template>
<script>
  export default {
    name:'S-data',
    props:{
      dataIndex:Number,
      seriesIndex:Number
    },
    data(){return{type:'series-data'}},
  }
</script>

