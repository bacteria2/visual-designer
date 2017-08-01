/**
 * Created by lenovo on 2017/7/27.
 */
export default {
  WidgetTable: {
    active: 'Base',
    seriesType: [{name: 'tableColumn', component: 'Series-tableColumn'}],
    pages: [{
      title: '基础',
      name: 'Base',
      active: 'widgetTable',
      pages: [{title: '属性', name: 'widgetTable', component: 'TableBasic'}]
    }],
    alias:'表格C'
  }
}
