<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="是否显示工具箱"   ui="select" option-key="toolbox.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>

    <subheader text="工具箱位置"/>
    <Property    label="水平安放位置" ui="select" option-key="toolbox.x" :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property    label="垂直安放位置" ui="select" option-key="toolbox.y" :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <Property    label="水平放置还是垂直放置"  ui="select"  option-key="toolbox.orient" :options="[{text:'水平放置',value:'horizontal'},{text:'垂直放置',value:'vertical'}]"></Property>
    <divider/>

    <subheader text="功能按钮设定"/>
    <Property label="绘制辅助线功能按钮" ui="select" option-key="toolbox.feature.mark.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="选区缩放功能按钮" ui="select" option-key="toolbox.feature.dataZoom.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="切换至数据视图按钮" ui="select" option-key="toolbox.feature.dataView.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="折柱切换按钮" ui="select" option-key="toolbox.feature.magicType.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="还原按钮" ui="select" option-key="toolbox.feature.restore.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="保存为图片按钮" ui="select" option-key="toolbox.feature.saveAsImage.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <divider/>

    <subheader text="工具箱外观"/>
    <Property label="工具箱背景颜色"  ui="color" option-key="toolbox.backgroundColor"></Property>
    <Property label="工具箱边框线宽"  ui="number-px" option-key="toolbox.borderWidth" ></Property>
    <Property label="工具箱边框颜色"  ui="color" option-key="toolbox.borderColor"></Property>
    <Property label="图例内边距"  ui="number-px" option-key="toolbox.padding" ></Property>
    <Property label="工具箱每项的大小"  ui="number-px" option-key="toolbox.itemSize" ></Property>
    <Property label="工具箱各项之间间隔"  ui="number-px" option-key="toolbox.itemGap" ></Property>
    <divider/>

    <subheader text="鼠标放上时的提示文字设置"/>
    <Property label="鼠标放上时是否显示文字提示"  ui="select" option-key="toolbox.showTitle" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="字体大小"  ui="number-px" option-key="toolbox.textStyle.fontSize" ></Property>
    <Property    label="字体样式"     ui="select"     option-key="toolbox.textStyle.fontStyle"
                 :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></Property>
    <Property label="字体粗细" ui="select" option-key="toolbox.textStyle.fontWeight"
                 :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></Property>
    <divider/>
    <subheader text="其他样式"/>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div slot="normal">
        <Property label="图形的颜色"  ui="color" option-key="toolbox.iconStyle.normal.color"></Property>
        <Property label="图形的描边颜色"  ui="color" option-key="toolbox.iconStyle.normal.borderColor"></Property>
        <Property label="描边线宽"  ui="number-px" option-key="toolbox.iconStyle.normal.borderWidth"></Property>
        <Property label="柱条的描边类型" ui="select" option-key="toolbox.iconStyle.normal.borderType"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'打点线（dotted）',value:'dotted'}]"></Property>
        <Property label="图形阴影的模糊大小"  ui="number-px" option-key="toolbox.iconStyle.normal.shadowBlur" ></Property>
        <Property label="阴影颜色"  ui="color" option-key="toolbox.iconStyle.normal.shadowColor"></Property>
        <Property label="阴影水平方向上的偏移距离"  ui="number-px" option-key="toolbox.iconStyle.normal.shadowOffsetX" ></Property>
        <Property label="阴影垂直方向上的偏移距离"  ui="number-px" option-key="toolbox.iconStyle.normal.shadowOffsetY" ></Property>
        <Property label="图形透明度"  ui="number-px" option-key="toolbox.iconStyle.normal.opacity" ></Property>
        <Property label="文本位置"  ui="select" option-key="toolbox.iconStyle.normal.textPosition"   :options="[{text:'左',value:'left'},{text:'右',value:'right'},{text:'上',value:'top'},{text:'下',value:'bottom'}]"></Property>
        <Property label="文本对齐方式"  ui="select" option-key="toolbox.iconStyle.normal.textAlign"   :options="[{text:'左',value:'left'},{text:'右',value:'right'}]"></Property>
      </div>
      <div slot="emphasis">
        <Property label="图形的颜色"  ui="color" option-key="toolbox.iconStyle.emphasis.color"></Property>
        <Property label="图形的描边颜色"  ui="color" option-key="toolbox.iconStyle.emphasis.borderColor"></Property>
        <Property label="描边线宽"  ui="number-px" option-key="toolbox.iconStyle.emphasis.borderWidth"></Property>
        <Property label="柱条的描边类型" ui="select" option-key="toolbox.iconStyle.emphasis.borderType"  :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'点状线（dotted）',value:'dotted'}]"></Property>
        <Property label="图形阴影的模糊大小"  ui="number-px" option-key="toolbox.iconStyle.emphasis.shadowBlur" ></Property>
        <Property label="阴影颜色"  ui="color" option-key="toolbox.iconStyle.emphasis.shadowColor"></Property>
        <Property label="阴影水平方向上的偏移距离"  ui="number-px" option-key="toolbox.iconStyle.emphasis.shadowOffsetX" ></Property>
        <Property label="阴影垂直方向上的偏移距离"  ui="number-px" option-key="toolbox.iconStyle.emphasis.shadowOffsetY" ></Property>
        <Property label="图形透明度"  ui="number-px" option-key="toolbox.iconStyle.emphasis.opacity" ></Property>
      </div>
    </Group>
    <Property label="所有图形的 zlevel 值"  ui="number-px" option-key="toolbox.zlevel" ></Property>
    <Property label="所有图形的z值"  ui="number-px" option-key="toolbox.z" ></Property>
    <Property label="工具栏组件离容器左侧的距离"  ui="select" option-key="toolbox.left"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="工具栏组件离容器上侧的距离" ui="select" option-key="toolbox.top"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>
    <Property label="工具栏组件离容器右侧的距离"  ui="select" option-key="toolbox.right"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>
    <Property label="工具栏组件离容器下侧的距离"  ui="select" option-key="toolbox.bottom"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></Property>


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
