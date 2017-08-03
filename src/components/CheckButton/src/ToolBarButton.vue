<template>
  <button  type="button" class="my-btn">
    <span class="btn__content">
      <i v-if="icon!=null" class="material-icons icon my-btn-icon icon--dark icon--left">{{icon}}</i>
        {{title}}
    </span>
  </button>
</template>
<style scoped>
  .my-btn{
    color: #fff;
    font-family: Microsoft YaHei, sans-serif!important;
    min-width: 50px!important;
    height: 50px!important;
    font-size: 12px;
    margin: 6px;
    background-color: rgba(0,0,0,0.2);
    will-change: box-shadow;
    box-shadow: 0 1px 5px rgba(0,0,0,0.5), 0 2px 2px rgba(0,0,0,0.3), 0 3px 1px -2px rgba(0,0,0,0.2);
  }
  .my-btn:hover{ background-color: rgba(0,0,0,0.5);}

  .my-btn-icon{
    color: #fff!important;
    margin-right: 0 !important;
  }
  .btn__content {flex-direction:column}
  </style>
<script>
  export default {
    name:'ToolbarButton',
    props:{
      title:String,
      icon:String
    }
  }
</script>
