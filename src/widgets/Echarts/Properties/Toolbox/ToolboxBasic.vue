<template>
  <div>
    <property-select label="是否显示工具箱"  option-key="toolbox.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <property-group>
      <subheader text="工具箱位置"/>
      <property-switch    label="水平安放位置" :ui="['select','number-px']" option-key="toolbox.x" :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
      <property-switch    label="垂直安放位置" :ui="['select','number-px']" option-key="toolbox.y" :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
      <property-select    label="水平放置还是垂直放置"  option-key="toolbox.orient" :options="[{text:'水平放置',value:'horizontal'},{text:'垂直放置',value:'vertical'}]"></property-select>
      <divider/>
    </property-group>


    <subheader text="功能按钮设定"></subheader>
    <property-select label="绘制辅助线功能按钮"  option-key="toolbox.feature.mark.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="选区缩放功能按钮"    option-key="toolbox.feature.dataZoom.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="切换至数据视图按钮"  option-key="toolbox.feature.dataView.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="折柱切换按钮"        option-key="toolbox.feature.magicType.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="还原按钮"            option-key="toolbox.feature.restore.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-select label="保存为图片按钮"      option-key="toolbox.feature.saveAsImage.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>

    <subheader text="工具箱外观"/>
    <property-color label="工具箱背景颜色"   option-key="toolbox.backgroundColor"></property-color>
    <property-number label="工具箱边框线宽"  unit="px" :max="30" option-key="toolbox.borderWidth" ></property-number>
    <property-color label="工具箱边框颜色"   option-key="toolbox.borderColor"></property-color>
    <property-number label="图例内边距"  unit="px" :max="10" option-key="toolbox.padding" ></property-number>
    <property-number label="工具箱每项的大小"  unit="px" option-key="toolbox.itemSize" ></property-number>
    <property-number label="工具箱各项之间间隔"  unit="px" option-key="toolbox.itemGap" ></property-number>
    <divider/>

    <subheader text="鼠标放上时的提示文字设置"/>
    <property-select label="鼠标放上时是否显示文字提示"  option-key="toolbox.showTitle" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-number label="字体大小"  unit="px" option-key="toolbox.textStyle.fontSize" ></property-number>
    <property-select label="字体样式"  option-key="toolbox.textStyle.fontStyle"
                 :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
    <property-select label="字体粗细"  option-key="toolbox.textStyle.fontWeight"
                 :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <divider/>
    <subheader text="其他样式"/>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div class="content" slot="normal">
        <property-color label="图形的颜色"      option-key="toolbox.iconStyle.normal.color"></property-color>
        <property-color label="图形的描边颜色"  option-key="toolbox.iconStyle.normal.borderColor"></property-color>
        <property-number label="描边线宽"  unit="px" :max="30" option-key="toolbox.iconStyle.normal.borderWidth"></property-number>
        <property-select label="柱条的描边类型"  option-key="toolbox.iconStyle.normal.borderType"
                         :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'打点线（dotted）',value:'dotted'}]"></property-select>
        <property-number label="图形阴影的模糊大小"  unit="px" option-key="toolbox.iconStyle.normal.shadowBlur" ></property-number>
        <property-color  label="阴影颜色"  option-key="toolbox.iconStyle.normal.shadowColor"></property-color>
        <property-number label="阴影水平方向上的偏移距离"  unit="px" :max="30" option-key="toolbox.iconStyle.normal.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直方向上的偏移距离"  unit="px" :max="30" option-key="toolbox.iconStyle.normal.shadowOffsetY" ></property-number>
        <property-number label="图形透明度"  unit="px" option-key="toolbox.iconStyle.normal.opacity" ></property-number>
        <property-select label="文本位置"      option-key="toolbox.iconStyle.normal.textPosition"   :options="[{text:'左',value:'left'},{text:'右',value:'right'},{text:'上',value:'top'},{text:'下',value:'bottom'}]"></property-select>
        <property-select label="文本对齐方式"  option-key="toolbox.iconStyle.normal.textAlign"   :options="[{text:'左',value:'left'},{text:'右',value:'right'}]"></property-select>
      </div>
      <div class="content" slot="emphasis">
        <property-color label="图形的颜色"      option-key="toolbox.iconStyle.emphasis.color"></property-color>
        <property-color label="图形的描边颜色"  option-key="toolbox.iconStyle.emphasis.borderColor"></property-color>
        <property-number label="描边线宽"  unit="px" :max="30" option-key="toolbox.iconStyle.emphasis.borderWidth"></property-number>
        <property-select label="柱条的描边类型"  option-key="toolbox.iconStyle.emphasis.borderType"
                         :options="[{text:'实线',value:'solid'},{text:'虚线（dashed）',value:'dashed'},{text:'打点线（dotted）',value:'dotted'}]"></property-select>
        <property-number label="图形阴影的模糊大小"  unit="px" option-key="toolbox.iconStyle.emphasis.shadowBlur" ></property-number>
        <property-color  label="阴影颜色"  option-key="toolbox.iconStyle.emphasis.shadowColor"></property-color>
        <property-number label="阴影水平方向上的偏移距离"  unit="px" :max="30" option-key="toolbox.iconStyle.emphasis.shadowOffsetX" ></property-number>
        <property-number label="阴影垂直方向上的偏移距离"  unit="px" :max="30" option-key="toolbox.iconStyle.emphasis.shadowOffsetY" ></property-number>
        <property-number label="图形透明度"  unit="px" option-key="toolbox.iconStyle.emphasis.opacity" ></property-number>
        </div>
    </Group>
    <property-number label="所有图形的 zlevel 值"  :max="9999"  option-key="toolbox.zlevel" ></property-number>
    <property-number label="所有图形的z值"  option-key="toolbox.z" ></property-number>
    <property-switch label="工具栏组件离容器左侧的距离"  :ui="['select','number-px','number-%']" option-key="toolbox.left"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch label="工具栏组件离容器上侧的距离"  :ui="['select','number-px','number-%']" option-key="toolbox.top"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
    <property-switch label="工具栏组件离容器右侧的距离"  :ui="['select','number-px','number-%']" option-key="toolbox.right"   :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch label="工具栏组件离容器下侧的距离"  :ui="['select','number-px','number-%']" option-key="toolbox.bottom"   :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
  </div>
</template>
<script>
  export default {
    name:'EchartsToolboxBasic',
  }
</script>

