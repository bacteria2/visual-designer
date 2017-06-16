<template>
  <div>
    <subheader text="拖拽重计算"/>
    <divider/>
    <property-select label="启用拖拽重计算"           option-key="option.calculable" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
    <property-color  label="拖拽重计算边框颜色"       option-key="option.calculableColor"></property-color>
    <property-color  label="拖拽重计算占位提示颜色"   option-key="option.calculableHolderColor"></property-color>
    <divider/>
    <subheader text="动画"/>
    <property-select label="图表初始化动画"           option-key="option.animation" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
    <property-number label="阀值（超出该值则不出动画）"  option-key="option.animationThreshold" unit="px" :min="0" :max="3000" :step="50"></property-number>
    <property-number label="动画时长"                 option-key="option.animationDuration" unit="ms" :min="0" :max="5000" :step="100"></property-number>
    <property-select label="图表初始化动画"           option-key="option.animationEasing"
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
]"></property-select></div>
</template>

