<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="是否显示坐标轴轴线"  ui="select" option-key="xAxis.axisLine.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <divider/>

    <subheader text="线条特定样式设置"/>
    <Property label="线条颜色"  ui="color" option-key="xAxis.axisLine.lineStyle.color"></Property>
    <Property label="线条宽度"  ui="number-px" option-key="xAxis.axisLine.lineStyle.width"></Property>
    <Property label="坐标轴线线的类型" ui="select" option-key="xAxis.axisLine.lineStyle.type"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></Property>
    <Property label="图形阴影的模糊大小"  ui="number-px" option-key="xAxis.axisLine.lineStyle.shadowBlur" ></Property>
    <Property label="阴影颜色"  ui="color" option-key="xAxis.axisLine.lineStyle.shadowColor"></Property>
    <Property label="阴影水平方向上的偏移距离"  ui="number-px" option-key="xAxis.axisLine.lineStyle.shadowOffsetX" ></Property>
    <Property label="阴影垂直方向上的偏移距离"  ui="number-px" option-key="xAxis.axisLine.lineStyle.shadowOffsetY" ></Property>
    <Property label="图形透明度"  ui="number-px" option-key="xAxis.axisLine.lineStyle.opacity" ></Property>
    <subheader text="其他"/>
    <Property label="X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上"  ui="select" option-key="xAxis.axisLine.onZero"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>

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
