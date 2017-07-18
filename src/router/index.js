import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'
import Edit from '@/views/Echarts/edit';
import BraceCharts from '@/views/BraceCharts'
import DataSetDefine from '@/views/DataSetDefinition/index'
import demo from '@/views/Board/Dashboard'
import ReportBuilder from "@/views/Board/ReportBuilder"

Vue.use(Router);

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
      name: 'widgetDesigner',
      component: BraceCharts,
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/data_def',
      name: 'data_def',
      component: DataSetDefine,
    },
    {
      path: '/board',
      name: 'board',
      component: ReportBuilder,
    }
  ]
})
