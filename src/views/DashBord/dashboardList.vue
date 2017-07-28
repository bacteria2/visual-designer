<template>
  <v-app class="dashboardList">
    <dashboard-base :show.sync="showDashboardBase" :edittingObj="edittingDashboard" @doRefresh="getDashboards(1)"></dashboard-base>
    <v-toolbar fixed class="grey darken-3" light>
      <v-toolbar-title>
        <el-input v-model="fName"  placeholder="Dashboard名称" icon="circle-close" class="input-search" :on-icon-click="clearContent"></el-input><v-btn light class="blue-grey" @click.native="filter">搜索</v-btn>
      </v-toolbar-title>
      <v-btn light class="blue-grey" @click.native="addDashboard">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="removeDashboards">删除<v-icon right light>delete</v-icon></v-btn>
    </v-toolbar>
    <main>
      <dashboard-box  :dashboards="dashboards" @editDashboard="editDashboard" @desiDashboard="desiDashboard" @updateSelected="updateSelectedDashboards"></dashboard-box>
    </main>
    <v-footer class="grey darken-2 wl-footer">
        <v-pagination :length="pages" v-model="curPage"></v-pagination>
    </v-footer>
  </v-app>
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
    watch:{
       curPage(val){
         this.paginationHandler();
       }
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
        itemsOfPage:4,
        fName:'',
        selectedDashboards:[]
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
      paginationHandler(){
         this.getDashboards()
      },
      getDashboards(initPage){
        if(initPage!=null&&initPage!=""){
              this.curPage=initPage;
        }
        let page = {rows:this.itemsOfPage,page:this.curPage,name:this.fName}
        loadDashboardList({page}).then((resp) => {
          if (resp.success) {
            this.dashboards = resp.rows.map((bdo)=>{
              return { id:bdo.fID,name:bdo.fName,tPath:bdo.fThumbnailPath};
            })
            this.totalDashboards = resp.total
          }
          else message.warning("**获取Dashboard列表失败**")
        });
      },
      updateSelectedDashboards(sws){
          this.selectedDashboards = sws
      },
      filter(){
            this.getDashboards(1)
      },
      clearContent(){
          this.fName='';
      },
      removeDashboards(){
          let msg = `该操作将删除选择的（${this.selectedDbSize}）个Dashboard，是否继续？`
          message.confirm(msg,this.delDashboards);
      },
      delDashboards(){
        let that = this;
        removeDashboards(this.selectedDashboards).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
            that.selectedDashboards = []
            that.getDashboards()
          }
          else message.warning("**删除失败，系统异常**")
        });
      }
    }
  }
</script>

