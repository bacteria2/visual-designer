
/**
 * 查找简单组件的pageModel，必须在SimpleWidgets文件夹下面
 * @type {{}}
 */
let dashboardAccessList=[];
(r => {
  return r.keys().forEach(key =>dashboardAccessList.push(r(key).default));
})(require.context('./',true,/^\.\/.*\/dashboardAccess\.js$/))

let pageModels={};
(r => {
  return r.keys().forEach(key =>{
    let renderClass = key.substring(2,key.lastIndexOf('/')),configItems = r(key).default;
    console.log('configItems',configItems);
    if(configItems && typeof configItems == 'object'){
      Object.keys(configItems).forEach(k =>{
        if(typeof configItems[k] == 'object' && !Array.isArray(configItems[k])){
          configItems[k]['render'] = renderClass
        }
      });
    }
    Object.assign(pageModels, r(key).default)
  });

})(require.context('./',true,/^\.\/.*\/pageModel\.js$/))

window.simpleWidgetConfigs = {};
window.simpleWidgetConfigs.dashboardAccessList=dashboardAccessList;
window.simpleWidgetConfigs.pageModels=pageModels;




