<template>
  <div class="layout">
    <aside class="side-nav" :style="style.navBar">
      <div class="nav-header">
        <img alt="logo" src="https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png">
        <span>Visual Designer</span>
      </div>
      <el-menu v-show="showNavBar" :default-active="activeIndex" class="nav-menu">
        <el-menu-item index="1">
          <i class="iconfont icon-shouye"></i>Overview
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title"><i class="iconfont icon-caigouliangduibi"></i>图表编辑</template>
          <el-menu-item index="4-1">
            <router-link to="editor">Echarts编辑</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="iconfont icon-caigouliangduibi"></i>主题和布局</template>
          <el-menu-item index="5-1">
            <router-link to="theme">主题设置</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">布局设置</el-menu-item>
        </el-submenu>
        <el-menu-item index="3"><i class="iconfont icon-tupian"></i>Gallery</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="iconfont icon-duoyuyan"></i>基础数据</template>
          <el-menu-item index="2-1">地图</el-menu-item>
          <el-menu-item index="2-2">城市编号</el-menu-item>
        </el-submenu>
      </el-menu>
    </aside>
    <div class="layout-right" :style="style.content">
      <div class="content-header">
        <div class="button" @click="showNav"><i class="iconfont icon-xitongcaidan"></i></div>
        <div class="right-wrapper">
          <div class="button"><i class="iconfont icon-shezhi"></i></div>
          <div class="button"><i class="iconfont icon-dingdanliangzoushi"></i></div>
        </div>
      </div>
      <div class="content">
        <div class="content-breadcrumb"> brumb</div>
        <div class="content-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .layout {
    position: relative;
    height: 100vh;
    .side-nav {
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
      .nav-menu {
        a{text-decoration:none;color:#333;}
        .router-link-active{color: #95d5ff;}
        .el-menu-item, .el-submenu__title {
          font-size: 16px
        }

        .iconfont {
          margin-right: 5px !important;
          font-size: 18px;
        }
      }
    }
  }

  .layout-right {
    overflow: auto;
    height: 100vh;
    transition: all .3s ease-out;
    .button {
      width: 47px;
      height: 47px;
      line-height: 47px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        background-color: #aee9e7;
      }
    }
    .right-wrapper {
      display: flex;
    }
  }

  .content-header {
    box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, .05);
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 47px;
    background-color: #fff;
    .iconfont {
      font-size: 20px;
      display: block;
      &:hover {
        font-size: 24px;
      }
    }

  }

  .content {
    padding: 0 24px 24px;;
    &-breadcrumb {
      height: 53px;
    }
    &-main {
      background-color:#fff ;
      height: calc(100vh - 124px);
    }
  }


</style>
<script>
  export default{
    data(){
      let style = {
        navBar: {width: '224px'},
        content: {marginLeft: '224px'}
      };
      return {
        style,
        activeIndex: '2',
        showNavBar: true,
        msg: 'hello vue'
      }
    },
    methods: {
      showNav(){
        if (this.showNavBar) {
          this.style.navBar.width = "0";
          this.style.content.marginLeft = "0";
        } else {
          this.style.navBar.width = "224px";
          this.style.content.marginLeft = "224px";
        }
        this.showNavBar = !this.showNavBar;
      }
    }
  }
</script>
