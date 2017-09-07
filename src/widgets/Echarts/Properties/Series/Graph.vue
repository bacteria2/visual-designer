<template>
  <div>
    <property-select label="图的布局"  :component-type="type" :series-index="index"
                     option-key="layout"  :options="[{text:'空布局',value:'none'},{text:'环形布局',value:'circular'},{text:'引导布局',value:'force'}]"></property-select>

    <property-switch label="水平位置"  :ui="['number-%','select']"  option-key="left" :component-type="type" :series-index="index"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]">
    </property-switch>

    <property-switch label="垂直位置" :ui="['number-%','select']"   option-key="right" :component-type="type" :series-index="index"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]">
    </property-switch>

    <property-switch label="宽度" option-key="width" :component-type="type" :series-index="index"
                     :ui="['number-px', 'number-%']"/>

    <property-switch label="高度" option-key="height" :component-type="type" :series-index="index"
                     :ui="['number-px', 'number-%']"/>

    <property-select label="图例联动高亮"  :component-type="type" :series-index="index"
                     option-key="legendHoverLink"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <property-select label="坐标系"  :component-type="type" :series-index="index"
                     option-key="coordinateSystem"  :options="[{text:'无',value:'none'},{text:'直角坐标系',value:'cartesian2d'},{text:'极坐标系',value:'polar'},{text:'地理坐标系',value:'geo'}]"></property-select>

    <property-number label="x轴序号（仅用于直角坐标系）"  :component-type="type" :series-index="index"
                     option-key="xAxisIndex" ></property-number>

    <property-number label="y轴序号（仅用于直角坐标系）"  :component-type="type" :series-index="index"
                     option-key="yAxisIndex" ></property-number>

    <property-number label="极坐标序号（仅用于极坐标系）"  :component-type="type" :series-index="index"
                     option-key="polarIndex" ></property-number>

    <property-number label="地理坐标序号（仅用于地理坐标系）"  :component-type="type" :series-index="index"
                     option-key="geoIndex" ></property-number>

    <property-select label="开始鼠标hover动画效果"  :component-type="type" :series-index="index"
                     option-key="hoverAnimation"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <subheader text="环形布局相关配置"/>
    <property-select label="是否旋转标签"  :component-type="type" :series-index="index"
                     option-key="circular.rotateLabel"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>

    <subheader text="力引导布局相关的配置"/>
    <property-number label="斥力因子" :component-type="type" :series-index="index"
                     option-key="force.repulsion" ></property-number>
    <property-number label="引力因子" :component-type="type" :series-index="index"
                     option-key="force.gravity" ></property-number>
    <property-number label="最小值边长趋向" :component-type="type" :series-index="index"
                     option-key="force.edgeLength[0]" ></property-number>
    <property-number label="最大值边长趋向" :component-type="type" :series-index="index"
                     option-key="force.edgeLength[1]" ></property-number>

    <divider/>
    <property-select label="缩放和平移模式"  :component-type="type" :series-index="index"
                     option-key="roam"  :options="[{text:'开启',value:true},{text:'关闭',value:false},{text:'只缩放',value:'scale'},{text:'只移动',value:'move'}]"></property-select>

    <property-number label="缩放比例（需启用缩放）" :component-type="type" :series-index="index"
                     option-key="force.nodeScaleRatio" ></property-number>

    <property-select label="节点拖拽（只在力引导布局可用）"  :component-type="type" :series-index="index"
                     option-key="roam"  :options="[{text:'开启',value:true},{text:'关闭',value:false}]"></property-select>

    <property-select label="标记图形" :component-type="type" :series-index="index"
                     option-key="symbol" :options="[{text:'圆',value:'circle'},{text:'矩形',value:'rect'},{text:'圆矩形',value:'roundRect'},{text:'三角形',value:'triangle'},{text:'钻石',value:'diamond'},{text:'针',value:'pin'},{text:'箭头',value:'arrow'}]"></property-select>

    <property-number label="标记大小"  :component-type="type" :series-index="index"
                     option-key="symbolSize"></property-number>

    <property-number label="旋转角度"  :component-type="type" :series-index="index"
                     option-key="symbolRotate"></property-number>

    <property-switch label="标记偏移-X" :ui="['number-px','number-%']"   :component-type="type" :series-index="index"
                     option-key="symbolOffset[0]" ></property-switch>

    <property-switch label="标记偏移-Y" :ui="['number-px','number-%']"   :component-type="type" :series-index="index"
                     option-key="symbolOffset[1]" ></property-switch>

    <property-select label="左端图形" :component-type="type" :series-index="index"
                     option-key="edgeSymbol[0]" :options="[{text:'圆',value:'circle'},{text:'矩形',value:'rect'},{text:'圆矩形',value:'roundRect'},{text:'三角形',value:'triangle'},{text:'钻石',value:'diamond'},{text:'针',value:'pin'},{text:'箭头',value:'arrow'}]"></property-select>

    <property-select label="右端图形" :component-type="type" :series-index="index"
                     option-key="edgeSymbol[1]" :options="[{text:'圆',value:'circle'},{text:'矩形',value:'rect'},{text:'圆矩形',value:'roundRect'},{text:'三角形',value:'triangle'},{text:'钻石',value:'diamond'},{text:'针',value:'pin'},{text:'箭头',value:'arrow'}]"></property-select>

    <!--<property-number label="两端标记大小"  :component-type="type" :series-index="index"
                     option-key="edgeSymbolSize"></property-number>-->

    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="系列特定主色" :component-type="type" :series-index="index"
                        option-key="itemStyle.normal.color"></property-color>
        <subheader text="边框属性"/>

        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>

        <property-color label="边框颜色" :component-type="type" :series-index="index"
                        option-key="itemStyle.normal.borderColor"></property-color>

        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="label.normal.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="label.normal.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>

        <property-select label="内容" :component-type="type" :series-index="index"
                         option-key="label.normal.formatter"></property-select>

        <property-color label="文本颜色"   :component-type="type" :series-index="index"
                        option-key="label.normal.color"></property-color>

        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontSize" unit="px"></property-number>

        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>

        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

        <subheader text="两端数据项标签"/>

        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.normal.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.normal.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>

        <property-select label="内容" :component-type="type" :series-index="index"
                         option-key="edgeLabel.normal.formatter"></property-select>

        <property-color label="文本颜色"   :component-type="type" :series-index="index"
                        option-key="edgeLabel.normal.color"></property-color>

        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.normal.fontSize" unit="px"></property-number>

        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.normal.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>

        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.normal.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

        <subheader text="线条样式"/>

        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="lineStyle.normal.color"></property-color>
        <property-number label="线宽"  :component-type="type" :series-index="index"
                         option-key="lineStyle.normal.width" ></property-number>
        <property-select label="类型"  :component-type="type" :series-index="index"
                         option-key="lineStyle.normal.type"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="lineStyle.normal.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="lineStyle.normal.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="lineStyle.normal.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="lineStyle.normal.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="lineStyle.normal.opacity" :max="1" :step="0.1"></property-number>
        <property-number label="曲度(0~1)"  :component-type="type" :series-index="index"
                         option-key="lineStyle.normal.curveness" :max="1" :step="0.1"></property-number>
      </div>

      <div class="content" slot="emphasis">
        <property-color label="系列特定主色" :component-type="type" :series-index="index"
                        option-key="itemStyle.emphasis.color"></property-color>
        <subheader text="边框属性"/>

        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>

        <property-color label="边框颜色" :component-type="type" :series-index="index"
                        option-key="itemStyle.emphasis.borderColor"></property-color>

        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>

        <property-select label="内容" :component-type="type" :series-index="index"
                         option-key="label.emphasis.formatter"></property-select>

        <property-color label="文本颜色"   :component-type="type" :series-index="index"
                        option-key="label.emphasis.color"></property-color>

        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontSize" unit="px"></property-number>

        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>

        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

        <subheader text="两端数据项标签"/>

        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.emphasis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.emphasis.position" :options="[{text:'上',value:'top'},{text:'下',value:'bottom'},{text:'左',value:'left'},{text:'右',value:'right'},{text:'内部',value:'inside'},{text:'内部下方',value:'insideBottom'},{text:'内部上方',value:'insideTop'},{text:'内部左方',value:'insideLeft'},{text:'内部右方',value:'insideRight'}]"></property-select>

        <property-select label="内容" :component-type="type" :series-index="index"
                         option-key="edgeLabel.emphasis.formatter"></property-select>

        <property-color label="文本颜色"   :component-type="type" :series-index="index"
                        option-key="edgeLabel.emphasis.color"></property-color>

        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.emphasis.fontSize" unit="px"></property-number>

        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.emphasis.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>

        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="edgeLabel.emphasis.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>

        <subheader text="线条样式"/>

        <property-color label="颜色"   :component-type="type" :series-index="index"
                        option-key="lineStyle.emphasis.color"></property-color>
        <property-number label="线宽"  :component-type="type" :series-index="index"
                         option-key="lineStyle.emphasis.width" ></property-number>
        <property-select label="类型"  :component-type="type" :series-index="index"
                         option-key="lineStyle.emphasis.type"  :options="[{text:'实线',value:'solid'},{text:'虚线',value:'dashed'},{text:'点线',value:'dotted'}]"></property-select>
        <property-number label="阴影模糊大小"  :component-type="type" :series-index="index"
                         option-key="lineStyle.emphasis.shadowBlur" ></property-number>
        <property-number label="阴影水平偏移量"  :component-type="type" :series-index="index"
                         option-key="lineStyle.emphasis.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直偏移量"  :component-type="type" :series-index="index"
                         option-key="lineStyle.emphasis.shadowOffsetY" ></property-number>
        <property-color label="阴影颜色"   :component-type="type" :series-index="index"
                        option-key="lineStyle.emphasis.shadowColor"></property-color>
        <property-number label="透明度(0~1)"  :component-type="type" :series-index="index"
                         option-key="lineStyle.emphasis.opacity" :max="1" :step="0.1"></property-number>
        <property-number label="曲度(0~1)"  :component-type="type" :series-index="index"
                         option-key="lineStyle.emphasis.curveness" :max="1" :step="0.1"></property-number>

      </div>
    </Group>

  </div>
</template>
<script>
  export default {
    name:'Series-graph',
    props:{
        index:Number
    },
    data(){return{type:'series-graph'}},
  }
</script>
