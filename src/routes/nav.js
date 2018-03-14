import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import LoginLayout from '../layouts/LoginLayout';
import DesignerLayout from '../layouts/DesignerLayout';
import { Error403, Error404, Error500 } from './Error'
import { Login, Register, RegisterResult } from './User'
import { PrototypeList, Designer, Template, TemplateEdit } from './Prototype'
import { Spin } from 'antd'
import { WidgetList,WidgetAdd,WidgetEdit, Designer  as WidgetDesigner } from './Widget'
import { getMenuData } from './menu'
import dynamic from './dynamic';
import { Cube, DataConn,CubeEditor,CubeList,Demo } from '../routes/DataSource';
// import VMDemo from '../components/VmColorMapping/Demo'
// import VMDemo from '../components/GraphicStyle/Demo'
 import CacheEditorDemo from '../components/CacheEditor/Demo'
import {DashboardEditor} from '../routes/Dashboard'
import ProjectList from "./Projectized/ProjectList";
import UserList from "./User/UserList";

function TestComp(props){
  return <div>111{props.match.path}</div>
}

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" style={{width: '100%',margin: '40px 0 !important'}} />;
});

const routerData = {
  '/': {
    component: BasicLayout,
  },
  '/dashboard/list':{
    // component:DashboardEditor,
    // component:Demo,
    component:CacheEditorDemo,
  },
  '/prototype/designer/:id': {
    component:Designer,
  },
  '/prototype/list':{
    component:PrototypeList,
  },
  '/prototype/template':{
      component:Template,
    },
  '/prototype/templateEdit/:name':{
      component:TemplateEdit,
    },
  '/widget/list/:type':{
      component: WidgetList,
    },
  '/widget/add':{
      component: WidgetAdd,
  },
  '/widget/edit':{
      component: WidgetEdit,
  },
  '/data_source/demo':{
    component:Demo,
  },
  '/data_source/cubeList':{
    component:CubeList,
  },
  '/data_source/cubeEditor/:id':{
    component:CubeEditor,
  },
  '/data_source/dataConnection':{
    component:DataConn,
  },
  '/setting/app_type':{
    component:TestComp,
  },
  '/setting/property':{
    component:TestComp,
  },
  '/platform/all':{
      component:TestComp,
  },
  '/error/403':{
    component:Error403,
  },
  '/error/404':{
    component:Error404,
  },
  '/error/500':{
    component:Error500,
  },
  '/user': {
    component:LoginLayout,
  },
  '/user/login': {
    component:Login,
  },
  '/user/register': {
    component:Register,
  },
  '/user/register-result': {
    component:RegisterResult,
  },
  '/designer':{
    component:DesignerLayout,
  },
  '/designer/widget/:id': {
    component:WidgetDesigner,
  },
  '/designer/myproject':{
    component:ProjectList,
  },
  '/designer/userList':{
    component:UserList,
  },
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = item.name;
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = item.name;
    }
  });
  return keys;
}

export function getRouterData(){
  // Get name from ./menu.js or just set it in the router data.
  const rawMenu=getMenuData();
  const menuData = getFlatMenuData(rawMenu);
  const routerDataWithName = {};

  Object.keys(routerData).forEach((item) => {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name || menuData[item.replace(/^\//, '')],
    };
  });
  return routerDataWithName;
}

// wrapper of dynamic
function dynamicWrapper (component) {
  return  dynamic({
  resolve: () => {
    return component.then((raw) => {
      const Component = raw.default || raw;
      return props => <Component {...props} routerData={getRouterData()} />;
    });
  },
})};