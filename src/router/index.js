import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'


import OriginList from '@/views/widgetList/src/widgetList'
import OriginDesigner from '@/views/widgetList/src/widget'
import WidgetEditor from '@/views/widgetInstance/src/widgetInstanceDesigner'
import WidgetList from '@/views/widgetInstance/src/widgetInstanceList'
import DashboardDesigner from '@/views/Board/Dashboard'
import DashboardList from '@/views/DashBord/src/dashboardList'
import CompTypeList from '@/views/ComptType/src/comptTypeList'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/widget/edit',
      name: 'WidgetEditor',
      component: WidgetEditor,
    },
    {
      path: '/dashboard/design',
      name: 'DashboardDesigner',
      component: DashboardDesigner,
    },
    {
      path: '/origin/design',
      name: 'widgetDesigner',
      component: OriginDesigner,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      alias: '/',
      component: Home,
      children: [
        {
          path: '/dashboard/list',
          name: 'DashboardList',
          component: DashboardList,
        },
        {
          path: '/widget/list',
          name: 'widget',
          component: WidgetList,
        }, {
          path: '/origin/list',
          name: 'origin',
          component: OriginList,
        }, {
          path: '/enum/list',
          name: 'CompTypeList',
          component: CompTypeList,
        },
      ]
    },
    {
      path: '*',
      component: Vue.extend({
         functional: true,
         render(h){
          return h('div',{class:"not-found-error"},
            [h('img', {attrs: {src: require('../assets/404.png')}}),
              h('a', {attrs: {href:"/"}},"返回主页")
            ])
        }
      })
    }
  ]
})
