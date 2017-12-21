import BasicLayout from '../layouts/BasicLayout';
import LoginLayout from '../layouts/BasicLayout';


const data = [{
  component: BasicLayout,
  layout: 'BasicLayout',
  name: '首页', // for breadcrumb
  path: '',
  children: []},{
  component: LoginLayout,
  layout: 'UserLayout',
  children: [{
    name: '帐户',
    icon: 'user',
    path: 'user',
    children: [{
      name: '登录',
      path: 'login',
      component: Login,
    }],
  }],
}];


export default data;