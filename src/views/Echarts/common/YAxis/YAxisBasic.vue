<template>
  <div>
    <property-select label="坐标轴的位置" option-key="yAxis.position"   :options="[{text:'左',value:'left'},{text:'右',value:'right'},{text:'上',value:'top'},{text:'下',value:'bottom'}]"></property-select>
    <divider/>
    <property-text label="坐标轴名称" option-key="yAxis.name"></property-text>
    <property-select label="坐标轴名称显示位置" option-key="yAxis.nameLocation" :options="[{text:'位于开端',value:'start'},{text:'位于中间',value:'middle'},{text:'位于末端',value:'end'}]"></property-select>
    <subheader text="坐标轴名称文字样式"/>
    <property-color label="文本颜色"  option-key="yAxis.nameTextStyle.color"></property-color>
    <property-number label="字体大小"  unit="px" option-key="yAxis.textStyle.fontSize" ></property-number>
    <property-select label="字体样式"  option-key="yAxis.textStyle.fontStyle"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="yAxis.textStyle.fontWeight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-select label="文本水平对齐方式" option-key="yAxis.textStyle.align"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-select>
    <property-select label="文本垂直对齐方式" option-key="yAxis.textStyle.baseline"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-select>
    <divider/>
    <property-select label="坐标轴显示区间策略" option-key="yAxis.scale"  :options="[{text:'根据最大最小值自适应',value:true},{text:'总是包含0值',value:false}]"></property-select>
    <property-text label="坐标轴刻度最小值" option-key="yAxis.min"></property-text>
    <property-text label="坐标轴刻度最大值" option-key="yAxis.max"></property-text>
    <property-select label="类目起始和结束两端空白策略" option-key="yAxis.boundaryGap"  :options="[{text:'留空',value:true},{text:'顶头',value:false}]"></property-select>
    <property-number label="分割段数"  unit="px" option-key="yAxis.splitNumber" :min="0" :max="300" :step="1"></property-number>
    <divider/>
    <subheader text="其他样式"/>
    <property-select label="是否显示 x 轴" option-key="yAxis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="是否是反向坐标轴" option-key="yAxis.inverse"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="坐标轴的标签是否响应和触发鼠标事件" option-key="yAxis.triggerEvent"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-number label="Y 轴所有图形的 zlevel 值" unit="px" option-key="yAxis.zlevel" ></property-number>
    <property-number label="Y 轴组件的所有图形的z值" unit="px" option-key="yAxis.z" ></property-number>
    <property-number label="Y 轴所在的 grid 的索引" unit="px" option-key="yAxis.gridIndex" ></property-number>
    <property-number label="Y 轴相对于默认位置的偏移" unit="px" option-key="yAxis.offset" ></property-number>
    <property-select label="坐标轴名称与轴线之间的距离" unit="px" option-key="yAxis.nameGap"  :options="[{text:'是',value:true},{text:'否',value:false}]" ></property-select>
    <property-number label="坐标轴名字旋转，角度值" unit="°" option-key="yAxis.nameRotate" ></property-number>
    <property-number label="自动计算的坐标轴最小间隔大小" unit="px" option-key="yAxis.minInterval" ></property-number>
    <property-number label="强制设置坐标轴分割间隔" unit="px" option-key="yAxis.interval" ></property-number>
    <property-number label="对数轴的底数" unit="px" option-key="yAxis.logBase" ></property-number>
    <property-select label="坐标轴是否是静态无法交互" option-key="yAxis.silent" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="坐标轴类型" option-key="yAxis.type"  :options="[{teYt:'数值轴',value:'value'},{text:'目录轴',value:'category'},{text:'时间轴',value:'time'},{text:'对数轴',value:'log'}]"></property-select>
  </div>
</template>
<script>
  export default {
    name:'EchartsYAxisBasic',
  }
</script>
