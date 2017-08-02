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
      if(pos.x<5)pos.x=5;
      if(pos.y<5)pos.y=5;
      if(pos.x>300)pos.x=300;
      if(pos.y>860)pos.y=860;

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

        document.addEventListener('mousemove', move, false);
        document.addEventListener('mouseup', end, false);
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
        document.removeEventListener('mouseup', end);
        // do other things
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

