/**
 *echarts 渲染方法
 */

EchartsRender = function(){
    this.widget;
}

EchartsRender.prototype.init =function(domID) {
      var element=document.getElementById(domID)
      this.widget = echarts.init(element);
}

EchartsRender.prototype.render =function(domID,option) {
    if(this.widget){
      this.widget.setOption(option,true)
    }
}

EchartsRender.prototype.resize =function() {
   if(this.widget){
     this.widget.resize()
   }
}

