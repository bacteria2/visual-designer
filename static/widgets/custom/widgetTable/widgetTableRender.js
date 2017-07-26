/**
 * widgetTable 渲染方法
 */
widgetTable = function(){
    this.widget;
}

widgetTable.prototype.init =function(domID) {

}

widgetTable.prototype.render =function(domID,option) {
  /*var element = document.getElementById(domID),
    svgList =  element.getElementsByTagName("svg"),
    size = svgList.length;
    for(var i=0;i<size;i++){
      element.removeChild(svgList[i])
    }*/
  createTable(domID,option);
}

widgetTable.prototype.resize = function () {

}

