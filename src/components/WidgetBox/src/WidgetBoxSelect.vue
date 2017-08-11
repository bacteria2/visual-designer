<template>
  <div class="widget-list-select">
    <el-row :gutter="24"  ref="widgetList" class="widget-list-body">
      <el-col :xs="24"  :sm="8" :md="6"  v-for="wg in widgets" :key="wg.id">
        <div class="widget-box" @dblclick="selectedWidget(wg.id,wg.code)">
          <div class="header"><span class="title"></span></div>
          <div class="wg-body">
            <img class="image" :src="wg.tPath" alt="lorem" @error="nofind($event)">
          </div>
          <div class="caption">
            <span>{{wg.name}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="hasMore" class="loadMore" @click="loadMore"><span>加载更多</span></div>
  </div>
</template>
<script>
  export default{
    mounted () {
      this.scroller = this.$refs.widgetList.$el
    },
    props:{
      hasMore:Boolean,
      widgets:{
          type:Array,
          default:function () {return [];}
      }
    },
    data(){
      return {
        selectedWidgets:'',
        loading: false,
        scroller: null,
      }
    },
    methods: {
      selectedWidget(id,code){
        console.log('selectedWidget',id,code)
        this.selectedWidgets = id
        this.$emit('updateSelected',id,code)
      },
      loadMore(){
        this.$emit('loadMore')
      },
      nofind(event){
        let img=event.srcElement;
        img.src=require('../../../assets/dashboard/themeBlue/image_default.png');
        img.onerror=null;
      },
    }
  }
</script>

