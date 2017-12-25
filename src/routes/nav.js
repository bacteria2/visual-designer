import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import LoginLayout from '../layouts/BasicLayout';
import HeadLayout from '../layouts/HeadBodyLayout';
import {Error403,Error404,Error500} from './Error'

function TestComp(props){
  return <div>111{props.match.path}</div>
}



const data = [{
  component: BasicLayout,
  layout: 'BasicLayout',
  name: '首页', // for breadcrumb
  children: [{
      name: '我的驾驶舱',
      icon: 'dashboard',
      path: 'dashboard',
      component:TestComp
    },{
      name: '组件原型',
      path: 'designer',
      icon: 'form',
      children: [{
        name: '设计器',
        path: 'basic',
        icon: 'edit',
        component: TestComp,
      },{
        name: '原型列表',
        path: 'instance',
        icon: 'profile',
        component: TestComp,
      }]
    },
    {
      name: '组件库',
      path: 'wiget',
      icon: 'pie-chart',
      children: [{
        name: '组件设计',
        path: 'basic',
        icon: 'edit',
        component: TestComp,
      },{
        name: '组件列表',
        path: 'instance',
        icon: 'profile',
        component: TestComp,
      },{
          name: '3D组件',
          path: '3d_instance',
          icon: 'dot-chart',
          component: TestComp,
        }]
    },{
      name: '数据源管理',
      path: 'data_source',
      icon: 'table',
    },{
      name: '设置',
      path: 'setting',
      icon: 'setting',
      children:[
        {
          name: '应用分类',
          path: 'app_type',
          icon: 'form',
          component: TestComp,
        },
        {
          name: '基础属性',
          path: 'property',
          icon: 'form',
          component: TestComp,
        }
      ]
    },{
      name: '错误页面',
      path: 'error',
      icon: 'setting',
      children:[
        {
          name: '403',
          path: '403',
          component: Error403,
        },
        {
          name: '404',
          path: '404',
          component: Error404,
        },
        {
          name: '500',
          path: '500',
          component: Error500,
        }
      ]
    }
  ]},{
  component: LoginLayout,
  layout: 'UserLayout',
  children: [{
    name: '帐户',
    icon: 'user',
    path: 'user',
    children: [{
      name: '登录',
      path: 'login',
      component: TestComp,
    },{
      name: '注册结果',
      path: 'register-result',
      component: TestComp,
    }],
  }]}
];
export function getNavData(){
  return data;
}
export default data;

