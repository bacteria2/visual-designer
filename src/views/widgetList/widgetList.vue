<template>
  <div class="widgetList">
    <el-row class="page-head">
      <el-col :span="12">
        <span class="page-title"><h1>组件库</h1></span>
      </el-col>
      <el-col :span="12">
        <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter"
                     class="cascader"></el-cascader>
      </el-col>
    </el-row>
    <widget-base :show.sync="showWidgetBase" :widgetTyped="widgetTyped" :edittingObj="edittingWidget"
                 @doRefresh="getWidgets"></widget-base>

    <main>
      <widget-box :widgets="widgets"
                  @editWidget="editWidget"
                  @desiWidget="desiWidget"
                  @addWidget="addWidget"
                  @delWidget="removeWidgets"
                  @loadMore="loadMore"
      >
      </widget-box>
    </main>
  </div>
</template>
<script>
  import { compact, set, clone, message } from '@/utils'
  import WidgetBase from './WidgetBase.vue'
  import { WidgetBox }  from '@/components/WidgetBox'
  import store from '@/store'
  import { loadWidgetsByType, addWidget, getWidgetByID, removeWidgets } from '@/services/WidgetService'
  import Router from '@/router'
  import WidgetCommon from '@/mixins/WidgetCommon'
  export default{
    components: {WidgetBase, WidgetBox},
    mixins: [WidgetCommon],
    mounted(){
      //获取组件列表
      this.getWidgets()
    },
    data(){
      return {
        showWidgetBase: false,
        widgets: [],
      }
    },
    methods: {
      addWidget(){
        this.showWidgetBase = true,
          this.edittingWidget = {}
      },
      editWidget(id){
        this.loadWidgetById(id, () => {
          this.showWidgetBase = true;
        })
      },
      desiWidget(id){
        Router.push({name: 'widgetDesigner', params: {originId: id}})
      },
      loadWidgetById(id, fun){
        getWidgetByID({key: id}).then((resp) => {
          if (resp.success) {
            this.edittingWidget = resp.widget;
            fun();
          }
          else {
            console.log(resp.success)
          }
        });
      },
      loadMore(){
        if (this.curPage < this.pages) {
          this.curPage += 1
          this.getWidgets()
        }
      },
      getWidgets(isAddRefresh){
        if (isAddRefresh) {
          this.curPage = 1;
          this.widgets = [];
        }
        let page = {rows: this.itemsOfPage, page: this.curPage, keyWord: this.keyWord}
        loadWidgetsByType({page}).then((resp) => {
          if (resp.success) {
              let partOfWidgets = resp.rows.map((wg)=>{
              return { id:wg.fID,name:wg.fPluginName,tShort:wg.fIsShort}
            })
            this.widgets = [...this.widgets, ...partOfWidgets]
            this.totalWidgets = resp.total
          }
          else message.warning("**获取组件列表失败**")
        });
      },
      filter(val){
        if (typeof val == 'object' && val.length == 2) {
          let keyWord = val[1];
          this.keyWord = keyWord;
          this.curPage = 1;
          this.widgets = [];
          this.getWidgets()
        }
      },
      removeWidgets(id){
        let msg = `该操作将删除组件继续？`
        message.confirm(msg, this.delWidgets, id);
      },
      delWidgets(id){
        let that = this;
        removeWidgets([id]).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
            this.curPage = 1;
            this.widgets = [];
            that.getWidgets()
          }
          else message.warning("**删除失败，系统异常**")
        });
      }
    }
  }
</script>

