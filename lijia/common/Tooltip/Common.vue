<template>
  <div>
    <property-select label="是否使用提示"  option-key="tooltip.show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <subheader text="格式模版"/>
    <property-text label="普通提示模版" option-key="tooltip.formatter"></property-text>
    <property-text label="孤岛提示模版" option-key="tooltip.islandFormatter"></property-text>
    <divider/>
    <subheader text="提示外观"/>
    <property-color label="背景颜色"  option-key="tooltip.backgroundColor"></property-color>
    <property-number label="边框粗细" unit="px" option-key="tooltip.borderWidth" :min="0" :max="30" :step="1"></property-number>
    <property-color label="边框颜色" option-key="tooltip.borderColor"></property-color>
    <property-number label="边框圆角" unit="px" option-key="tooltip.borderRadius" :min="0" :max="15" :step="1"></property-number>
    <property-number label="内边距" unit="px" option-key="tooltip.padding" :min="0" :max="10" :step="1"></property-number>
    <divider/>
    <subheader text="提示文本样式"/>
    <property-color label="文字颜色" option-key="tooltip.textStyle.color"></property-color>
    <property-number label="文字大小" unit="px" option-key="tooltip.textStyle.fontSize"></property-number>
    <property-select label="字体样式"  option-key="tooltip.textStyle.fontStyle" :options="[
          {text:'普通',value:'normal'},
          {text:'斜体（italic）',value:'italic'},
          {text:'倾斜文字（oblique）',value:'oblique'}
    ]"></property-select>
    <property-select label="字体粗细" option-key="tooltip.textStyle.fontWeight" :options="[
          {text:'普通',value:'normal'},
          {text:'加粗',value:'bold'},
          {text:'更粗',value:'bolder'},
          {text:'更新',value:'lighter'}
    ]"></property-select>
    <property-select label="文本水平对齐方式" option-key="tooltip.textStyle.align" :options="[
          {text:'居左',value:'left'},
          {text:'居右',value:'right'},
          {text:'居中',value:'center'}
    ]"></property-select>
    <property-select label="文本垂直对齐方式"  option-key="tooltip.textStyle.baseline" :options="[
          {text:'居上',value:'top'},
          {text:'居下',value:'bottom'},
          {text:'居中',value:'middle'}
    ]"></property-select>
    <subheader text="外观"/>
    <divider/>
    <property-select label="提示触发点" option-key="tooltip.trigger" :options="[
          {text:'在项上触发',value:'item'},
          {text:'在轴上触发',value:'axis'},
    ]"></property-select>
    <property-select label="提示的指示器类型"  option-key="tooltip.axisPointer.type" :options="[
          {text:'提示线',value:'line'},
          {text:'提示阴影',value:'shadow'},
          {text:'无',value:'none'}
    ]"></property-select>
    <subheader text="提示线样式设置"/>
    <property-color label="线条颜色"   option-key="tooltip.axisPointer.lineStyle.color"></property-color>
    <property-number label="线条宽度" unit="px" option-key="tooltip.axisPointer.lineStyle.width" :min="0" :max="20" :step="1"></property-number>
    <property-select label="线条类型" option-key="tooltip.axisPointer.lineStyle.type" :options="[
          {text:'实线',value:'solid'},
          {text:'点状线',value:'dotted'},
          {text:'虚线',value:'dashed'}
    ]"></property-select>
    <subheader text="提示阴影样式设置"/>
    <property-select label="区域填充颜色"  option-key="tooltip.axisPointer.areaStyle.type" :options="[
          {text:'填充',value:'default'},
          {text:'不填充',value:undefined}
    ]"></property-select>
    <property-color label="区域填充颜色自定义" option-key="tooltip.axisPointer.areaStyle.color"></property-color>
    <divider/>
    <subheader text="延时和动画"/>
    <property-number label="显示延迟" unit="ms" option-key="tooltip.showDelay" :min="0" :max="1000" :step="1000"></property-number>
    <property-number label="隐藏延迟" unit="ms" option-key="tooltip.hideDelay" :min="0" :max="1000" :step="1000"></property-number>
    <property-number label="动画变换时长"unit="ms" option-key="tooltip.transitionDuration" :min="0" :max="1000" :step="0.01"></property-number>
  </div>
</template>
<script>
  export default {
    name:'EchartTooltipCommon',
  }
</script>
