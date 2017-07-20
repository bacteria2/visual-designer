<template>
  <v-toolbar class="my-header header-toolbar" right light>


    <v-toolbar-title class="white--text my-left-toolbar">
      <v-menu bottom right :nudge-right="20">
        <v-toolbar-side-icon light slot="activator" v-if="showMenus"></v-toolbar-side-icon>
        <v-list class="menu">
          <v-list-item v-for="menu in menus" :key="menu.title" class="menu-item">
            <router-link :to="menu.url">
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon class="menu-item__icon">{{menu.icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{menu.title}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </router-link>
            <v-divider class="menu-divider"></v-divider>
          </v-list-item>
        </v-list>
      </v-menu>
      <slot name="leftEnd"></slot>
    </v-toolbar-title>

    <v-toolbar-title class="my-center-toolbar">
      <span class="title">{{title}}</span>
      <slot>
        <v-btn light class="blue-grey">保存
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
      </slot>
    </v-toolbar-title>

    <v-toolbar-title class="white--text my-right-toolbar">
      <slot name="rightEnd"></slot>
    </v-toolbar-title>

  </v-toolbar>
</template>
<style>

</style>
<script>
  export default{
    name: "ViewHeader",
    props: {
      title: String,
      showMenus:{
          type:Boolean,
          default:true
      }
    },
    data(){
      return {
        menus: [
          {title: "数据源设定", icon: "settings_input_component", url: "/data_def"},
          { title: "图表设定",icon: "poll", url: "/"},
          {title: "原始图表新增", icon: "date_range", url: "/brace"},
          {title: "HandsonTable", icon: "inbox", url: "/table"},
          {title: "组件管理", icon: "inbox", url: "/widgetList"},
          {title: "组件实例管理", icon: "inbox", url: "/WidgetInstanceList"},
          {title: "Dashboard管理", icon: "inbox", url: "/DashboardList"}
          ],
      }
    }
  }
</script>
