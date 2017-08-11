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

export {RenderMapper}

