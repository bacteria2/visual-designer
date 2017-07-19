<template>
  <div>
    <prop-textarea name="文本内容:" :model="styles" propName="text" ></prop-textarea>
    <prop-font-group name="字体样式:" :model="styles"></prop-font-group>
    <prop-padding-group name="内边距:" :model="styles"></prop-padding-group>
  </div>
</template>

<script>
  export default{
    name: "WidgetTextInput",
    props: {
      styles:Object,
      options:Object
    }
  }
</script>
