import Vue from 'vue'
import Router from 'vue-router'
import EchartsEditor from '@/components/EchartsEditor'
import ThemeBuilder from '@/components/ThemeBuilder'
import HomeViews from '@/views/HomeView'
import Home from '@/views/Home'
import { base } from '@/utils/config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home ,
    },
    {
      path: '/other',
      name: 'Home2',
      component:HomeViews ,
      children:[
       /* {
          path: '/three',
          name: 'ThreeEditor',
          component:ThreeEditor ,
        },*/
        {
          path: '/theme',
          name: 'ThemeBuilder',
          component:ThemeBuilder ,
        },
        {
          path: '/editor',
          name: 'Editor',
          component: EchartsEditor,
        }
      ]
    }
  ]
})
