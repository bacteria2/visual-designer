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
          <mu-list-item v-if="!item.children" :title="item.title" :to='item.url'>
            <mu-icon slot="left" :value="item.icon"></mu-icon>
          </mu-list-item>

          <mu-list-item v-else :title="item.title" toggleNested>
            <mu-icon slot="left" :value="item.icon"></mu-icon>
            <mu-list-item v-for="child,index in item.children" slot="nested"
                          :title="child.title"
                          :to="child.url" :key="index">
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
                <mu-flat-button style="width: 56px;height:48px;min-width: 56px;color:#757575"
                                :icon="item.icon"></mu-flat-button>
              </router-link>
              <template v-else>
                <div class="menu_submenu_title">
                  <mu-icon slot="left" :value="item.icon" color="#757575"></mu-icon>
                  <span>{{item.title}}</span>
                </div>
                <ul class="menu_list menu_sub">
                  <li class="menu_item" v-for="child in item.children">
                    <router-link :to="child.url">
                      <mu-flat-button style="width: 200px;height:48px;min-width: 200px;color:#757575"
                                      :label="child.title"></mu-flat-button>
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
        menu: [
          {
            title: "Overview",
            url: "/overview",
            icon: "send"
          }, {
            title: "我的驾驶舱",
            url: "/dashboard/list",
            icon: "drafts"
          },
          /*{
            title: "Report",
            url: "/report/list",
            icon: "drafts"
          },*/
          {
            title: "我的组件",
            url: "/widget/list",
            icon: "drafts"
          },
          {
            title: "组件浏览",
            url: "/origin/list",
            icon: "drafts"
          }, {
            title: "数据源管理",
            url: "/data/list",
            icon: "drafts"
          },
          {
            title: "素材管理",
            url: "/raw/list",
            icon: "drafts"
          },{
            title: "设置",
            icon: "drafts",
            divider: true,
            children: [{
               title: "驾驶舱分类",
               url: "/user/list",
               icon: "send",
              },
              {
                title: "组件分类",
                url: "/enum/list",
                icon: "grade",
              }
            ]
          },{
            title: "分享页",
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
