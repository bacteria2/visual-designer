<template>
  <div>
    <prop-UE name="富文本:" :model="options" propName="ue"></prop-UE>
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
