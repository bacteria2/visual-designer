<template>
  <div class="widgetListDialog">
    <v-toolbar class="dataSet-toolbar" light>
      <v-toolbar-title>双击选择组件</v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-button @click.native="hideDialog" icon="exit_to_app" title="退出"></toolbar-button>
    </v-toolbar>
    <div class="widgets-box" style="margin-top: 20px">
      <div class="cascader">
        <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter" ></el-cascader>
      </div>
      <widget-box-select :widgets="widgetInstances" :hasMore="hasMore"
                         @updateSelected="updateSelectedWidgets"
                         @loadMore="loadMore"></widget-box-select>
    </div>
  </div>
</template>
<script>
  import {message,forOwn,set,get,clone,ClearBrAndTrim} from '@/utils'
  import {WidgetBoxSelect}  from '@/components/WidgetBox'
  import {loadWidgetInstancesByType} from '@/services/WidgetInstanceService'
  import dataModel from '@/model/src/dataModel'
  import WidgetCommon from '@/mixins/WidgetCommon'

  export default{
    name:"widgetInstanceDialog",
    components: {WidgetBoxSelect},
    mixins:[WidgetCommon],
    mounted(){
      this.getWidgetInstances()
    },
    data(){
      return {
        widgetTypes:[],//组件分类
        widgetInstances:[],
        widget:{},
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
        loadWidgetInstancesByType({page}).then((resp) => {
          if (resp.success) {
            let partOfWidgetInstances= resp.rows.map((wgi)=>{
              let tPath = wgi.fIsShort == '1' ? `/thumbnails/widget/w_${wgi.fID}.png`:'/static/image/default_widget.png';
              return { id:wgi.fID,name:wgi.fName,tPath,code:wgi.fViewModel}
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

