<template>
  <div>
    <property-select label="坐标轴的位置"
                     option-key="xAxis[0].position"
                     :options="[{text:'上',value:'top'},{text:'下',value:'bottom'}]"></property-select>
    <divider/>
    <property-text label="坐标轴名称"
                    option-key="xAxis[0].name"></property-text>
    <property-select label="坐标轴名称显示位置" unit="px"
                     option-key="xAxis[0].nameLocation"
                     :options="[{text:'位于开端',value:'start'},{text:'位于中间',value:'middle'},{text:'位于末端',value:'end'}]"></property-select>
    <subheader text="名称文字样式"/>
    <property-color label="文本颜色"
                    option-key="xAxis[0].nameTextStyle.color"></property-color>
    <property-number label="字体大小"  unit="px"
                     option-key="xAxis[0].nameTextStyle.fontSize" ></property-number>
    <property-select label="字体样式"
                     option-key="xAxis[0].nameTextStyle.fontStyle"
                 :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"
                     option-key="xAxis[0].nameTextStyle.fontWeight"
                 :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

    <divider/>
    <property-select label="区间策略（数值轴）"
                     option-key="xAxis[0].scale"
                     :options="[{text:'自适应',value:true},{text:'总是包含0值',value:false}]"></property-select>
    <property-text label="刻度最小值（数值轴）"
                   option-key="xAxis[0].min"></property-text>
    <property-text label="刻度最大值（数值轴）"
                   option-key="xAxis[0].max"></property-text>
    <property-select label="起始和结束两端空白策略（目录轴）"
                     option-key="xAxis[0].boundaryGap"  :options="[{text:'留空',value:true},{text:'顶头',value:false}]"></property-select>
    <property-number label="分割段数(数值轴)"
                     option-key="xAxis[0].splitNumber"  :max="300" :step="1"></property-number>
    <divider/>
    <subheader text="其他样式"/>
    <property-select label="是否显示 x 轴"
                     option-key="xAxis[0].show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="是否是反向坐标轴"
                     option-key="xAxis[0].inverse"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="坐标轴的标签是否响应和触发鼠标事件"
                     option-key="xAxis[0].triggerEvent"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-number label="X 轴所有图形的 zlevel 值" unit="px"
                     option-key="xAxis[0].zlevel" ></property-number>
    <property-number label="X 轴组件的所有图形的z值" unit="px"
                     option-key="xAxis[0].z" ></property-number>
    <property-number label="X 轴所在的 grid 的索引" unit="px"
                     option-key="xAxis[0].gridIndex" ></property-number>
    <property-number label="X 轴相对于默认位置的偏移" unit="px"
                     option-key="xAxis[0].offset" ></property-number>

    <property-number label="坐标轴名称与轴线之间的距离" unit="px"
                     option-key="xAxis[0].nameGap"  ></property-number>
    <property-number label="坐标轴名字旋转，角度值" unit="°"
                     option-key="xAxis[0].nameRotate" ></property-number>
    <property-number label="自动计算的坐标轴最小间隔大小"
                     option-key="xAxis[0].minInterval" ></property-number>
    <property-number label="强制设置坐标轴分割间隔" unit="px"
                     option-key="xAxis[0].interval" ></property-number>
    <property-number label="对数轴的底数" unit="px"
                     option-key="xAxis[0].logBase" ></property-number>
    <property-select label="坐标轴是否是静态无法交互"
                     option-key="xAxis[0].silent" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="坐标轴类型" unit="px"
                     option-key="xAxis[0].type"  :options="[{text:'数值轴',value:'value'},{text:'目录轴',value:'category'},{text:'时间轴',value:'time'},{text:'对数轴',value:'log'}]"></property-select>
  </div>
</template>
<script>
  export default {
     name:'EchartsXAxisBasic'
  }
</script>

