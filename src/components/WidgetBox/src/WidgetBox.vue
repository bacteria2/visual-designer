<template>
  <div class="widget-list">
    <el-row :gutter="30"  ref="widgetList" class="widget-list-body">
      <el-col :xs="24"  :sm="12" :lg="6">
        <div class="widget-box">
            <div class="add-box">
              <i class="material-icons icon large" @click="addWidget">add</i>
            </div>
       </div>
      </el-col>
      <el-col :xs="24"  :sm="12" :lg="6"  v-for="wg in widgets" :key="wg.id">
          <div class="widget-box">
            <div class="header"><span class="title">{{wg.name}}</span></div>
            <div class="wg-body">
              <img class="image" :src="wg.tPath" alt="lorem" @error="nofind($event)">
            </div>
            <div class="action">
              <el-tooltip content="删除" placement="top-end">
                <el-button class="action-btn" @click="delWidget(wg.id)"><i class="material-icons icon mini">delete</i></el-button>
              </el-tooltip>
              <!--<el-tooltip content="复制" placement="top-end">
                <el-button class="action-btn" @click="copyWidget(wg.id)"><i class="material-icons icon mini">camera</i></el-button>
              </el-tooltip>-->
              <el-tooltip content="修改" placement="top-end" v-if="!isInstance">
                <el-button class="action-btn" @click="editWidget(wg.id)"><i class="material-icons icon mini">build</i></el-button>
              </el-tooltip>
              <el-tooltip content="设计" placement="top-end">
                <el-button class="action-btn" @click="desiWidget(wg.id)"><i class="material-icons icon mini">settings</i></el-button>
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
      this.scroller = this.$refs.widgetList.$el
    },
    props:{
      widgets:{
          type:Array,
          default:function () {return [];}
      },
      isInstance:{
          type:Boolean,
          default:false
      }
    },
    watch:{
      widgets(val){
          this.loading = false
      }
    },
    data(){
        return{
          loading: false,
          scroller: null,
        }
    },
    methods: {
      editWidget(id){
        this.$emit('editWidget',id)
      },
      desiWidget(id){
        this.$emit('desiWidget',id)
      },
      delWidget(id){
        this.$emit('delWidget',id)
      },
      copyWidget(id){
        this.$emit('copyWidget',id)
      },
      addWidget(){
        this.$emit('addWidget')
      },
      loadMore(){
        this.$emit('loadMore')
      },
      nofind(event){
        let img=event.srcElement;
        img.src= require('../../../assets/dashboard/themeBlue/image_default.png');
        img.onerror=null;
        console.log(img);
      },
    }
  }
</script>

