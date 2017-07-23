/**
 * D3DashBoard 渲染方法
 */
D3DashBoard = function(){
    this.widget;
}

D3DashBoard.prototype.init =function(domID) {

}

D3DashBoard.prototype.render =function(domID,option) {
  createDashBoardChart(domID,option.width,option.height,option.dataSet);
}

D3DashBoard.prototype.resize = function () {

}

