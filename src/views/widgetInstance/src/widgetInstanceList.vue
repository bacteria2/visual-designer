<template>
  <div class="widgetInstanceList">
    <mu-dialog :open="showWidgetListDialog" title="" dialogClass="widget-list-dialog" bodyClass="widget-list-dialogBody">
      <component :is="widgetListDialog" @closeWidgetDialog="showWidgetListDialog = false" @refreshWidgetInstance="getWidgetInstances"></component>
    </mu-dialog>

    <el-row class="page-head">
      <el-col :span="12">
      <span class="page-title"><h1>我的组件</h1></span>
    </el-col>
      <el-col :span="12">
        <el-cascader placeholder="过滤组件实例" :options="widgetTyped" change-on-select @change="filter" class="cascader"></el-cascader>
      </el-col>
    </el-row>
    <main>
      <widget-box :widgets="widgetInstances"
                  :isInstance="true"
                  @addWidget="addWidgetInstance"
                  @desiWidget="desiWidgetInstance"
                  @delWidget="removeWidgets"
                  @loadMore ="loadMore"
      >
      </widget-box>
    </main>
  </div>
</template>
<script>
  import {compact,set,clone,message} from '@/utils'
  import {WidgetBox}  from '@/components/WidgetBox'
  import store from '@/store'
  import {loadWidgetTypes,loadWidgetInstancesByType,addWidgetInstance,getWidgetInstanceByID,removeWidgetInstances} from '@/services/WidgetInstanceService'
  import Router from '@/router'
  import widgetListDialog from '@/views/widgetList/src/widgetListDialog'

  export default{
    components:{WidgetBox},
    mounted(){
      //加载远程数据组件分类
      loadWidgetTypes().then((resp) => {
        if (resp.success) {
          this.widgetTypes = resp.rows.map((item)=>{
            return {id:item.fID,type:item.fType,label:item.fName,code:item.fImageCode,value:item.fID}
          })
        }
        else console.log(resp.message, resp.data)
      });
      //获取组件实例列表
      this.getWidgetInstances()
    },
    computed:{
      widgetTyped(){/*active:true,*/
        return [{label:'图形分类',value:'base',
          icon:'',
          children:this.widgetTypes.filter((item)=>{return item.type == 0})},
          {label:'应用分类',value:'app',
            icon:'',
            children:this.widgetTypes.filter((item) => {return item.type == 1})}
        ]
    },
      pages(){
          let val = Number.parseInt(this.totalWidgets / this.itemsOfPage),
              mod = this.totalWidgets % this.itemsOfPage,
              pages = mod == 0?val:val+1
              return pages
      },
    },
    data(){
      return {
        widgetListDialog:widgetListDialog,
        showWidgetListDialog:false,
        widgetTypes:[],//组件分类
        widgetInstances:[],
        edittingWidget:'',
        curPage:1,
        totalWidgets:0,
        itemsOfPage:8,
        keyWord:'',
      }
    },
    methods: {
      addWidgetInstance(){
        this.showWidgetListDialog = true,
          this.edittingWidget={}
      },
     async desiWidgetInstance(id){
       await this.loadWidgetById(id);
          Router.push({ name: 'WidgetEditor', params: { widgetInstance: this.edittingWidget}})
      },
      loadWidgetById(id){
        return getWidgetInstanceByID({key:id}).then((resp) => {
          if (resp.success) {
            this.edittingWidget = resp.widgetsInstance;
          }
          else{
            message.warning(`获取组件实例数据失败:${resp.msg}`)
          }
        });
      },
      loadMore(){
          if(this.curPage < this.pages){
            this.curPage += 1
            this.getWidgetInstances()
          }
      },
      getWidgetInstances(){
        let page = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord}
        loadWidgetInstancesByType(page).then((resp) => {
          if (resp.success) {
            let partOfWidgetInstances= resp.rows.map((wgi)=>{
              return { id:wgi.fID,name:wgi.fName,tPath:wgi.fThumbnailPath,code:wgi.fImageCode}
            })
            this.widgetInstances = [...this.widgetInstances,...partOfWidgetInstances]
            this.totalWidgets = resp.total
          }
          else message.warning("**获取组件实例列表失败**")
        });
      },
      filter(val){
          if(typeof val == 'object' && val.length == 2){
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
                message.success(resp.msg)
                this.curPage = 1;
                this.widgetInstances = [];
                that.getWidgetInstances()
              }
              else message.warning("**删除失败，系统异常**")
            });
      }
    }
  }
</script>

