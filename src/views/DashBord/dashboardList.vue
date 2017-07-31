<template>
  <div class="dashboardList">
    <dashboard-base :show.sync="showDashboardBase" :edittingObj="edittingDashboard" @doRefresh="filter"></dashboard-base>
    <el-row class="page-head">
      <el-col :span="12">
        <span class="page-title"><h1>我的驾驶舱</h1></span>
      </el-col>
      <el-col :span="12" class="right">
        <el-input v-model="fName"  placeholder="Dashboard名称" icon="circle-close" class="input-search" :on-icon-click="clearContent"></el-input><v-btn light class="blue-grey" @click.native="filter">搜索</v-btn>
      </el-col>
    </el-row>
    <main>
      <dashboard-box  :dashboards="dashboards" @editDashboard="editDashboard" @desiDashboard="desiDashboard" @addDashboard ="addDashboard" @delDashboard="removeDashboards" @loadMore ="loadMore" ></dashboard-box>
    </main>
  </div>
</template>
<script>
  import {compact,set,clone,message} from '@/utils'
  import DashboardBase from './DashboardBase.vue'
  import {DashboardBox}  from '@/components/DashboardBox'
  import store from '@/store'
  import {loadDashboardList,addDashboard,editDashboard,getDashboardByID,removeDashboards} from '@/services/dashBoardService'
  import Router from '@/router'
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {
      ElInput,
      DashboardBase,DashboardBox},
     mounted(){

      //获取Dashboard列表
      this.getDashboards()
    },
    computed:{
      pages(){
          let val = Number.parseInt(this.totalDashboards / this.itemsOfPage),
              mod = this.totalDashboards % this.itemsOfPage,
              pages = mod == 0?val:val+1
              return pages
      },
      selectedDbSize(){
          return this.selectedDashboards.length
      }
    },
    data(){
      return {
        //左导航
        //drawer:true,
        //mini:false,
        showDashboardBase:false,
        widgetTypes:[],//组件分类
        dashboards:[],
        edittingDashboard:'',
        curPage:1,
        totalDashboards:0,
        itemsOfPage:8,
        fName:''
      }
    },
    methods: {
      addDashboard(){
          this.showDashboardBase = true,
          this.edittingDashboard={}
      },
      editDashboard(id){
          let that = this;
          this.loadDashboardById(id,function () {
            that.showDashboardBase = true;
          })
      },
      desiDashboard(id){
        let that = this;
        this.loadDashboardById(id,function () {
          Router.push({ name: 'DashboardDesigner', params: { dashboard: that.edittingDashboard}})
        })
      },
      loadDashboardById(id,fun){
        getDashboardByID({key:id}).then((resp) => {
          if (resp.success) {
            this.edittingDashboard = resp.dashboardVO;
            fun();
          }
          else{
            console.log(resp.success)
          }
        });
      },
      loadMore(){
        if(this.curPage < this.pages){
          this.curPage += 1
          this.getDashboards()
        }
      },
      getDashboards(){
        let page = {rows:this.itemsOfPage,page:this.curPage,name:this.fName}
        loadDashboardList({page}).then((resp) => {
          if (resp.success) {
            let partOfWidgets = resp.rows.map((bdo)=>{
              return { id:bdo.fID,name:bdo.fName,tPath:bdo.fThumbnailPath};
            })
            this.dashboards = [...this.dashboards,...partOfWidgets]
            this.totalDashboards = resp.total
          }
          else message.warning("**获取Dashboard列表失败**")
        });
      },
      filter(){
          this.curPage = 1;
          this.dashboards =[];
          this.getDashboards()
      },
      clearContent(){
          this.fName='';
      },
      removeDashboards(id){
          let msg = `该操作将删除组件,是否继续？`
          message.confirm(msg,this.delDashboards,id);
      },
      delDashboards(id){
        let that = this;
        removeDashboards([id]).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
            this.curPage = 1;
            this.dashboards =[];
            that.getDashboards()
          }
          else message.warning("**删除失败，系统异常**")
        });
      }

    }
  }
</script>

