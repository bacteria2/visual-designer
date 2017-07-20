<template>
  <property-row :name="name">
    <el-input  type="textarea" placeholder="请输入内容"  v-model="value"> </el-input>
  </property-row>
</template>

<script>
  export default {
    name:'propTextarea',
    props:{
      propName:String,
      model:Object,
      name:String
    },
    mounted(){
      if(this.model&&this.propName){
        this.value = this.model[this.propName];
      }
    },
    watch:{
      value(e){
        if(this.model&&this.propName){
          this.model[this.propName] = e;
        }
      }
    },
    data(){
      return{
        value:""
      }
    }

  }
</script>
