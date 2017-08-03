/**
 * 驾驶舱拖拽工具栏封装
 */
export default class Drag{
    constructor(selector){
      this.elem = typeof selector == 'Object' ? selector : document.getElementById(selector);
      this.startX = 0;
      this.startY = 0;
      this.sourceX = 0;
      this.sourceY = 0;
      this.transform = this.getTransform();
      this.init();
      this.toolsRowModel = false;
      this.el = null;
      this.canvasEl = null;
      this.mousemove = false;
      this.mouseup = false;
    }

    init() {
      // 初始化
      this.setDrag();
    }

    //获取当前元素的属性
    getStyle(property) {
      return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.elem, false)[property] : this.elem.currentStyle[property];
    }

    // 用来获取当前元素的位置信息
    getPosition() {
      let pos = {x: 0, y: 0};
      let transform = this.transform;
      if(transform) {
        let transformValue = this.getStyle(transform);
        if(transformValue == 'none') {
          this.elem.style[transform] = 'translate(0, 0)';
        } else {
          let temp = transformValue.match(/-?\d+/g);
          pos = {
            x: parseInt(temp[4].trim()),
            y: parseInt(temp[5].trim())
          }
        }
      } else {
        if(this.getStyle('position') == 'static') {
          this.elem.style.position = 'relative';
        } else {
          pos = {
            x: parseInt(this.getStyle('left') ? this.getStyle('left') : 0),
            y: parseInt(this.getStyle('top') ? this.getStyle('top') : 0)
          }
        }
      }

      return pos;
    }

    // 用来设置当前元素的位置
    setPostion(pos) {
      let _toolsWidth = this.el.clientWidth;
      let _toolsHeight = this.el.clientHeight;

      let _canvasWidth = this.canvasEl.clientWidth;
      let _canvasHeight = this.canvasEl.clientHeight;

      let _maxLeft= 64;
      let _maxTop= 14;

      let _maxRight =  (_canvasWidth-_toolsWidth) + 30;
      let _maxBottom =  (_canvasHeight-_toolsHeight) ;


      // console.log('_maxRight',_maxRight);
      // console.log('_maxBottom',_maxBottom);

      if(pos.x<_maxLeft){
        this.toolsRowModel = false;
        pos.x=_maxLeft;
      }

      if(pos.y<_maxTop){
        if(pos.x>_maxLeft){
          this.toolsRowModel = true;
        }
        pos.y=_maxTop;
      }

      if(pos.x>=_maxRight) pos.x=_maxRight;
      if(pos.y>=_maxBottom){
        if(pos.x>_maxLeft){
          this.toolsRowModel = true;
        }
        pos.y=_maxBottom;
      }

      if(this.transform) {
        this.elem.style[this.transform] = 'translate('+ pos.x +'px, '+ pos.y +'px)';
      } else {
        this.elem.style.left = pos.x + 'px';
        this.elem.style.top = pos.y + 'px';
      }
    }

    //绑定事件
    setDrag() {
      let self = this;
      this.elem.addEventListener('mousedown', start, false);
      function start(event) {

        self.startX = event.pageX;
        self.startY = event.pageY;

        let pos = self.getPosition();

        self.sourceX = pos.x;
        self.sourceY = pos.y;

        if(self.mousemove){
          end();
          return
        }

        document.addEventListener('mousemove', move, false);
        self.mousemove = true;
        document.addEventListener('mouseup', end, false);
        self.mouseup = true;
      }

      function move(event) {
        let currentX = event.pageX;
        let currentY = event.pageY;

        let distanceX = currentX - self.startX;
        let distanceY = currentY - self.startY;

        self.setPostion({
          x: (self.sourceX + distanceX).toFixed(),
          y: (self.sourceY + distanceY).toFixed()
        })
      }

      function end(event) {
        document.removeEventListener('mousemove', move);
        self.mousemove = false;
        document.removeEventListener('mouseup', end);
        self.mouseup = false;
      }
    }

    //用来获取transform的兼容写法
    getTransform() {
      let transform = '',
        divStyle = document.createElement('div').style,
        transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
        i = 0,
        len = transformArr.length;
      for(; i < len; i++)  {
        if(transformArr[i] in divStyle) {
          return transform = transformArr[i];
        }
      }
      return transform;
    }
}

