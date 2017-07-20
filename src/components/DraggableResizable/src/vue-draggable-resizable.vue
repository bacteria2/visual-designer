<template>
  <div class="vdr"
       :class="{ draggable: draggable, resizable: resizable, active: active }"
       @mousedown.stop="elmDown" @contextmenu="zIndexMenu" :style="style">
    <div  class="b-handler" :style="{ display: active ? 'block' : 'none'}">
      <div
        class="handle"
        v-if="resizable"
        v-for="handle in handles"
        :class="'handle-' + handle"
        :style="{ display: active ? 'block' : 'none'}"
        @mousedown.stop="handleDown(handle, $event)"
      ></div>
    </div>
    <slot></slot>
    <div class="context-menu" :style="{
          left:contextMenu.left+'px',top:contextMenu.top+'px',
          display:contextMenu.show?'block':'none',zIndex:this.zIndex+1}" >
      <ul>
        <li class="c-menu" @click.stop="zIndexIncrease" >
          上移一层
        </li>
        <li class="c-menu" @click.stop="zIndexDecrease" :class="{disabled:this.zIndex==1}">
          下移一层
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce';
  import keycode from 'keycode'

  export default {
    replace: true,
    name: 'vue-draggable-resizable',
    props: {
      //缩放区域比例
      scale:{type:[Number,String],default:1},
      activated:Boolean,
      draggable: {
        type: Boolean, default: true
      },
      resizable: {
        type: Boolean, default: true
      },
      w: {
        type: Number,
        default: 200,
        validator(val) {
          return val > 0
        }
      },
      h: {
        type: Number,
        default: 200,
        validator: function (val) {
          return val > 0
        }
      },
      z:{"type":Number,default:1},
      minw: {
        type: Number,
        default: 50,
        validator: function (val) {
          return val > 0
        }
      },
      minh: {
        type: Number,
        default: 50,
        validator: function (val) {
          return val > 0
        }
      },
      x: {
        type: Number,
        default: 0,
        validator: function (val) {
          return val >= 0
        }
      },
      y: {
        type: Number,
        default: 0,
        validator: function (val) {
          return val >= 0
        }
      },
      handles: {
        type: Array,
        default: function () {
          return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
        }
      },
      axis: {
        type: String,
        default: 'both',
        validator: function (val) {
          return ['x', 'y', 'both'].indexOf(val) !== -1
        }
      },
      grid: {
        type: Array,
        default: function () {
          return [1, 1]
        }
      },
      parent: {
        type: Boolean, default: false
      }
    },
    created() {
      this.parentX = 0
      this.parentW = 9999
      this.parentY = 0
      this.parentH = 9999

      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0

      this.mouseOffX = 0
      this.mouseOffY = 0

      this.elmX = 0
      this.elmY = 0

      this.elmW = 0
      this.elmH = 0

      this.baseLineX = 0
      this.baseLineY = 0

    },
    mounted() {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)
      document.documentElement.addEventListener('mouseup', this.handleUp, true)
      document.documentElement.addEventListener('keydown', this.keyMove, true)
      if(this.parent){
        let el=document.getElementById('workspace');
        if(el&&el.parentNode)
          el.parentNode.addEventListener('mousedown', this.deselect, true);
      }else {
        document.documentElement.addEventListener('mousedown', this.deselect, true)
      }

      window.addEventListener('resize', debounce(this.updateParent, 200))
      if (this.minw > this.w) this.width = this.minw
      if (this.minh > this.h) this.height = this.minh
      this.updateParent();
      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    beforeDestroy() {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true)
      document.documentElement.removeEventListener('mousedown', this.deselect,true )
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
      document.documentElement.removeEventListener('resize', this.updateParent, true)
    },
    data() {
      return {
        contextMenu: {
          show: false,
          left: 0,
          top: 0,
        },
        top: this.y,
        left: this.x,
        width: this.w,
        height: this.h,
        resizing: false,
        dragging: false,
        active: this.activated,
        opacity: 1,
        handle: null,
        zIndex: this.z,
        moveEnable: false
      }
    },
    methods: {
      zIndexMenu(e){
        this.contextMenu.left = e.offsetX;
        this.contextMenu.top = e.offsetY;
        this.contextMenu.show = true;
      },
      updateParent(){
        if (this.parent) {
          const style = window.getComputedStyle(this.$el.parentNode, null)

          const parentW = parseInt(style.getPropertyValue('width'), 10)
          const parentH = parseInt(style.getPropertyValue('height'), 10)

          this.parentW = parentW
          this.parentH = parentH
          if (this.w > this.parentW) this.width = parentW

          if (this.h > this.parentH) this.height = parentH

          if ((this.x + this.w) > this.parentW) this.width = parentW - this.x

          if ((this.y + this.h) > this.parentH) this.height = parentH - this.y
        }
      },
      elmDown(e) {
        if (!this.active) {
          // this.zIndex += 1
          this.active = true
          this.$emit('activated')
          this.$emit('update:activated', true)

        }

        this.elmX = parseInt(this.$el.style.left)
        this.elmY = parseInt(this.$el.style.top)
        this.elmW = this.$el.offsetWidth || this.$el.clientWidth
        this.elmH = this.$el.offsetHeight || this.$el.clientHeight

        if (this.parent) {
          this.baseLineX = (e.pageX || e.clientX + document.documentElement.scrollLeft) - (e.offsetX * parseFloat(this.scale));
          this.baseLineY = (e.pageY || e.clientY + document.documentElement.scrollLeft) - (e.offsetY * parseFloat(this.scale));
        }

        if (this.draggable) {
          this.opacity = 0.6
          this.dragging = true
        }
      },
      deselect(e) {
        if(this.active&&!e.ctrlKey){
          let target = e.target || e.srcElement;
          let regex = new RegExp('handle-([trmbl]{2})', '');

          if (target !== this.$el&&!regex.test(target.className) && target.className !== 'c-menu'){
            this.active = false;
            this.contextMenu.show = false;
            this.$emit('deactivated');
            this.$emit('update:activated', false);
          }
        }
      },
      handleDown(handle, e) {
        this.handle = handle
        if (e.stopPropagation) e.stopPropagation()
        if (e.preventDefault) e.preventDefault()
        this.resizing = true
      },
      maximize(e) {
        if (!this.parent || !this.resizable) return

        let done = false

        const animate = () => {
          if (!done) {
            window.requestAnimationFrame(animate)
          }

          if (this.axis === 'x') {
            if (
              this.width === this.parentW && this.left === this.parentX
            ) done = true
          } else if (this.axis === 'y') {
            if (
              this.height === this.parentH && this.top === this.parentY
            ) done = true
          } else if (this.axis === 'both') {
            if (
              this.width === this.parentW &&
              this.height === this.parentH &&
              this.top === this.parentY &&
              this.left === this.parentX
            ) done = true
          }

          if (this.axis === 'x' || this.axis === 'both') {
            if (this.width < this.parentW) {
              this.width++
              this.elmW++
            }

            if (this.left > this.parentX) {
              this.left--
              this.elmX--
            }
          }

          if (this.axis === 'y' || this.axis === 'both') {
            if (this.height < this.parentH) {
              this.height++
              this.elmH++
            }

            if (this.top > this.parentY) {
              this.top--
              this.elmY--
            }
          }

          this.$emit('resizing', this.left, this.top, this.width, this.height)
        }

        window.requestAnimationFrame(animate)
      },
      handleMove(e) {
        //if (e.preventDefault) e.preventDefault()

        this.mouseX = (e.pageX || e.clientX + document.documentElement.scrollLeft - this.baseLineX) / parseFloat(this.scale)
        this.mouseY = (e.pageY || e.clientY + document.documentElement.scrollTop - this.baseLineY) / parseFloat(this.scale)

        let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
        let diffY = this.mouseY - this.lastMouseY + this.mouseOffY

        this.mouseOffX = this.mouseOffY = 0

        this.lastMouseX = this.mouseX
        this.lastMouseY = this.mouseY

        let dX = diffX
        let dY = diffY

        if (this.resizing&&1 === event.which) {
          if (this.handle.indexOf('t') >= 0) {
            if (this.elmH - dY < this.minh) this.mouseOffY = (dY - (diffY = this.elmH - this.minh))
            else if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
            this.elmY += diffY
            this.elmH -= diffY
          }

          if (this.handle.indexOf('b') >= 0) {
            if (this.elmH + dY < this.minh) this.mouseOffY = (dY - (diffY = this.minh - this.elmH))
            else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
            this.elmH += diffY
          }

          if (this.handle.indexOf('l') >= 0) {
            if (this.elmW - dX < this.minw) this.mouseOffX = (dX - (diffX = this.elmW - this.minw))
            else if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
            this.elmX += diffX
            this.elmW -= diffX
          }

          if (this.handle.indexOf('r') >= 0) {
            if (this.elmW + dX < this.minw) this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
            else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
            this.elmW += diffX
          }

          this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
          this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])

          this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
          this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])

          this.$emit('resizing', this.left, this.top, this.width, this.height)



        }
        else if (this.dragging&&1 === event.which) {
          if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
          else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))

          if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
          else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))

          this.elmX += diffX
          this.elmY += diffY

          if (this.axis === 'x' || this.axis === 'both') {
            this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
          }
          if (this.axis === 'y' || this.axis === 'both') {
            this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
          }

          this.$emit('dragging', this.left, this.top)
        }
      },
      handleUp(e) {
        this.handle = null
        if (this.resizing) {
          this.resizing = false
          this.$emit('resizestop', this.left, this.top, this.width, this.height)

          this.$emit('update:x', this.left)
          this.$emit('update:y', this.top)
          this.$emit('update:w',this.width)
          this.$emit('update:h', this.height)
        }
        if (this.dragging) {
          this.dragging = false
          this.$emit('dragstop', this.left, this.top)
          this.$emit('update:x', this.left)
          this.$emit('update:y', this.top)
          this.$emit('update:w',this.width)
          this.$emit('update:h', this.height)
        }
        this.opacity = 1

        this.elmX = this.left
        this.elmY = this.top
     //   e.stopPropagation();
      },

      zIndexIncrease(e){
          console.log(1)
        this.zIndex += 1;
        this.$emit('update:z', this.zIndex)
      //  this.contextMenu.show=false;
      },
      zIndexDecrease(e){
        if(this.zIndex>1){
          this.zIndex -= 1;
          this.$emit('update:z', this.zIndex)
          this.contextMenu.show=false;
        }
      },
      //上下左右移动
      keyMove(e){
        if(this.active&&this.draggable){
          if(keycode(e)==='up'){
            if (this.top - this.grid[1] >= this.parentY)
              this.top-=this.grid[1];
          }
          if(keycode(e)==='down'){
            if (this.top + this.grid[1] <= this.parentH-this.height)
              this.top+=this.grid[1];
          }
          if(keycode(e)==='left'){
            if (this.left - this.grid[0] >= this.parentX)
              this.left-=this.grid[0];
          }
          if(keycode(e)==='right'){
            if (this.left + this.grid[0] <= this.parentW-this.width)
              this.left+=this.grid[0];
          }

        }

      },
    },
    computed: {
      style() {
        return {
          top: this.top + 'px',
          left: this.left + 'px',
          width: this.width + 'px',
          height: this.height + 'px',
          zIndex: this.zIndex,
          opacity: this.opacity
        }
      }
    }
  }
</script>

