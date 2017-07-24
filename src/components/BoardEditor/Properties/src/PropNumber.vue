<template>
  <property-row :name="name">
    <el-input-number size="small" v-model="value" :step="step" :min="min" :max="max"></el-input-number>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:'propNumber',
    mixins:[mixinsProp],
    props:{
      step:Number,
      min:Number,
      max:Number,
    }
  }
</script>
