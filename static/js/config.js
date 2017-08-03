/**
 * dashboard全局配置
 */

var config={
  context : "ydp-visual-web",
  apiPrefix:"/ydp-visual-web/ydp/visual",
  thumbPrefix:"/Thumbnails",
}

var BoardGroble = {
  context : "ydp-visual-web",
  config:{
    //上传服务器地址
    uploadServer:"http://192.168.40.234:8080/"+config.context+"/ydp/visual/upload/fileUpload.do",
    apiPrefix:config.context+"/ydp/visual"
  }
}



