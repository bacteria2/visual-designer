<template>
  <property-row :name="name">
    <el-slider v-model="value" @change="setValue" :step="step" :max="max" ></el-slider>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
export default {
  name:'propSlider',
  mixins:[mixinsProp],
  props:{
    step:{
      type:Number,
      default:0.1
    },
    max:{
      type:Number,
      default:1
    }
  },
  data(){
    return{
      value:1
    }
  }
}
</script>
