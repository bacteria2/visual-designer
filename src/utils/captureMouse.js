
export default function captureMouse(element){
    //定义一个名为mouse的对象
    let mouse = {x:0,y:0};
    //为元素绑定mousemove事件
    element.addEventListener('mousemove',function(event){
        let x,y;
        // 获取鼠标位于当前屏幕的位置v， 并作兼容处理
        if(event.pageX||event.pageY){
            x = event.pageX;
            y = event.pageY;
        }else{
            x = event.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop +document.documentElement.scrollTop;
        }
        let bBox = element.getBoundingClientRect();
        //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= bBox.left;
        y -= bBox.top;
        let scale = element.width/bBox.width;
        mouse.x = x*scale;
        mouse.y = y*scale;
    },false);
    //返回值为mouse对象
    return mouse;
}