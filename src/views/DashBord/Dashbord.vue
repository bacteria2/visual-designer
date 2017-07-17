<template>
  <div class="board-builder">

    <view-header title="原始图表新增">
     <!-- <v-btn light class="blue-grey">保存原始图表
        <v-icon right light>cloud_upload</v-icon>
      </v-btn>-->
   <!--   <v-btn @click.native="edit">{{editStatus ? '关闭编辑' : '编辑'}}</v-btn>-->
<!--      <v-btn @click.native="region.drawable=!region.drawable">{{region.drawable ? '可绘制' : '绘制禁用'}}</v-btn>-->
      <v-btn @click.native="addNewLayout(undefined,$event,'chartContainer')" ><v-icon left dark>dashboard</v-icon>图表</v-btn>
      <v-btn @click.native="addNewLayout(undefined,$event,'widgetRectangle')" >
        <v-icon left dark>business</v-icon>
        矩形</v-btn>
      <v-btn @click.native="addNewLayout(undefined,$event,'imageWidget')" >
        <v-icon left dark>image</v-icon>
        图片</v-btn>
      <v-btn @click.native="addNewLayout(undefined,$event,'WidgetText')" >
        <v-icon left dark>edit</v-icon>
        文字</v-btn>
      <v-btn @click.native="previewWorkspace" slot="rightEnd">全屏显示</v-btn>
      <v-btn @click.native="save" slot="rightEnd"> 保存</v-btn>
    </view-header>
    <div class="b-content">
      <div id="workspace" @contextmenu.stop="contextMenuHandler" class="workspace"
           :class="{drawable:region.drawable}" @mousedown.stop="selectStart" :style="dashboardStyle">
        <vue-draggable-resizable @deactivated="layoutUnSelected" @activated="layoutSelected(layout.type,layout.containerId)" @resizestop="layoutResize(layout.containerId)" v-for="layout,index in dashboard.layouts" parent :grid="[10,10]"
                                 :draggable="editStatus" :resizable="editStatus" :key="layout.id" :scale="scale"
                                 :x.sync="layout.x" :y.sync="layout.y" :h.sync="layout.height" :w.sync="layout.width"
                                 :z.sync="layout.z" :activated.sync="layout.active">
              <component :is="layout.type" :id="layout.containerId"  :dashBord="dashboard"></component>
        </vue-draggable-resizable>
        <div class="m-region" :style="regionStyle"></div>
      </div>
    </div>
    <div class="b-side">
      <component :is="inputName" :targetObj="targetObj" @sizeReset="updateDragArea"></component>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import autoIndex from "@/mixins/IncreaseIndex";
  import {ChartContainer,WidgetRectangle,ImageWidget,WidgetText} from '@/components/Container'

  import DashboardFactory from '@/model/src/DashboardFactory'
  import { uuid } from '@/utils'
  import widgetInstanceDialog  from '@/views/widgetInstance/src/widgetInstancesDialog'
  //:style="{transform:scale}"
  export default{
    components:{
      ChartContainer,
      WidgetRectangle,
      widgetInstanceDialog,
      ImageWidget,
      WidgetText
    },
    mixins: [autoIndex],
    created(){
      this.mouseX = 0;
      this.mouseY = 0;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.mouseOffX = 0;
      this.mouseOffY = 0;
      this.baseLineX = 0;
      this.baseLineY = 0;
    },
    mounted(){
      this.updateIndex();
      document.documentElement.addEventListener("mousemove", this.mouseMove);
      document.documentElement.addEventListener("mouseup", this.mouseUp);
      document.documentElement.addEventListener("keydown", this.deleteLayout);
      document.getElementById('workspace').addEventListener("webkitfullscreenchange", r => {
        this.preview = !this.preview
      })
      //远程加载dashboard
       let dashBoardResp=DashboardFactory.getInstance('demoId');
       let self = this;
       if(dashBoardResp){
         dashBoardResp.then(function(data){
             if(data){
               self.dashboard=data;
             }
         });
       }

    },
    computed: {
      /**
       * 返回一个默认排序的列表
       * */
      usedIndex(){
        return this.dashboard.layouts.map(el => el.id).sort()
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
      dashboardStyle(){
        let borderColor = this.dashboard.style.boarderColor;
        let borderWidth = this.dashboard.style.boarderWidth + 'px';
        let borderStyle = this.dashboard.style.boarderStyle;
        let borderRadius = this.dashboard.style.boardRadius + 'px';
        let backgroundColor = this.dashboard.style.backgroundColor;
        let backgroundRepeat = this.dashboard.style.backgroundRepeat;
        let  style={
          height: this.dashboard.style.height + 'px',
          width: this.dashboard.style.width + 'px',
          backgroundImage: this.dashboard.style.imgUrl ? `url(${this.dashboard.style.imgUrl})` : null,
          backgroundColor,backgroundRepeat, borderStyle, borderWidth, borderColor, borderRadius,
        }

        if (this.preview) {
          return style;
        }
        return {
          ...style,
          transform: `translate(-50%, -50%) scale(${this.scale})`,
          position: 'absolute',
          top: '50%',
          left: '50%',
        }
      },
      scale(){
        if(this.preview){
          return 1
        }
        let floatScale=(window.innerWidth-450)/parseInt(this.dashboard.style.width)
        return floatScale.toFixed(2).substring(0,3)
      },
    },
    data(){
      let dashboard = DashboardFactory.getBlankDashboard();
      let targetObj = dashboard;
      return {
        inputName: "DashBoardInput",
        editStatus: true,
        dashboard,
        preview: false,
        targetObj,
        region: {
          display:false,
          drawable: false,
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
      //禁用右键菜单
      contextMenuHandler(event){
        window.event.returnValue = false;
        return false;
      },
      updateScale(){
        this.scale=(window.innerWidth/2560).toFixed(2)
      },
      deleteLayout(event){
        //key为delete键的时候过滤掉处于active:true的子节点
        if (event.keyCode === 46 && this.editStatus) {
          let activeLayouts = this.dashboard.layouts.filter(el => el.active);
          let containerId =activeLayouts[0].containerId;
          console.log(containerId);
          delete this.dashboard.containers[containerId];
          this.dashboard.layouts = this.dashboard.layouts.filter(el => !el.active)
        }
      },
      addNewLayout(obj = {},event,type){
        let containerId = uuid();
        let {x = 0, y = 0, width = 300, height = 300, active = false} = obj;
        if (this.editStatus) {
          this.dashboard.layouts.push({x, y, width, height, active, id: this.nextIndex,containerId:containerId,type:type});
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

          let diffY = lastMouseY - this.mouseY;
          let diffX = lastMouseX - this.mouseX;

          this.region.width = Math.abs(diffX);
          this.region.height = Math.abs(diffY);

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
      },
      layoutResize(containerId){
        let container = this.dashboard.containers[containerId];
        if(container){
          container.resize();
        }
      },
      save(){
          this.dashboard.save();
      },
      layoutSelected(type,containerId){
        if(type){
          let obj = this.dashboard.containers[containerId];
          if(!obj){
            obj = this.dashboard.extendWidgets[containerId];
          }
          this.targetObj = obj;
        }
        this.inputName = type+'Input';
      },
      layoutUnSelected(){
        this.inputName = 'DashBoardInput';
        this.targetObj = this.dashboard;
      },
      previewWorkspace(){
        if(!this.preview)
          document.getElementById('workspace').webkitRequestFullscreen();
        else
          this.preview=false;
      }
    }
  }
</script>


