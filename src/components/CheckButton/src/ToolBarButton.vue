<template>
  <button type="button" class="my-btn  btn--raised">
    <span class="btn__content">
      <i v-if="icon!=null" class="material-icons icon my-btn-icon icon--dark icon--left">{{icon}}</i>
        {{title}}
    </span>
  </button>
</template>
<script>
  export default {
    name:'ToolbarButton',
    props:{
      title:String,
      icon:String
    }
  }
</script>
