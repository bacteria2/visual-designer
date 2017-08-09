/**
 * dashboard全局配置
 */

var config = {
  context: 'ydp-visual-web',
  apiPrefix: '/ydp-visual-web/ydp/visual',
  thumbPrefix: '/thumbnails',
}

var BoardGroble = {
  context: '/ydp-visual-web',
  server: 'http://192.168.40.234:8080',
  thumbPrefix: '/thumbnails/dashboard',
}
BoardGroble.config = {
  //上传服务器地址
  uploadServer: BoardGroble.server + BoardGroble.context + '/ydp/visual/upload/fileUpload.do',
  apiPrefix: config.context + '/ydp/visual'
}




