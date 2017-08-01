/**
 * Created by lenovo on 2017/7/26.
 */


let config={};

(r => {
  return r.keys().forEach(key => Object.assign(config, r(key).default));
})(require.context('./',true,/^\.\/.*\/pageModel\.js$/))

window.widgetConfigs=config;

export default config;
