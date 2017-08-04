<template>
  <div class="board-builder no-scrollbar">
    <view-header >
      <toolbar-button @click.native="addNewLayout(undefined,$event,'chartContainer')"
                      icon="equalizer" title="图表">
      </toolbar-button>

      <!--------扩展组件-------->
      <div class="cut-line"></div>

      <toolbar-button @click.native="addNewLayout(undefined,$event,widget.name)"
                      v-for="widget in extendWidgetConfig"
                      key="widget.name" :icon="widget.icon" :title="widget.title"></toolbar-button>
      <!--------/扩展组件-------->
      <div class="cut-line"></div>
      <toolbar-button @click.native="showTools=!showTools"
                      icon="work" title="工具">
      </toolbar-button>
      <a :href="'/share.html?id='+dashboard.id" class="action-btn" title="预览"  target="_blank" slot="rightEnd">
        <toolbar-button icon="visibility" title="预览">
        </toolbar-button>
      </a>
      <toolbar-button @click.native="previewWorkspace" slot="rightEnd"
                      icon="settings_overscan" title="全屏">
      </toolbar-button>

      <toolbar-button @click.native="save" slot="rightEnd"
                      icon="save" title="保存">
      </toolbar-button>
      <toolbar-button @click.native="exit" icon="exit_to_app" title="退出" slot="rightEnd"></toolbar-button>
    </view-header>
    <div class="b-content">
      <div class="drawer_container">
        <div id="workspace" @contextmenu.stop="contextMenuHandler"
             :class="{drawable:region.drawable,workspace:true,'workspaceGrid':dashboard.showGrid}" @mousedown.stop="selectStart"
             :style="dashboardStyle">
          <vue-draggable-resizable @deactivated="layoutUnSelected"
                                   @activated="layoutSelected(layout.widgetName,layout.containerId)"
                                   @resizestop="layoutResize(layout.containerId)"
                                   v-for="layout,index in dashboard.layouts" parent :grid="[10,10]"
                                   :draggable="editStatus" :resizable="editStatus" :key="layout.id" :scale="scale"
                                   :minw="40" :minh="40"
                                   :x.sync="layout.x" :y.sync="layout.y" :h.sync="layout.height" :w.sync="layout.width"
                                   :z.sync="layout.z" :activated.sync="layout.active"
                                   @deleteLayout="deleteLayout">
            <component :is="getCompontent(layout.widgetName)" :id="layout.containerId" :widgetName="layout.widgetName"
                       :dashBord="dashboard"></component>
          </vue-draggable-resizable>
          <div class="m-region" :style="regionStyle"></div>
        </div>
      </div>
    </div>
    <div class="b-side" @keydown.stop>
      <dash-board-input v-show="inputName==='DashBoardInput'" :targetObj="dashboard" :widgetName="widgetName"
                        @sizeReset="updateDragArea"></dash-board-input>
      <chart-container-input v-show="inputName==='chartContainerInput'" :targetObj="complexContainer"
                             :dashboard="dashboard" :widgetName="widgetName"
                             @sizeReset="updateDragArea"></chart-container-input>
      <extend-container-input v-show="inputName==='extendContainerInput'" :targetObj="simpleContainer"
                              :widgetName="widgetName" @sizeReset="updateDragArea"></extend-container-input>
    </div>

    <div :class="{'tools':true,'toosCol':!tools.toolsRowModel}" id="tools" v-show="showTools" >
      <div :class="{'toolsMoveRow':tools.toolsRowModel,'toolsMoveCol':!tools.toolsRowModel}"></div>
      <div class="tools-btn-warp">
     <!-- <tools-close  @close="showTools=false" ></tools-close>-->
      <!--<span v-show="tools.toolsRowModel">工具</span>-->
      <format-brush :activeContainer="activeContainer" :status="brushStatus"  @active="brushStatus=true"></format-brush>
        <dashboard-tool icon="content_copy"  @click.native="copyLayout"  title="复制"></dashboard-tool>
      </div>
      <!--<tools-close v-show="tools.toolsRowModel" style="float:right;"  @close="showTools=false" ></tools-close>-->
    </div>
  </div>
</template>

