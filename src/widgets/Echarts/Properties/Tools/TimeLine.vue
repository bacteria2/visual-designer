<template>
  <div>
    <property-select label="自动播放" option-key="ydptimeline.autoPlay"
                     :options="[{text: '开始', value: true},
                                {text: '关闭', value: false}
                                ]
"/>
    <property-number label="播放速度(毫秒)" option-key="ydptimeline.playInterval"/>
    <property-select label="轴类型" option-key="ydptimeline.axisType"
                     :options="[{text: '时间', value: 'time'},
                                {text: '数值', value: 'value'},
                                {text: '分类',value:'category'}]
"/>
    <subheader text="位置"/>
        <property-number label="上边距" option-key="ydptimeline.top"/>
        <property-number label="左边距" option-key="ydptimeline.left"/>
        <property-select label="方向" option-key="ydptimeline.orient"
                     :options="[{text: '水平', value: 'horizontal'}, {text: '垂直', value: 'vertical'}]"/>
    <divider/>
    <subheader text="大小"/>
      <property-number label="宽" option-key="ydptimeline.width"/>
      <property-number label="高" option-key="ydptimeline.height"/>
    <divider/>
    <subheader text="样式"/>
    <property-color label="线条颜色" option-key="ydptimeline.lineStyle.color"/>
    <property-color label="标签颜色" option-key="ydptimeline.label.color"/>

    <property-color label="边框颜色" option-key="ydptimeline.itemStyle.normal.borderColor"/>
    <property-number label="边框宽度" option-key="ydptimeline.itemStyle.normal.borderWidth"/>

    <subheader text="控制器"/>
    <property-select label="显示后退按钮" option-key="ydptimeline.controlStyle.showPrevBtn"
                     :options="[{text: '开始', value: true},
                                {text: '关闭', value: false}
                                ]"/>
    <property-select label="显示前进按钮" option-key="ydptimeline.controlStyle.showNextBtn"
                     :options="[{text: '开始', value: true},
                                {text: '关闭', value: false}
                                ]"/>
    <property-color label="按钮边框颜色" option-key="ydptimeline.normal.borderColor"/>
  </div>
</template>
<script>
  export default {
    name:'EchartsTimeLine'
  }
</script>
