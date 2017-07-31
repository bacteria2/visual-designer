<template>
  <div class="widgetListDialog">
    <v-toolbar class="dataSet-toolbar" light>
      <v-toolbar-title>组件新建向导</v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-button @click.native="exit" icon="exit_to_app" title="退出"></toolbar-button>
    </v-toolbar>

    <!--<mu-dialog :open="showStepDialog" title="" dialogClass="widget-list-inner-dialog" bodyClass="widget-list-inner-dialogBody">
      <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">设置实例信息</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="step > 2">保存组件实例</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-content step="1">
      <v-card class="grey lighten-3 z-depth-1 mb-5" height="200px">
        <v-container fluid grid-list-lg>
          <v-layout row>
            <v-flex xs3>
              <v-icon style="font-size: 80px" class="blue&#45;&#45;text text&#45;&#45;darken-2">widgets</v-icon>
            </v-flex>
            <v-flex xs9>
              <div>
                <div class="title">该操作将以选中的组件为基础建立组件实例</div>
                <div class="subheading">请先为组件实例设置一个名字</div>
                <v-divider></v-divider>
                <v-text-field
                  name="widgetInstanceName"
                  label="组件实例名称"
                  v-model="widgetInstanceName"
                  class="input-group&#45;&#45;focused"
                ></v-text-field>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn primary @click.native="step = 2" :disabled="widgetInstanceName.trim() ==''">下一步</v-btn>
      <v-btn flat @click.native="showStepDialog = false">取消</v-btn>
    </v-stepper-content>
    <v-stepper-content step="2">
      <v-card class="grey lighten-3 z-depth-1 mb-5" height="200px">
        <v-layout row>
          <v-flex xs6>
        <v-progress-circular :size="140" :width="16" :rotate="180" :value="progress.p" class="pink&#45;&#45;text widgetInstance-save-progress">
          {{ progress.p }}%
       </v-progress-circular>
          </v-flex>
          <v-flex xs6>
          <div class="subheading widgetInstance-save-progress-msg">
            {{ progress.msg }}
          </div>
            <v-switch label="完成组件实例持久化后，立即进行设计" v-model="desImmediately" :value="true" info></v-switch>
          </v-flex>
        </v-layout>
      </v-card>
      <v-btn primary @click.native="builderWidgetInstance">确定</v-btn>
      <v-btn flat @click.native="step = 1">上一步</v-btn>
      <v-btn flat @click.native="showStepDialog = false">取消</v-btn>
    </v-stepper-content>
    </v-stepper>
    </mu-dialog>
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
    </v-footer>-->
    <el-row>
      <el-col :span="24">
        <mu-linear-progress mode="determinate" :value="progress.p" :color="bule"/>
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
      <widget-box-select :widgets="widgets"
                         @updateSelected="updateSelectedWidgets"
                         @loadMore=""></widget-box-select>
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
            <el-button type="primary" @click="" :disabled="widgetInstanceName.trim() ==''">保存</el-button>
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
    },
    data(){
      return {
        desImmediately:false,
        progress:{p:0,msg:''},
        widgetTypes:[],//组件分类
        widgets:[],
        showStepDialog:false,
        step:1,
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
            setTimeout(that.doCloseDialog,2000)
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
        this.$emit('refreshWidgetInstance');
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

