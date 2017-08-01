/**
 * Created by lenovo on 2017/7/26.
 */
/**
 * Created by lenovo on 2017/7/23.
 */
import Vue from 'vue'

//加载Properties /^\.\/.*?\/(Properties\/((?!\/)[\s\S])+\/.*?|((?!\/)[\s\S])+Vue)\.(vue|js)$/
let allPropertiesLib = require.context('./', true, /^\.\/((?!\/)[\s\S])+\/+(Properties\/+.*|.*[vV]ue)\.(js|vue)$/)

allPropertiesLib.keys().forEach(key => {
  let comp = allPropertiesLib(key).default
  Vue.component(comp.name, comp)
})

// 注册简单组件的渲染组件
let allSimpleWidgetsRenderLib = require.context('./', true, /^\.\/((?!\/)[\s\S])+\/+(Render\/+.*|.*[vV]ue)\.(js|vue)$/)
allSimpleWidgetsRenderLib.keys().forEach(key => {
  let comp = allSimpleWidgetsRenderLib(key).default
  Vue.component(comp.name, comp)
})

