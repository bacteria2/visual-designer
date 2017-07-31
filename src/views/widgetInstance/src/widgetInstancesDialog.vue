<template>
  <v-app class="widgetListDialog">
    <v-toolbar fixed class="grey darken-3" light>
      <v-btn flat @click.native="hideDialog">
        <v-icon light>close</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span>双击选择组件实例</span>
      </v-toolbar-title>
      <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter"></el-cascader>
    </v-toolbar>
      <widget-box-select :widgets="widgetInstances"
                         @updateSelected="updateSelectedWidgets"
      ></widget-box-select>
    <v-footer class="grey darken-2 wl-footer">
        <v-pagination :length="pages" v-model="curPage" circle></v-pagination>
    </v-footer>
  </v-app>
</template>
<script>
  import {message,forOwn,set,get,clone,ClearBrAndTrim} from '@/utils'
  import {WidgetBoxSelect}  from '@/components/WidgetBox'
  import {loadWidgetTypes} from '@/services/WidgetService'
  import {loadWidgetInstancesByType} from '@/services/WidgetInstanceService'
  import dataModel from '@/model/src/dataModel'
  //import Router from '@/router'
  //import Vue from 'vue'
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
      }
      /*selectedWgSize(){
          return this.selectedWidgets.length
      }*/
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
      paginationHandler(){
         this.getWidgetInstances()
      },
      getWidgetInstances(){
        let page = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord}
        loadWidgetInstancesByType(page).then((resp) => {
          if (resp.success) {
            this.widgetInstances = resp.rows.map((wgi)=>{
              return { id:wgi.fID,name:wgi.fName,tPath:wgi.fThumbnailPath,code:wgi.fImageCode}
            })
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
            this.getWidgetInstances()
          }
      }
    }
  }
</script>

