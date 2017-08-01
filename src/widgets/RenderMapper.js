/**
 * Created by lenovo on 2017/7/27.
 */


let RenderMapper={};
(r => {
  return r.keys().forEach(key => {
    let com=new RegExp(/(?![.\/]).*?(?=\/[rR]ender.js$)/g)
    RenderMapper[com.exec(key)]=r(key).default;
  })
})(require.context('./', true, /^\.\/.*?\/.*[rR]ender\.js$/))

let WrapperNameList=[];
(r => {
  return r.keys().forEach(key => {
    //console.log('WrapperNameList',key,r(key).default,r)
    WrapperNameList.push(r(key).default.name);
  })
})(require.context('./', true, /^\.\/+[\w\W]+\/+[\w\W]+[vV]ue\.(js|vue)$/))

export {WrapperNameList,RenderMapper}

