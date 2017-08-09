<template>
  <div>
    <view-header :title="title" :collapse="menuCollapsed">
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
          <mu-list-item v-if="!item.children" :title="item.title" :href='item.url' target="iFrame">
            <mu-icon slot="left" :value="item.icon"></mu-icon>
          </mu-list-item>

          <mu-list-item v-else :title="item.title" toggleNested>
            <mu-icon slot="left" :value="item.icon"></mu-icon>
            <mu-list-item class="nest_menu" v-for="child,index in item.children" slot="nested"
                          :title="child.title" target="iFrame"
                          :href="child.url" :key="index">
              <mu-icon slot="left" :value="child.icon"></mu-icon>
            </mu-list-item>
          </mu-list-item>
          <mu-divider v-if="item.divider"></mu-divider>
        </template>
      </mu-list>
      <div v-else>
        <ul class="menu_list ">
          <template v-for="item in menu">
            <li :class="!!item.children?'menu_submenu':'menu_item'">
              <a v-if="!item.children" :href="item.url" target="iFrame">
                <mu-flat-button style="width: 56px;height:48px;min-width: 56px;color:#757575" :icon="item.icon"></mu-flat-button>
              </a>
              <template v-else>
                <div class="menu_submenu_title">
                  <mu-icon slot="left" :value="item.icon" color="#757575"></mu-icon>
                  <span>{{item.title}}</span>
                </div>
                <ul class="menu_list menu_sub">
                  <li class="menu_item" v-for="child in item.children">
                    <a :href="child.url" target="iFrame">
                      <mu-flat-button style="width: 200px;height:48px;min-width: 200px;color:#757575" :label="child.title"></mu-flat-button>
                    </a>
                  </li>
                </ul>
              </template>
            </li>
            <mu-divider v-if="item.divider"></mu-divider>
          </template>
        </ul>
      </div>
    </aside>
    <section class="main-content" style="" :class="{collapsed:menuCollapsed}">
      <iframe name= "iFrame"   :src="homePage" scrolling= "auto " frameborder= "0" style="height: calc(100vh - 85px);width: 100%"> </iframe>
    </section>
  </div>
</template>
<style lang="scss">
  @import "../../style/variables";
  @import "../../style/views/home";
  @import "../../style/common/header";
</style>
<style>
  @import '../../../node_modules/muse-ui/dist/muse-ui.css';
  @import '../../style/third/material-Icons/material-icons.css';
</style>
<script>
  import {Header} from '../../views/common'

  export default{
    components: {
      ViewHeader:Header,
    },

    props:{
      menuList:{
        type:Array,
        /*default(){
          return  [
            {
              title: "我的驾驶舱",
              url: "/dashboard/list",
              icon: "dashboard"
            },
            {
              title: "我的组件",
              url: "/widget/list",
              icon: "face"
            },
            {
              title: "组件库",
              url: "/origin/list",
              icon: "assessment"
            },
            {
              title: "数据源管理",
              url: "/datasource/list",
              icon: "dns"
            },
            {
              title: "素材管理",
              url: "/raw/list",
              icon: "collections"
            },
            {
              title: "设置",
              icon: "build",
              divider: true,
              children: [{
                title: "驾驶舱分类",
                url: "/user/list",
                icon: "view_list",
              },
                {
                  title: "应用分类",
                  url: "/appComp/list",
                  icon: "view_headline",
                }
              ]
            }
          ]
        }*/
      },
      homePage:{type:String,default:"http://www.163.com"},
      title:{
        type:String,
        default:"Some String"
      }
    },
    computed: {
      iconName(){
        return this.menuCollapsed ? 'format_indent_increase' : 'format_indent_decrease';
      }
    },
    data(){
      console.log(this.menuList)
     let  menu=this.menuList;
      return {
        menu,
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
