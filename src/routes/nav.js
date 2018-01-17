import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import LoginLayout from '../layouts/LoginLayout';
import DesignerLayout from '../layouts/DesignerLayout';
import {Error403,Error404,Error500} from './Error';
import {Login,Register,RegisterResult} from './User';
import {PrototypeList,Designer} from './Prototype'
import {WidgetList} from './Widget';
import {getMenuData} from './menu';
import Test from './Test';

function TestComp(props){
  return <div>111{props.match.path}</div>
}

// wrapper of dynamic
// const dynamicWrapper = (app, models, component) => dynamic({
//   app,
//   // eslint-disable-next-line no-underscore-dangle
//   models: () => models.filter(m => !app._models.some(({ namespace }) => namespace === m)).map(m => import(`../models/${m}.js`)),
//   // add routerData prop
//   component: () => {
//     const routerData = getRouterData(app);
//     return component().then((raw) => {
//       const Component = raw.default || raw;
//       return props => <Component {...props} routerData={routerData} />;
//     });
//   },
// });


const routerData = {
  '/': {
    component: BasicLayout,
  },
  '/dashboard':{
    component:TestComp,
  },
  '/prototype/designer':{
    component:Designer,
  },
  '/prototype/list':{
    component:PrototypeList,
  },
  '/wiget/adjust':{
    component:TestComp,
  },
  '/wiget/list/2d':{
    component:WidgetList,
  },
  '/wiget/list/3d':{
    component:TestComp,
  },
  '/wiget/list/map':{
    component:TestComp,
  },
  '/data_source':{
    component:TestComp,
  },
  '/setting/app_type':{
    component:TestComp,
  },
  '/setting/property':{
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
  '/designer/widget':{
    component:TestComp,
  },
  '/designer/test':{
    component:Test,
  }
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
  const menuData = getFlatMenuData(getMenuData());
  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name || menuData[item.replace(/^\//, '')],
    };
  });
  return routerDataWithName;
}

