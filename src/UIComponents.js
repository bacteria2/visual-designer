import Vue from 'vue'
//UI组件

import { Card, Menu, Row, Col,Icon,Button,Collapse,CollapseItem} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import svgIcon from 'vue-svg-icon/Icon.vue';

/*
 * 组件注入
 * */
const uiComponent = [
  Card,
  Menu,
  Button,
  Icon,
  Row,
  Col,
  Collapse,CollapseItem,CollapseTransition
];

(function() {
  uiComponent.forEach((component) => {
    Vue.component(component.name, component)
  })
})()


Vue.component("svgIcon", svgIcon)
