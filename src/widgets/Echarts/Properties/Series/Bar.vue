<template>
  <div>
    <property-select label="多X轴时本系列使用哪个X轴"  :component-type="type" :series-index="index" option-key="index"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
    <property-select label="多Y轴时本系列使用哪个Y轴"  :component-type="type" :series-index="index" option-key="yAxisIndex"  :options="[{text:'轴A',value:0},{text:'轴B',value:1}]"></property-select>
    <divider/>
    <subheader text="柱外观设置（针对本系列）"/>
    <property-switch label="同类目柱间距离" :ui="['number-px','number-%']"   :component-type="type" :series-index="index" option-key="barGap" ></property-switch>
    <property-switch label="不同类目柱间距离" :ui="['number-px','number-%']"   :component-type="type" :series-index="index" option-key="barCategoryGap" ></property-switch>
    <property-number label="柱条最小高度"  unit="px" :min="0" :max="50" :step="1" :component-type="type" :series-index="index" option-key="barMinHeight" ></property-number>
    <property-number label="柱条宽度"  unit="px"  :component-type="type" :series-index="index" option-key="barWidth" ></property-number>

    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="系列特定主色" :component-type="type" :series-index="index" option-key="itemStyle.normal.color"></property-color>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="label.normal.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="位置"  :component-type="type" :series-index="index" option-key="label.normal.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
        <property-select label="内容" :component-type="type" :series-index="index" option-key="label.normal.formatter"></property-select>
        <property-color label="文本颜色"   :component-type="type" :series-index="index" option-key="label.normal.label.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="label.normal.label.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="label.normal.label.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="label.norma..textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>
      <div class="content" slot="emphasis">
        <property-color label="系列特定主色" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.color"></property-color>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="label.emphasis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="位置"  :component-type="type" :series-index="index" option-key="label.emphasis.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>
        <property-text label="内容" :component-type="type" :series-index="index" option-key="label.emphasis.formatter"></property-text>
        <property-color label="文本颜色"   :component-type="type" :series-index="index" option-key="label.emphasis.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="label.emphasis.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="label.emphasis.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="label.emphasis.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>
    </Group>
    <property-text label="堆积命名（同名系列会被堆积）" :component-type="type" :series-index="index" option-key="stack"></property-text>
    <divider/>
    <subheader text="图表标注"/>
    <property-select label="标记图形" :component-type="type" :series-index="index" option-key="markPoint.symbol" :options="[{text:'圆',value:'circle'},{text:'矩形',value:'rect'},{text:'圆矩形',value:'roundRect'},{text:'三角形',value:'triangle'},{text:'钻石',value:'diamond'},{text:'针',value:'pin'},{text:'箭头',value:'arrow'}]"></property-select>
    <property-number label="标记大小"  :component-type="type" :series-index="index" option-key="markPoint.symbolSize"></property-number>
    <property-number label="旋转角度"  :component-type="type" :series-index="index" option-key="markPoint.symbolRotate"></property-number>
    <property-switch label="标记偏移-X" :ui="['number-px','number-%']"   :component-type="type" :series-index="index" option-key="markPoint.symbolOffset[0]" ></property-switch>
    <property-switch label="标记偏移-Y" :ui="['number-px','number-%']"   :component-type="type" :series-index="index" option-key="markPoint.symbolOffset[1]" ></property-switch>
    <property-select label="显示类型"  :multiple="true" :component-type="type" :series-index="index" option-key="markPoint.data" :options="[{text:'最小值',value:{type : 'min', name: '最小值'}},{text:'平均值',value:{type : 'average', name: '平均值'}},{text:'最大值',value:{type : 'max', name: '最大值'}}]"></property-select>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="markPoint.label.normal.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.label.normal.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="markPoint.label.normal.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="markPoint.label.normal.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="markPoint.label.normal.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <subheader text="图形样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.itemStyle.normal.color"></property-color>
        <property-color label="描边颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.itemStyle.normal.borderColor"></property-color>
        <property-number label="描边线宽"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.normal.borderWidth" unit="px"></property-number>
        <property-select label="边框类型"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.normal.borderType"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.normal.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.normal.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.normal.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.itemStyle.normal.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.normal.opacity" :max="1" :step="0.1"></property-number>
      </div>
      <div class="content" slot="emphasis">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="markPoint.label.emphasis.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
       <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.label.emphasis.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="markPoint.label.emphasis.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="markPoint.label.emphasis.textStyle.fontStyle"
                         :options="[{text:'普通',value:'emphasis'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="markPoint.label.emphasis.textStyle.fontWeight"
                         :options="[{text:'普通',value:'emphasis'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <subheader text="图形样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.itemStyle.emphasis.color"></property-color>
        <property-color label="描边颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.itemStyle.emphasis.borderColor"></property-color>
        <property-number label="描边线宽"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.emphasis.borderWidth" unit="px"></property-number>
        <property-select label="边框类型"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.emphasis.borderType"
                         :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.emphasis.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.emphasis.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.emphasis.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="markPoint.itemStyle.emphasis.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markPoint.itemStyle.emphasis.opacity" :max="1" :step="0.1"></property-number>
      </div>
    </Group>

    <divider/>
    <subheader text="图表标线"/>
      <property-select label="显示类型"  :multiple="true" :component-type="type" :series-index="index" option-key="markLine.data"
                       :options="[{text:'最小值',value:{type : 'min', name: '最小值'}},
                                  {text:'平均值',value:{type : 'average', name: '平均值'}},
                                  {text:'最大值',value:{type : 'max', name: '最大值'}},
                                  {text:'最小到最大',value:[{type : 'min'},{type : 'max'}]},
                                  {text:'最小到平均',value:[{type : 'min'},{type : 'average'}]},
                                  {text:'平均到最大',value:[{type : 'average'},{type : 'max'}]}
                                  ]"></property-select>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="markLine.label.normal.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markLine.label.normal.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="markLine.label.normal.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="markLine.label.normal.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="markLine.label.normal.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <subheader text="线条样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markLine.lineStyle.normal.color"></property-color>
        <property-number label="线宽"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.normal.width" ></property-number>
        <property-select label="类型"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.normal.type"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.normal.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.normal.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.normal.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="markLine.lineStyle.normal.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.normal.opacity" :max="1" :step="0.1"></property-number>
        <property-number label="曲度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.normal.curveness" :max="1" :step="0.1"></property-number>
      </div>
      <div class="content" slot="emphasis">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="markLine.label.emphasis.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markLine.label.emphasis.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="markLine.label.emphasis.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="markLine.label.emphasis.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="markLine.label.emphasis.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <subheader text="线条样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markLine.lineStyle.emphasis.color"></property-color>
        <property-number label="线宽"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.emphasis.width" ></property-number>
        <property-select label="类型"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.emphasis.type"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.emphasis.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.emphasis.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.emphasis.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="markLine.lineStyle.emphasis.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.emphasis.opacity" :max="1" :step="0.1"></property-number>
        <property-number label="曲度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markLine.lineStyle.emphasis.curveness" :max="1" :step="0.1"></property-number>
      </div>
    </Group>
    <divider/>
    <subheader text="图表标域"/>
    <property-select label="显示类型"  :multiple="true" :component-type="type" :series-index="index" option-key="markArea.data"
                     :options="[{text:'最小到最大',value:[{type : 'min'},{type : 'max'}]},
                                  {text:'最小到平均',value:[{type : 'min'},{type : 'average'}]},
                                  {text:'平均到最大',value:[{type : 'average'},{type : 'max'}]}]"></property-select>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="markArea.label.normal.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.label.normal.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="markArea.label.normal.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="markArea.label.normal.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="markArea.label.normal.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <subheader text="图形样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.itemStyle.normal.color"></property-color>
        <property-color label="描边颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.itemStyle.normal.borderColor"></property-color>
        <property-number label="描边线宽"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.normal.borderWidth" unit="px"></property-number>
        <property-select label="边框类型"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.normal.borderType"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.normal.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.normal.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.normal.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.itemStyle.normal.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.normal.opacity" :max="1" :step="0.1"></property-number>
      </div>
      <div class="content" slot="emphasis">
        <subheader text="标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="markArea.label.emphasis.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.label.emphasis.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="markArea.label.emphasis.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="markArea.label.emphasis.textStyle.fontStyle"
                         :options="[{text:'普通',value:'emphasis'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="markArea.label.emphasis.textStyle.fontWeight"
                         :options="[{text:'普通',value:'emphasis'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <subheader text="图形样式"/>
        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.itemStyle.emphasis.color"></property-color>
        <property-color label="描边颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.itemStyle.emphasis.borderColor"></property-color>
        <property-number label="描边线宽"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.emphasis.borderWidth" unit="px"></property-number>
        <property-select label="边框类型"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.emphasis.borderType"
                         :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.emphasis.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.emphasis.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.emphasis.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="markArea.itemStyle.emphasis.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="markArea.itemStyle.emphasis.opacity" :max="1" :step="0.1"></property-number>
      </div>
    </Group>
  </div>
</template>
<script>
  export default {
    name:'Series-bar',
    props:{
        index:Number
    },
    data(){return{type:'series-bar'}},
  }
</script>
