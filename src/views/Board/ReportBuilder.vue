<template>
  <div class="board-builder">
    <view-header title="原始图表新增">
      <v-btn light class="blue-grey">保存原始图表
        <v-icon right light>cloud_upload</v-icon>
      </v-btn>
      <v-btn @click.native="edit">{{editStatus ? '关闭编辑' : '编辑'}}</v-btn>
      <v-btn @click.native="region.drawable=!region.drawable">{{region.drawable ? '可绘制' : '绘制禁用'}}</v-btn>
      <v-btn @click.native="addNewLayout(undefined,$event)" slot="rightEnd">新增</v-btn>
      <v-btn @click.native="addNewLayout(undefined,$event)" slot="rightEnd">新增2</v-btn>
    </view-header>
    <div class="b-content">
      <div id="workspace" @contextmenu.stop="contextMenuHandler" class="workspace"
           :class="{drawable:region.drawable}" @mousedown.stop="selectStart" :style="dashboardStyle"
      >
        <vue-draggable-resizable v-for="layout,index in dashboard.layoutList" parent :grid="[10,10]"
                                 :draggable="editStatus" :resizable="editStatus" :key="layout.id"
                                 :x.sync="layout.x" :y.sync="layout.y" :h.sync="layout.height" :w.sync="layout.width"
                                 :z.sync="layout.z"
                                 :activated.sync="layout.active">
          <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
            X: {{ layout.x }} / Y: {{ layout.y }} - Width: {{ layout.width }} / Height: {{ layout.height }}</p>
        </vue-draggable-resizable>
        <div class="m-region" :style="regionStyle"></div>
      </div>

    </div>
    <div class="b-side">
      <component :is="inputName" :dashboard="dashboard" @sizeReset="updateDragArea"></component>
    </div>
  </div>
</template>
<script>
  import debounce from 'lodash/debounce'
  import autoIndex from "@/mixins/IncreaseIndex";

  export default{
    mixins: [autoIndex],

    created(){
      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0

      this.mouseOffX = 0
      this.mouseOffY = 0

      this.baseLineX = 0
      this.baseLineY = 0
    },
    mounted(){
      this.updateIndex();
      document.documentElement.addEventListener("mousemove", this.mouseMove);
      document.documentElement.addEventListener("mouseup", this.mouseUp);
      document.documentElement.addEventListener("keydown", this.deleteLayout);
    },
    computed: {
      /**
       * 返回一个默认排序的列表
       * */
      usedIndex(){
        return this.dashboard.layoutList.map(el => el.id).sort()
      },
      regionStyle(){
        return {
          left: this.region.left + 'px',
          top: this.region.top + 'px',
          height: this.region.height + 'px',
          width: this.region.width + 'px',
          zIndex: this.region.zIndex,
          display: this.region.display ? "block" : "none"
        }
      },
      dashboardStyle(){
        let borderColor = this.dashboard.style.boarderColor;
        let borderWidth = this.dashboard.style.boarderWidth + 'px';
        let borderStyle = this.dashboard.style.boarderStyle;
        let borderRadius = this.dashboard.style.boardRadius + 'px';
        let backgroundColor = this.dashboard.style.backgroundColor;
        return {
          height: this.dashboard.style.height + 'px',
          width: this.dashboard.style.width + 'px',
          backgroundImage: this.dashboard.style.imgUrl ? `url(${this.dashboard.style.imgUrl})` : null,
          backgroundColor, borderStyle, borderWidth, borderColor, borderRadius,
          transform: `translate(-50%, -50%) scale(${this.dashboard.style.scale})`,
          position: 'absolute',
          top: '50%',
          left: '50%',
        }
      },
    },
    data(){
      return {
        inputName: "DashBoardInput",
        //scale: 0.8,
        editStatus: true,
        dashboard: {
          containers: {},
          layoutList: [
            {x: 40, y: 20, width: 270, height: 210, active: false, id: 0, z: 1},
            {x: 350, y: 20, width: 560, height: 380, active: false, id: 2, z: 1},
            {x: 930, y: 260, width: 260, height: 140, active: true, id: 3, z: 1}
          ],
          style: {
            scale: 0.6,
            height: 1080,
            width: 1920,
            backgroundColor: null,
            boarderColor: null,
            boarderWidth: null,
            boarderStyle: null,
            boardRadius: 0,
            imgUrl: null,
          },
        },

        region: {
          display: false,
          drawable: true,
          drawing: false,
          top: 100,
          left: 200,
          bottom: 200,
          width: 0,
          height: 0,
          right: 200,
          zIndex: 100,
        }
      }
    },
    methods: {
      //禁用右键菜单
      contextMenuHandler(event){
        window.event.returnValue = false;
        return false;
      },
      updateScale(){
        this.scale = (window.innerWidth / 2560).toFixed(2)
      },
      deleteLayout(event){
        //key为delete键的时候过滤掉处于active:true的子节点
        if (event.keyCode === 46 && this.editStatus) {
          this.dashboard.layoutList = this.dashboard.layoutList.filter(el => !el.active)
        }
      },
      addNewLayout(obj = {}, event){
        let {x = 0, y = 0, width = 150, height = 50, active = false} = obj;
        if (this.editStatus) {
          this.dashboard.layoutList.push({x, y, width, height, active, id: this.nextIndex})
          this.updateIndex();
        }
      },
      edit(){
        this.editStatus = !this.editStatus;
      },
      selectStart(event){
        //修改状态为正在绘制,重置高宽为0
        if (this.region.drawable && 1 === event.which) {

          this.region.drawing = true;
          this.region.display = true;

          this.baseLineX = (event.pageX || event.clientX + document.documentElement.scrollLeft) - (event.offsetX * this.dashboard.style.scale);
          this.baseLineY = (event.pageY || event.clientY + document.documentElement.scrollLeft) - (event.offsetY * this.dashboard.style.scale);

          this.mouseY = this.region.top = event.offsetY;
          this.mouseX = this.region.left = event.offsetX;

          this.region.width = 0;
          this.region.height = 0;

        }
      },
      mouseMove(event){
        if (this.region.drawable && this.region.drawing) {

          let lastMouseY = ((event.pageY || event.clientY + document.documentElement.scrollLeft) - this.baseLineY) / this.dashboard.style.scale;
          let lastMouseX = ((event.pageX || event.clientX + document.documentElement.scrollTop) - this.baseLineX) / this.dashboard.style.scale;

          let diffY = lastMouseY - this.mouseY
          let diffX = lastMouseX - this.mouseX

          this.region.width = Math.abs(diffX)
          this.region.height = Math.abs(diffY)

          if (diffX < 0) {
            this.region.left = lastMouseX;
          }
          if (diffY < 0) {
            this.region.top = lastMouseY;
          }
        }
      },
      mouseUp(e){
        if (this.region.drawable && this.region.drawing) {
          this.region.drawing = false
          this.region.display = false;
          let width = this.region.width - this.region.width % 10;
          let height = this.region.height - this.region.width % 10;

          let x = this.region.left - this.region.left % 10;
          let y = this.region.top - this.region.top % 10;
          let obj = {x, y, width: width < 50 ? 50 : width, height: height < 50 ? 50 : height, active: false};
          this.addNewLayout(obj)
          //绘制完毕后停止可绘制
          this.region.drawable = false;
        }

      },
      updateDragArea(){
        this.$children.forEach(child => {
          if (child.$options._componentTag === 'vue-draggable-resizable') {
            child.updateParent();
          }
        })
      }
    }
  }
</script>
