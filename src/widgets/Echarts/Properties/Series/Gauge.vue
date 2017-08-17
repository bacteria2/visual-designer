<template>
  <div>
    <subheader text="值域"/>
    <property-text label="标题"  :component-type="type" :series-index="index" option-key="data[0].name" ></property-text>
    <property-number label="最小值"    :component-type="type" :series-index="index" option-key="min"  :max="10000"></property-number>
    <property-number label="最大值"    :component-type="type" :series-index="index" option-key="max"  :max="10000"></property-number>
    <property-number label="分割段数"  :component-type="type" :series-index="index" option-key="splitNumber"></property-number>
    <divider/>
    <subheader text="仪表盘基础设置"/>
    <!--仪表盘颜色-->
    <subheader text="圆心坐标"/>
    <property-switch label="X"    :component-type="type" :series-index="index" option-key="center[0]"  :ui="['number-%','number-px']"   :max="2000"></property-switch>
    <property-switch label="Y"    :component-type="type" :series-index="index" option-key="center[1]"  :ui="['number-%','number-px']"   :max="2000"></property-switch>
    <property-switch label="半径"  :component-type="type" :series-index="index" option-key="radius"    :ui="['number-%','number-px']"   :max="900"></property-switch>
    <property-number label="起始角度"  :component-type="type" :series-index="index" option-key="startAngle" unit="°" :min="-90" :max="270"></property-number>
    <property-number label="结束角度"  :component-type="type" :series-index="index" option-key="endAngle" unit="°" :min="-90" :max="270"  ></property-number>
    <divider/>
    <subheader text="盘内标题设置"/>
    <property-select label="显示"  :component-type="type" :series-index="index" option-key="title.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-switch label="位置（X偏移量）:"  :component-type="type" :series-index="index" option-key="title.offsetCenter[0]"  :ui="['number-px','number-%']" :max="1400"></property-switch>
    <property-switch label="位置（Y偏移量）:"  :component-type="type" :series-index="index" option-key="title.offsetCenter[1]" :ui="['number-px','number-%']"  :max="800" ></property-switch>
    <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="title.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="title.textStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="title.textStyle.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <divider/>
    <subheader text="仪表盘数据描述设置"/>
    <property-select label="显示" :component-type="type" :series-index="index" option-key="detail.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-color label="背景颜色" :component-type="type" :series-index="index" option-key="detail.backgroundColor"></property-color>
    <property-number label="宽度"  :component-type="type" :series-index="index" option-key="detail.width" unit="px"  :max="500" ></property-number>
    <property-number label="高度"  :component-type="type" :series-index="index" option-key="detail.height" unit="px" :max="600"></property-number>
    <property-number label="位置X"  :component-type="type" :series-index="index" option-key="detail.offsetCenter.x" unit="px" :min="-300" :max="300"></property-number>
    <property-number label="位置Y"  :component-type="type" :series-index="index" option-key="detail.offsetCenter.y" unit="px" :min="-300" :max="300"></property-number>
    <property-text label="内容"  :component-type="type" :series-index="index" option-key="detail.formatter" ></property-text>
    <property-number label="数据表述边框线宽"  :component-type="type" :series-index="index" option-key="detail.borderWidth" unit="px" :min="0" :max="30" :step="1"></property-number>
    <property-color label="数据表述边框颜色"  :component-type="type" :series-index="index" option-key="detail.borderColor"></property-color>
    <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="detail.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="detail.textStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="detail.textStyle.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <divider/>
    <subheader text="仪表盘轮廓线设置"/>
    <property-select label="轮廓线是否显示" :component-type="type" :series-index="index" option-key="axisLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-number label="线条宽度" unit="px" :component-type="type" :series-index="index" option-key="axisLine.lineStyle.width" :min="0" :max="30" :step="1"></property-number>
    <property-color-list label="颜色列表" :component-type="type" :series-index="index" option-key="axisLine.lineStyle.color" :isGaugeColors="true"/>
    <!--更多选项开始-->
    <subheader text="光影设置"/>
    <property-color  label="颜色"      :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowColor"></property-color>
    <property-number label="模糊度"    :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowBlur" :max="20"></property-number>
    <property-number label="水平偏移"  :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowOffsetX" unit="px" :min="-10" :max="500"></property-number>
    <property-number label="垂直偏移"  :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowOffsetY" unit="px" :min="-100" :max="100"></property-number>
    <!--更多选项结束-->
    <divider/>
    <subheader text="仪表盘刻度文字设置"/>
    <property-select label="刻度文字是否显示" :component-type="type" :series-index="index" option-key="axisLabel.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-text label="刻度文字内容模板"  :component-type="type" :series-index="index" option-key="axisLabel.formatter" ></property-text>
    <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="axisLabel.textStyle.fontSize" unit="px"></property-number>
    <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="axisLabel.textStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="axisLabel.textStyle.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <divider/>
    <subheader text="仪表盘刻度线设置"/>
    <property-select label="刻度线是否显示" :component-type="type" :series-index="index" option-key="axisTick.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-switch label="刻度线长度"     :component-type="type" :series-index="index" option-key="axisTick.length"  :ui="['number-px','number-%']"  :max="20"></property-switch>
    <property-number label="刻度线分隔段数" :component-type="type" :series-index="index" option-key="axisTick.splitNumber" :max="20"></property-number>
    <property-number label="线条宽度"       :component-type="type" :series-index="index" option-key="axisTick.lineStyle.width"  unit="px" :max="20"></property-number>
    <!--更多选项开始-->
    <property-select label="线条类型"       :component-type="type" :series-index="index" option-key="axisTick.lineStyle.type" :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-color  label="光影颜色"       :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowColor"></property-color>
    <property-number label="光影模糊度"     :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowBlur" :max="20"></property-number>
    <property-number label="光影水平偏移"   :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowOffsetX" unit="px" :min="-10"  :max="500" ></property-number>
    <property-number label="光影垂直偏移"   :component-type="type" :series-index="index" option-key="axisLine.lineStyle.shadowOffsetY" unit="px" :min="-100" :max="100"></property-number>
    <!--更多选项结束-->
    <divider/>
    <subheader text="仪表盘主分割线设置"/>
    <property-select label="主分隔线是否显示" :component-type="type" :series-index="index" option-key="splitLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-switch label="主分隔线长度"  :component-type="type" :series-index="index" option-key="splitLine.length"   :ui="['number-px','number-%']" :max="20"></property-switch>
    <property-number label="线条宽度"      :component-type="type" :series-index="index" option-key="splitLine.lineStyle.width"   unit="px" :max="20"></property-number>
    <!--更多选项开始-->
    <property-select label="线条类型"  :component-type="type" :series-index="index" option-key="splitLine.lineStyle.type" :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></property-select>
    <property-color  label="光影颜色"  :component-type="type" :series-index="index" option-key="splitLine.lineStyle.shadowColor"></property-color>
    <property-number label="光影模糊度"     :component-type="type" :series-index="index" option-key="splitLine.lineStyle.shadowBlur"    unit="px" :max="20" ></property-number>
    <property-number label="光影水平偏移"   :component-type="type" :series-index="index" option-key="splitLine.lineStyle.shadowOffsetX" unit="px" :min="-10" :max="500"></property-number>
    <property-number label="光影垂直偏移"   :component-type="type" :series-index="index" option-key="splitLine.lineStyle.shadowOffsetY" unit="px" :min="-100" :max="100"></property-number>
    <!--更多选项结束-->
    <divider/>
    <subheader text="仪表盘指针设置"/>
    <property-select label="显示" :component-type="type" :series-index="index" option-key="pointer.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-switch label="仪表盘指针长度"  :component-type="type" :series-index="index" option-key="pointer.length" :ui="['number-px','number-%']"></property-switch>
    <property-switch label="仪表盘指针宽度"  :component-type="type" :series-index="index" option-key="pointer.width" :ui="['number-px','number-%']" :max="30" ></property-switch>

  </div>
</template>
<script>
  export default {
    name:'Series-gauge',
    props:{
      index:Number
    },
    data(){return{type:'series-gauge'}},
  }
</script>
