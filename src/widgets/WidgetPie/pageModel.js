/**
 * Created by lenovo on 2017/7/27.
 */
export default {
  WidgetPie: {
    active: 'Base',
    seriesType:[],
    pages: [{
      title: '基础',
      name: 'Base',
      active: 'WidgetPie',
      pages: [{title: '属性', name: 'WidgetPie', component: 'ydpPieProps'}]
    }],
    alias:'环形图'
  }
}
