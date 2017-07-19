<template>
  <div>
    <prop-color name="背景色:" :model="styles" propName="backgroundColor" ></prop-color>
    <!--<prop-slider name="透明度:" :model="styles" propName="opacity" ></prop-slider>-->
  </div>
</template>

<script>
  export default{
    name: "WidgetRectangleInput",
    props:{
      styles:Object,
      options:Object
    }
  }
</script>
