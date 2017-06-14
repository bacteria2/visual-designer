<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="网格线是否显示"  ui="select" option-key="xAxis.splitLine.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <divider/>

    <Property label="坐标轴分隔线的显示间隔"  ui="number-px" option-key="xAxis.splitLine.interval"></Property>

    <subheader text="线条特定样式设置"/>
    <property-color label="分隔线颜色" option-key="xAxis.splitLine.lineStyle.color"></property-color>
    <Property label="分隔线线宽"  ui="number-px" option-key="xAxis.splitLine.lineStyle.width"></Property>
    <Property label="分隔线线的类型" ui="select" option-key="xAxis.splitLine.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></Property>
    <Property label="图形阴影的模糊大小"  ui="number-px" option-key="xAxis.splitLine.lineStyle.shadowBlur" ></Property>
    <Property label="阴影颜色"  ui="color" option-key="xAxis.splitLine.lineStyle.shadowColor"></Property>
    <Property label="阴影水平方向上的偏移距离"  ui="number-px" option-key="xAxis.splitLine.lineStyle.shadowOffsetX" ></Property>
    <Property label="阴影垂直方向上的偏移距离"  ui="number-px" option-key="xAxis.splitLine.lineStyle.shadowOffsetY" ></Property>
    <Property label="图形透明度"  ui="number-px" option-key="xAxis.splitLine.lineStyle.opacity" ></Property>


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
