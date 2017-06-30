import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'

import ChartEdit from '@/views/ChartEdit4'
import widgetList from '@/views/widgetList/src/widgetList';
import Edit from '@/views/Echarts/edit';
import BraceCharts from '@/views/Echarts/widget'
import DataSetDefine from '@/views/DataSetDefinition'
import HandsonTable from '@/views/DataTable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/',
      name: 'ChartEdit',
      component: Edit,
    },
    {
      path: '/brace',
      name: 'braceCharts',
      component: BraceCharts,
    },
    {
      path: '/widgetDesigner',
      name: 'braceCharts',
      component: BraceCharts,
    },{
      path: '/widgetList',
      name: 'widgetList',
      component: widgetList,
    }/*,
    {
      path: '/data_def',
      name: 'braceCharts',
      component: DataSetDefine,
    },
    {
      path:'/table',
      name:'HandsonTable',
      component:HandsonTable,
    }*/
  ]
})
