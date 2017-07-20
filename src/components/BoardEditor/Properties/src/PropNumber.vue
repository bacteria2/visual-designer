<template>
  <property-row :name="name">
    <el-input-number size="small" v-model="value" :step="step" :min="min" :max="max"></el-input-number>
  </property-row>
</template>

<script>
  export default {
    name:'propNumber',
    props:{
      propName:String,
      model:Object,
      name:String,
      step:Number,
      min:Number,
      max:Number,
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
        value:null
      }
    }

  }
</script>
