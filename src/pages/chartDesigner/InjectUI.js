import Vue from 'vue'
//UI组件
import { Slider} from 'element-ui'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.component(CSS)
/*
 * 组件注入
 * */
const uiComponent = [
  Slider,
];

(function() {
  uiComponent.forEach((component) => {
    Vue.component(component.name, component)
  })
})()

