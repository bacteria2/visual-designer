<template>
  <div>
    <property-select label="显示"
                     option-key="radar.axisLabel.show" :options="[{text:'是',value:true},{text:'否',value:false}]">
    </property-select>
    <property-select label="标签朝内"
                     option-key="radar.axisLabel.inside" :options="[{text:'是',value:true},{text:'否',value:false}]">
    </property-select>
    <property-number label="标签旋转角度"
                     option-key="radar.axisLabel.rotate" ></property-number>

    <property-number label="标签与轴线距离"
                     option-key="radar.axisLabel.margin" ></property-number>

    <property-select label="显示最小tick"
                     option-key="radar.axisLabel.showMinLabel" :options="[{text:'是',value:true},{text:'否',value:false},{text:'自动',value:null}]">
    </property-select>

    <property-select label="显示最大tick"
                     option-key="radar.axisLabel.showMaxLabel" :options="[{text:'是',value:true},{text:'否',value:false},{text:'自动',value:null}]">
    </property-select>

    <property-text   label="内容"
                     option-key="radar.axisLabel.formatter"></property-text>

    <property-color  label="文本颜色"
                     option-key="radar.axisLabel.color"></property-color>

    <property-number label="字体大小"  unit="px"
                     option-key="radar.axisLabel.fontSize" ></property-number>

    <property-text   label="字体系列"
                     option-key="radar.axisLabel.fontFamily" ></property-text>

    <property-select label="字体样式"
                     option-key="radar.axisLabel.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>

    <property-select label="字体粗细"
                     option-key="radar.axisLabel.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]">
    </property-select>

    <property-select label="水平对齐方式"
                     option-key="radar.axisLabel.align" :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]">
    </property-select>

    <property-select label="垂直对齐方式"
                     option-key="radar.axisLabel.verticalAlign" :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'right'}]">
    </property-select>

    <divider/>
    <property-color  label="背景色"
                     option-key="radar.axisLabel.backgroundColor"></property-color>

    <property-number label="边框线宽"  unit="px"
                     option-key="radar.axisLabel.borderWidth"></property-number>

    <property-color  label="边框颜色"
                     option-key="radar.axisLabel.borderColor"></property-color>

    <property-number label="标题内边距"  unit="px"
                     option-key="radar.axisLabel.padding"></property-number>
    <divider/>
    <property-number label="阴影模糊大小"  option-key="radar.axisLabel.shadowBlur" ></property-number>
    <property-color  label="阴影颜色"  option-key="radar.axisLabel.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px" option-key="radar.axisLabel.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px" option-key="radar.axisLabel.shadowOffsetY" ></property-number>
    <divider/>
    <property-number label="文字描边线宽"  unit="px"
                     option-key="radar.axisLabel.textBorderWidth"></property-number>
    <property-color  label="文字描边颜色"
                     option-key="radar.axisLabel.textBorderColor"></property-color>
    <property-number label="文本阴影模糊大小"  option-key="radar.axisLabel.textShadowBlur" ></property-number>
    <property-color  label="文本阴影颜色"  option-key="radar.axisLabel.textShadowColor"></property-color>
    <property-number label="文本阴影水平方向上的偏移距离"  unit="px" option-key="radar.axisLabel.textShadowOffsetX" ></property-number>
    <property-number label="文本阴影垂直方向上的偏移距离"  unit="px" option-key="radar.axisLabel.textShadowOffsetY" ></property-number>

  </div>
</template>
<script>
  export default {
    name:'EchartsRadarAxisLable',
  }
</script>

