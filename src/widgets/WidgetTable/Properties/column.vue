<template>
  <div class="widget-table-column">
    <subheader text="列文本与样式"/>
    <property-text label="列表头内容" :component-type="type" :series-index="index"  option-key="text"></property-text>
    <property-number label="列宽度"   :component-type="type" :series-index="index"  unit="px" option-key="width" :min="0" :step="1" :max="1000" ></property-number>
    <property-select label="列文本水平对齐方式"   option-key="align" :component-type="type" :series-index="index"
                     :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]">
    </property-select>
    <property-text label="列其他样式" :component-type="type" :series-index="index"  option-key="style"></property-text>
  </div>
</template>
<script>
  export default {
    name:'Series-tableColumn',
    props:{
      index:Number
    },
    data(){return{type:'series-tableColumn'}},
  }
</script>


