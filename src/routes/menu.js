const menuData = [
//     {
//   name: '我的项目',
//   path: 'designer/myproject',
//   icon: 'setting',
// },
  {
    name: '我的驾驶舱',
    icon: 'dashboard',
    path: 'dashboard',
      children: [
          {
              name: '驾驶舱列表',
              icon: 'bars',
              path: 'list'},
      ],
  },
    {
        name: '我的组件实例',
        path: 'widget',
        icon: 'pie-chart',
        children: [
            //     {
            //   name: '组件调整',
            //   path: 'designer/widget',
            //   icon: 'edit',
            // },
            {
                name: '实例列表',
                path: 'list/2d',
                icon: 'bars',
                // children: [
                //   {
                //     name: '普通图表',
                //     path: '2d',
                //   },
                //   {
                //     name: '3D图表',
                //     path: '3d',
                //   },
                //   {
                //     name: '地图',
                //     path: 'map',
                //   },
                // ],
            },
            {
                name: '标签管理',
                path: 'designer',
                icon: 'tags',
            }],
    },
    {
        name: '平台实例库',
        path: 'platform',
        icon: 'cloud',
        children: [{name: '所有实例',
            path: 'all',
            icon: 'bars'}],
    },

    {
    name: '原型组件库',
    path: 'prototype',
    icon: 'api',
    children: [{
      name: '原型列表',
      path: 'list',
      icon: 'bars',
    },
        {
      name: '模板属性',
      path: 'template',
      icon: 'file-text',
    },{
      name: '标签管理',
      path: 'designer',
      icon: 'tags'}],
  },

  {
    name: '数据源管理',
    path: 'data_source',
    icon: 'database',
    children: [
      {
        name: '数据源管理',
        path: 'dataConnection',
        icon: 'disconnect',
      },
      {
        name: 'CUBE管理',
        path: 'cubeList',
        icon: 'table',
      },
        {
            name: '表管理',
            path: 'tableList',
            icon: 'table',
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
  },
  //   {
  //   name: '错误页面',
  //   path: 'error',
  //   icon: 'setting',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //   ],
  // },
  //   {
  //   name: '测试页面',
  //   path: 'test',
  //   icon: 'setting',
  // },
  //   {
  //   name: 'Designer',
  //   path: 'designer',
  //   icon: 'setting',
  //   children: [
  //     {
  //       name: 'test',
  //       path: 'test',
  //     },
  //     {
  //       name: 'Widget',
  //       path: 'widget',
  //     },
  //   ],
  // },
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
  