<template>
  <div>
    <subheader text="中心位置"/>
    <property-number label="水平位置"  unit="%"
                     option-key="radar.center[0]"></property-number>
    <property-number label="垂直位置"  unit="%"
                     option-key="radar.center[1]"></property-number>
    <divider/>
    <property-number label="半径"  unit="%"
                     option-key="radar.radius"></property-number>
    <property-number label="坐标系起始角度"
                     option-key="radar.startAngle"></property-number>
    <property-number label="宽度"  unit="%"
                     option-key="radar.width"></property-number>
    <property-number label="高度"  unit="%"
                     option-key="radar.height"></property-number>
    <subheader text="指示器名称"/>
    <property-select label="显示"
                     option-key="radar.name.show" :options="[{text:'是',value:true},{text:'否',value:false}]">
    </property-select>
    <property-text   label="内容"
                     option-key="radar.name.formatter"></property-text>

    <property-color  label="文本颜色"
                     option-key="radar.name.color"></property-color>

    <property-number label="字体大小"  unit="px"
                     option-key="radar.name.fontSize" ></property-number>

    <property-text   label="字体系列"
                     option-key="radar.name.fontFamily" ></property-text>

    <property-select label="字体样式"
                     option-key="radar.name.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>

    <property-select label="字体粗细"
                     option-key="radar.name.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]">
    </property-select>
    <divider/>
    <property-color  label="背景色"
                     option-key="radar.name.backgroundColor"></property-color>

    <property-number label="边框线宽"  unit="px"
                     option-key="radar.name.borderWidth"></property-number>

    <property-color  label="边框颜色"
                     option-key="radar.name.borderColor"></property-color>

    <property-number label="标题内边距"  unit="px"
                     option-key="radar.name.padding"></property-number>
    <divider/>
    <property-number label="阴影模糊大小"
                     option-key="radar.name.shadowBlur" ></property-number>
    <property-color  label="阴影颜色"
                     option-key="radar.name.shadowColor"></property-color>
    <property-number label="阴影水平方向上的偏移距离"  unit="px"
                     option-key="radar.name.shadowOffsetX" ></property-number>
    <property-number label="阴影垂直方向上的偏移距离"  unit="px"
                     option-key="radar.name.shadowOffsetY" ></property-number>
    <divider/>
    <property-number label="文字描边线宽"  unit="px"
                     option-key="radar.name.textBorderWidth"></property-number>
    <property-color  label="文字描边颜色"
                     option-key="radar.name.textBorderColor"></property-color>
    <property-number label="文本阴影模糊大小"
                     option-key="radar.name.textShadowBlur" ></property-number>
    <property-color  label="文本阴影颜色"
                     option-key="radar.name.textShadowColor"></property-color>
    <property-number label="文本阴影水平方向上的偏移距离"  unit="px"
                     option-key="radar.name.textShadowOffsetX" ></property-number>
    <property-number label="文本阴影垂直方向上的偏移距离"  unit="px"
                     option-key="radar.name.textShadowOffsetY" ></property-number>
    <divider/>
    <property-number label="名称与轴的间距"
                     option-key="radar.nameGap" ></property-number>
    <property-number label="轴的分割段数"
                     option-key="radar.splitNumber" ></property-number>
    <property-select label="绘制类型"
                     option-key="radar.shape" :options="[{text:'多边型',value:'polygon'},{text:'圆形',value:'circle'}]">
    </property-select>

  </div>
</template>
<script>
  export default {
     name:'EchartsRadar',
  }
</script>
