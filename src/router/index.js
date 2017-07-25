import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'
import WidgetList from '@/views/widgetList/src/widgetList';
// import Edit from '@/views/Echarts/edit';

import WidgetDesigner from '@/views/widgetList/src/widget'
import DataSetDefine from '@/views/DataSetDefinition/index'
import demo from '@/views/Board/Dashboard'
import Test from '@/views/Board/Test'
import ReportBuilder from "@/views/Board/ReportBuilder"
import WidgetInstanceList from '@/views/widgetInstance/src/widgetInstanceList';
import DashboardList from '@/views/DashBord/src/dashboardList';
import CompTypeList from '@/views/ComptType/src/comptTypeList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base,
  routes: [
    // {
    //   path: '/',
    //   name: 'Edit',
    //   component: Edit,
    // },
    {
      path: '/widgetDesigner',
      name: 'widgetDesigner',
      component: WidgetDesigner,
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }, {
      path: '/test',
      name: 'test',
      component: Test
    }
    ,{
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
    },
    {
      path: '/CompTypeList',
      name: 'CompTypeList',
      component: CompTypeList,
    }
  ]
})
