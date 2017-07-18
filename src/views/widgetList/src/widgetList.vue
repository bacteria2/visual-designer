<template>
  <v-app class="widgetList">
    <widget-base :show.sync="showWidgetBase" :widgetTyped="widgetTyped" :edittingObj="edittingWidget" @doRefresh="getWidgets"></widget-base>
    <v-toolbar fixed class="grey darken-3" light>
      <v-toolbar-title>
        <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter"></el-cascader>
      </v-toolbar-title>
      <v-btn light class="blue-grey" @click.native="addWidget">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="removeWidgets">删除<v-icon right light>delete</v-icon></v-btn>
    </v-toolbar>
    <main>
      <widget-box  :widgets="widgets" @editWidget="editWidget" @desiWidget="desiWidget" @updateSelected="updateSelectedWidgets"></widget-box>
    </main>
    <v-footer class="grey darken-2 wl-footer">
        <v-pagination :length="pages" v-model="curPage"></v-pagination>
    </v-footer>
  </v-app>
</template>
<script>
  import {compact,set,clone,message} from '@/utils'
  import WidgetBase from './WidgetBase.vue'
  import {WidgetBox}  from '@/components/WidgetBox'
  import store from '@/store'
  import {loadWidgetTypes,loadWidgetsByType,addWidget,getWidgetByID,removeWidgets} from '@/services/WidgetService'
  import Router from '@/router'
  export default{
    components: {WidgetBase,WidgetBox},
    async mounted(){
      //加载远程数据组件分类
      loadWidgetTypes().then((resp) => {
        if (resp.success) {
          this.widgetTypes = resp.rows.map((item)=>{
            return {id:item.fID,type:item.fType,label:item.fName,code:item.fImageCode,value:item.fID}
          })
        }
        else console.log(resp.message, resp.data)
      });

      //获取组件列表
      this.getWidgets()
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
        //左导航
        //drawer:true,
        //mini:false,
        showWidgetBase:false,
        widgetTypes:[],//组件分类
        widgets:[],
        edittingWidget:'',
        curPage:1,
        totalWidgets:0,
        itemsOfPage:8,
        keyWord:'',
        selectedWidgets:[]
      }
    },
    methods: {
      addWidget(){
        this.showWidgetBase = true,
          this.edittingWidget={}
      },
      editWidget(id){
          let that = this;
          this.loadWidgetById(id,function () {
            that.showWidgetBase = true;
          })
      },
      desiWidget(id){
        let that = this;
        this.loadWidgetById(id,function () {
          let codeID =  that.edittingWidget.impageCategory,
              code   =  that.getWidgetCode(codeID)
          Router.push({ name: 'widgetDesigner', params: { widget: that.edittingWidget,widgetCode:code}})
        })
      },
      loadWidgetById(id,fun){
        getWidgetByID({key:id}).then((resp) => {
          if (resp.success) {
            this.edittingWidget = resp.widget;
            fun();
          }
          else{
            console.log(resp.success)
          }
        });
      },
      getWidgetCode(codeID){ //获取分类代码如：EchartBar
          let code, typeObj = this.widgetTypes.filter((type)=>{return type.id == codeID})[0];
          if(typeObj){
              code = typeObj.code
          }
          return code;
      },
      paginationHandler(){
         this.getWidgets()
      },
      getWidgets(){
        let page = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord}
        loadWidgetsByType({page}).then((resp) => {
          if (resp.success) {
            this.widgets = resp.rows.map((wg)=>{
              return { id:wg.fID,name:wg.fPluginName,tPath:wg.fThumbnailPath}
            })
            this.totalWidgets = resp.total
          }
          else message.warning("**获取组件列表失败**")
        });
      },
      updateSelectedWidgets(sws){
          this.selectedWidgets = sws
      },
      filter(val){
          if(typeof val == 'object' && val.length == 2){
            let keyWord = val[1];
            this.keyWord = keyWord;
            this.getWidgets({keyWord})
          }
      },
      removeWidgets(){
          let msg = `该操作将删除选择的（${this.selectedWgSize}）个组件，是否继续？`
          message.confirm(msg,this.delWidgets);
      },
      delWidgets(){
        let that = this;
        removeWidgets(this.selectedWidgets).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
            that.selectedWidgets = []
            that.getWidgets()
          }
          else message.warning("**删除失败，系统异常**")
        });
      }
    }
  }
</script>

