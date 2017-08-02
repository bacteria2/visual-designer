<template>
  <div>
    <prop-textarea name="文本内容:" :model="options" propName="text"></prop-textarea>
    <prop-font-group name="字体样式:" :model="styles"></prop-font-group>
  </div>
</template>

<script>
  export default{
    name: "WidgetTextInput",
    props:{
      styles:Object,
      options:Object
    }
  }
</script>
