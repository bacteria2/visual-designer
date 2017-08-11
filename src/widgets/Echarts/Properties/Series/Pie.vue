<template>
  <div>
    <i class="material-icons icon mini" title="编辑属性撤换" @click="openDataConfig = !openDataConfig">data usage</i>
    <div v-show="!openDataConfig">
    <property-select label="南丁格尔玫瑰图模式"  :component-type="type" :series-index="index" option-key="roseType"  :options="[{text:'半径模式',value:'radius'},{text:'面积模式',value:'area'}]"></property-select>
    <subheader text="圆心坐标"/>
    <property-number label="X"  :component-type="type" :series-index="index" option-key="center[0]" unit="%" :step="20"></property-number>
    <property-number label="Y"  :component-type="type" :series-index="index" option-key="center[1]" unit="%" :step="20"></property-number>
    <divider/>
    <property-number label="内半径"  :component-type="type" :series-index="index" option-key="radius[0]"  unit="%"  :step="1"></property-number>
    <property-number label="外半径"  :component-type="type" :series-index="index" option-key="radius[1]"  unit="%"  :step="1"></property-number>
    <property-number label="起始角度"  :component-type="type" :series-index="index" option-key="startAngle" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <property-number label="最小角度"  :component-type="type" :series-index="index" option-key="minAngle" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <property-select label="鼠标点选模式"  :component-type="type" :series-index="index" option-key="selectedMode" :options="[{text:'不可选',value:false},{text:'单选',value:'single'},{text:'多选',value:'multiple'}]"></property-select>
    <property-number label="选中时扇区偏移量"  :component-type="type" :series-index="index" option-key="selectedOffset" unit="°" :min="-180" :max="180" :step="1" ></property-number>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="系列特定主色" :component-type="type" :series-index="index" option-key="itemStyle.normal.color"></property-color>
        <property-select label="显示标签视觉导引线"  :component-type="type" :series-index="index" option-key="itemStyle.normal.labelLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.normal.borderColor"></property-color>
        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="位置"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.position" :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-text label="标签内容" :component-type="type" :series-index="index" option-key="itemStyle.normal.label.formatter"></property-text>
        <property-color label="颜色"   :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="itemStyle.normal.label.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>

      <div class="content" slot="emphasis">
        <property-color label="系列特定主色" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.color"></property-color>
        <property-select label="显示标签视觉导引线"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.labelLine.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderWidth" :min="0" :max="30" :step="1"></property-number>
        <property-color label="边框颜色" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.borderColor"></property-color>

        <subheader text="数据项标签"/>
        <property-select label="显示"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.show"  :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <!--更多选项开始-->
        <property-select label="位置"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.position" :options="[{text:'扇区外侧',value:'outside'},{text:'扇区内部',value:'inside'},{text:'饼图中心',value:'center'}]"></property-select>
        <property-text label="内容模板" :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.formatter"></property-text>
        <property-color label="文本颜色"   :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.color"></property-color>
        <property-number label="字体大小"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.fontSize" unit="px"></property-number>
        <property-select label="字体样式"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.fontStyle"
                         :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]"></property-select>
        <property-select label="字体粗细"  :component-type="type" :series-index="index" option-key="itemStyle.emphasis.label.textStyle.fontWeight"
                         :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
        <!--更多选项结束-->
      </div>
    </Group>
    </div>
    <div v-if="openDataConfig">
      <Group :tabs="dataTabs">
          <div class="content" v-for="i in dataTabs.length" :slot="i-1">
            <s-data :seriesIndex="index" :dataIndex="i-1"></s-data>
          </div>
      </Group>
    </div>
  </div>
</template>
<script>
  import store from '@/store'
  import SData from "../Data/Data";

  export default {
    components: {SData},
    name:'Series-pie',
    props:{
      index:Number
    },
    computed:{
      dataConfig(){
            let series = store.state.echarts.mergedOption.series[this.index];
            return (series && series.data && Array.isArray(series.data) && typeof series.data[0] === 'object')
         },
        dataTabs(){
          let dt = []
          if(this.dataConfig){
            let data = store.state.echarts.mergedOption.series[this.index].data
            dt = data.map((d,index)=>{
              return {label:d.name?d.name:`data-${index}`,name:`${index}`}
            })
          }
          return dt
        }
    },
    data(){
        return{
        type:'series-pie',
          openDataConfig:false
    }},
  }
</script>
