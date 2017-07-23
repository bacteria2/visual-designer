/**
 * Created by lenovo on 2017/7/19.
 */
import Vue from 'vue'
import * as ExtendWidgets from '@/components/ExtendWidget/Render'
import * as Containers from "@/components/Container"

const component = {
  ...ExtendWidgets,
  ...Containers
}
//注册同步组件
Object.keys(component).forEach(el => {
  Vue.component(component[el].name, component[el])
})
//注册异步组件
//Object.keys(component.async).forEach(el => Vue.component(el.name,el.load))
