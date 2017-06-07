import Vue from 'vue'
//UI组件
import { Card, Menu,MenuItem,MenuItemGroup,submenu,Input,Slider, Row, Col,Icon,Button,Collapse,CollapseItem,TabPane,Tabs} from 'element-ui'
//import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import  '../themes/index.css'
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/dist/vue-tabs.min.css'

/*
 * 组件注入
 * */
const uiComponent = [
  MenuItemGroup,submenu,
  MenuItem,
  Card,
  Menu,
  Button,
  Input,
  Icon,
  Row,
  Col,
  Slider,
 TabPane,Tabs,
  Collapse,CollapseItem,
];

(function() {
  uiComponent.forEach((component) => {
    Vue.component(component.name, component)
  })
})()

Vue.component("VueTabs", VueTabs)
Vue.component("VueTab", VTab)
