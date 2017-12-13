<template>
  <div>
      <subheader text="标题"/>
      <property-select label="是否显示标题"  option-key="title.show"
                       :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
      <property-text label="标题"  option-key="title.name"></property-text>

      <property-number label="文本大小"   option-key="title.fontSize" ></property-number>
      <property-select label="文本字体"  option-key="title.fontFamily"
                         :options="[{text:'雅黑',value:'Microsoft YaHei'},{text:'宋体',value:'宋体'}
                          ,{text:'黑体',value:'黑体'}
                         ]"></property-select>
      <property-color label="文本颜色"   option-key="title.color"></property-color>

    <subheader text="边距"/>
    <property-number label="上边距"   option-key="padding[0]" ></property-number>
    <property-number label="右边距"   option-key="padding[1]" ></property-number>
    <property-number label="下边距"   option-key="padding[2]" ></property-number>
    <property-number label="左边距"   option-key="padding[3]" ></property-number>
    <subheader text="环形宽度"/>
    <property-number label="环形宽度"   option-key="ringWidth"   ></property-number>

    <subheader text="颜色序列"/>
    <property-color-list label="颜色序列" option-key="color"></property-color-list>

    <subheader text="图例"/>
    <property-select label="是否显示序列"  option-key="legend.show"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="图例位置"  option-key="legend.pos"
                     :options="[{text:'上',value:'top'},{text:'右',value:'right'},{text:'下',value:'bottom'},{text:'左',value:'left'}]"></property-select>
    <property-number label="上边距"   option-key="legend.margin[0]" ></property-number>
    <property-number label="右边距"   option-key="legend.margin[1]" ></property-number>
    <property-number label="下边距"   option-key="legend.margin[2]" ></property-number>
    <property-number label="左边距"   option-key="legend.margin[3]" ></property-number>
    <property-text label="图例单位"  option-key="legend.unit"></property-text>
    <property-color label="数值颜色"   option-key="legend.color"></property-color>
    <property-color label="单位颜色"   option-key="legend.unitColor"></property-color>
    <property-number label="文字大小"   option-key="legend.fontSize" ></property-number>
  </div>
</template>
<script>

  export default {
    name:'ydpPieProps'
  }
</script>
