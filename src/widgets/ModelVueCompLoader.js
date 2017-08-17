/**
 * Created by lenovo on 2017/8/16.
 */
import Vue from 'vue'

import Echarts  from './Echarts/EchartsVue'
import D3  from './D3/D3Vue'
import WidgetTable from './WidgetTable/WidgetTableVue'
import WidgetDataBlock from './WidgetDataBlock/WidgetDataBlockVue'
import WidgetImageText  from './WidgetImageText/WidgetImageTextVue'


const comps={
  Echarts,D3,WidgetTable,WidgetDataBlock,WidgetImageText
}

Object.keys(comps).forEach(key => {
  let comp = comps[key]
  Vue.component(comp.name, comp)
})
