/**
 * dashboard全局配置
 */

var config={
  context : "ydp-visual-web",
  apiPrefix:"/ydp-visual-web/ydp/visual",
  thumbPrefix:"/Thumbnails",
}

var BoardGroble = {
  context : "/ydp-visual-web",
  thumbPrefix:"/Thumbnails/dashboard",
}
 BoardGroble.config = {
    //上传服务器地址
    uploadServer: BoardGroble.context + "/ydp/visual/upload/fileUpload.do",
    apiPrefix:config.context+"/ydp/visual"
  }




