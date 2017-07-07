<template>
  <div>
    <subheader text="主题"/>
    <divider/>
    <property-select label="页面背景类型"  option-key="pageProperty.background-type" :options="[{text:'图片',value:'image'},{text:'颜色',value:'color'},{text:'透明',value:'transparent'}]"></property-select>
    <property-text label="页面背景图片"   option-key="pageProperty.background-image"></property-text>
    <property-select label="背景展现形式"  option-key="pageProperty.background-size" :options="[{text:'平铺',value:'auto'},{text:'拉伸',value:'100% 100%'},{text:'适应屏幕',value:'cover'}]"></property-select>
    <property-color label="页面背景颜色"   option-key="pageProperty.background-color"></property-color>

    <divider/>
    <subheader text="外观样式"/>
    <property-number label="页面宽度" option-key="pageProperty.width" unit="px" :min="0" :max="1600"></property-number>
    <property-number label="页面高度" option-key="pageProperty.height" unit="px" :min="0" :max="1600"></property-number>
    <divider/>
    <property-number label="内边距（左）" option-key="pageProperty.padding-left" unit="px" :min="0" :max="100"></property-number>
    <property-number label="内边距（右）" option-key="pageProperty.padding-right" unit="px" :min="0" :max="100"></property-number>
    <property-number label="内边距（上）" option-key="pageProperty.padding-top" unit="px" :min="0" :max="100"></property-number>
    <property-number label="内边距（下）" option-key="pageProperty.padding-bottom" unit="px" :min="0" :max="100"></property-number>
    <divider/>
    <property-number label="外边距（左）" option-key="pageProperty.margin-left" unit="px" :min="0" :max="100"></property-number>
    <property-number label="外边距（右）" option-key="pageProperty.margin-right" unit="px" :min="0" :max="100"></property-number>
    <property-number label="外边距（上）" option-key="pageProperty.margin-top" unit="px" :min="0" :max="100"></property-number>
    <property-number label="外边距（下）" option-key="pageProperty.margin-bottom" unit="px" :min="0" :max="100"></property-number>
    <divider/>
    <subheader text="边框样式"/>
    <property-number label="边框厚度" option-key="pageProperty.border-width" unit="px" :min="0" :max="100"></property-number>
    <property-select label="边框样式"  option-key="pageProperty.border-style" :options="[{text:'实线',value:'solid'},{text:'点状',value:'dotted'},{text:'虚线',value:'dashed'}]"></property-select>
    <property-number label="边框（左）" option-key="pageProperty.border-left" unit="px" :min="0" :max="100"></property-number>
    <property-number label="边框（右）" option-key="pageProperty.border-right" unit="px" :min="0" :max="100"></property-number>
    <property-number label="边框（上）" option-key="pageProperty.border-top" unit="px" :min="0" :max="100"></property-number>
    <property-number label="边框（下）" option-key="pageProperty.border-bottom" unit="px" :min="0" :max="100"></property-number>
    <property-number label="边框倒角" option-key="pageProperty.border-radius" unit="px" :min="0" :max="100"></property-number>
    <property-color label="边框颜色"   option-key="pageProperty.border-color"></property-color>
    <property-number label="阴影的模糊大小"  unit="px" option-key="pageProperty.border.shadowBlur" ></property-number>
    <property-color  label="阴影颜色"  option-key="pageProperty.border.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" :max="30" option-key="pageProperty.border.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" :max="30" option-key="pageProperty.border.shadowOffsetY" ></property-number>
    <property-number label="图形透明度"  unit="px" option-key="pageProperty.border.opacity" ></property-number>
    <property-select label="文本位置"      option-key="pageProperty.border.textPosition"   :options="[{text:'左',value:'left'},{text:'右',value:'right'},{text:'上',value:'top'},{text:'下',value:'bottom'}]"></property-select>
    <property-select label="文本对齐方式"  option-key="pageProperty.border.textAlign"   :options="[{text:'左',value:'left'},{text:'右',value:'right'}]"></property-select>

    <divider/>
    <subheader text="文字样式"/>
    <property-color label="文本颜色"   option-key="pageProperty.textStyle.color"></property-color>
    <property-number label="字体大小"  option-key="pageProperty.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  option-key="pageProperty.textStyle.fontStyle"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="pageProperty.textStyle.fontWeight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-select label="文本水平对齐方式"  option-key="pageProperty.textStyle.align"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-select>
    <property-select label="文本垂直对齐方式"  option-key="pageProperty.textStyle.baseline"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-select>

  </div>
</template>
<script>
  import uploadImage from '@/views/DashBord/property/component/uploadImage'
  import PropertyText from "../../../../components/InputCollector/src/PropertyText";
  export default {
    components: {
      PropertyText,
      uploadImage
    },
    name:'pagePropertyEdit',
  }
</script>
