/**
 * Created by lenovo on 2017/12/18.
 */
let global=window.config||{};


const defaultConfig={
  apiPrefix:'/visual/api',
  serverPrefix:'http://localhost:8088/vd',
  resourcePrefix:'/visual/resource',
  enableNotification:true,
  reduxDevToolEnable:false,
  needLogin:true,
}

const devConfig={
  reduxDevToolEnable:true,
  //needLogin:false,
};

const prodConfig={

};

let config=process.env.NODE_ENV==='production'?prodConfig:devConfig


export default {...defaultConfig,...config,...global};
