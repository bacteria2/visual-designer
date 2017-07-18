<template>
  <template>
    <div>
      <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
        <div  class="content" slot="normal">
          <property-color label="系列特定主色" option-key="series.itemStyle.normal.color"></property-color>
        </div>
        <div class="content" slot="emphasis">
          <property-color label="系列特定主色" option-key="series.itemStyle.emphasis.color"></property-color>
        </div>
      </Group>
      <subheader text="小标志设置"/>
      <property-select label="数据项标签位置"  option-key="series.symbol" :options="[{text:'心形',value:'heart'},{text:'水滴',value:'droplet'},{text:'标注',value:'pin'},{text:'箭头',value:'arrow'},{text:'星形',value:'star'},{text:'菱形',value:'diamond'},{text:'圆形',value:'circle'},{text:'矩形',value:'rectangle'},{text:'三角形',value:'itriangle'},{text:'空心圆',value:'emptyCircle'},{text:'空心矩形',value:'emptyRectangle'},{text:'空心三角',value:'emptyTriangle'},{text:'空心菱形',value:'emptyDiamond'}]"></property-select>
      <property-number label="小标志大小"  option-key="series.symbolSize" unit="px" :min="0" :max="80" :step="1" ></property-number>
      <property-number label="小标志图形旋转角度"  option-key="series.symbolRotate" unit="°" :min="-180" :max="180" :step="1" ></property-number>
      <divider/>
      <subheader text="数据标注设置"/>
      <property-select label="显示数据标注" option-key="series.markPoint._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
      <divider/>
      <subheader text="标线设置"/>
      <property-select label="显示标线" option-key="series.markLine._show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    </div>
  </template>
</template>
<script>
  export default {
    name:'Series-pie',
  }
</script>
