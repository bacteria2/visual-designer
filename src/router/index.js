import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'
import WidgetList from '@/views/widgetList/src/widgetList';
import widgetInstanceDesigner from '@/views/widgetInstance/src/widgetInstanceDesigner';
import WidgetDesigner from '@/views/widgetList/src/widget'
import DataSetDefine from '@/views/DataSetDefinition/index'
import demo from '@/views/Board/Dashboard'
import ReportBuilder from "@/views/Board/ReportBuilder"
import WidgetInstanceList from '@/views/widgetInstance/src/widgetInstanceList';
import DashboardList from '@/views/DashBord/src/dashboardList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: demo,
    },
    {
      path: '/',
      name: 'Edit',
      component: widgetInstanceDesigner,
    },
    {
      path: '/widgetDesigner',
      name: 'widgetDesigner',
      component: WidgetDesigner,
    },
    {
      path: '/widgetList',
      name: 'widgetList',
      component: WidgetList,
    },
    {
      path: '/WidgetInstanceList',
      name: 'WidgetInstanceList',
      component: WidgetInstanceList,
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
    },
    {
      path: '/DashboardList',
      name: 'DashboardList',
      component: DashboardList,
    }
  ]
})
