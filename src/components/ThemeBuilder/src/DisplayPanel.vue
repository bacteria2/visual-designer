<template>
  <el-row>
    <el-col :md="12"><slot> 111</slot></el-col>
    <el-col :md="12"><slot name="even">2222</slot></el-col>
  </el-row>
</template>
<style lang="scss" scoped>
  .el-row {
    .el-col {
      padding: 0 15px 30px 15px;
    }
    :nth-child(odd) {
      background-color: #00c261;
    }
    :nth-child(even) {
      background-color: red;
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
