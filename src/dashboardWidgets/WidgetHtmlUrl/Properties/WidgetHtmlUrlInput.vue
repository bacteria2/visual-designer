<template>
  <div>
    <prop-textarea name="文件路径:" :model="options" propName="htmlUrl"></prop-textarea>
  </div>
</template>

<script>
  export default{
    name: "WidgetHtmlUrlInput",
    props:{
      styles:Object,
      options:Object
    }
  }
</script>
