<template>
  <div class="layout">
    <aside class="side-nav">
      <div class="nav-header">
        <img alt="logo" src="https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png">
        <span>Visual Designer</span>
      </div>
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-theme">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
      </el-menu>
    </aside>
    <div class="content">
      <div class="content-header">
        <div class="button"><i class="iconfont icon-menufold"></i></div>
        <div class="right-wrapper">
          <div class="button"><i class="iconfont icon-shezhi"></i></div>
          <div class="button"><i class="iconfont icon-dingdanliangzoushi"></i></div>
        </div>
      </div>
      <div> brumb</div>
      <div style="min-height: 1040px;"> this is a p</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .layout {
    position: relative;
    height: 100vh;

    .side-nav {
      width: 224px;
      background: #fff;
      overflow: visible;
      position: absolute;
      height: 100vh;
      transition: all .3s ease-out;
      box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, .02);
      z-index: 520;
      .nav-header {
        margin: 28px 0;
        background-color: #fff;
        text-align: center;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 40px;
          margin-right: 8px;
        }
        span {
          vertical-align: text-bottom;
          font-size: 16px;
          text-transform: uppercase;
          display: inline-block;
        }
      }
      .el-menu {
        background: #fff!important;
      }
    }
  }



  .content {
    margin-left: 224px;
    overflow: auto;
    height: 100vh;
    transition: all .3s ease-out;
    .iconfont {
      font-size: 20px;
    }
    .button {
      width: 47px;
      height: 47px;
      line-height: 47px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
    }
    .right-wrapper {
      display: flex;
    }
    &-header {
      box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, .05);
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      height: 47px;
      background-color: #fff;
    }
  }

</style>
<script>
  export default{

    data(){
      return {
        activeIndex: '2',
        msg: 'hello vue'
      }
    }
  }
</script>
