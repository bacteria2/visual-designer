<template>
  <property-row :name="name">
    <el-slider v-model="value" :step="step" :max="max" ></el-slider>
  </property-row>
</template>

<script>
export default {
  name:'propSlider',
  props:{
    propName:String,
    model:Object,
    name:String,
    step:{
      type:Number,
      default:0.1
    },
    max:{
      type:Number,
      default:1
    }
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
      value:1
    }
  }

}
</script>
