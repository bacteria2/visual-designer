<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="坐标轴的位置"  ui="select" option-key="yAxis.position"   :options="[{text:'左',value:'left'},{text:'右',value:'right'},{text:'上',value:'top'},{text:'下',value:'bottom'}]"></Property>
    <divider/>

    <Property label="坐标轴名称" ui="text" option-key="yAxis.name"></Property>
    <Property label="坐标轴名称显示位置" ui="select" option-key="yAxis.nameLocation" :options="[{text:'位于开端',value:'start'},{text:'位于中间',value:'middle'},{text:'位于末端',value:'end'}]"></Property>

    <subheader text="坐标轴名称文字样式"/>
    <property-color label="文本颜色"  option-key="yAxis.nameTextStyle.color"></property-color>
    <Property label="字体大小"  ui="number-px" option-key="yAxis.textStyle.fontSize" ></Property>
    <Property label="字体样式"  ui="select"  option-key="yAxis.textStyle.fontStyle"
                 :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></Property>
    <Property label="字体粗细"  ui="select"  option-key="yAxis.textStyle.fontWeight"
                 :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></Property>
    <Property label="文本水平对齐方式" ui="select" option-key="yAxis.textStyle.align"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="文本垂直对齐方式" ui="select" option-key="yAxis.textStyle.baseline"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <divider/>
    <Property label=坐标轴显示区间策略"  ui="select" option-key="yAxis.scale"  :options="[{text:'根据最大最小值自适应',value:'true'},{text:'总是包含0值',value:'false'}]"></Property>
    <Property label="坐标轴刻度最小值" ui="text" option-key="yAxis.min"></Property>
    <Property label="坐标轴刻度最大值" ui="text" option-key="yAxis.max"></Property>
    <Property label="类目起始和结束两端空白策略"  ui="select" option-key="yAxis.boundaryGap"  :options="[{text:'留空',value:'true'},{text:'顶头',value:'false'}]"></Property>
    <Property label="分割段数"  ui="number-px" option-key="yAxis.splitNumber" ></Property>
    <divider/>

    <subheader text="其他样式"/>
    <Property label="是否显示 x 轴"  ui="select" option-key="yAxis.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="是否是反向坐标轴"  ui="select" option-key="yAxis.inverse"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="坐标轴的标签是否响应和触发鼠标事件"  ui="select" option-key="yAxis.triggerEvent"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="Y 轴所有图形的 zlevel 值" ui="number-px" option-key="yAxis.zlevel" ></Property>
    <Property label="Y 轴组件的所有图形的z值" ui="number-px" option-key="yAxis.z" ></Property>
    <Property label="Y 轴所在的 grid 的索引" ui="number-px" option-key="yAxis.gridIndex" ></Property>
    <Property label="Y 轴相对于默认位置的偏移" ui="number-px" option-key="yAxis.offset" ></Property>
    <Property label="坐标轴名称与轴线之间的距离" ui="number-px" option-key="yAxis.nameGap" ></Property>
    <Property label="坐标轴名字旋转，角度值" ui="number-px" option-key="yAxis.nameRotate" ></Property>
    <Property label="自动计算的坐标轴最小间隔大小" ui="number-px" option-key="yAxis.minInterval" ></Property>
    <Property label="强制设置坐标轴分割间隔" ui="number-px" option-key="yAxis.interval" ></Property>
    <Property label="对数轴的底数" ui="number-px" option-key="yAxis.logBase" ></Property>
    <Property label="坐标轴是否是静态无法交互" ui="select" option-key="yAxis.silent" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="坐标轴类型" ui="select" option-key="yAxis.type"  :options="[{text:'数值轴',value:'value'},{text:'加粗',value:''time'},{text:'更粗',value:'category'},{text:'更细',value:'log'}]"></Property>

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
