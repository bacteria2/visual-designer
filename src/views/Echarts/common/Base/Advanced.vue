<template>
  <div>
    <subheader text="拖拽重计算"/>
    <divider/>
    <Property label="启用拖拽重计算" ui="select" option-key="option.calculable" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="拖拽重计算边框颜色"  ui="color" option-key="option.calculableColor"></Property>
    <Property label="拖拽重计算占位提示颜色"  ui="color" option-key="option.calculableHolderColor"></Property>
    <divider/>
    <subheader text="动画"/>
    <Property label="图表初始化动画" ui="select" option-key="option.animation" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="阀值（超出该值则不出动画）" ui="number-px" option-key="option.animationThreshold"></Property>
    <Property label="动画时长"  ui="number-px" option-key="option.animationDuration"></Property>
    <Property label="图表初始化动画" ui="select" option-key="option.animationEasing"
              :options="[
                          {text:'linear',value:'linear'},
                          {text:'quadraticIn',value:'quadraticIn'},
                          {text:'quadraticOut',value:'quadraticOut'},
                          {text:'quadraticInOut',value:'quadraticInOut'},
                          {text:'cubicIn',value:'cubicIn'},
                          {text:'cubicOut',value:'cubicOut'},
                          {text:'cubicInOut',value:'cubicInOut'},
                          {text:'quarticIn',value:'quarticIn'},
                          {text:'quarticOut',value:'quarticOut'},
                          {text:'quarticInOut',value:'quarticInOut'},
                          {text:'quinticIn',value:'quinticIn'},
                          {text:'quinticOut',value:'quinticOut'},
                          {text:'quinticInOut',value:'quinticInOut'},
                          {text:'sinusoidalIn',value:'sinusoidalIn'},
                          {text:'sinusoidalOut',value:'sinusoidalOut'},
                          {text:'sinusoidalInOut',value:'sinusoidalInOut'},
                          {text:'exponentialIn',value:'exponentialIn'},
                          {text:'exponentialOut',value:'exponentialOut'},
                          {text:'exponentialInOut',value:'exponentialInOut'},
                          {text:'circularIn',value:'circularIn'},
                          {text:'circularOut',value:'circularOut'},
                          {text:'circularInOut',value:'circularInOut'},
                          {text:'elasticIn',value:'elasticIn'},
                          {text:'elasticOut',value:'elasticOut'},
                          {text:'elasticInOut',value:'elasticInOut'},
                          {text:'backIn',value:'backIn'},
                          {text:'backOut',value:'backOut'},
                          {text:'backInOut',value:'backInOut'},
                          {text:'bounceIn',value:'bounceIn'},
                          {text:'bounceOut',value:'bounceOut'},
                          {text:'bounceInOut',value:'bounceInOut'}
]"></Property></div>
</template>

