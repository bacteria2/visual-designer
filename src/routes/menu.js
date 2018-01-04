const menuData = [{
    name: '我的驾驶舱',
    icon: 'dashboard',
    path: 'dashboard',   
  },{
    name: '组件原型',
    path: 'prototype',
    icon: 'form',
    children: [{
      name: '设计器',
      path: 'designer',
      icon: 'edit',     
    },{
      name: '原型列表',
      path: 'list',
      icon: 'profile', 
    }]
  },
  {
    name: '组件库',
    path: 'wiget',
    icon: 'pie-chart',
    children: [{
      name: '组件调整',
      path: 'adjust',
      icon: 'edit',   
    },{
      name: '组件列表',
      path: 'list',
      icon: 'dot-chart',     
      children:[
        {
          name: '普通图表',
          path: '2d', 
        },
        {
          name: '3D图表',
          path: '3d', 
        },
        {
          name: '地图',
          path: 'map', 
        }
      ]
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
        icon: 'form' 
      },
      {
        name: '基础属性',
        path: 'property',
        icon: 'form'
      }
    ]
  },{
    name: '错误页面',
    path: 'error',
    icon: 'setting',
    children:[
      {
        name: '403',
        path: '403'
      },
      {
        name: '404',
        path: '404'
      },
      {
        name: '500',
        path: '500'
      }
    ]
  }
]
  
  function formatter(data, parentPath = '') {
    return data.map((item) => {
      const result = {
        ...item,
        path: `${parentPath}${item.path}`,
      };
      if (item.children) {
        result.children = formatter(item.children, `${parentPath}${item.path}/`);
      }
      return result;
    });
  }
  
  export const getMenuData = () => formatter(menuData);
  