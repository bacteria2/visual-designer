<template>
  <div>
    <property-select label="启用选中区域放大" option-key="lookAtProvinceFlag"
                     :options="[{text: '是', value: true}, {text: '否', value: false}]"/>
        <property-number label="选中区域偏移度" option-key="highlightOffset"/>
        <property-color label="选中区域偏颜色（RGB）" option-key="highlightColor"/>
        <property-color-list label="序列颜色列表" option-key="colors" :isGaugeColors="false"/>
  </div>
</template>
<script>
  export default {
    name:'CCMapBase',
  }
</script>
