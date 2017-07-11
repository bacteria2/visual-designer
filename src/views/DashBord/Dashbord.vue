<template>
  <div>
      <v-alert success transition="fade-transition" style="position: absolute; z-index: 99; width: 100%; top: 0; left: 0"  :value="dashBoard.alert">
        保存成功！
      </v-alert>

    <div id="workspace" class="workspace" style="border: 1px solid red;transform-origin: left top 0;width: 100%;height: 1080px;" :style="{transform:`scale(${scale})`}" :class="{drawable:region.drawable}" @mousedown.stop="selectStart"
    >
      <vue-draggable-resizable @resizestop="layoutResize(layout.containerId)" v-for="layout,index in dashBoard.layouts" parent :grid="[10,10]"
                               :draggable="editStatus" :resizable="editStatus" :key="layout.id"
                               :x.sync="layout.x" :y.sync="layout.y" :h.sync="layout.height" :w.sync="layout.width"
                               :activated.sync="layout.active" :style="layout.style">
        <char-container :id="layout.containerId" :dashBord="dashBoard"></char-container>
      </vue-draggable-resizable>
    </div>
    <div class="m-region" :style="regionStyle"></div>
    <v-btn @click.native="edit">{{editStatus ? '关闭编辑' : '编辑'}}</v-btn>
    <v-btn @click.native="region.drawable=!region.drawable">{{region.drawable?'可绘制':'绘制禁用'}}</v-btn>
    <v-btn @click.native="addNewLayout(undefined,$event)">新增</v-btn>
    <v-btn @click.native="save">保存</v-btn>
  </div>
</template>
<style scoped>
  .m-region {
    position: absolute;
    border: 1px dotted #1881dc;
    background-color: rgba(52, 152, 251, 0.24);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  .workspace {
    /*background-size: 10px 10px;*/
    position: relative;
    box-sizing: content-box;
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04) 1px, transparent 1px, transparent 10px),
    repeating-linear-gradient(-90deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04) 1px, transparent 1px, transparent 10px) 1px 1px rgb(242, 242, 242);
  }
  .workspace.drawable{
    cursor: crosshair;
  }
</style>
<script>
  import debounce from 'lodash/debounce'
  import autoIndex from "@/mixins/IncreaseIndex";
  import CharContainer from '@/components/Container/CharContainer'
  import DashboardFactory from '@/module/DashboardFactory'
  import { uuid } from '@/utils'
  //:style="{transform:scale}"
  export default{
    components:{
      CharContainer
    },
    mixins: [autoIndex],

    created(){
      this.mouseX = 0;
      this.mouseY = 0;

      this.lastMouseX = 0;
      this.lastMouseY = 0;

      this.mouseOffX = 0;
      this.mouseOffY = 0;
    },
    mounted(){
      this.updateIndex();
      document.documentElement.addEventListener("mousemove", this.mouseMove);
      document.documentElement.addEventListener("mouseup", this.mouseUp);
      document.documentElement.addEventListener("keydown", this.deleteLayout);
      window.addEventListener("resize",debounce(this.updateScale,100));
      this.updateScale();
      let dashBoardResp=DashboardFactory.getInstance('demoId');
      let self = this;
      if(dashBoardResp){
        dashBoardResp.then(function(data){
          self.dashBoard=data;
        });
      }
    },
    computed: {
      /**
       * 返回一个默认排序的列表
       * */
      usedIndex(){
        return this.dashBoard.layouts.map(el => el.id).sort()
      },
      regionStyle(){
        return {
          left: this.region.left + 'px',
          height:this.region.height+'px',
          width:this.region.width+'px',
          top: this.region.top + 'px',
          zIndex: this.region.zIndex,
          display: this.region.display ? "block" : "none"
        }
      },
    },
    data(){
      let dashBoard = DashboardFactory.getBlankDashboard();
      return {
        dashBoard,
        scale:1,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        editStatus: true,
        region: {
          display:false,
          drawable: true,
          drawing: false,
          top: 100,
          left: 200,
          bottom:200,
          width:0,
          height:0,
          right:200,
          zIndex: 100,
        }
      }
    },
    methods: {
      updateScale(){
        /* let el= document.getElementById('workspace')
         let i= el.style.width.indexOf("p");
         let width=el.style.width.substring(0,i);
         console.log(window.innerWidth/width)*/
        this.scale=(window.innerWidth/2560).toFixed(2)
      },
      deleteLayout(event){
        //key为delete键的时候过滤掉处于active:true的子节点
        if (event.keyCode === 46 && this.editStatus) {
          this.dashBoard.layouts = this.dashBoard.layouts.filter(el => !el.active)
        }
      },
      addNewLayout(obj = {},event){
        let containerId = uuid();
        let {x = 0, y = 0, width = 150, height = 50, active = false} = obj;
        if (this.editStatus) {
          this.dashBoard.layouts.push({x, y, width, height, active, id: this.nextIndex,containerId:containerId});
          this.updateIndex();
        }
      },
      edit(){
        this.editStatus = !this.editStatus;
      },
      selectStart(event){
        //修改状态为正在绘制,重置高宽为0
        if(this.region.drawable&&1 === event.which){
          this.region.drawing = true;
          this.region.display=true;

          this.mouseY = this.region.top = event.pageY || event.clientX + document.documentElement.scrollLeft;
          this.mouseX = this.region.left=this.region.right = event.pageX || event.clientY + document.documentElement.scrollTop;

          this.region.width = 0;
          this.region.height = 0;
        }
      },
      mouseMove(event){
        if (this.region.drawable && this.region.drawing) {
          let lastMouseY = event.pageY || event.clientX + document.documentElement.scrollLeft;
          let lastMouseX = event.pageX || event.clientY + document.documentElement.scrollTop;

          let diffY = lastMouseY - this.mouseY
          let diffX = lastMouseX - this.mouseX

          this.region.width=Math.abs(diffX)
          this.region.height=Math.abs(diffY)

          if (diffX < 0) {
            this.region.left=lastMouseX;
          }
          if (diffY < 0) {
            this.region.top=lastMouseY;
          }
        }
      },

      mouseUp(e){
        if(this.region.drawable&&this.region.drawing){
          this.region.drawing = false
          this.region.display=false;
          let width=this.region.width-this.region.width%10;
          let height=this.region.height-this.region.width%10;

          let x=this.region.left-this.region.left%10;
          let y=this.region.top-this.region.top%10;
          let obj={x,y,width:width<50?50:width,height:height<50?50:height,active:false};
          this.addNewLayout(obj)
          //绘制完毕后停止可绘制
          this.region.drawable=false;
        }

      },
      onResize: function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

      },
      onDrag: function (x, y) {
        this.x = x;
        this.y = y;
      },
      layoutResize(containerId){
        let container = this.dashBoard.containers[containerId];
        if(container){
          container.resize();
        }
      },
      save(){
          this.dashBoard.save();
      }
    }
  }
</script>


