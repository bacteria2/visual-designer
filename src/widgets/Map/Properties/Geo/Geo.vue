<template>
  <div>
    <property-select label="显示"
                     option-key="geo.show" :options="[{text:'显示',value:true},{text:'不显示',value:false}]"></property-select>
    <property-list-select label="地图类型"
                     option-key="geo.map"  :listObject="mapConfig"></property-list-select>
    <property-select label="缩放和平移模式"
                     option-key="geo.roam" :options="[{text:'关闭',value:false},{text:'开启',value:true},{text:'开启缩放',value:'scale'},{text:'开启平移',value:'move'}]"></property-select>
    <subheader text="视角中心点"/>
    <property-number label="经度"
                     option-key="geo.center[0]"></property-number>
    <property-number label="纬度"
                     option-key="geo.center[1]"></property-number>

    <subheader text="位置"/>
    <property-switch label="左侧的距离"  :ui="['number-%','select']"  option-key="geo.left"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"
                     :min="0" :max="2000" :step="20">
    </property-switch>
    <property-switch label="上侧的距离" :ui="['number-%','select']"   option-key="geo.top"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]" :min="0" :max="2000" :step="20"
    ></property-switch>
    <property-switch label="右侧的距离"  :ui="['number-%','select']"  option-key="geo.right"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"
                     :min="0" :max="2000" :step="20">
    </property-switch>
    <property-switch label="下侧的距离" :ui="['number-%','select']"   option-key="geo.bottom"
                     :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]" :min="0" :max="2000" :step="20"
    ></property-switch>
    <divider/>
    <property-number label="地图长宽比"
                     option-key="geo.aspectScale"></property-number>
    <property-number label="视角的缩放"
                     option-key="geo.zoom"></property-number>
    <property-number label="最小缩放值"
                     option-key="geo.scaleLimit.min"></property-number>
    <property-number label="最大缩放值"
                     option-key="geo.scaleLimit.max"></property-number>
    <property-select label="点选模式"   option-key="geo.selectedMode" :options="[{text:'不可选',value:false},{text:'单选',value:'single'},{text:'多选',value:'multiple'}]"></property-select>
    <property-number label="选中时扇区偏移量"   option-key="geo.selectedOffset" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color  label="图形颜色"
                         option-key="geo.itemStyle.normal.color"></property-color>
        <property-color label="地图区域颜色"
                         option-key="geo.itemStyle.normal.areaColor"></property-color>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px"
                         option-key="geo.itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color  label="边框颜色"
                         option-key="geo.itemStyle.normal.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="显示"
                         option-key="geo.label.normal.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-select label="位置"
                         option-key="geo.label.normal.position" :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-text   label="内容模板"
                         option-key="geo.label.normal.formatter"></property-text>
        <property-color  label="文本颜色"
                         option-key="geo.label.normal.color"></property-color>
        <property-number label="字体大小"
                         option-key="geo.label.normal.fontSize" unit="px"></property-number>
        <property-select label="字体样式"
                         option-key="geo.label.normal.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"
                         option-key="geo.label.normal.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
      </div>
      <div class="content" slot="emphasis">
        <property-color  label="图形颜色"
                         option-key="geo.itemStyle.emphasis.color"></property-color>
        <property-color label="地图区域颜色"
                         option-key="geo.itemStyle.emphasis.areaColor"></property-color>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px"
                         option-key="geo.itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color  label="边框颜色"
                         option-key="geo.itemStyle.emphasis.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="显示"
                         option-key="geo.label.emphasis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-select label="位置"
                         option-key="geo.label.emphasis.position" :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-text   label="内容模板"
                         option-key="geo.label.emphasis.formatter"></property-text>
        <property-color  label="文本颜色"
                         option-key="geo.label.emphasis.color"></property-color>
        <property-number label="字体大小"
                         option-key="geo.label.emphasis.fontSize" unit="px"></property-number>
        <property-select label="字体样式"
                         option-key="geo.label.emphasis.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"
                         option-key="geo.label.emphasis.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
      </div>
    </Group>
    </div>
</template>
<script>
  import { getGeoMaps } from '@/services/WidgetService'
  export default {
    name:'EchartsGeo',
    async mounted(){
        let response = await getGeoMaps()
        if(response.success){
        this.mapConfig = response.data.map(m=>{
              return {label:m.fName,value:m.fId}
          })
        }

    },
    data(){return{
        mapConfig:[]
    }}
  }
</script>
