/**
 * Created by lenovo on 2017/7/26.
 */


let config={};

//let VueWrapper=require.context('./', true, /^\.\/+[\w\W]+\/+[\w\W]+[vV]ue\.(js|vue)$/)

(r => {
  return r.keys().forEach(
    key => {
      let renderClass = key.substring(2,key.lastIndexOf('/')),configItems = r(key).default;
      if(configItems && typeof configItems == 'object'){
        Object.keys(configItems).forEach(k =>{
              if(typeof configItems[k] == 'object' && !Array.isArray(configItems[k])){
                configItems[k]['render'] = renderClass
                configItems[k]['vueWrapper'] =require.context('./', true, /^\.\/+[\w\W]+\/+[\w\W]+[vV]ue\.(js|vue)$/)(`./${renderClass}/${renderClass}Vue.js`).default.name
              }
        });
      }
      Object.assign(config, r(key).default)
    }
  );
})(require.context('./',true,/^\.\/.*\/pageModel\.js$/))

window.widgetConfigs=config;


