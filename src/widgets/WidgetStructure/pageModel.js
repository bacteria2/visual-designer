/**
 * Created by lenovo on 2017/7/27.
 */
export default {
  WidgetStructure: {
    active: 'Base',
    seriesType:[],
    pages: [{
      title: '基础',
      name: 'Base',
      active: 'WidgetStructure',
      pages: [{title: '属性', name: 'WidgetStructure', component: 'structureProps'}]
    }],
    alias:'组织结构'
  }
}
