<template>
  <div>
    <Property label="是否使用提示" ui="select" v-model="tooltip.show" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <divider/>
    <subheader text="格式模版"/>
    <Property label="普通提示模版" ui="text"  v-model="tooltip.formatter"></Property>
    <Property label="孤岛提示模版" ui="text"  v-model="tooltip.islandFormatter"></Property>
    <divider/>
    <subheader text="提示外观"/>
    <Property label="背景颜色" ui="color"     v-model="tooltip.backgroundColor"></Property>
    <Property label="边框粗细" ui="number-px" v-model="tooltip.borderWidth"></Property>
    <Property label="边框颜色" ui="color"     v-model="tooltip.borderColor"></Property>
    <Property label="边框圆角" ui="number-px" v-model="tooltip.borderRadius"></Property>
    <Property label="内边距"   ui="number-px" v-model="tooltip.padding"></Property>
    <divider/>
    <subheader text="提示文本样式"/>
    <Property label="文字颜色" ui="color"     v-model="tooltip.textStyle.color"></Property>
    <Property label="文字大小" ui="number-px" v-model="tooltip.textStyle.fontSize"></Property>
    <Property label="字体样式" ui="select"    v-model="tooltip.textStyle.fontStyle" :options="[
          {text:'普通',value:'normal'},
          {text:'斜体（italic）',value:'italic'},
          {text:'倾斜文字（oblique）',value:'oblique'}
    ]"></Property>
    <Property label="字体粗细" ui="select"    v-model="tooltip.textStyle.fontWeight" :options="[
          {text:'普通',value:'normal'},
          {text:'加粗',value:'bold'},
          {text:'更粗',value:'bolder'},
          {text:'更新',value:'lighter'}
    ]"></Property>
    <Property label="文本水平对齐方式" ui="select" v-model="tooltip.textStyle.align" :options="[
          {text:'居左',value:'left'},
          {text:'居右',value:'right'},
          {text:'居中',value:'center'}
    ]"></Property>
    <Property label="文本垂直对齐方式" ui="select" v-model="tooltip.textStyle.baseline" :options="[
          {text:'居上',value:'top'},
          {text:'居下',value:'bottom'},
          {text:'居中',value:'middle'}
    ]"></Property>
    <subheader text="外观"/>
    <divider/>
    <Property label="提示触发点" ui="select" v-model="tooltip.trigger" :options="[
          {text:'在项上触发',value:'item'},
          {text:'在轴上触发',value:'axis'},
    ]"></Property>
    <Property label="提示的指示器类型" ui="select" v-model="tooltip.axisPointer.type" :options="[
          {text:'提示线',value:'line'},
          {text:'提示阴影',value:'shadow'},
          {text:'无',value:'none'}
    ]"></Property>
    <subheader text="提示线样式设置"/>
    <Property label="线条颜色"  ui="color"     v-model="tooltip.axisPointer.lineStyle.color"></Property>
    <Property label="线条宽度"  ui="number-px" v-model="tooltip.axisPointer.lineStyle.width"></Property>
    <Property label="线条类型"  ui="select"    v-model="tooltip.axisPointer.lineStyle.type" :options="[
          {text:'实线',value:'solid'},
          {text:'点状线',value:'dotted'},
          {text:'虚线',value:'dashed'}
    ]"></Property>
    <subheader text="提示阴影样式设置"/>
    <Property label="区域填充颜色"  ui="select" v-model="tooltip.axisPointer.areaStyle.type" :options="[
          {text:'填充',value:'default'},
          {text:'不填充',value:undefined}
    ]"></Property>
    <Property label="区域填充颜色自定义"  ui="color" v-model="tooltip.axisPointer.areaStyle.color"></Property>
    <divider/>
    <subheader text="延时和动画"/>
    <Property label="显示延迟"     ui="number-px" v-model="tooltip.showDelay"></Property>
    <Property label="隐藏延迟"     ui="number-px" v-model="tooltip.hideDelay"></Property>
    <Property label="动画变换时长" ui="number-px" v-model="tooltip.transitionDuration"></Property>

  </div>
</template>
