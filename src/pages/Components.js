import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider, Input } from 'element-ui'
//自定义UI组件
import ColorPicker from '@/components/ColorPicker'
import {VuexEcharts} from '@/components/ChartsPanel/'
import CheckGroup from '@/components/CheckButton'
import * as PropertyGroup from '@/components/InputCollector'
import { VerticalTab, VerticalTabPanel } from '@/components/VerticalTab'
import * as Layout from '@/components/Layout'
Vue.use(Vuetify)

/*
 * 组件注入
 * */
const uiComponent = {
  //第三方组件
  Slider, Input,
  //自定义组件
  ColorPicker, VuexEcharts, CheckGroup,
  ...PropertyGroup,
  ...Layout,
  VerticalTab, VerticalTabPanel,
}

Object.keys(uiComponent).forEach(key=>{Vue.component(uiComponent[key].name,uiComponent[key])})
