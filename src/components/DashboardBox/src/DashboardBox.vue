<template>
  <div class="widget-list">
    <el-row :gutter="30"  ref="dashboardList" class="widget-list-body">
      <el-col :xs="24"  :sm="12" :lg="6">
        <div class="widget-box">
          <div class="add-box">
            <i class="material-icons icon large" @click="addDashboard">add</i>
          </div>
        </div>
      </el-col>
      <el-col :xs="24"  :sm="12" :lg="6"  v-for="dbd in dashboards" :key="dbd.id">
        <div class="widget-box">
          <div class="header"><span class="title">{{dbd.name}}</span></div>
          <div class="wg-body" >
            <img class="dashBoardImage" :src="getThumbnail(dbd)" alt="lorem" @error="nofind($event)" >
          </div>
          <div class="action">
            <el-tooltip content="删除" placement="top-end">
              <el-button class="action-btn" @click="delDashboard(dbd.id)"><i class="material-icons icon mini">delete</i></el-button>
            </el-tooltip>
            <a :href="'/share.html?id='+dbd.id" class="action-btn" title="预览" style="padding-top: 7px; color: #8c8c8c" target="_blank" ><i class="material-icons icon mini">visibility</i></a>
            <el-tooltip content="修改" placement="top-end" v-if="!isInstance">
              <el-button class="action-btn" @click="editDashboard(dbd.id)"><i class="material-icons icon mini">build</i></el-button>
            </el-tooltip>
            <el-tooltip content="设计" placement="top-end">
              <el-button class="action-btn" @click="desiDashboard(dbd.id)"><i class="material-icons icon mini">settings</i></el-button>
            </el-tooltip>
          </div>
        </div>
      </el-col>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </el-row>
  </div>
</template>

<script>
  export default{
      mounted () {
        this.scroller = this.$refs.dashboardList.$el
      },
      props:{
      dashboards:{
          type:Array,
          default:function () {return [];}
      },
      isInstance:{
          type:Boolean,
          default:false
      }
    },
    computed:{

   },
    watch:{
      dashboards(val){
        this.loading = false
      }
    },
    data(){
      return {
        loading: false,
        scroller: null,
      }
    },
    methods: {
      editDashboard(id){
          this.$emit('editDashboard',id)
      },
      desiDashboard(id){
        this.$emit('desiDashboard',id)
      },
      delDashboard(id){
        this.$emit('delDashboard',id)
      },
      addDashboard(){
        this.$emit('addDashboard')
      },
      loadMore(){
        this.$emit('loadMore')
      },
      getThumbnail(dbd){
        let id = dbd.id;
        let thumbnailPix =  config.thumbPrefix +"/dashboard";
        return thumbnailPix+'/WI_'+id+'.png'
      },
      nofind(event){
        let img=event.srcElement;
        img.src=require('../../../assets/dashboard/themeBlue/dashboard-none-thumbnail.png');
        img.onerror=null;
      }

    }
  }
</script>

