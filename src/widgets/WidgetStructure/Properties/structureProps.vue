<template>
  <div>
      <subheader text="标题"/>
      <property-select label="是否显示标题"  option-key="title.show"
                       :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
      <property-text label="标题"  option-key="title.text"></property-text>
      <property-switch label="水平安放位置"  :ui="['number-px','select']"  option-key="title.left"
                       :options="[{text:'左',value:'left'},{text:'中',value:'auto'}]"
                        :max="2000" ></property-switch>
      <property-number label="上边距"   option-key="title.top" ></property-number>
      <property-number label="文本大小"   option-key="title.style.fontSize" ></property-number>
      <property-select label="文本字体"  option-key="title.style.fontFamily"
                         :options="[{text:'雅黑',value:'Microsoft YaHei'},{text:'宋体',value:'宋体'}
                          ,{text:'黑体',value:'黑体'}
                         ]"></property-select>
      <property-color label="文本颜色"   option-key="title.style.color"></property-color>
    <subheader text="节点文字"/>
    <property-number label="主节点文本大小"   option-key="textStyles[0].fontSize" ></property-number>
    <property-select label="主节点文本字体"  option-key="textStyles[0].fontFamily"
                     :options="[{text:'雅黑',value:'Microsoft YaHei'},{text:'宋体',value:'宋体'}
                          ,{text:'黑体',value:'黑体'}
                         ]"></property-select>
    <property-color label="主节点文本颜色"   option-key="textStyles[0].color"></property-color>
    <property-number label="子节点文本大小"   option-key="textStyles[1].fontSize" ></property-number>
    <property-select label="子节点文本字体"  option-key="textStyles[1].fontFamily"
                     :options="[{text:'雅黑',value:'Microsoft YaHei'},{text:'宋体',value:'宋体'}
                          ,{text:'黑体',value:'黑体'}
                         ]"></property-select>
    <property-color label="子节点文本颜色"   option-key="textStyles[1].color"></property-color>
    <subheader text="背景/边距"/>
    <property-color label="背景颜色"   option-key="backgroundColor"></property-color>
    <property-number label="上边距"   option-key="paddTop" ></property-number>
    <subheader text="节点属性"/>
    <property-color-list label="下层节点颜色" option-key="colors"></property-color-list>
    <property-color-list label="上层节点颜色" option-key="sourceColors"></property-color-list>
    <property-color-list label="脉络颜色" option-key="groupColors"></property-color-list>
    <property-select label="是否显示边框"  option-key="showBorder"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-color label="节点边框颜色"   option-key="borderColor"></property-color>
    <property-number label="主节点半径"   option-key="mainRadius" ></property-number>
    <property-number label="子节点半径"   option-key="subRadius" ></property-number>
    <property-number label="主节点边宽"   option-key="mainBorderWidth" ></property-number>
    <property-number label="子节点边宽"   option-key="subBorderWidth" ></property-number>
    <property-number label="节点水平间距"   option-key="nodeRange" ></property-number>
    <property-number label="下层节点垂直间距"   option-key="layerRange" ></property-number>
    <property-number label="上层节点垂直间距"   option-key="sourcelayerRange" ></property-number>
    <property-select label="垂直空间不够是否自动计算"  option-key="autoLayerRange"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <property-select label="是否显示内部图形"  option-key="showInnerShape"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <subheader text="连接线"/>
    <property-select label="连接线样式"  option-key="arrowType"
                     :options="[{text:'箭头',value:'default'},{text:'圆点',value:'arc'}]"></property-select>
    <property-number label="连接线宽度" option-key="connLineWidth" ></property-number>
    <property-color label="连接线颜色" option-key="connLineColor" ></property-color>
    <property-select label="是否显示箭头"  option-key="showArrow"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-number label="箭头大小" option-key="arrowWidth" ></property-number>
    <property-color label="箭头颜色"   option-key="arrowColor"></property-color>

  </div>
</template>
<script>

  export default {
    name:'structureProps'
  }
</script>
