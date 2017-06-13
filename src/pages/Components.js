import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider,Input} from 'element-ui'
//自定义UI组件
import ColorPicker from "@/components/ColorPicker"
import EchartsPanel from '@/components/EchartsEditor/src/EchartsPanel'
import CheckGroup from '@/components/CheckButton'
import {Property,Group,PropertyColor} from '@/components/InputCollector'
import {VerticalTab,VerticalTabPanel} from "@/components/VerticalTab"
import {divider,subheader} from "@/components/Layout"
Vue.use(Vuetify)
/*
 * 组件注入
 * */
const uiComponent = [
  //第三方组件
  Slider,Input,
  //自定义组件
  ColorPicker,EchartsPanel,CheckGroup,
  Property,Group,PropertyColor,
  VerticalTab,VerticalTabPanel,divider,subheader
];

(function() {
  uiComponent.forEach((component) => {
    Vue.component(component.name, component)
  })
})()

