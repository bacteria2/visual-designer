<template>
  <div>
    <prop-upload name="上传图片:" :model="styles" propName="backgroundImage"></prop-upload>
    <prop-color name="背景色:" :model="styles" propName="backgroundColor" ></prop-color>
    <prop-slider name="透明度:" :model="styles" propName="opacity" ></prop-slider>
  </div>
</template>
<style>
</style>
<script>
  export default{
    name: "WidgetImageInput",
    props: {
      styles: {
        type: Object
      },
      options: {
        type: Object
      }
    }
  }
</script>
