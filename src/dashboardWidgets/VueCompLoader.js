/**
 * Created by lenovo on 2017/7/26.
 */
/**
 * Created by lenovo on 2017/7/23.
 */
import Vue from 'vue'

//加载Properties /^\.\/.*?\/(Properties\/((?!\/)[\s\S])+\/.*?|((?!\/)[\s\S])+Vue)\.(vue|js)$/
let allextendWidgetComponent = require.context('./', true, /^\.\/((?!\/)[\s\S])+\/([cC]omponents|[pP]roperties)\/+.*\.(js|vue)$/)

allextendWidgetComponent.keys().forEach(key => {
  let comp = allextendWidgetComponent(key).default
  Vue.component(comp.name, comp)
})



