<template>
  <div>
      <prop-color name="背景色:" :model="styles" propName="backgroundColor" ></prop-color>
      <prop-opacity name="透明度:" :model="styles" propName="opacity" ></prop-opacity>
  </div>
</template>

<script>
  export default{
    name: "WidgetRectangleInput",
    props: {
      styles:Object,
      options:Object
    }
  }
</script>
