<template>
  <div class="widgetListDialog">
    <v-toolbar class="dataSet-toolbar" light>
      <v-toolbar-title>双击选择组件</v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-button @click.native="hideDialog" icon="exit_to_app" title="退出"></toolbar-button>
    </v-toolbar>
    <div class="widgets-box" style="margin-top: 72px">
      <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter" class="cascader"></el-cascader>
      <widget-box-select :widgets="widgetInstances" :hasMore="hasMore"
                         @updateSelected="updateSelectedWidgets"
                         @loadMore="loadMore"></widget-box-select>
    </div>
  </div>
</template>
<script>
  import {message,forOwn,set,get,clone,ClearBrAndTrim} from '@/utils'
  import {WidgetBoxSelect}  from '@/components/WidgetBox'
  import {loadWidgetTypes} from '@/services/WidgetService'
  import {loadWidgetInstancesByType} from '@/services/WidgetInstanceService'
  import dataModel from '@/model/src/dataModel'


  export default{
    name:"widgetInstanceDialog",
    components: {WidgetBoxSelect},
    mounted(){
      //加载远程数据组件分类
      loadWidgetTypes().then((resp) => {
        if (resp.success) {
          this.widgetTypes = resp.rows.map((item)=>{
            return {id:item.fID,type:item.fType,label:item.fName,code:item.fImageCode,value:item.fID}
          })
        }
        else message.warning("**加载组件分类失败**")
      });
      //获取组件列表
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
      hasMore(){
        return this.curPage < this.pages
      }
    },
    data(){
      return {
        widgetTypes:[],//组件分类
        widgetInstances:[],
        widget:{},
        curPage:1,
        totalWidgets:0,
        itemsOfPage:8,
        keyWord:'',
        selectedWidgets:''
      }
    },
    methods: {
      hideDialog(){
          this.$emit('closeWidgetDialog')
      },
      loadMore(){
        if(this.curPage < this.pages){
          this.curPage += 1
          this.getWidgetInstances()
        }
      },
      getWidgetInstances(isRefresh){
        if(isRefresh){
          this.curPage = 1;
          this.widgetInstances = [];
        }
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
      updateSelectedWidgets(id,code){
            this.$emit("widgetInstanceSelected",{id,code});
            this.hideDialog();
      },
      filter(val){
          if(typeof val == 'object' && val.length == 2){
            let keyWord = val[1];
            this.keyWord = keyWord;
            this.curPage = 1;
            this.widgetInstances = [];
            this.getWidgetInstances()
          }
      }
    }
  }
</script>

