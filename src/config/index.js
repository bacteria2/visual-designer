/**
 * Created by lenovo on 2017/12/18.
 */
import merge from 'lodash/merge';
let global=window.config||{};

const devConfig={
  apiPrefix:'/visual/api',
  enableNotification:true,
  reduxDevToolEnable:true,
}

const prodConfig={
  apiPrefix:'/visual/api',
  enableNotification:true,
  reduxDevToolEnable:false,
}

let config=merge(process.env.NODE_ENV==='production'?prodConfig:devConfig,global);


export default config;
