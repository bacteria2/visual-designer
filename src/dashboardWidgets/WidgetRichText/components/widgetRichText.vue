<template>
  <div :style="styles" v-html="options.text" ></div>
</template>

<script>
  export default {
    name: 'WidgetRichText',
    props:{
        options:Object,
        styles:Object
    }

  }
</script>

