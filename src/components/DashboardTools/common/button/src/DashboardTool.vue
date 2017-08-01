<template>
  <button  type="button" :class="{'my-btn':true,'active':status}"  title="格式刷">
    <span class="btn__content">
      <i v-if="icon!=null" class="material-icons icon my-btn-icon icon--dark icon--left">{{icon}}</i>
    </span>
  </button>
</template>
<style scoped>
  .my-btn{
    color: #ccc!important;
    min-width: 45px!important;
    height:43px!important;
    font-size: 12px;
    margin: 0px;
    background-color: #363d3f;
    /*will-change: box-shadow;*/
    /*box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);*/
  /*//box-shadow:0 0 0!important;*/
  }
  .my-btn:hover{ background-color: #000}

  .active{ background-color: #000}

  .my-btn-icon{
    color: #fff!important;
    margin-right: 0 !important;
  }
  .btn__content {flex-direction:column}
  button:focus,
  textarea:focus {
    outline: none;
  }
</style>
<script>
  export default {
    name:'DashboardTool',
    props:{
      icon:String,
      status:Boolean
    }
  }
</script>
