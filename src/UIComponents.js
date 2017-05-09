import Vue from 'vue'
//UI组件
import { Card, Menu, Row, Col,Icon,Button } from 'element-ui'
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
  Col
];

(function() {
  uiComponent.forEach((component) => {
    Vue.component(component.name, component)
  })
})()


Vue.component("svgIcon", svgIcon)
