import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'
import ChartEdit from '@/views/ChartEdit4'
import widgetList from '@/views/widgetList/src/widgetList';
import Edit from '@/views/Echarts/edit';
import BraceCharts from '@/views/BraceCharts'
import DataSetDefine from '@/views/DataSetDefinition/index'
import HandsonTable from '@/views/DataTable'
import demo from '@/views/DashBord/Dashbord'
import ReportBuilder from "@/views/Board/ReportBuilder"
import propertyEdit from '@/views/DashBord/property/propertyEdit'
import widgetDesigner from '@/views/Echarts/widget'
import DataSetDefine from '@/views/DataSetDefinition'


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
      path: '/widgetDesigner',
      name: 'widgetDesigner',
      component: widgetDesigner,
    },{
      path: '/widgetList',
      name: 'widgetList',
      component: widgetList,
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
      name: 'braceCharts',
      component: DataSetDefine,
    }
    },
    {
      path: '/propertyEdit',
      name: 'propertyEdit',
      component: propertyEdit,
    },
    {
      path: '/board',
      name: 'board',
      component: ReportBuilder,
    }
  ]
})
