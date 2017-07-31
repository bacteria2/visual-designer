<template>
  <div class="widgetListDialog">
    <v-toolbar class="dataSet-toolbar" light>
      <v-toolbar-title>组件新建向导</v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-button @click.native="hideDialog" icon="exit_to_app" title="退出"></toolbar-button>
    </v-toolbar>

    <el-row>
      <el-col :span="24">
        <mu-linear-progress mode="determinate" :value="progress.p" color="bule"/>
      </el-col>
    </el-row>
    <mu-stepper :activeStep="step">
      <mu-step>
        <mu-step-label>
          选择原生组件(双击原生组件)
        </mu-step-label>
      </mu-step>
      <mu-step>
        <mu-step-label>
          保存组件
        </mu-step-label>
      </mu-step>
    </mu-stepper>
    <div v-show="step == 0" class="widgets-box">
      <el-cascader placeholder="过滤组件" :options="widgetTyped" change-on-select @change="filter" class="cascader"></el-cascader>
      <widget-box-select :widgets="widgets" :hasMore="hasMore"
                         @updateSelected="updateSelectedWidgets"
                         @loadMore="loadMore"></widget-box-select>
    </div>

    <div v-show="step == 1">
      <el-row>
        <el-col :span="12"><div class="widget-png"></div></el-col>
        <el-col :span="12" style="padding-top: 40px">
          <div class="widget-set-item">
            <el-input placeholder="请输入内容" v-model="widgetInstanceName">
              <template slot="prepend">组件名称:</template>
            </el-input>
          </div>
          <div class="widget-set-item">
            <el-row>
              <el-col :span="4">
                <el-switch
                  v-model="desImmediately"
                  on-text="是"
                  off-text="否">
                </el-switch>
              </el-col>
              <el-col :span="8"><span>完成组件实例持久化后，立即进行设计</span></el-col>
            </el-row>
          </div>
          <div class="action">
            <el-button type="text" @click="step = 0">上一步</el-button>
            <el-button type="primary" @click="builderWidgetInstance" :disabled="widgetInstanceName.trim() ==''">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {message,forOwn,set,get,clone,ClearBrAndTrim} from '@/utils'
  import {WidgetBoxSelect}  from '@/components/WidgetBox'
  import {loadWidgetTypes,loadWidgetsByType,getWidgetByID} from '@/services/WidgetService'
  import {addWidgetInstance} from '@/services/WidgetInstanceService'
  import dataModel from '@/model/src/dataModel'
  import Router from '@/router'
  import Vue from 'vue'
  import debounce from 'lodash/debounce'
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
  /*  watch:{
       curPage(val){
         this.paginationHandler();
       }
    },*/
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
        desImmediately:false,
        progress:{p:0,msg:''},
        widgetTypes:[],//组件分类
        widgets:[],
        showStepDialog:false,
        step:0,
        widgetInstanceName:'',
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
      loadMore(){
        if(this.hasMore){
          this.curPage += 1
          this.getWidgets()
        }
      },
      getWidgets(){
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
      updateSelectedWidgets(widgetId){
          //this.showStepDialog = true
          this.step = 1
          this.selectedWidgets = widgetId
        /*
          let that = this;
          message.confirm("该操作将以选中的组件为基础建立组件实例，是否继续？",function () {
            that.builderWidgetInstance(widgetId)
          })*/
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
          let that = this
        addWidgetInstance(widgetsInstantce).then((resp) => {
          if (resp.success) {
            that.progress = {p:100,msg:'**完成组件实例持久化**'} //只为装B
            message.success("保存组件成功");
            this.$emit('refreshWidgetInstance',true);
            setTimeout(that.doCloseDialog,1000)
            if(this.desImmediately){
              Router.push({ name: 'WidgetEditor', params: { widgetInstance:widgetsInstantce}});
            }
          }
          else{
            that.progress.msg(resp.msg)
          }
        });
      },
      doCloseDialog(){
        this.showStepDialog = false;
        setTimeout(this.closeEvent,500)
      },
      closeEvent(){
        this.$emit('closeWidgetDialog')
      }
      ,
      async builderWidgetInstance(){
          let widgetId = this.selectedWidgets;
          await this.loadWidgetById(widgetId); //等待异步方法执行完
          let widgetInstance = undefined,seriesShowSetting = undefined,series=[];
           if(this.widget.fID){
             this.progress = {p:10,msg:'**完成基础组件数据加载**'} //只为装B
                 let widget = this.widget, rawData = {}, disabled = {},
                  showSettingObj = JSON.parse(widget.showSetting),
                  optionObj = JSON.parse(widget.fOption);
             if(!optionObj||!showSettingObj){
                  this.progress = {p:0,msg:'**基础组件配置异常，操作已被终止**'} //只为装B
                  return;
                }
               //处理非序列的rawData、disabled
               forOwn(showSettingObj,function (v,k) {
                   if(typeof v !== 'undefined'){
                    let value = '';
                    if(k.startsWith('series')){
                      seriesShowSetting = v; // 保存序列可视设置
                    }else{
                      value = get(optionObj,k);
                      if(typeof value == 'undefined'){
                        Vue.set(rawData,k,null);
                        Vue.set(disabled,k,true);
                      }else {
                        Vue.set(rawData,k,value);
                      }
                    }
               }})
             this.progress = {p:30,msg:'**正在努力处理配置信息**'} //只为装B
               //处理序列
              let seriesObj = optionObj['series'];
               if(seriesObj && Array.isArray(seriesObj) && seriesObj.length > 0){
                 seriesObj.forEach((serie,index)=>{
                   let type = serie.type,
                     baseSeries = true,
                     tempSerie={type,baseSeries};
                   forOwn(seriesShowSetting[type],function (v,k) {
                     if(typeof v !== 'undefined'){
                     let value = get(serie,k);
                     if(typeof value == 'undefined'){
                       Vue.set(tempSerie,k,null)
                     }else{
                       Vue.set(tempSerie,k,value)
                     }
                   }});
                     series.push(tempSerie)
                 })
               }
               //处理序列的disabled
             let seriesDisabled = undefined
             if(series.length > 0){
               seriesDisabled = clone(series);
               seriesDisabled.forEach((s,index)=>{
                 forOwn(s,function (v,k) {
                   seriesDisabled[index][k] = v == null ? true:false;
                 })
               })
             }
             widgetInstance = dataModel.widgetInstance(); //初始化对象
             widgetInstance.fWidgetsID = widget.fID;
             widgetInstance.fName = this.widgetInstanceName;
             widgetInstance.fImageCode = this.getWidgetCode(widget.impageCategory);//图形类别
             widgetInstance.fOption = ClearBrAndTrim(widget.fOption);
             widgetInstance.fDataOption = ClearBrAndTrim(widget.fDataOption);
             let setting = dataModel.widgetInstanceSetting({show:showSettingObj,rawData,series,disabled,seriesDisabled,extJs:widget.fExtensionJs});
             widgetInstance.fSetting = JSON.stringify(setting);
           }
           if(widgetInstance){
             this.progress = {p:60,msg:'**成功制造出组件实例对象**'} //只为装B
             this.addWidgetInstance(widgetInstance);
           }
      }
    }
  }
</script>

