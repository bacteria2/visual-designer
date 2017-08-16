<template>
  <property-row :name="name">
    <el-input v-model="value" size="small" placeholder="请输入内容" @change="setValue"></el-input>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:'propInput',
    mixins:[mixinsProp],
  }
</script>
