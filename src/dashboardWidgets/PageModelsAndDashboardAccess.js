
/**
 * 查找简单组件的驾驶舱编辑入口配置文件：dashboardAccessList，命名规则：dashboardAccess.js
 * 程序自动在配置对象中加入一个属性name,值为文件夹名称
 *
 * @type {{}}
 */
let dashboardAccessList=[];
(r => {
  return r.keys().forEach(key =>{
    let renderClass = key.substring(2,key.lastIndexOf('/')),configItems = r(key).default;
    if(configItems && typeof configItems == 'object'){
      configItems['name'] = renderClass
    }
    if(!configItems.disable)
      dashboardAccessList.push(r(key).default);
  });
}
)(require.context('./',true,/^\.\/.*\/dashboardAccess\.js$/))

dashboardAccessList.sort((a,b)=>a.sort-b.sort);

/**
 * pageModels配置主要有两个属性：
 *          component: 'xxxx',        //渲染组件名称（可不填，不填则必须有render.js渲染文件）
 *          inputComponet: 'xxxx'     //属性编辑配置文件
 *
 * 程序自动将 pageModels对象由结构：
 *  {
 *       component: 'xxxx',
 *       inputComponet: 'xxxx'
 *  }
 *
 *  改成如下结构：
 *  {
 *      文件夹名称:{
 *        component: 'xxxx',
 *        inputComponet: 'xxxx'
 *      }
 *  }
 *
 */

let pageModels={};
(r => {
  return r.keys().forEach(key =>{
    let renderClass = key.substring(2,key.lastIndexOf('/')),configItems = r(key).default;
    let newWidgetPagemodel = {};
    if(configItems && typeof configItems == 'object'){
      newWidgetPagemodel[renderClass] = configItems;
    }
    Object.assign(pageModels, newWidgetPagemodel)
  });

})(require.context('./',true,/^\.\/.*\/pageModel\.js$/))

window.simpleWidgetConfigs = {};
window.simpleWidgetConfigs.dashboardAccessList=dashboardAccessList;
window.simpleWidgetConfigs.pageModels=pageModels;




