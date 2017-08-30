<template>
  <div>
    <property-list-select label="地图类型"  :component-type="type" :series-index="index"
                     option-key="map"  :listObject="mapConfig"></property-list-select>
    <property-select label="缩放和平移模式"  :component-type="type" :series-index="index"
                     option-key="roam" :options="[{text:'关闭',value:false},{text:'开启',value:true},{text:'开启缩放',value:'scale'},{text:'开启平移',value:'move'}]"></property-select>

    <subheader text="视角中心点"/>
    <property-number label="经度" :component-type="type" :series-index="index"
                     option-key="center[0]"></property-number>
    <property-number label="纬度" :component-type="type" :series-index="index"
                     option-key="center[1]"></property-number>
    <divider/>
    <property-number label="地图长宽比"  :component-type="type" :series-index="index"
                     option-key="aspectScale"></property-number>
    <property-number label="视角的缩放"  :component-type="type" :series-index="index"
                     option-key="zoom"></property-number>
    <property-number label="最小缩放值"  :component-type="type" :series-index="index"
                     option-key="scaleLimit.min"></property-number>
    <property-number label="最大缩放值"  :component-type="type" :series-index="index"
                     option-key="scaleLimit.max"></property-number>
    <property-select label="点选模式"  :component-type="type" :series-index="index" option-key="selectedMode" :options="[{text:'不可选',value:false},{text:'单选',value:'single'},{text:'多选',value:'multiple'}]"></property-select>
    <property-number label="选中时扇区偏移量"  :component-type="type" :series-index="index" option-key="selectedOffset" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color  label="图形颜色" :component-type="type" :series-index="index"
                         option-key="itemStyle.normal.color"></property-color>
        <property-select label="地图区域颜色"  :component-type="type" :series-index="index"
                         option-key="itemStyle.normal.areaColor"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color  label="边框颜色" :component-type="type" :series-index="index"
                         option-key="itemStyle.normal.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="label.normal.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="label.normal.position" :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-text   label="内容模板" :component-type="type" :series-index="index"
                         option-key="label.normal.formatter"></property-text>
        <property-color  label="文本颜色"   :component-type="type" :series-index="index"
                         option-key="label.normal.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="label.normal.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
      </div>
      <div class="content" slot="emphasis">
        <property-color  label="图形颜色" :component-type="type" :series-index="index"
                         option-key="itemStyle.emphasis.color"></property-color>
        <property-select label="地图区域颜色"  :component-type="type" :series-index="index"
                         option-key="itemStyle.emphasis.areaColor"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color  label="边框颜色" :component-type="type" :series-index="index"
                         option-key="itemStyle.emphasis.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-select label="位置"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.position" :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-text   label="内容模板" :component-type="type" :series-index="index"
                         option-key="label.emphasis.formatter"></property-text>
        <property-color  label="文本颜色"   :component-type="type" :series-index="index"
                         option-key="label.emphasis.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontStyle" :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index"
                         option-key="label.emphasis.fontWeight" :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
      </div>
    </Group>
    </div>
</template>
<script>
  import { getGeoMaps } from '@/services/WidgetService'
  export default {
    name:'Series-map',
    props:{
      index:Number
    },
    async mounted(){
        let response = await getGeoMaps()
        if(response.success){
        this.mapConfig = response.data.map(m=>{
              return {label:m.fName,value:m.fId}
          })
        }

    },
    data(){return{
        type:'series-map',
        mapConfig:[]
    }}
  }
</script>
