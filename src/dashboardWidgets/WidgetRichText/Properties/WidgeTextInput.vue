<template>
  <div>
    <prop-textarea name="文本内容:" :model="options" propName="htmlContent"></prop-textarea>
  </div>
</template>

<script>
  export default{
    name: "WidgetRichTextInput",
    props:{
      styles:Object,
      options:Object
    }
  }
</script>
