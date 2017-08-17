<template>
  <div>
    <subheader text="标题块位置"/>
    <property-switch    label="水平位置"     :ui="['select','number-px','number-%']"
                        option-key="title.left"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch    label="垂直位置"     :ui="['select','number-px','number-%']"
                        option-key="title.top"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
    <divider/>
    <subheader text="标题块外观"/>
    <property-color label="标题背景色" option-key="title.backgroundColor"></property-color>
    <property-number label="标题边框线宽"  unit="px" option-key="title.borderWidth" :max="30"></property-number>
    <property-color label="标题的边框颜色"  option-key="title.borderColor"></property-color>
    <property-number label="标题内边距"  unit="px" option-key="title.padding" :max="10"></property-number>
    <divider/>
    <subheader text="主标题文本样式"/>
    <property-color label="文本颜色"   option-key="title.textStyle.color"></property-color>
    <property-number label="字体大小"  unit="px" option-key="title.textStyle.fontSize" ></property-number>
    <property-text label="字体系列"    option-key="title.textStyle.fontFamily" ></property-text>
    <property-select label="字体样式"  option-key="title.textStyle.fontStyle"
              :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">

    </property-select>
    <property-select label="字体粗细"  option-key="title.textStyle.fontWeight"
              :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-select label="文本水平对齐方式"   option-key="title.textStyle.align"
              :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]">
    </property-select>
    <property-select label="文本垂直对齐方式"     option-key="title.textStyle.baseline"
              :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]">
    </property-select>
    <divider/>
    <subheader text="副标题文本样式"/>
    <property-color label="文本颜色" option-key="title.subtextStyle.color"></property-color>
    <property-number label="字体大小"  unit="px" option-key="title.subtextStyle.fontSize" ></property-number>
    <property-text label="字体系列"   option-key="title.subtextStyle.fontFamily" ></property-text>
    <property-select label="字体样式" option-key="title.subtextStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"           option-key="title.subtextStyle.fontWeight" style="margin-top: 15px" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-select label="文本水平对齐方式"   option-key="title.subtextStyle.align" :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-select>
    <property-select label="文本垂直对齐方式"   option-key="title.subtextStyle.baseline" :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-select>
    <divider/>
    <subheader text="其他样式"/>
    <property-number label="主副标题之间的间距"  unit="px" option-key="title.itemGap" ></property-number>
    <property-number label="所有图形的 zlevel 值"       unit="px" option-key="title.zlevel" ></property-number>
    <property-number label="所有图形的z值"  unit="px" option-key="title.z" ></property-number>
    <!--
    <property-select label="组件离容器左侧的距离"   option-key="title.left"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-select>
    <property-select label="组件离容器上侧的距离"   option-key="title.top"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-select>
    <property-select label="组件离容器右侧的距离"   option-key="title.right"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-select>
    <property-select label="组件离容器下侧的距离"   option-key="title.bottom"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-select>
    -->
    <property-number label="图形阴影的模糊大小"  unit="px" option-key="title.shadowBlur" ></property-number>
    <property-color label="阴影颜色"  option-key="title.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="title.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="title.shadowOffsetY" ></property-number>
  </div>
</template>
<script>
  export default {
    name:'EchartsTitleStyle',
  }
</script>
