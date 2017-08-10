<template>
  <div>
    <view-header :title="title" :collapse="menuCollapsed">
      <mu-raised-button class="collapse-btn" style="" slot="logo" @click="menuCollapsed=!menuCollapsed">
        <mu-icon :value="iconName" color="white"></mu-icon>
      </mu-raised-button>
      <mu-raised-button class="collapse-btn" slot="rightEnd" @click="onHomeClick" style="margin-right: 15px">
        <mu-icon value="home" color="white"></mu-icon>
      </mu-raised-button>
      <mu-raised-button class="collapse-btn" slot="rightEnd" @click="onExitClick">
        <mu-icon value="power_settings_new" color="white"></mu-icon>
      </mu-raised-button>
    </view-header>
    <aside class="side_menu" :class="{collapsed:menuCollapsed}">
      <mu-list v-if="!menuCollapsed">
        <template v-for="item in menu">
          <mu-list-item v-if="!item.children" :title="item.title" :href='item.url' target="iFrame" @click="activeUrl=item.url" :class="{'router-link-active':activeUrl===item.url}">
            <mu-icon slot="left" :value="item.icon"></mu-icon>
          </mu-list-item>
          <mu-list-item v-else :title="item.title" toggleNested :open="item.open">
            <mu-icon slot="left" :value="item.icon"></mu-icon>
            <mu-list-item class="nest_menu" v-for="child,index in item.children" slot="nested"
                          @click="activeUrl=child.url" :class="{'router-link-active':activeUrl===child.url}"
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
            <li :class="[!!item.children?'menu_submenu':'menu_item']"  >
              <a v-if="!item.children" :href="item.url" target="iFrame" @click="activeUrl=item.url" :class="{'router-link-active':activeUrl===item.url}">
                <mu-flat-button style="width: 56px;height:48px;min-width: 56px;color:#757575" :icon="item.icon"></mu-flat-button>
              </a>
              <template v-else>
                <div class="menu_submenu_title">
                  <mu-icon slot="left" :value="item.icon" color="#757575"></mu-icon>
                  <span>{{item.title}}</span>
                </div>
                <ul class="menu_list menu_sub">
                  <li class="menu_item" v-for="child in item.children"  >
                    <a :href="child.url" target="iFrame" @click="activeUrl=child.url" :class="{routerLinkActive:activeUrl===child.url}">
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
  @import '../../style/third/material-icon/material-icons.css';
</style>
<script>
  import {Header} from '../../views/common'
  import '../../../node_modules/muse-ui/dist/muse-ui.css';



  export default{
    components: {
      ViewHeader:Header,
    },

    props:{
      menuList:{
        type:Array,
        default(){
          return  []
        }
      },
      homePage:{type:String,default:"http://www.163.com"},
      title:{
        type:String,
        default:"Some String"
      },
      onHomeClick:{
        type:Function,
        default(){
          console.log('home click')
        }
      },
      onExitClick:{
        type:Function,
        default(){
          console.log('exit click')
        }
      }
    },
    computed: {
      iconName(){
        return this.menuCollapsed ? 'format_indent_increase' : 'format_indent_decrease';
      }
    },
    data(){
      return {
        menu:this.menuList,
        menuCollapsed: false,
        activeUrl:this.homePage,
      }
    },
    methods: {
      logout(){
        console.log('logout')
      }
    }
  }
</script>
