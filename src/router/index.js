import Vue from 'vue'
import Router from 'vue-router'
import { base } from '@/utils/config'
import widgetList from '@/views/widgetList/src/widgetList';
import Edit from '@/views/Echarts/edit';
import widgetDesigner from '@/views/widgetList/src/widget'
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
    },
    {
      path: '/data_def',
      name: 'data_def',
      component: DataSetDefine,
    }
  ]
})
