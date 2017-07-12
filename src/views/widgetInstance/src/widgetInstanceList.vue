<template>
  <v-app class="widgetInstanceList">
    <mu-dialog :open="showWidgetListDialog" title="" dialogClass="widget-list-dialog" bodyClass="widget-list-dialogBody">
      <component :is="widgetListDialog" @closeWidgetDialog="showWidgetListDialog = false" @refreshWidgetInstance="getWidgetInstances"></component>
    </mu-dialog>

    <v-toolbar fixed class="grey darken-3" light>
      <v-toolbar-title>
        <el-cascader placeholder="过滤组件实例" :options="widgetTyped" change-on-select @change="filter"></el-cascader>
      </v-toolbar-title>
      <v-btn light class="blue-grey" @click.native="addWidgetInstance">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="removeWidgets">删除<v-icon right light>delete</v-icon></v-btn>
    </v-toolbar>

    <main>
      <widget-box :widgets="widgetInstances" :isInstance="true" @desiWidget="desiWidgetInstance" @updateSelected="updateSelectedWidgets"></widget-box>
    </main>

    <v-footer class="grey darken-2 wl-footer">
        <v-pagination :length="pages" v-model="curPage"></v-pagination>
    </v-footer>
  </v-app>
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
    watch:{
       curPage(val){
         this.paginationHandler();
       }
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
      selectedWgSize(){
          return this.selectedWidgets.length
      }
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
        selectedWidgets:[]
      }
    },
    methods: {
      addWidgetInstance(){
        this.showWidgetListDialog = true,
          this.edittingWidget={}
      },
     async desiWidgetInstance(id){
       await this.loadWidgetById(id);
          Router.push({ name: 'Edit', params: { widgetInstance: this.edittingWidget}})
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
      paginationHandler(){
         this.getWidgets()
      },
      getWidgetInstances(){
        let page = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord}
        loadWidgetInstancesByType({page}).then((resp) => {
          if (resp.success) {
           this.widgetInstances = resp.rows.map((wgi)=>{
              return { id:wgi.fID,name:wgi.fName,tPath:wgi.fThumbnailPath,code:wgi.fImageCode}
            })
            this.totalWidgets = resp.total
          }
          else message.warning("**获取组件实例列表失败**")
        });
      },
      updateSelectedWidgets(sws){
          this.selectedWidgets = sws
      },
      filter(val){
          if(typeof val == 'object' && val.length == 2){
            let keyWord = val[1];
            this.keyWord = keyWord;
            this.getWidgets()
          }
      },
      removeWidgets(){
          let msg = `该操作将删除选择的（${this.selectedWgSize}）个组件，是否继续？`
          message.confirm(msg,this.delWidgets);
      },
      delWidgets(){
        let that = this;
        removeWidgetInstances(this.selectedWidgets).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
            that.getWidgetInstances()
          }
          else message.warning("**删除失败，系统异常**")
        });
      }
    }
  }
</script>

