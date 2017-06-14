<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <subheader text="标题块位置"/>
    <Property    label="标题文本水平对齐"     ui="select"     option-key="title.textAlign"
                 :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property    label="标题文本垂直对齐"     ui="select"     option-key="title.textBaseline"
                 :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <divider/>
    <subheader text="标题块外观"/>
    <property-color label="标题背景色" option-key="title.backgroundColor"></property-color>
    <Property label="标题的边框线宽"  ui="number-px" option-key="title.borderWidth" ></Property>
    <property-color label="标题的边框颜色"  option-key="title.borderColor"></property-color>
    <Property label="标题内边距"  ui="number-px" option-key="title.padding" ></Property>
    <divider/>
    <subheader text="主标题文本样式"/>
    <property-color label="文本颜色"   option-key="title.textStyle.color"></property-color>
    <Property label="字体大小"  ui="number-px" option-key="title.textStyle.fontSize" ></Property>
    <Property label="字体系列"  ui="text" option-key="title.textStyle.fontFamily" ></Property>
    <Property label="字体样式"  ui="select" option-key="title.textStyle.fontStyle"
              :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></Property>
    <Property label="字体粗细"     ui="select"     option-key="title.textStyle.fontWeight"
              :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:lighter'}]"></Property>
    <Property label="文本水平对齐方式"     ui="select"     option-key="title.textStyle.align"
              :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="文本垂直对齐方式"     ui="select"     option-key="title.textStyle.baseline"
              :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <divider/>
    <subheader text="副标题文本样式"/>
    <property-color label="文本颜色" option-key="title.subtextStyle.color"></property-color>
    <Property label="字体大小"  ui="number-px" option-key="title.subtextStyle.fontSize" ></Property>
    <Property label="字体系列"  ui="text" option-key="title.subtextStyle.fontFamily" ></Property>
    <Property label="字体样式" ui="select" option-key="title.subtextStyle.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></Property>
    <Property label="字体粗细"     ui="select"     option-key="title.subtextStyle.fontWeight" style="margin-top: 15px" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></Property>
    <Property label="文本水平对齐方式"     ui="select"     option-key="title.subtextStyle.align" :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="文本垂直对齐方式"     ui="select"     option-key="title.subtextStyle.baseline" :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <divider/>
    <subheader text="其他样式"/>
    <Property label="主副标题之间的间距"  ui="number-px" option-key="title.itemGap" ></Property>
    <Property label="所有图形的 zlevel 值"  ui="number-px" option-key="title.zlevel" ></Property>
    <Property label="所有图形的z值"  ui="number-px" option-key="title.z" ></Property>
    <Property label="组件离容器左侧的距离" ui="select" option-key="title.left"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="组件离容器上侧的距离"  ui="select" option-key="title.top"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <Property label="组件离容器右侧的距离" ui="select" option-key="title.right"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="组件离容器下侧的距离"  ui="select" option-key="title.bottom"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <Property label="图形阴影的模糊大小"  ui="number-px" option-key="title.shadowBlur" ></Property>
    <property-color label="阴影颜色"  option-key="title.shadowColor"></property-color>
    <Property label="阴影水平方向上的偏移距离"  ui="number-px" option-key="title.shadowOffsetX" ></Property>
    <Property label="阴影垂直方向上的偏移距离"  ui="number-px" option-key="title.shadowOffsetY" ></Property>


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
