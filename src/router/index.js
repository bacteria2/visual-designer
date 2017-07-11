import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'
import WidgetList from '@/views/widgetList/src/widgetList';
import Edit from '@/views/Echarts/edit';
import WidgetDesigner from '@/views/widgetList/src/widget'
import DataSetDefine from '@/views/DataSetDefinition'
import WidgetInstanceList from '@/views/widgetInstance/src/widgetInstanceList';

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
      component: WidgetDesigner,
    },{
      path: '/widgetList',
      name: 'widgetList',
      component: WidgetList,
    },
    {
      path: '/data_def',
      name: 'data_def',
      component: DataSetDefine,
    },
    {
      path: '/WidgetInstanceList',
      name: 'WidgetInstanceList',
      component: WidgetInstanceList,
    }
  ]
})
