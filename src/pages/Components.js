import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider, Input,Button } from 'element-ui'
//自定义UI组件
import ColorPicker from '@/components/ColorPicker'
import * as Charts from '@/components/ChartsPanel'
import CheckGroup from '@/components/CheckButton'
import * as PropertyGroup from '@/components/InputCollector'
import { VerticalTab, VerticalTabPanel } from '@/components/VerticalTab'
import * as Layout from '@/components/Layout'
import Brace from '@/components/Brace'
import * as EchartComponents from '@/views/Echarts/common'
Vue.use(Vuetify)

/*
 * 组件注入
 * */
const uiComponent = {
  //第三方组件
  Slider, Input,Button,
  //自定义组件
  ColorPicker,  CheckGroup,Brace,
  ...Charts,
  ...PropertyGroup,
  ...Layout,
  VerticalTab, VerticalTabPanel,
  //ECharts属性组件
  ...EchartComponents
}

Object.keys(uiComponent).forEach(key=>{Vue.component(uiComponent[key].name,uiComponent[key])})

