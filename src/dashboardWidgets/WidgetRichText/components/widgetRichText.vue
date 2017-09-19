<template>
  <div :style="styles" v-html="options.ue" :data-c = "options.count" ></div>
</template>

<script>
  export default {
    name: 'WidgetRichText',
    props:{
      options:Object,
      styles:Object
    },mounted(){
      console.log("this.options=",this.options.count);
    },

  }
</script>

