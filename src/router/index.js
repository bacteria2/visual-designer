import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'

import ChartEdit from '@/views/ChartEdit4'
import Edit from '@/views/Echarts/edit';
import BraceCharts from '@/views/BraceCharts'
import DataSetDefine from '@/views/DataSetDefinition/index'
import HandsonTable from '@/views/DataTable'

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
    },
    {
      path: '/data_def',
      name: 'braceCharts',
      component: DataSetDefine,
    },
    {
      path:'/table',
      name:'HandsonTable',
      component:HandsonTable,
    }
  ]
})
