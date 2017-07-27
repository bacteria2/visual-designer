<template>
  <div>
    <view-header title="Stellar DataView" :collapse="menuCollapsed">
      <mu-raised-button class="collapse-btn" style="" slot="logo" @click="menuCollapsed=!menuCollapsed">
        <mu-icon :value="iconName" color="white"></mu-icon>
      </mu-raised-button>
      <mu-raised-button class="collapse-btn" slot="rightEnd">
        <mu-icon value="person" color="white"></mu-icon>
      </mu-raised-button>
      <mu-raised-button class="collapse-btn" slot="rightEnd" @click="logout">
        <mu-icon value="power_settings_new" color="white"></mu-icon>
      </mu-raised-button>
    </view-header>
    <aside class="side_menu" :class="{collapsed:menuCollapsed}">
      <mu-list v-if="!menuCollapsed">
        <template v-for="item in menu">
          <mu-list-item v-if="!item.children" :title="item.title" :href='item.url'  exact>
            <mu-icon slot="left" :value="item.icon"></mu-icon>
          </mu-list-item>

          <mu-list-item v-else :title="item.title" toggleNested>
            <mu-icon slot="left" :value="item.icon"></mu-icon>
            <mu-list-item v-for="child,index in item.children" slot="nested"
                          :title="child.title"
                          :href="child.url" :key="index" exact>
              <mu-icon slot="left" :value="child.icon"></mu-icon>
            </mu-list-item>
          </mu-list-item>
          <mu-divider v-if="item.divider"></mu-divider>
        </template>
      </mu-list>
      <div v-else>
        <ul class="menu_list">
          <template v-for="item in menu">
            <li :class="!!item.children?'menu_submenu':'menu_item'">
              <router-link v-if="!item.children" :to="item.url">
                <mu-flat-button style="width: 56px;height:48px;min-width: 56px;color:#757575" :icon="item.icon"></mu-flat-button>
              </router-link>
              <template v-else>
                <div class="menu_submenu_title">
                  <mu-icon slot="left" :value="item.icon" color="#757575"></mu-icon>
                  <span>{{item.title}}</span>
                </div>
                <ul class="menu_list menu_sub">
                  <li class="menu_item" v-for="child in item.children">
                    <router-link  :to="child.url">
                      <mu-flat-button style="width: 200px;height:48px;min-width: 200px;color:#757575" :label="child.title"></mu-flat-button>
                    </router-link>
                  </li>
                </ul>
              </template>
            </li>
            <mu-divider v-if="item.divider"></mu-divider>
          </template>
        </ul>
      </div>
    </aside>
    <section class="main-content" :class="{collapsed:menuCollapsed}">
      <router-view>
        123123123
        this is template body
      </router-view>
    </section>
  </div>
</template>
<style lang="scss">
  .side_menu {
    transition: all .6s ease-out;
    width: 260px;
    height: auto;
    position: fixed;
    padding: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(33, 33, 33, .2);
    min-height: 100%;

    //左部菜单收起
    &.collapsed {
      width: 56px !important;
    }
    .mu-flat-button{
      border-right: 5px solid #fff;
    }
    .router-link-active{
      >.mu-flat-button{
        border-color: #a1a1a9;
      }
    }
  }

  .main-content {
    margin-left: 260px;
    //左部菜单收起
    &.collapsed {
      margin-left: 56px !important;
    }
  }

  //菜单收起按钮
  .collapse-btn {
    width: 46px !important;
    min-width: 46px !important;
    vertical-align: middle;
    background: #363d3f !important;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    &:hover {
      background: #000 !important;
    }
  }

  //收起状态的菜单
  .menu_list {
    padding: 8px 0;
    width: 100%;
    position: relative;
  }

  .mu-item-wrapper {
    border-right: 5px solid #fff;
    &.hover {
      border-color: #a1a1a9;
    }
  }

  .menu_item {
    outline: none;
    cursor: pointer;
    height: 48px;
    line-height: 48px;
    text-align: center;
    position: relative;
    &:hover {
      background: #d7ecff;
    }
  }

  .menu_submenu_title {
    z-index: 2;
    overflow: hidden;
    position: relative;
    height: 48px;
    text-align: center;
    cursor: pointer;
    i {
      min-height: 48px;
      line-height: 48px;
      width: 56px;
      text-align: center;
    }
    span {
      cursor: default;
      text-align: left;
      padding-left: 16px;
      width: 196px;
      display: inline-block;
    }
  }

  .menu_submenu {
    position: relative;
    > .menu_list {
      top: 0;
      left: 100%;
      position: absolute;
      min-width: 200px;
      padding-top: 48px;
      background: #fff;
      box-shadow: 0 0 20px 0 rgba(33, 33, 33, .2);
      display: none;
    }
    .menu_item {
      z-index: 2;
      background: #fff;
    }

    &:hover {
      .menu_list {
        display: block;
      }
      .menu_submenu_title {
        background-color: #ffffff;
        box-shadow: 0 0 20px 0 rgba(33, 33, 33, .2);
        width: 256px;
      }
    }
  }

  .menu_item i, .menu_submenu i {
    vertical-align: middle;
  }

  .main-content {
    transition: all .6s ease-out;
  }

</style>
<script>
  import MuFlatButton from '../../node_modules/muse-ui/src/flatButton/flatButton'


  export default{
    components: {
      MuFlatButton
    },
    computed: {
      iconName(){
        return this.menuCollapsed ? 'format_indent_increase' : 'format_indent_decrease';
      }
    },
    data(){
      return {
        msg: 'hello vue',
        menu: [
          {
            title: "OverView",
            url: "/overview",
            icon: "send"
          }, {
            title: "DashBoard",
            url: "/dashboard/list",
            icon: "drafts"
          },
          {
            title: "Report",
            url: "/report/list",
            icon: "drafts"
          },
          {
            title: "我的图表",
            url: "/widget/list",
            icon: "drafts"
          },
          {
            title: "组件浏览",
            url: "/origin/list",
            icon: "drafts"
          },{
            title: "数据源管理",
            url: "/datasource/list",
            icon: "drafts"
          }, {
            title: "设置",
            icon: "drafts",
            divider: true,
            children: [
              {
                title: "组件分类",
                url: "/enum/list",
                icon: "grade",
              }, {
                title: "用户管理",
                url: "/user/list",
                icon: "send",
              }
            ]
          }, /*{
            title: "DashBoard编辑器",
            url: "/dashboard/design",
            icon: "send",
          }, */{
            title: "分享页面",
            url: "/share.html",
            icon: "send",
          }
        ],
        menuCollapsed: false
      }
    },
    methods: {
      logout(){
        console.log('logout')
      }
    }
  }
</script>
