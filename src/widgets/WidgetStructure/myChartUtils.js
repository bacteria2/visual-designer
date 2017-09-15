window.utils = {};
//在utils对象上定义捕获坐标的方法
window.utils.captureMouse = function(element){
        //定义一个名为mouse的对象
        var mouse = {x:0,y:0};
        //为元素绑定mousemove事件
        element.addEventListener('mousemove',function(event){
            var x,y;
            //获取鼠标位于当前屏幕的位置， 并作兼容处理
            if(event.pageX||event.pageY){
                x = event.pageX;
                y = event.pageY;
            }else{
                x = event.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop +document.documentElement.scrollTop;
            }
            //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
            var offset =  computeOffset(element,0,0);
            x -= offset.offsetX;
            y -= offset.offsetY;
            mouse.x = x;
            mouse.y = y;

        },false);

        function computeOffset(node,offsetX,offsetY){
          offsetX += node.offsetLeft||0;
          offsetY += node.offsetTop||0;
          var parentNode = node.parentNode;
          if(parentNode){
            return computeOffset(parentNode,offsetX,offsetY);
          }else{
            return {offsetX:offsetX,offsetY:offsetY}
          }

        }
        //返回值为mouse对象
        return mouse;

}
// 求某一时间 二次贝塞尔 曲线点的位置。
// (1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2;  P1为目标点
window.utils.secBezier = function(p0,p1,p2,t){ //起点，目标点，终点  0<t<1
      var x = Math.pow(1-t,2)*p0.x + 2*t*(1-t)*p1.x + t*t*p2.x;
      var y = Math.pow(1-t,2)*p0.y + 2*t*(1-t)*p1.y + t*t*p2.y;
      return {x:x,y:y}
}
