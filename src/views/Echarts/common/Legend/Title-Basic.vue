<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="是否显示图例"  ui="select" option-key="legend.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property    label="标题文本水平对齐" ui="select" option-key="legend.selectedMode"
                 :options="[{text:'不可选',value:'false'},{text:'单选',value:'single'},{text:'多选',value:'multiple'}]"></Property>
    <divider/>

    <subheader text="图例位置"/>
    <Property    label="水平安放位置"  ui="select"  option-key="legend.x"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property    label="垂直安放位置" ui="select"   option-key="legend.y"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <Property    label="水平放置还是垂直放置"  ui="select"  option-key="legend.orient" :options="[{text:'水平放置',value:'horizontal'},{text:'垂直放置',value:'vertical'}]"></Property>
    <divider/>

    <subheader text="图例外观"/>
    <Property label="图例背景颜色"  ui="color" option-key="legend.backgroundColor"></Property>
    <Property label="图例边框线宽"  ui="number-px" option-key="legend.borderWidth" ></Property>
    <Property label="图例边框颜色"  ui="color" option-key="legend.borderColor"></Property>
    <Property label="图例内边距"  ui="number-px" option-key="legend.padding" ></Property>
    <Property label="图例项宽度"  ui="number-px" option-key="legend.itemWidth" ></Property>
    <Property label="图例项高度"  ui="number-px" option-key="legend.itemHeight" ></Property>
    <Property label="图例各项之间间隔"  ui="number-px" option-key="legend.itemGap" ></Property>
    <divider/>

    <subheader text="图例文字样式"/>
    <Property label="文本颜色"  ui="color"    option-key="legend.textStyle.color"></Property>
    <Property label="字体大小"  ui="number-px" option-key="legend.textStyle.fontSize" ></Property>
    <Property label="字体样式"     ui="select"     option-key="legend.textStyle.fontStyle"
                 :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></Property>
    <Property label="字体粗细"     ui="select"     option-key="legend.textStyle.fontWeight"
                 :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></Property>
    <Property label="文本水平对齐方式"     ui="select"     option-key="legend.textStyle.align"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="文本垂直对齐方式"  ui="select"   option-key="legend.textStyle.baseline"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <divider/>
    <subheader text="其他样式"/>
    <Property label="所有图形的 zlevel 值"  ui="number-px" option-key="legend.zlevel" ></Property>
    <Property label="所有图形的z值"  ui="number-px" option-key="legend.z" ></Property>
    <Property label="格式化图例文本"  ui="text" option-key="legend.formatter"></Property>
    <Property label="图例关闭时的颜色"  ui="color"  option-key="legend.inactiveColor"></Property>
    <Property label="图例标记和文本的对齐"  ui="select" option-key="legend.align"   :options="[{text:'左',value:'left'},{text:'自动',value:'auto'},{text:'右',value:'right'}]"></Property>
    <Property label="图例组件离容器左侧的距离"  ui="select" option-key="legend.left"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="图例组件离容器上侧的距离" ui="select" option-key="legend.top"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <Property label="图例组件离容器右侧的距离"  ui="select" option-key="legend.right"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="图例组件离容器下侧的距离"  ui="select" option-key="legend.bottom"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <Property label="图形阴影的模糊大小"  ui="number-px" option-key="legend.shadowBlur" ></Property>
    <Property label="阴影颜色"  ui="color"    option-key="legend.shadowColor"></Property>
    <Property label="阴影水平方向上的偏移距离"  ui="number-px" option-key="legend.shadowOffsetX" ></Property>
    <Property label="阴影垂直方向上的偏移距离"  ui="number-px" option-key="legend.shadowOffsetY" ></Property>


    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        系列的图形类型
      </v-flex>
      <v-flex xs7>
        <v-text-field light
                      name="input-1"
                      id="testing"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px" elevation-5>
        折线转为平滑曲线
      </v-flex>
      <v-flex xs7>
        <v-text-field light name="input-1" id="testing"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        Focus
      </v-flex>
      <v-flex xs7>
        <v-select label="Select" :items="items" option-key="e3" light item-value="text"></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        Focus
      </v-flex>
      <v-flex xs7>
        <color-picker option-key="rgbaColors"></color-picker>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        Focus22
      </v-flex>
      <v-flex xs7>
        <check-group option-key="btnGroup" :options="options"></check-group>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        width: 20,
        width1: 20,
        width2: 20,
        msg: 'hello vue'
      }
    }
  }
</script>
