<template>
  <v-app class="widgetListDialog">
    <v-toolbar fixed class="grey darken-3" light>
      <v-btn flat @click.native="hideDialog">
        <v-icon light>close</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span>双击选择基础组件</span>
      </v-toolbar-title>
      <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter"></el-cascader>
    </v-toolbar>

      <widget-box-select :widgets="widgets" @updateSelected="updateSelectedWidgets"></widget-box-select>

    <v-footer class="grey darken-2 wl-footer">
        <v-pagination :length="pages" v-model="curPage" circle></v-pagination>
    </v-footer>
  </v-app>
</template>
<script>
  import {message,forOwn,set,get,clone,ClearBrAndTrim} from '@/utils'
  import {WidgetBoxSelect}  from '@/components/WidgetBox'
  import {loadWidgetTypes,loadWidgetsByType,getWidgetByID} from '@/services/WidgetService'
  import {addWidgetInstance} from '@/services/WidgetInstanceService'
  import dataModel from '@/model/src/dataModel'
  import Router from '@/router'
  import Vue from 'vue'
  export default{
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
     /* selectedWgSize(){
          return this.selectedWidgets.length
      }*/
    },
    data(){
      return {
        widgetTypes:[],//组件分类
        widgets:[],
        //widget:{},
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
         this.getWidgets()
      },
      getWidgets(){
        let page = {rows:this.itemsOfPage,page:this.curPage,keyWord:this.keyWord}
        loadWidgetsByType({page}).then((resp) => {
          if (resp.success) {
              console.log(resp.rows)
            this.widgets = resp.rows.map((wg)=>{
              return { id:wg.fID,name:wg.fPluginName,tPath:wg.fThumbnailPath}
            })
            this.totalWidgets = resp.total
          }
          else message.warning("**获取组件列表失败**")
        });
      },
      updateSelectedWidgets(widgetId){
          this.selectedWidgets = widgetId
          let that = this;
          message.confirm("该操作将以选中的组件为基础建立组件实例，是否继续？",function () {
            that.builderWidgetInstance(widgetId)
          })
      },
      filter(val){
          if(typeof val == 'object' && val.length == 2){
            let keyWord = val[1];
            this.keyWord = keyWord;
            this.getWidgets()
          }
      },
      loadWidgetById(id){
       return getWidgetByID({key:id}).then((resp) => {
          if (resp.success) {
            this.widget = resp.widget;
          }
          else{
            message.warning("**加载组件数据失败**")
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
      addWidgetInstance(widgetsInstantce){
        addWidgetInstance(widgetsInstantce).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
          }
          else{
            message.warning(resp.msg)
          }
        });
      },
      async builderWidgetInstance(widgetId){
          await this.loadWidgetById(widgetId); //等待异步方法执行完
          let widgetInstance = undefined,seriesShowSetting = undefined,series=[];
           if(this.widget.fID){
                 let widget = this.widget, rawData = {}, disabled = {},
                  showSettingObj = JSON.parse(widget.showSetting),
                  optionObj = JSON.parse(widget.fOption);
               //处理非序列的rawData、disabled
               forOwn(showSettingObj,function (v,k) {
                    let value = '';
                    if(k.startsWith('series')){
                      seriesShowSetting = v; // 保存序列可视设置
                    }else{
                      value = get(optionObj,k);
                      Vue.set(rawData,k,value);
                    }
                    if(typeof value == 'undefined'){
                      Vue.set(disabled,k,true);
                    }
               })
               //处理序列
              let seriesObj = optionObj['series'];
               if(seriesObj && Array.isArray(seriesObj)){
                 seriesObj.forEach((serie,index)=>{
                   let type = serie.type,
                     baseSeries = true,
                     tempSerie={type,baseSeries};
                   forOwn(seriesShowSetting[type],function (v,k) {
                     tempSerie[k] = get(serie,k);
                   });
                     series.push(tempSerie)
                 })
               }
               //处理序列的disabled
             let seriesDisabled = undefined
             if(series.length > 0){
               seriesDisabled = clone(series);
               seriesDisabled.forEach((s,index)=>{
                 forOwn(s,function (v,k) {
                   seriesDisabled[index][k] = v == undefined ? true:false;
                 })
               })
             }
             widgetInstance = dataModel.widgetInstance(); //初始化对象
             widgetInstance.fImageCode = this.getWidgetCode(widget.impageCategory);//图形类别
             widgetInstance.fOption = ClearBrAndTrim(widget.fOption);
             widgetInstance.fDataOption = ClearBrAndTrim(widget.fDataOption);
             let setting = dataModel.widgetInstanceSetting({show:showSettingObj,rawData,series,disabled,seriesDisabled,extJs:widget.fExtensionJs});
             widgetInstance.fSetting = JSON.stringify(setting);
           }
           if(widgetInstance){
               this.addWidgetInstance(widgetInstance);
           }
      }



    }
  }
</script>

