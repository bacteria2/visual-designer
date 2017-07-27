/**
 * 富文本插件 渲染方法
 */
RichtextWidget = function(){
  this.widget;
}

RichtextWidget.prototype.init =function(domID) {
  this.widget = document.createElement("div");
}

RichtextWidget.prototype.render =function(domID,option) {
  if(option){
    var options = option.options;
    if(options){
      var html = options['htmlContent'];
      if(html){
        this.widget.innerHTML = html;
      }
    }
  }
  console.log("内部渲染",domID,option,this.widget);
  document.getElementById(domID).appendChild(this.widget);
}

RichtextWidget.prototype.resize = function () {

}



