import Vue from 'vue'
import Router from 'vue-router'
import EchartsEditor from '@/components/EchartsEditor'
import ThemeBuilder from '@/components/ThemeBuilder'
import HomeViews from '@/views/HomeView'
import Home from '@/views/Home'
import { base } from '@/utils/config'

Vue.use(Router)

let EchartEditor = {
    path: '/editor',
    name: 'Editor',
    component: EchartsEditor,
  },
  themeBuilder = {
    path: '/theme',
    name: 'ThemeBuilder',
    component: ThemeBuilder,
  }

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[EchartEditor,themeBuilder]
    },
    {
      path: '/editor2',
      name: 'Editor2',
      component: EchartsEditor,
    }

  ]
})
