<template>
  <div>
    <property-select label="大小" option-key="size"
                     :options="[{text: '大', value: 'big'}, {text: '小', value: 'small'}]"/>
    <property-number label="位数"    option-key="length" ></property-number>
    <property-number label="数值"    option-key="value" ></property-number>
    <property-text   label="数字间隔"    option-key="margin"></property-text>
    <property-color label="背景颜色" option-key="background"/>
  </div>
</template>
<script>
  export default {
     name:'ZG-Number'
  }
</script>
