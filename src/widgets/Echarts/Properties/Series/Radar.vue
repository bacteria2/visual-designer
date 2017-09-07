<template>
  <div>
    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <property-color label="系列特定主色" :component-type="type" :series-index="index"
                        option-key="itemStyle.normal.color"></property-color>
      </div>
      <div class="content" slot="emphasis">
        <property-color label="系列特定主色" :component-type="type" :series-index="index"
                        option-key="itemStyle.emphasis.color"></property-color>
      </div>
    </Group>
    <subheader text="小标志设置"/>
    <property-select label="小标志"  :component-type="type" :series-index="index"
                     option-key="symbol" :options="[{text:'圆',value:'circle'},{text:'矩形',value:'rect'},{text:'圆矩形',value:'roundRect'},{text:'三角形',value:'triangle'},{text:'钻石',value:'diamond'},{text:'针',value:'pin'},{text:'箭头',value:'arrow'}]"></property-select>
    <property-number label="大小"  :component-type="type" :series-index="index"
                     option-key="symbolSize" unit="px" :min="0" :max="80" ></property-number>
    <property-number label="旋转角度"  :component-type="type" :series-index="index"
                     option-key="symbolRotate" unit="°" :min="-180" :max="180"></property-number>
    <divider/>
  </div>
</template>
<script>
  export default {
    name:'Series-radar',
    props:{
      index:Number
    },
    data(){return{type:'series-radar'}},
  }
</script>
