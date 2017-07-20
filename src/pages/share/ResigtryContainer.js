/**
 * Created by lenovo on 2017/7/19.
 */
import Vue from 'vue'
import * as ExtendWidgets from '@/views/Board/ExtendWidget/Render'
import * as ExtendWidgetsInput from '@/views/Board/ExtendWidget/Input'
import * as BoardProperties from '@/components/BoardEditor/Properties'

const component = {
  ExtendWidgets,ExtendWidgetsInput,BoardProperties
}
//注册同步组件
Object.keys(component).forEach(el => Vue.component(el.name, el))

//注册异步组件
//Object.keys(component.async).forEach(el => Vue.component(el.name,el.load))
