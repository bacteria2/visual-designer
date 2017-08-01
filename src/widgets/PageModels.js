/**
 * Created by lenovo on 2017/7/26.
 */

let config={};

(r => {
  return r.keys().forEach(key => Object.assign(config, r(key).default));
})(require.context('./',true,/^\.\/((?!SimpleWidgets)[\s\S])+\/pageModel\.js$/))

window.widgetConfigs=config;

/**
 * 查找简单组件的pageModel，必须在SimpleWidgets文件夹下面
 * @type {{}}
 */
let simpleConfig=[];
(r => {
  return r.keys().forEach(key =>simpleConfig.push(r(key).default));
})(require.context('./',true,/^\.\/SimpleWidgets\/.*\/pageModel\.js$/))

window.simpleWidgetConfigs=simpleConfig;

export default config;
