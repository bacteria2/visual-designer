<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-theme" mode="horizontal">
      <el-menu-item index="1"><router-link to="theme" >主题管理</router-link> </el-menu-item>
      <el-menu-item index="2"><router-link to="" >布局设计</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="editor" >编辑器</router-link></el-menu-item>
    </el-menu>
    <router-view :style="{top:'60px'}"></router-view>
  </div>
</template>
<style scoped>
  .el-menu-theme{
      margin: 0;
  }
</style>
<script>
  export default{
    data () {
      return {
        activeIndex:'1'
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>
