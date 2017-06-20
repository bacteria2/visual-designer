import Vue from 'vue'
import Router from 'vue-router'
import ChartEdit from '@/views/ChartEdit4'
import BraceCharts from '@/views/BraceCharts'
import { base } from '@/utils/config'

Vue.use(Router)

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
      path: '/brace',
      name: 'braceCharts',
      component: BraceCharts,
    }
  ]
})