<script>
  import autoIndex from "@/mixins/IncreaseIndex";
  import { ChartContainer, ExtendContainer } from '@/components/Container'
  import DashboardFactory from '@/model/src/DashboardFactory'
  import { uuid, message, clone } from '@/utils'
  import widgetInstanceDialog  from '@/views/widgetInstance/widgetInstancesDialog'
  import DashBoardInput from "./StyleInput/Dashboard/DashBoardInput.vue";
  import store from "@/store"
  import Router from '@/router'
  import ToolsDrag from '@/model/src/ToolsDrag.js'
  import keyCode from 'keycode'

  export default{
    components: {
      DashBoardInput,
      ChartContainer,
      ExtendContainer,
      widgetInstanceDialog,
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
    data(){
      let dashboard = DashboardFactory.getBlankDashboard();

      let simpleContainer = dashboard.getExtendWidget('initId');

      let complexContainer = dashboard.getContainer('initId');

      return {
        showTools:true,
        tools:{},
        inputName: "",
        editStatus: true,
        dashboard,
        brushStatus: false,
        widgetName: '',
        preview: false,
        activeContainer: null,
        complexContainer,
        simpleContainer,
        extendWidgetConfig: simpleWidgetConfigs.dashboardAccessList,
        exit_dialog: false,
        region: {
          display: false,
          drawable: false,
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
    mounted(){
      //初始化拖拽工具栏
      this.tools = new ToolsDrag('tools');
      this.tools.el = document.getElementById('tools');
      this.tools.canvasEl = document.getElementsByClassName('b-content')[0];

      this.updateIndex();
      document.documentElement.addEventListener("mousemove", this.mouseMove);
      document.documentElement.addEventListener("mouseup", this.mouseUp);

      document.documentElement.addEventListener("keydown", this.deleteLayout);

      document.getElementById('workspace').parentElement.addEventListener("webkitfullscreenchange", r => {
        this.preview = !this.preview
      });
      //远程加载dashboard
      let dashboardId = this.$route.params.dashboardId;

      let paramDashboard = null;

      if (this.$route.params.dashboard)
        paramDashboard = this.$route.params.dashboard;

      if (paramDashboard) {
        this.dashboard = paramDashboard;
        this.inputName = 'DashBoardInput';
      } else {
        if (dashboardId) {
          this.dashboard.id = dashboardId;
          let dashBoardResp = DashboardFactory.getInstance(dashboardId);
          if (dashBoardResp) {
            dashBoardResp.then((data) => {
              if (data) {
                this.dashboard = data;
              }
              this.inputName = 'DashBoardInput';
            });
          }
        } else {
          message.warning("未获取实例ID");
        }
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
          height: this.region.height + 'px',
          width: this.region.width + 'px',
          top: this.region.top + 'px',
          zIndex: this.region.zIndex,
          display: this.region.display ? "block" : "none"
        }
      },
      dashboardStyle(){
        let dashboardStyle = this.computeStyle(this.dashboard.style);

        if (this.preview) {
          dashboardStyle.marginBottom = 0;
          dashboardStyle.marginTop = 0;
          return dashboardStyle;
        }
        dashboardStyle.transform = `scale(${this.scale})`

        return dashboardStyle
      },
      scale(){
        if (this.preview) {
          return 1
        }
        let floatScale = (window.innerWidth - 450) / parseInt(this.dashboard.style.width)
        if (floatScale >= 1.0)
          return 1
        else
          return floatScale.toFixed(2).substring(0, 3)
      },
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
          let activeLayouts = this.dashboard.layouts.filter(el => el.active);
          if (Array.isArray(activeLayouts) && activeLayouts.length > 0) {
            let currentLayout = activeLayouts[0];
            let containerId = currentLayout.containerId;
            if (currentLayout.widgetName === 'chartContainer') {
              delete this.dashboard.containers[containerId];
            } else {
              delete this.dashboard.extendContainers[containerId];
            }
          }
          this.dashboard.layouts = this.dashboard.layouts.filter(el => !el.active);
          this.layoutUnSelected();
        }
      },
      addNewLayout(obj = {}, event, widgetName){
        if (!this.dashboard.id) return;
        let containerId = uuid();
        let {x = 0, y = 0, width = 300, height = 300, active = false} = obj;
        if (this.editStatus) {
          this.dashboard.layouts.push({
            x,
            y,
            width,
            height,
            active,
            id: this.nextIndex,
            containerId: containerId,
            widgetName: widgetName
          });
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
        if (container) {
          container.resize();
        }
      },
      save(){
        this.dashboard.save();
      },
      layoutSelected(widgetName, containerId){
        let widget = undefined;
        if (widgetName) {
          this.widgetName = widgetName;
          widget = this.dashboard.containers[containerId];
          if (!widget) {
            widget = this.dashboard.extendContainers[containerId];
          }
        }

        //格式刷
        if (window.FormatBrush) {
          this.setFormatBrushStyle(widget);
        }

        if (!window.FormatBrush || window.FormatBrush.model === 0) {
          this.activeContainer = widget;
        }

        if (widgetName === "chartContainer") {
          this.inputName = 'chartContainerInput';
          this.complexContainer = widget;
          store.commit('clearEditExtendObj');
        } else {
          this.inputName = 'extendContainerInput';
          this.simpleContainer = widget;
          store.commit('updateEditExtendObj', widget);
        }
      },
      layoutUnSelected(){
        this.inputName = 'DashBoardInput';
        store.commit('clearEditExtendObj');
        this.targetObj = this.dashboard;
        this.activeContainer = null;
      },
      previewWorkspace(){
        if (!this.preview) {
          document.getElementById('workspace').parentElement.webkitRequestFullscreen();
        } else {
          this.preview = false;
        }

      },
      getCompontent(widgetName){
        if (widgetName === 'chartContainer') {
          return 'ChartContainer';
        } else {
          return 'ExtendContainer'
        }
      },
      exit(){
        message.confirm("请确保所有修改内容都已保存，否则将丢失，确认要退出吗？", function () {
          Router.push({name: 'DashboardList'});
        });
      },
      computeStyle(OriginalStyle){
        let style = clone(OriginalStyle);
        for (let key of Object.keys(style)) {
          let value = style[key];
          if (value != null && value != undefined && !isNaN(value)) { //值为数值
            if (key === 'opacity' || key === 'zIndex' || key === 'count') continue;  //透明度为数字，不用加px
            style[key] = value + 'px';
          } else if (key === 'backgroundImage') {
            if (value) {
              style[key] = `url(${value})`;
            }
          }
        }
        return style;
      },
      setFormatBrushStyle(e){
        if (!e) return;
        let formatBrush = window.FormatBrush;
        if (formatBrush.style && e.style) e.style = formatBrush.style;
        if (formatBrush.footer.style && e.footer.style) e.footer.style = formatBrush.footer.style;
        if (formatBrush.title.style && e.title.style) e.title.style = formatBrush.title.style;
        //复制扩展组件样式
        if(formatBrush.extendWidget&&e.extendWidget){
          for(let propName in formatBrush.extendWidget.style){
            if(e.extendWidget.style.hasOwnProperty(propName)){
              e.extendWidget.style[propName] = formatBrush.extendWidget.style[propName];
            }
          }
        }

        e.resize();

        if (formatBrush.model === 0) {
          this.brushStatus = false;
          delete window.FormatBrush;
        }
      },
      copyLayout(){
        //复制layout
        let activeLayouts = this.dashboard.layouts.filter(el => el.active);
        if (Array.isArray(activeLayouts) && activeLayouts.length > 0) {
          let currentLayout = activeLayouts[0];
          let sourceContainerId = currentLayout.containerId;

          let copyLayout = clone(currentLayout);
          let newContainerId = uuid();
          copyLayout.containerId = newContainerId;
          copyLayout.y = copyLayout.y + 50;
          copyLayout.x = copyLayout.x + 50;
          copyLayout.id = this.nextIndex;
          copyLayout.active = false;
          this.updateIndex();
          this.dashboard.layouts.push(copyLayout);
          //复制container
          let typeFlag = 0; // 0:图表容器  1：扩展容器
          let container = this.dashboard.containers[sourceContainerId];
          if(!container){
            typeFlag = 1;
            container = this.dashboard.extendContainers[sourceContainerId];
          }
          let copyContainer = clone(container);
          copyContainer.id = newContainerId;

          if(typeFlag === 0){
            this.dashboard.containers[newContainerId] = copyContainer;
          }else{
            this.dashboard.extendContainers[newContainerId] = copyContainer;
          }

        }else{
          message.warning('请选择一个目标组件')
        }
        //复制container

      }

    }
  }
</script>


