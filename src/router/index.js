import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'
import Edit from '@/views/Echarts/edit';
import BraceCharts from '@/views/BraceCharts'
import DataSetDefine from '@/views/DataSetDefinition/index'
import demo from '@/views/Board/Dashboard'
import ReportBuilder from "@/views/Board/ReportBuilder"
import WidgetInstanceList from "@/views/widgetInstance/src/widgetInstanceList"
import WidgetList from "@/views/widgetList/src/widgetList"
import DashboardList from "@/views/DashBord/src/dashboardList"

Vue.use(Router);

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/',
      name: 'Edit',
      component: Edit,
    },
    {
      path: '/WidgetInstanceList',
      name: 'WidgetInstanceList',
      component: WidgetInstanceList,
    },
    {
      path: '/WidgetList',
      name: 'WidgetList',
      component: WidgetList,
    },
    {
      path: '/DashboardList',
      name: 'DashboardList',
      component: DashboardList,
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
