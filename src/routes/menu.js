const menuData = [{
  name: '我的驾驶舱',
  icon: 'dashboard',
  path: 'dashboard',
}, {
  name: '组件原型',
  path: 'prototype',
  icon: 'form',
  children: [{
    name: '原型列表',
    path: 'list',
    icon: 'profile',
  }, {
    name: '设计器',
    path: 'designer',
    icon: 'edit',
  }, {
    name: '模板属性',
    path: 'template',
    icon: 'edit',
  }],
},
  {
    name: '组件库',
    path: '',
    match: 'widget',
    icon: 'pie-chart',
    children: [{
      name: '组件调整',
      path: 'designer/widget',
      icon: 'edit',
    }, {
      name: '组件列表',
      path: 'wiget/list',
      icon: 'dot-chart',
      children: [
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
        },
      ],
    }],
  },
    {
        name: '数据源管理',
        path: 'data_source',
        icon: 'table',
        children:[
            {
                name:'数据源管理',
                path:'dataConnection',
                icon:"database",
            },
            {
                name:'CUBE管理',
                path:'cubeList',
                icon:"database",
            },
        ],
    },
    {
    name: '设置',
    path: 'setting',
    icon: 'setting',
    children: [
      {
        name: '应用分类',
        path: 'app_type',
        icon: 'form',
      },
      {
        name: '基础属性',
        path: 'property',
        icon: 'form',
      },
    ],
  }, {
    name: '错误页面',
    path: 'error',
    icon: 'setting',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
    ],
  }, {
    name: '测试页面',
    path: 'test',
    icon: 'setting',
  }, {
    name: 'Designer',
    path: 'designer',
    icon: 'setting',
    children: [
      {
        name: 'test',
        path: 'test',
      },
      {
        name: 'Widget',
        path: 'widget',
      },
    ],
  },{
    name: '项目化',
    path: 'administration',
    icon: 'setting',
    children: [
      {
        name: '我的项目',
        path: 'myproject',
      },{
        name: '用户列表',
        path: 'userList',
      },
    ],
  },
]

function formatter (data, parentPath = '') {
  return data.map((item) => {
    const result = {
      ...item,
      path: item.path ? `${parentPath}${item.path}` : `${parentPath}${item.match}`,
    }
    if (item.children) {
      result.children = formatter(item.children, item.path ? `${parentPath}${item.path}/` : ``)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
  