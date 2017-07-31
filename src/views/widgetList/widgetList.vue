<template>
  <div class="widgetList">
    <el-row class="page-head">
      <el-col :span="12">
        <span class="page-title"><h1>组件库</h1></span>
      </el-col>
      <el-col :span="12">
        <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter" class="cascader"></el-cascader>
      </el-col>
    </el-row>
    <widget-base :show.sync="showWidgetBase" :widgetTyped="widgetTyped" :edittingObj="edittingWidget" @doRefresh="getWidgets"></widget-base>

    <main>
      <widget-box  :widgets="widgets"
                   @editWidget="editWidget"
                   @desiWidget="desiWidget"
                   @addWidget ="addWidget"
                   @delWidget="removeWidgets"
                   @loadMore ="loadMore"
      >
      </widget-box>
    </main>
  </div>
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
        showWidgetBase:false,
        widgetTypes:[],//组件分类
        widgets:[],
        edittingWidget:'',
        curPage:1,
        totalWidgets:0,
        itemsOfPage:8,
        keyWord:'',
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
      loadMore(){
        if(this.curPage < this.pages){
          this.curPage += 1
          this.getWidgets()
        }
      },
      getWidgets(isAddRefresh){
        if(isAddRefresh){
            this.curPage = 1;
            this.widgets =[];
        }
        let page = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord}
        loadWidgetsByType({page}).then((resp) => {
          if (resp.success) {
              let partOfWidgets = resp.rows.map((wg)=>{
              return { id:wg.fID,name:wg.fPluginName,tPath:wg.fThumbnailPath}
            })
            this.widgets = [...this.widgets,...partOfWidgets]
            this.totalWidgets = resp.total
          }
          else message.warning("**获取组件列表失败**")
        });
      },
      filter(val){
          if(typeof val == 'object' && val.length == 2){
            let keyWord = val[1];
            this.keyWord = keyWord;
            this.curPage = 1;
            this.widgets =[];
            this.getWidgets()
          }
      },
      removeWidgets(id){
          let msg = `该操作将删除组件继续？`
          message.confirm(msg,this.delWidgets,id);
      },
      delWidgets(id){
        let that = this;
        removeWidgets([id]).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
            this.curPage = 1;
            this.widgets =[];
            that.getWidgets()
          }
          else message.warning("**删除失败，系统异常**")
        });
      }
    }
  }
</script>

