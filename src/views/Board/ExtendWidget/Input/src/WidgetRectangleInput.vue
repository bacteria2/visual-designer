<template>
  <div>
      <prop-color name="背景色:" :model="styles" propName="backgroundColor" ></prop-color>
     <!-- <prop-slider name="透明度:" :model="styles" propName="opacity" ></prop-slider>-->
  </div>
</template>

<script>
  import PropSlider from "../../../../../components/BoardEditor/Properties/src/PropSlider.vue";

  export default{
    components: { PropSlider },
    name: "WidgetRectangleInput",
    props:{
      styles:Object,
      options:Object
    }
  }
</script>
