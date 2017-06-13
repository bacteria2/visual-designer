import Vue from 'vue'
import Router from 'vue-router'
import EchartsEditor from '@/components/EchartsEditor'
import ThemeBuilder from '@/components/ThemeBuilder'
import Home from '@/views/Home'
import ChartEdit from '@/views/ChartEdit5'
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
      path: '/',
      name: 'ChartEdit',
      component: ChartEdit,
    },
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
