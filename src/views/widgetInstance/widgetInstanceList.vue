<template>
  <div class="widgetInstanceList">
    <mu-dialog :open="showWidgetListDialog" title="" dialogClass="widget-list-dialog" bodyClass="widget-list-dialogBody">
      <component :is="widgetListDialog" @closeWidgetDialog="showWidgetListDialog = false" @refreshWidgetInstance="getWidgetInstances"></component>
    </mu-dialog>

    <el-row class="page-head">
      <el-col :span="12">
      <span class="page-title"><h1>我的组件</h1></span>
    </el-col>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <div class="filterBox">
        <el-select v-model="filterType" class="filterType">
            <el-option label="按分类" value="type"></el-option>
            <el-option label="按名称" value="name"></el-option>
        </el-select>
        <el-cascader v-model="cascaderType" :clearable="true" v-show="filterType == 'type'" placeholder="过滤组件实例" :options="widgetTyped" change-on-select @change="filter" class="cascader1" ref="cascader1"></el-cascader>
          <el-input  v-show="filterType == 'name'" placeholder="请输入组件名称" v-model="widgetName" class="cascader2">
            <el-button slot="append" icon="search" @click="filterByName"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <main>
      <widget-box :widgets="widgetInstances"
                  :isInstance="true"
                  @addWidget="addWidgetInstance"
                  @desiWidget="desiWidgetInstance"
                  @delWidget="removeWidgets"
                  @loadMore ="loadMore"
                  :scrollTop="scrollTop"
      >
      </widget-box>
    </main>
  </div>
</template>
<script>
  import {compact,set,clone,message} from '@/utils'
  import {WidgetBox}  from '@/components/WidgetBox'
  import store from '@/store'
  import {loadWidgetInstancesByType,addWidgetInstance,getWidgetInstanceByID,removeWidgetInstances} from '@/services/WidgetInstanceService'
  import Router from '@/router'
  import widgetListDialog from '@/views/widgetList/widgetListDialog'
  import WidgetCommon from '@/mixins/WidgetCommon'

  export default{
    components:{WidgetBox},
    mixins:[WidgetCommon],
    mounted(){
      let pageInfo = this.$route.params.pageInfo
      if(pageInfo){
        this.itemsOfPage=pageInfo.rows;
        this.curPage=pageInfo.page;
        this.keyWord=pageInfo.keyWord;
        this.widgetName=pageInfo.name;
        this.widgetInstances = pageInfo.widgets;
        this.filterType = pageInfo.filterType;
        this.isMountedChange = true;
        this.scrollTop = pageInfo.scrollTop,
        this.cascaderType = pageInfo.cascaderType
      }else{
        //获取组件实例列表
        this.getWidgetInstances()
      }
    },
    data(){
      return {
        filterType:'type',
        widgetName:'',
        widgetListDialog,
        showWidgetListDialog:false,
        widgetInstances:[],
        isMountedChange:false,
        scrollTop:0,
        cascaderType:[]
      }
    },
    watch:{
      filterType(val){
          if(val == 'type'){
            this.widgetName = ''
          }else{
              this.keyWord = ''
            if(this.$refs.cascader1){
              this.$refs.cascader1.handlePick([], true);
            }
          }
          if(!this.isMountedChange){
            this.curPage = 1;
            this.widgetInstances = [];
            this.getWidgetInstances()
          }
          this.isMountedChange = false
      }
    },
    methods: {
      addWidgetInstance(){
        this.showWidgetListDialog = true,
          this.edittingWidget={}
      },
      desiWidgetInstance(id){
      //  await this.loadWidgetById(id);
       // Router.push({ name: 'WidgetEditor', params: { widgetInstance: this.edittingWidget}});
        this.scrollTop = document.getElementsByClassName('widget-list-body')[0].scrollTop
        let pageInfo = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord,name:this.widgetName,widgets:this.widgetInstances,filterType:this.filterType,scrollTop:this.scrollTop,cascaderType:this.cascaderType}
        Router.push({ name: 'WidgetEditor', params: { widgetId: id,pageInfo}});
      },
      loadMore(){
          if(this.curPage < this.pages){
            this.curPage += 1
            this.getWidgetInstances()
          }
      },
      getWidgetInstances(isRefresh){
        this.isMountedChange = false
        if(isRefresh){
          this.curPage = 1;
          this.widgetInstances = [];
        }
        let page = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord,name:this.widgetName}
        loadWidgetInstancesByType({page}).then((resp) => {
          if (resp.success) {
            let partOfWidgetInstances= resp.rows.map((wgi)=>{
              let tPath = wgi.fIsShort == '1' ? `/thumbnails/widget/w_${wgi.fID}.png`:'/static/image/default_widget.png';
              return { id:wgi.fID,name:wgi.fName,code:wgi.fViewModel,tPath}
            })
            this.widgetInstances = [...this.widgetInstances,...partOfWidgetInstances]
            if(this.$route.params.pageInfo){
               delete this.$route.params.pageInfo
               this.scrollTop = 0
            }
            this.totalWidgets = resp.total
          }
          else message.warning("**获取组件实例列表失败**")
        });
      },
      filter(val){
          if(typeof val == 'object' && val.length == 2){
            //this.cascaderType = val;
            let keyWord = val[1];
            this.keyWord = keyWord;
            this.curPage = 1;
            this.widgetInstances = [];
            this.getWidgetInstances()
          }
      },
      removeWidgets(id){
          let msg = `该操作将删除组件继续？`
          message.confirm(msg,this.delWidgets,id);
      },
      delWidgets(id){
            let that = this;
            removeWidgetInstances([id]).then((resp) => {
              if (resp.success) {
               let index =  this.widgetInstances.findIndex(wdi =>{
                    return wdi.id == id
                });
                //console.log('index',index);
                this.widgetInstances.splice(index,1);
                message.success(resp.msg);
                /*this.curPage = 1;
                this.widgetInstances = [];
                that.getWidgetInstances()*/
              }
              else message.warning("**删除失败，系统异常**")
            });
      },
      filterByName(){
          if(this.widgetName){
            this.curPage = 1;
            this.widgetInstances = [];
            this.getWidgetInstances()
          }
      }
    }
  }
</script>

