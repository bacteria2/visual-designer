/**
 * Created by lenovo on 2017/7/27.
 */
export default {
  WidgetDataBlock: {
    active: 'Base',
    seriesType: [{name: 'dataBlock', component: 'Series-dataBlock'}],
    pages: [{
      title: '基础',
      name: 'Base',
      active: 'widgetDataBlock',
      pages: [{title: '属性', name: 'widgetDataBlock', component: 'DataBlockBasic'}]
    }],
    alias:'数据块C'
  }
}
