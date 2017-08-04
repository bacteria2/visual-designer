/**
 * Created by lenovo on 2017/7/19.
 */
import Vue from 'vue'
import * as Containers from "@/components/Container"
import '@/widgets/VueCompLoader'
import '@/widgets/PageModels'
import '@/dashboardWidgets/VueCompLoader'
import '@/dashboardWidgets/PageModelsAndDashboardAccess'

const component = {
  ...Containers
}
//注册同步组件
Object.keys(component).forEach(el => {
  Vue.component(component[el].name, component[el])
})
//注册异步组件
//Object.keys(component.async).forEach(el => Vue.component(el.name,el.load))
