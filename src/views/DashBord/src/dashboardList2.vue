<template>
  <div class="dashboardList">
    <h5>驾驶舱管理</h5>
    <div class="infinite-container" id="infinite-container">
        <mu-list>
            <template v-for="dashboard in dashboards" >
              <mu-list-item :title="dashboard.name" @click.native="showDashboard(dashboard)"/>
              <mu-divider/>
            </template>
          <mu-list-item v-show="dashboards.length<totalDashboards&&!loading"  @click.native="loadMore">加载更多...</mu-list-item>
        </mu-list>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" />
    </div>
    <div class="dashboatd-card">
        <!--显示驾驶舱缩略图-->
          <el-card :body-style="{ padding: '0px' }">
            <img src="/static/image/overview-dashboard.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        <!--/显示驾驶舱缩略图-->
    </div>
  </div>

</template>

<style lang="css">
  .dashboardList { width: 100%; height: auto; position: relative; height: 100%; padding: 25px;}
.image{height: 500px;}
  body{background-color: #eee; }

  .infinite-container,.dashboatd-card{
    height: 600px;
    margin: 15px 0 0 15px;
    background-color: #fff;
    float: left;
    border: 1px solid #d9d9d9;
  }
  .infinite-container{

    font-size: 13px;
    font-family: "Microsoft YaHei";
    width: 256px;
    height: 600px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dashboatd-card {
    width: 900px;
  }

</style>
<script>
  import {loadDashboardList,addDashboard,editDashboard,getDashboardByID,removeDashboards} from '@/services/dashBoardService'
  export default{
    components: {
    },
     mounted(){
      this.getDashboards();
      this.scroller = document.getElementById('infinite-container');
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
        showDashboardBase:false,
        scroller:null,
        loading: false,
        widgetTypes:[],//组件分类
        dashboards:[],
        edittingDashboard:'',
        curPage:1,
        totalDashboards:0,
        itemsOfPage:4,
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
          this.curPage += 1;
          this.loading = true;
          setTimeout(() => {
          this.getDashboards()
          }, 1000)
        }
      },
      getDashboards(){
        let page = {rows:this.itemsOfPage,page:this.curPage,name:this.fName}
        loadDashboardList({page}).then((resp) => {
          if (resp.success) {
            let partOfWidgets = resp.rows.map((bdo)=>{
              return { id:bdo.fID,name:bdo.fName,tPath:bdo.fThumbnailPath};
            })
              this.dashboards = [...this.dashboards,...partOfWidgets];
              this.totalDashboards = resp.total;
              this.loading = false;
          }
          else {
            message.warning("**获取Dashboard列表失败**")
            this.loading = false;
          }

        });
      },
      showDashboard(dashboard){
        console.log(dashboard);
      }
    }
  }
</script>

