<template>
  <div class="widget-dataBlock-block">
    <subheader text="数据块样式"/>
    <property-switch label="数据块宽度" :component-type="type" :series-index="index" option-key="blockStyle.width" :ui="['number-px','number-%']" :min="0" :max="1000" :step="1"/>
    <property-number label="数据块高度" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.height" :min="0" :step="1" :max="1000"/>
    <property-number label="数据块行高" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.line-height" :min="0" :step="1" :max="1000"/>
    <property-color label="数据块字体颜色" :component-type="type" :series-index="index"  option-key="blockStyle.color" />
    <property-number label="数据块字体大小" :component-type="type" :series-index="index"  unit="px" option-key="blockStyle.font-size" :min="0" :max="100" :step="1" />
    <property-number label="数据块字体间距" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.letter-spacing" :min="0" :max="30" :step="1"/>
    <property-text label="数据块字体系列"  :component-type="type" :series-index="index"  option-key="blockStyle.font-family" />
    <property-select label="数据块字体样式" :component-type="type" :series-index="index" option-key="blockStyle.font-style"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>
    <property-select label="数据块字体粗细" :component-type="type" :series-index="index" option-key="blockStyle.font-weight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
    </property-select>
    <property-number label="数据块边框粗细" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.border-width"  :min="0" :max="30" :step="1"/>
    <property-color label="数据块边框颜色" :component-type="type" :series-index="index" option-key="blockStyle.border-color"/>
    <property-select label="数据块线条类型" :component-type="type" :series-index="index" option-key="blockStyle.border-style"
                     :options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]">
    </property-select>
    <property-color label="数据块背景颜色" :component-type="type" :series-index="index" option-key="blockStyle.background"/>
    <property-switch label="数据块圆角" :component-type="type" :series-index="index" option-key="blockStyle.border-radius" :ui="['number-px','number-%']"  :min="0" :max="30" :step="1">
    </property-switch>
    <property-number label="数据块外边距(上)" :component-type="type" :series-index="index"  unit="px" option-key="blockStyle.margin-top" :min="0" :step="1" :max="300"/>
    <property-number label="数据块外边距(右)" :component-type="type" :series-index="index"  unit="px" option-key="blockStyle.margin-right" :min="0" :step="1" :max="300"/>
    <property-number label="数据块外边距(下)" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.margin-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="数据块外边距(左)" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.margin-left" :min="0" :step="1" :max="300"/>
    <property-number label="数据块内边距(上)" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.padding-top" :min="0" :step="1" :max="300"/>
    <property-number label="数据块内边距(右)" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.padding-right" :min="0" :step="1" :max="300"/>
    <property-number label="数据块内边距(下)" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.padding-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="数据块内边距(左)" :component-type="type" :series-index="index" unit="px" option-key="blockStyle.padding-left" :min="0" :step="1" :max="300"/>
    <divider/>
    <subheader text="数据块标签"/>
    <property-text  label="标签内容" :component-type="type" :series-index="index" option-key="titleStyle.text"/>
    <property-switch label="标签宽度" :component-type="type" :series-index="index" option-key="titleStyle.width" :ui="['number-px','number-%']" :min="0" :max="1000" :step="1"/>
    <property-number label="标签高度" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.height" :min="0" :step="1" :max="1000"/>
    <property-number label="标签行高" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.line-height" :min="0" :step="1" :max="1000"/>
    <property-color label="标签字体颜色" :component-type="type" :series-index="index"  option-key="titleStyle.color" />
    <property-number label="标签字体大小" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.font-size" />
    <property-number label="标签字体间距" :component-type="type" :series-index="index"  unit="px" option-key="titleStyle.letter-spacing" :min="0" :max="30" :step="1" />
    <property-text label="标签字体系列"  :component-type="type" :series-index="index"  option-key="titleStyle.font-family" />
    <property-select label="标签字体样式" :component-type="type" :series-index="index" option-key="titleStyle.font-style"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>
    <property-select label="标签字体粗细" :component-type="type" :series-index="index" option-key="titleStyle.font-weight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
    </property-select>
    <property-number label="标签边框粗细" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.border-width"  :min="0" :max="30" :step="1"/>
    <property-color label="标签边框颜色" :component-type="type" :series-index="index" option-key="titleStyle.border-color" />
    <property-select label="标签线条类型" :component-type="type" :series-index="index" option-key="titleStyle.border-style"
                     :options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]">
    </property-select>
    <property-color label="标签背景颜色" :component-type="type" :series-index="index" option-key="titleStyle.background"/>
    <property-switch label="标签圆角" :component-type="type" :series-index="index" option-key="titleStyle.border-radius" :ui="['number-px','number-%']"  :min="0" :max="30" :step="1">
    </property-switch>
    <property-number label="标签外边距(上)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.margin-top" :min="0" :step="1" :max="300"/>
    <property-number label="标签外边距(右)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.margin-right" :min="0" :step="1" :max="300"/>
    <property-number label="标签外边距(下)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.margin-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="标签外边距(左)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.margin-left" :min="0" :step="1" :max="300"/>
    <property-number label="标签内边距(上)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.padding-top" :min="0" :step="1" :max="300"/>
    <property-number label="标签内边距(右)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.padding-right" :min="0" :step="1" :max="300"/>
    <property-number label="标签内边距(下)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.padding-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="标签内边距(左)" :component-type="type" :series-index="index" unit="px" option-key="titleStyle.padding-left" :min="0" :step="1" :max="300"/>
    <property-select label="标签是否显示" :component-type="type" :series-index="index" option-key="titleStyle.display"
                     :options="[{text:'是',value:'true'},{text:'否',value:'false'}]">
    </property-select>
    <divider/>
    <subheader text="数据块数据"/>
    <property-switch label="数据宽度" :component-type="type" :series-index="index" option-key="dataStyle.width" :ui="['number-px','number-%']" :min="0" :max="1000" :step="1"/>
    <property-number label="数据高度" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.height" :min="0" :step="1" :max="1000"/>
    <property-number label="数据行高" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.line-height" :min="0" :step="1" :max="1000"/>
    <property-color label="数据字体颜色" :component-type="type" :series-index="index"  option-key="dataStyle.titleStyle.color" />
    <property-number label="数据字体大小" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.font-size" />
    <property-number label="数据字体间距" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.letter-spacing" :min="0" :max="30" :step="1" />
    <property-text label="数据字体系列"   :component-type="type" :series-index="index" option-key="dataStyle.font-family" />
    <property-select label="数据字体样式" :component-type="type" :series-index="index" option-key="dataStyle.font-style"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>
    <property-select label="数据字体粗细" :component-type="type" :series-index="index" option-key="dataStyle.font-weight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
    </property-select>
    <property-number label="数据边框粗细" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.border-width"  :min="0" :max="30" :step="1"/>
    <property-color label="数据边框颜色" :component-type="type" :series-index="index" option-key="dataStyle.border-color"/>
    <property-select label="数据线条类型" :component-type="type" :series-index="index" option-key="dataStyle.border-style"
                     :options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]">
    </property-select>
    <property-color label="数据背景颜色" :component-type="type" :series-index="index" option-key="dataStyle.background"/>
    <property-switch label="数据圆角" :component-type="type" :series-index="index" option-key="dataStyle.border-radius" :ui="['number-px','number-%']"  :min="0" :max="30" :step="1">
    </property-switch>
    <property-number label="数据外边距(上)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.margin-top" :min="0" :step="1" :max="300"/>
    <property-number label="数据外边距(右)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.margin-right" :min="0" :step="1" :max="300"/>
    <property-number label="数据外边距(下)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.margin-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="数据外边距(左)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.margin-left" :min="0" :step="1" :max="300"/>
    <property-number label="数据内边距(上)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.padding-top" :min="0" :step="1" :max="300"/>
    <property-number label="数据内边距(右)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.padding-right" :min="0" :step="1" :max="300"/>
    <property-number label="数据内边距(下)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.padding-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="数据内边距(左)" :component-type="type" :series-index="index" unit="px" option-key="dataStyle.padding-left" :min="0" :step="1" :max="300"/>
    <divider/>
    <subheader text="数据块单位"/>
    <property-text  label="单位内容" :component-type="type" :series-index="index" option-key="unitStyle.text"/>
    <property-switch label="单位宽度" :component-type="type" :series-index="index" option-key="unitStyle.width" :ui="['number-px','number-%']" :min="0" :max="1000" :step="1"/>
    <property-number label="单位高度" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.height" :min="0" :step="1" :max="1000"/>
    <property-number label="单位行高" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.line-height" :min="0" :step="1" :max="1000"/>
    <property-color label="单位字体颜色" :component-type="type" :series-index="index"  option-key="unitStyle.color" />
    <property-number label="单位字体大小" :component-type="type" :series-index="index"  unit="px" option-key="unitStyle.font-size" :min="0" :max="100" :step="1" />
    <property-number label="单位字体间距" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.letter-spacing" :min="0" :max="30" :step="1" />
    <property-text label="单位字体系列"  :component-type="type" :series-index="index"  option-key="unitStyle.font-family" />
    <property-select label="单位字体样式" :component-type="type" :series-index="index" option-key="unitStyle.font-style"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>
    <property-select label="单位字体粗细" :component-type="type" :series-index="index" option-key="unitStyle.font-weight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
    </property-select>
    <property-number label="单位边框粗细" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.border-width"  :min="0" :max="30" :step="1"/>
    <property-color label="单位边框颜色" :component-type="type" :series-index="index" option-key="unitStyle.border-color"/>
    <property-select label="单位线条类型" :component-type="type" :series-index="index" option-key="unitStyle.border-style"
                     :options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]">
    </property-select>
    <property-color label="单位背景颜色" :component-type="type" :series-index="index" option-key="unitStyle.background"/>
    <property-switch label="单位圆角" :component-type="type" :series-index="index" option-key="unitStyle.border-radius" :ui="['number-px','number-%']"  :min="0" :max="30" :step="1">
    </property-switch>
    <property-number label="单位外边距(上)" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.margin-top" :min="0" :step="1" :max="300"/>
    <property-number label="单位外边距(右)" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.margin-right" :min="0" :step="1" :max="300"/>
    <property-number label="单位外边距(下)" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.margin-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="单位外边距(左)" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.margin-left" :min="0" :step="1" :max="300"/>
    <property-number label="单位内边距(上)" :component-type="type" :series-index="index"  unit="px" option-key="unitStyle.padding-top" :min="0" :step="1" :max="300"/>
    <property-number label="单位内边距(右)" :component-type="type" :series-index="index"  unit="px" option-key="unitStyle.padding-right" :min="0" :step="1" :max="300"/>
    <property-number label="单位内边距(下)" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.padding-bottom" :min="0" :step="1" :max="300"/>
    <property-number label="单位内边距(左)" :component-type="type" :series-index="index" unit="px" option-key="unitStyle.padding-left" :min="0" :step="1" :max="300"/>
    <property-select label="单位是否显示" :component-type="type" :series-index="index" option-key="unitStyle.display"
                     :options="[{text:'是',value:'true'},{text:'否',value:'false'}]">
    </property-select>
  </div>
</template>
<script>
  export default {
    name:'Series-dataBlock',
    props:{
      index:Number
    },
    data(){return{type:'series-dataBlock'}},
  }
</script>


