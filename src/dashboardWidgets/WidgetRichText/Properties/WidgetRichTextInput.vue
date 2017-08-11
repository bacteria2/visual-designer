<template>
  <div>
    <prop-editor name="富文本:" :model="options" propName="text"></prop-editor>
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
