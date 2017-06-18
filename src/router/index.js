import Vue from 'vue'
import Router from 'vue-router'
import ChartEdit from '@/views/Echarts/edit.vue'
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
    }
  ]
})
