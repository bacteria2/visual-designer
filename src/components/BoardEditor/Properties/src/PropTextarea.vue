<template>
  <property-row :name="name">
    <el-input  type="textarea" placeholder="请输入内容" @change="setValue"  v-model="value"> </el-input>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:'propTextarea',
    mixins:[mixinsProp],
  }
</script>
