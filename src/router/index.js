import Vue from 'vue'
import Router from 'vue-router'
import OriginList from '@/views/widgetList/widgetList'
import OriginDesigner from '@/views/widgetList/widget'
import WidgetEditor from '@/views/widgetInstance/widgetInstanceDesigner'
import WidgetList from '@/views/widgetInstance/widgetInstanceList'
import DashboardDesigner from '@/views/Board/Dashboard'
import DashboardList from '@/views/Board/DashboardList'
import AppCompTypeList from '@/views/ComptType/appComptTypeList'
import DatasourceList from '@/views/Datasource/datasourceList.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'visual',
  routes: [
    {
      path: '/widget/edit/:widgetId',
      name: 'WidgetEditor',
      component: WidgetEditor,
    },
    {
      path: '/dashboard/design/:dashboardId',
      name: 'DashboardDesigner',
      component: DashboardDesigner,
    },
    {
      path: '/origin/design/:originId',
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
        },{
          path: '/datasource/list',
          name: 'DatasourceList',
          component: DatasourceList,
        },
        {
          path: '/widget/list',
          name: 'widget',
          component: WidgetList,
        }, {
          path: '/origin/list',
          name: 'origin',
          component: OriginList,
        },{
          path: '/appComp/list',
          name: 'AppCompTypeList',
          component: AppCompTypeList,
        },
      ]
    },
    {
      path: '*',
      component: Vue.extend({
         functional: true,
         render(h){
         /* return h('div',{class:"not-found-error"},
            [h('img', {attrs: {src: require('../assets/404.png')}}),
              h('a', {attrs: {href:"/"}},"返回主页")
            ])*/
           return h('div',{class:"not-found-error"},
             [h('p',{class:"ydp-v-error-msg"},"正在建设中..."),
               h('a', {attrs: {href:"/"}},"返回主页")
             ])
        }
      })
    }
  ]
})
