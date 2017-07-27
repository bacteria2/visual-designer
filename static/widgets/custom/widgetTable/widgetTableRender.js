/**
 * widgetTable 渲染方法
 */
widgetTable = function(){
    this.widget;
}

widgetTable.prototype.init =function(domID) {

}

widgetTable.prototype.render =function(domID,option) {
  new createTable(domID,option);
}

widgetTable.prototype.resize = function () {

}

