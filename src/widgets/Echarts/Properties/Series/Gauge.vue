<template>
  <div>
    <property-number label="值域范围（最小值）"  unit="px" option-key="series.min" :min="-50" :max="150" :step="1"></property-number>
    <property-number label="值域范围（最大值）"  unit="px" option-key="series.max" :min="-50" :max="150" :step="1"></property-number>
    <property-number label="分割段数"  unit="px" option-key="series.splitNumber"></property-number>
    <divider/>
    <subheader text="仪表盘基础设置"/>
    <!--仪表盘颜色-->
    <subheader text="圆心坐标"/>
    <property-switch label="X:"  option-key="series.center.x"  :ui="['number-px','number-%']" :min="0" :max="1400" :step="1"></property-switch>
    <property-switch label="Y:"  option-key="series.center.y" :ui="['number-px','number-%']" :min="0" :max="800" :step="1"></property-switch>
    <property-switch label="半径"  option-key="series.radius" :ui="['number-px','number-%']" :min="0" :max="400" :step="1"></property-switch>
    <property-number label="起始角度"  option-key="series.startAngle" unit="°" :min="-90" :max="270" :step="1" ></property-number>
    <property-number label="结束角度"  option-key="series.endAngle" unit="°" :min="-90" :max="270" :step="1" ></property-number>
    <divider/>
    <subheader text="盘内标题设置"/>
    <property-select label="盘内标题是否显示"  option-key="series.title.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-switch label="盘内标题位置（X偏移量）:"  option-key="series.title.offsetCenter.x"  :ui="['number-px','number-%']" :min="0" :max="1400" :step="1"></property-switch>
    <property-switch label="盘内标题位置（Y偏移量）:"  option-key="series.title.offsetCenter.y" :ui="['number-px','number-%']" :min="0" :max="800" :step="1"></property-switch>
    <property-number label="字体大小"  option-key="series.title.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  option-key="series.title.textStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="series.title.textStyle.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <divider/>
    <subheader text="仪表盘数据描述设置"/>
    <property-select label="数据描述是否显示" option-key="series.detail.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-color label="数据描述背景颜色" option-key="series.detail.backgroundColor"></property-color>
    <property-number label="数据描述宽度"  option-key="series.detail.width" unit="px" :min="0" :max="500" :step="1"></property-number>
    <property-number label="数据描述高度"  option-key="series.detail.height" unit="px" :min="0" :max="600" :step="1"></property-number>
    <property-number label="数据描述位置X"  option-key="series.detail.offsetCenter.x" unit="px" :min="-300" :max="300" :step="1"></property-number>
    <property-number label="数据描述位置Y"  option-key="series.detail.offsetCenter.y" unit="px" :min="-300" :max="300" :step="1"></property-number>
    <property-text label="数据描述内容模板"  option-key="series.detail.formatter" ></property-text>
    <property-number label="数据表述边框线宽"  option-key="series.detail.borderWidth" unit="px" :min="0" :max="30" :step="1"></property-number>
    <property-color label="数据表述边框颜色"  option-key="series.detail.borderColor"></property-color>
    <property-number label="字体大小"  option-key="series.detail.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  option-key="series.detail.textStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="series.detail.textStyle.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <divider/>
    <subheader text="仪表盘轮廓线设置"/>
    <property-select label="轮廓线是否显示" option-key="series.axisLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-number label="线条宽度" unit="px" option-key="series.axisLine.lineStyle.width" :min="0" :max="30" :step="1"></property-number>
    <!--更多选项开始-->
    <property-color  label="光影颜色"  option-key="series.axisLine.lineStyle.shadowColor"></property-color>
    <property-number label="光影模糊度"  unit="px" :min="0" :max="20" :step="1" option-key="series.axisLine.lineStyle.shadowBlur" ></property-number>
    <property-number label="光影横向偏移"  unit="px" :min="-10" :max="500" :step="1" option-key="series.axisLine.lineStyle.shadowOffsetX" ></property-number>
    <property-number label="光影纵向偏移"  unit="px" :min="-100" :max="100" :step="1" option-key="series.axisLine.lineStyle.shadowOffsetY" ></property-number>
    <!--更多选项结束-->
    <divider/>
    <subheader text="仪表盘刻度文字设置"/>
    <property-select label="刻度文字是否显示" option-key="series.axisLabel.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-text label="刻度文字内容模板"  option-key="series.axisLabel.formatter" ></property-text>
    <property-number label="字体大小"  option-key="series.axisLabel.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  option-key="series.axisLabel.textStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="series.axisLabel.textStyle.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <divider/>
    <subheader text="仪表盘刻度线设置"/>
    <property-select label="刻度线是否显示" option-key="series.axisTick.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-switch label="刻度线长度"  option-key="series.axisTick.length"  :ui="['number-px','number-%']" :min="0" :max="20" :step="1"></property-switch>
    <property-number label="刻度线分隔段数"  unit="px" :min="0" :max="20" :step="1" option-key="series.axisTick.splitNumber" ></property-number>
    <property-number label="线条宽度"  unit="px" :min="0" :max="20" :step="1" option-key="series.axisTick.lineStyle.width" ></property-number>
    <!--更多选项开始-->
    <property-select label="线条类型"  option-key="series.axisTick.lineStyle.type" :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-color  label="光影颜色"  option-key="series.axisLine.lineStyle.shadowColor"></property-color>
    <property-number label="光影模糊度"  unit="px" :min="0" :max="20" :step="1" option-key="series.axisLine.lineStyle.shadowBlur" ></property-number>
    <property-number label="光影横向偏移"  unit="px" :min="-10" :max="500" :step="1" option-key="series.axisLine.lineStyle.shadowOffsetX" ></property-number>
    <property-number label="光影纵向偏移"  unit="px" :min="-100" :max="100" :step="1" option-key="series.axisLine.lineStyle.shadowOffsetY" ></property-number>
    <!--更多选项结束-->
    <divider/>
    <subheader text="仪表盘主分割线设置"/>
    <property-select label="主分隔线是否显示" option-key="series.splitLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-switch label="主分隔线长度"  option-key="series.splitLine.length"  :ui="['number-px','number-%']" :min="0" :max="20" :step="1"></property-switch>
    <property-number label="线条宽度"  unit="px" :min="0" :max="20" :step="1" option-key="series.splitLine.lineStyle.width" ></property-number>
    <!--更多选项开始-->
    <property-select label="线条类型"  option-key="series.splitLine.lineStyle.type" :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-color  label="光影颜色"  option-key="series.splitLine.lineStyle.shadowColor"></property-color>
    <property-number label="光影模糊度"  unit="px" :min="0" :max="20" :step="1" option-key="series.splitLine.lineStyle.shadowBlur" ></property-number>
    <property-number label="光影横向偏移"  unit="px" :min="-10" :max="500" :step="1" option-key="series.splitLine.lineStyle.shadowOffsetX" ></property-number>
    <property-number label="光影纵向偏移"  unit="px" :min="-100" :max="100" :step="1" option-key="series.splitLine.lineStyle.shadowOffsetY" ></property-number>
    <!--更多选项结束-->
    <divider/>
    <subheader text="仪表盘指针设置"/>
    <property-switch label="仪表盘指针长度"  option-key="series.pointer.length" :ui="['number-px','number-%']"></property-switch>
    <property-switch label="仪表盘指针宽度"  option-key="series.pointer.width" :ui="['number-px','number-%']"  :min="0" :max="30" :step="1" ></property-switch>
    <divider/>
    <subheader text="数据标注设置"/>
    <property-select label="显示数据标注" option-key="series.markPoint._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <subheader text="标线设置"/>
    <property-select label="显示标线" option-key="series.markLine._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

  </div>
</template>
<script>
  export default {
    name:'Series-Gauge',
  }
</script>
