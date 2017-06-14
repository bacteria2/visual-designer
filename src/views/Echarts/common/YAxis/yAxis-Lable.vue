<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="坐标轴文本标签是否显示"  ui="select" option-key="yAxis.axisLabel.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <divider/>

    <subheader text="线条特定样式设置"/>
    <Property label="坐标轴文本标签显示间隔"  ui="number-px" option-key="yAxis.axisLabel.interval"></Property>
    <Property label="坐标轴文本标签旋转角度"  ui="number-px" option-key="yAxis.axisLabel.rotate"></Property>
    <Property label="坐标轴文本标签与坐标轴的间距"  ui="number-px" option-key="yAxis.axisLabel.margin"></Property>
    <Property label="坐标轴文本标签内容模板"  ui="text" option-key="yAxis.axisLabel.formatter"></Property>

    <subheader text="坐标轴文本标签文本样式"/>
    <Property label="文本颜色" ui="color" option-key="yAxis.axisLabel.textStyle.color"></Property>
    <Property label="字体大小" ui="number-px" option-key="yAxis.axisLabel.textStyle.fontSize" ></Property>
    <Property label="字体系列" ui="text" option-key="yAxis.axisLabel.textStyle.fontFamily" ></Property>
    <Property label="字体样式" ui="select"  option-key="yAxis.axisLabel.textStyle.fontStyle"
                 :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></Property>
    <Property label="字体粗细" ui="select" option-key="yAxis.axisLabel.textStyle.fontWeight"
                 :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></Property>
    <Property label="文本水平对齐方式" ui="select" option-key="yAxis.axisLabel.textStyle.align"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="文本垂直对齐方式" ui="select"  option-key="yAxis.axisLabel.textStyle.baseline"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <divider/>

    <subheader text="其他"/>
    <Property label="刻度标签是否朝内"  ui="select" option-key="yAxis.axisLabel.inside"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="是否显示最小 tick 的 label"  ui="select" option-key="yAxis.axisLabel.showMinLabel"  :options="[{text:'是',value:'true'},{text:'否',value:'false'},{text:'空',value:'null'}]"></Property>
    <Property label="是否显示最大 tick 的 label"  ui="select" option-key="yAxis.axisLabel.showMaxLabel"  :options="[{text:'是',value:'true'},{text:'否',value:'false'},{text:'空',value:'null'}]"></Property>

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
