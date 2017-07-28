<template>
  <div>
    <subheader text="仪表盘"/>
    <divider/>
    <subheader text="外观"/>
    <property-text   label="圆形地图"    option-key="dataSet.circlePng"></property-text>
    <property-text   label="数值图片"    option-key="dataSet.valuePng"></property-text>
    <property-text   label="标题"    option-key="dataSet.name"></property-text>
    <subheader text="数据"/>
    <divider/>
    <property-number label="数值"    option-key="dataSet.value" unit="px" :min="1" :max="9999"></property-number>
    <property-number label="最大值"  option-key="dataSet.max" unit="px" :min="1" :max="9999"></property-number>
    <property-text   label="单位"    option-key="dataSet.sign"></property-text>
  </div>
</template>
<script>
  export default {
     name:'D3DashBoard',
  }
</script>
