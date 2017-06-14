<template>
  <div class="subheader">
    <v-subheader>{{inputText}}</v-subheader>
  </div>
</template>

<script>
  export default{
    name:"subheader",
      props:{
          text:{
              type:String,
              default:'子标题'
          }
      },
      data(){
          return{
              inputText:this.text
          }
      }

  }
</script>
