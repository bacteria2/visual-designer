<template>
  <div>
    <prop-textarea name="文本内容:" :binding="true" :model="options" propName="htmlContent" ></prop-textarea>
  </div>
</template>

<script>
  export default{
    name: "WidgetRichtxtInput",
    props:{
      styles:Object,
      options:Object
    }
  }
</script>
