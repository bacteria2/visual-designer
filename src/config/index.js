/**
 * Created by lenovo on 2017/12/18.
 */
let global=window.config||{};


const defaultConfig={
  apiPrefix:'/visual/api',
  resourcePrefix:'/visual/resource',
}

const devConfig={
  enableNotification:true,
  reduxDevToolEnable:true,
}

const prodConfig={
  enableNotification:true,
  reduxDevToolEnable:false,
}

let config=process.env.NODE_ENV==='production'?prodConfig:devConfig


export default {...defaultConfig,...config,...global};
