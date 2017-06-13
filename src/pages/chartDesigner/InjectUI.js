import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider,Input} from 'element-ui'
//自定义UI组件
import ColorPicker from "@/components/ColorPicker"
import EchartsPanel from '@/components/EchartsEditor/src/EchartsPanel'
import CheckGroup from '@/components/CheckButton'
import Property from '@/components/property.vue'
import {VerticalTab,VerticalTabPanel} from "@/components/VerticalTab"

Vue.use(Vuetify)
/*
 * 组件注入
 * */
const uiComponent = [
  Slider,Input,ColorPicker,EchartsPanel,CheckGroup,Property,VerticalTab,VerticalTabPanel
];

(function() {
  uiComponent.forEach((component) => {
    Vue.component(component.name, component)
  })
})()

