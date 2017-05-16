<template>
  <el-row>
    <el-col :md="12"><slot> 111</slot></el-col>
    <el-col :md="12"><slot name="even">2222</slot></el-col>
  </el-row>
</template>
<style lang="scss" scoped>
  .el-row {
    .el-col {
      height: 350px;
    }
  }
</style>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
