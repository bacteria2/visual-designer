<template>
  <div class="board-builder">
    <v-alert success transition="fade-transition" style="position: absolute; z-index: 99; width: 100%; top: 0; left: 0"  :value="dashboard.alert">
      保存成功！
    </v-alert>
    <mu-dialog :open="showSelectCharDidget" title="" dialogClass="widget-list-dialog" bodyClass="widget-list-dialogBody">
      <widget-instance-dialog @closeWidgetDialog="showSelectCharDidget=false"  @widgetInstanceSelected="selectChar"></widget-instance-dialog>
    </mu-dialog>

    <view-header title="原始图表新增">
      <v-btn light class="blue-grey">保存原始图表
        <v-icon right light>cloud_upload</v-icon>
      </v-btn>
      <v-btn @click.native="edit">{{editStatus ? '关闭编辑' : '编辑'}}</v-btn>
      <v-btn @click.native="region.drawable=!region.drawable">{{region.drawable ? '可绘制' : '绘制禁用'}}</v-btn>
      <v-btn @click.native="addNewLayout(undefined,$event)" slot="rightEnd">新增</v-btn>
      <v-btn @click.native="addNewLayout(undefined,$event)" slot="rightEnd">新增2</v-btn>
      <v-btn @click.native="save">保存</v-btn>
      <v-btn @click.native="showSelectCharDidget=true">选择图表</v-btn>
    </view-header>
    <div class="b-content">
      <div id="workspace" @contextmenu.stop="contextMenuHandler" class="workspace"
           :class="{drawable:region.drawable}" @mousedown.stop="selectStart" :style="dashboardStyle"
      >
        <vue-draggable-resizable @resizestop="layoutResize(layout.containerId)" v-for="layout,index in dashboard.layouts" parent :grid="[10,10]"
                                 :draggable="editStatus" :resizable="editStatus" :key="layout.id"
                                 :x.sync="layout.x" :y.sync="layout.y" :h.sync="layout.height" :w.sync="layout.width"
                                 :z.sync="layout.z"
                                 :activated.sync="layout.active">
          <chart-container :id="layout.containerId" :dashBord="dashboard"></chart-container>
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
  import ChartContainer from '@/components/Container/ChartContainer'
  import DashboardFactory from '@/model/src/DashboardFactory'
  import { uuid } from '@/utils'
  import widgetInstanceDialog  from '@/views/widgetInstance/src/widgetInstancesDialog'
  //:style="{transform:scale}"
  export default{
    components:{
      ChartContainer,
      widgetInstanceDialog
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
      let dashboard = DashboardFactory.getBlankDashboard();
      return {
        inputName: "DashBoardInput",
        editStatus: true,
        dashboard,
        showSelectCharDidget:false,
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
          this.dashboard.layouts = this.dashboard.layouts.filter(el => !el.active)
        }
      },
      addNewLayout(obj = {},event){
        let containerId = uuid();
        let {x = 0, y = 0, width = 150, height = 50, active = false} = obj;
        if (this.editStatus) {
          this.dashboard.layouts.push({x, y, width, height, active, id: this.nextIndex,containerId:containerId});
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
      selectChar(data){
        if(data&&data.id&&data.code){
          let containerId = this.dashboard.layouts[3].containerId;
          let container = this.dashboard.containers[containerId];
          let originalId = container.chartId;
          container.chartId=data.id;
          container.chartType = data.code;
          if(originalId!=data.id){
              container.perRender();
          }
        }else{
            alert("图标参数不全！");
        }

      }
    }
  }
</script>


