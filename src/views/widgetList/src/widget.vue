<template>
  <div class="option-adjust full-height ydp-widget" id="ydp-widget-id001"> <!--class="option-adjust full-height""-->
    <mu-dialog :open="dataSetDialog" title="" dialogClass="widget-dataset-dialog" bodyClass="widget-dataset-dialogBody" actionsContainerClass="widget-dataset-action-zone" @show="dialogClassHandler">
          <component :is="dataSetDefine" :codeViewEnable="true" @exit="dataSetDialog = false"></component>
    </mu-dialog>
    <mu-dialog :open="preview" title="" dialogClass="widget-dataset-dialog" bodyClass="widget-dataset-dialogBody" actionsContainerClass="widget-dataset-action-zone" @show="dialogClassHandler">
      <v-toolbar class="widget-toolbar" >
        <v-toolbar-title>{{widget.fPluginName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <toolbar-button @click.native="preview=false" icon="close" title="退出"></toolbar-button>
      </v-toolbar>
      <div :style="widgetViewHeight">
        <widget-preview :widgetType="widgetType" :option="options" v-if="preview"></widget-preview>
      </div>
    </mu-dialog>
    <v-toolbar class="widget-toolbar">
      <v-toolbar-title>组件设计器</v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-button @click.native="dataSetDialog = true" icon="widgets" title="数据"></toolbar-button>
      <toolbar-button @click.native="previewHandler" icon="pageview" title="预览"></toolbar-button>
      <toolbar-button @click.native="save" icon="save" title="保存"></toolbar-button>
      <toolbar-button @click.native="back2WidgetList" icon="close" title="退出"></toolbar-button>
    </v-toolbar>
    <div class="widget-main">
       <div class="widget-main-inner">
         <div class="show-setting">
           <h2 class="title">
             <i class="material-icons icon mini">visibility</i>
             <span>可配置选项设置</span>
           </h2>
           <vertical-tab-panel :isIndicator="false" isSelectColor v-model="widgetOptions.active" class="vertical-tab-panel-showOnly">
             <vertical-tab v-for="page in widgetOptions.pages" :title="page.title" :name="page.name" :key="page.name">
               <vertical-tab-panel v-model="page.active" content-classes="vertical-tab__content__no-padding property-box">
                 <vertical-tab v-for="(subPage,pageIndex) in page.pages" :title="subPage.title" :name="subPage.name" :key="subPage.name">
                   <div class="chk-btn"  @click="showAll(subPage.component,true)" style="margin-left:16px">
                     <i><em></em></i>
                     <span>全选</span>
                   </div>
                   <div class="chk-btn"  @click="showAll(subPage.component,false)" >
                     <i><em></em></i>
                     <span>全不选</span>
                   </div>
                   <component :is="subPage.component" :ref="subPage.component"></component>
                 </vertical-tab>
               </vertical-tab-panel>
             </vertical-tab>
             <vertical-tab title="序列" name="series" v-if="showSeriesSetting">
               <vertical-tab-panel v-model="seriesTagActive" content-classes="vertical-tab__content__no-padding property-box">
                 <vertical-tab v-for="(seriesPage,pageIndex) in widgetOptions.seriesType" :title="seriesPage.name" :name="seriesPage.component" :key="seriesPage.name">
                   <div class="chk-btn"  @click="showAll(seriesPage.component,true)" style="margin-left:16px">
                     <span>全选</span>
                   </div>
                   <div class="chk-btn"  @click="showAll(seriesPage.component,false)" >
                     <span>全不选</span>
                   </div>
                   <component :is="seriesPage.component" :ref="seriesPage.component"></component>
                 </vertical-tab>
               </vertical-tab-panel>
             </vertical-tab>
           </vertical-tab-panel>
         </div>
         <div class="script-panel">
           <div :class="panels<2?'script-panel-inner':'script-panel-inner-half'" v-show="scriptPanelConfig[2].show">
             <h2 class="title">
               <i class="material-icons icon mini">settings</i>
               <span>组件属性设置</span>
             </h2>
             <brace id="optionEdit" ref="optionEdit" :style="style.ace" :script.sync="widget.fOption" :showToolbar="false"></brace>
           </div>
           <div :class="panels<2?'script-panel-inner':'script-panel-inner-half'" v-show="scriptPanelConfig[1].show">
             <h2 class="title">
               <i class="material-icons icon mini">code</i>
               <span>扩展脚本设置</span>
             </h2>
             <brace id="scriptEdit" ref="scriptEdit" :style="style.ace" :script.sync="widget.fExtensionJs" :showToolbar="false"></brace>
           </div>
           <div :class="panels<2?'script-panel-inner':'script-panel-inner-half'" v-show="scriptPanelConfig[0].show">
             <h2 class="title">
               <i class="material-icons icon mini">extension</i>
               <span>数据与维度定义</span>
             </h2>
             <brace id="dimensionEdit" ref="dimensionEdit" :style="style.ace" :script.sync="widget.fDataOption" :showToolbar="false"></brace>
           </div>
             <div class="action">
               <el-button class="action-btn" @click="panelsConfig.open = true" ref="panelsConfigRef"><i class="material-icons icon mini">settings</i></el-button>
               <div class="action-btn" v-for="(sp,index) in scriptPanelConfig" :key="sp.name" @click="showScriptPanel(index,sp)">
                  <span>{{sp.title}}</span>
                  <span  v-if="index == 1"  class="position-box" @click.stop="changePosition(sp)">{{sp.position}}</span>
                </div>
             </div>
           <mu-popover popoverClass="ds-select-pop" :open="panelsConfig.open" :autoPosition="false" :trigger="panelsConfig.trigger" :anchorOrigin="panelsConfig.anchorOrigin" :targetOrigin="panelsConfig.targetOrigin" @close="panelsConfig.open = false">
             <mu-list class="ds-select-list">
               <mu-list-item title="1 X 编辑面板" @click="configScriptPanel(1)"/>
               <mu-list-item title="2 X 编辑面板" @click="configScriptPanel(2)"/>
             </mu-list>
           </mu-popover>
         </div>
       </div>
    </div>
  </div>
</template>
<script>
  import { debounceExec,beautifyJs,compact,set,clone,forOwn,getOptionData,message} from '@/utils'
  import store from '@/store'
  import dataSetDefine from '@/views/DataSetDefinition'
  import {saveWidget} from '@/services/WidgetService'
  import dataModel from '@/model/src/dataModel.js'
  import Router from '@/router'
  export default{
    mounted(){
      //设置全局变量
      this.panelsConfig.trigger = this.$refs.panelsConfigRef.$el;
      store.commit("setPropertyCheckedControl",{type:1});
      //获取参数
      this.widget = dataModel.widget();
      if(this.$route.params.widget){
          let wg = this.widget,pwg = this.$route.params.widget;
          forOwn(wg,function (v,k) {
              let val = pwg[k];
             if(val && val !==''){
                 wg[k] = val
             }
          })
      }
      //做一些初始化
      this.initUI()
      //加载dataSet定义
      let dataOption = JSON.parse(this.widget.fDataOption),dataSet = dataOption.dataSet;
      if(dataSet && Array.isArray(dataSet) && dataSet.length > 0){
        store.commit("initDataSet",{dataSet})
      }

      //先获取widgetType，用于初始化widgetOptions
      if(this.widgetType){
        this.widgetOptions = widgetConfigs[this.widgetType]()
        if(this.widgetOptions.seriesType && this.widgetOptions.seriesType.length > 0){ // 存在序列
          this.seriesTagActive = this.widgetOptions.seriesType[0].component
          let seriesTypes = this.widgetOptions.seriesType.map((type)=>{return type.name})
          store.commit("initShowSetting",{seriesTypes})
        }
      }
    },
    computed:{
      showSeriesSetting(){
          return this.widgetOptions.seriesType && this.widgetOptions.seriesType.length > 0
      },
      curShowScriptPanel(){
         return this.scriptPanelConfig.filter((p)=>{
              return p.show == true;
          }).map((p)=>{
              return p.name
          })
      }
    },
    data(){
      return {
        widgetType:this.$route.params.widgetCode,
        loading:false,
        panelIndex:1,
        style: {
          ace: {
            width: "100%",
            height:"calc(100% - 36px)"
          },
          handler: {
            left: "40%",
          },
          echart: {
            left: "10px",
            width: "calc(100% - 20px)"
          }
        },
        widgetOptions:'',
        options:'',
        dataSetDialog:false,
        dataSetDefine:dataSetDefine,
        preview:false,
        handlerDown: false,
        seriesTagActive:'',
        widget:{},
        def:{fOption:'{}',
            fExtensionJs:'extJs = function(option,agrs){return option}',
            fDataOption:`{"dataSet":[],"dimension":[{"id":"","label":"","key":"","required":false,"type":"","measured":true,"dataItem":{"name":"","alias":"","key":""}}]}`
            },
        panels:1,
        scriptPanelConfig:[
                           {name:'dimensionEdit',show:false,title:'数据与维度定义',position:2},
                           {name:'scriptEdit',show:false,title:'扩展脚本设置',position:1},
                           {name:'optionEdit',show:true,title:'组件属性设置',position:1},
                           ],
        panelsConfig:{
          open:false,
          trigger:null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          targetOrigin: {
            vertical: 'bottom',
            horizontal: 'middle'
          }
        },
        widgetViewHeight:"height:400px",
        previewTimes:0
      }
    },
    methods: {
      showAll(component,isShowAll){
          let curComponent = this.$refs[component][0],
            showConfigObj = {isShowAll,keys:[]},
            componentType = curComponent.type,
            seriesType;
        if(componentType && componentType.startsWith('series')){//如果是序列
            seriesType = componentType.slice(-(componentType.length-7));//得到序列类型如line
        }
        curComponent.$children.forEach((item)=>{
          showConfigObj.keys.push(item.optionKey);
        });
        showConfigObj.keys = compact(showConfigObj.keys);//删除没用值
        store.commit("updateShowSettingBatch",{showConfigObj,seriesType});
      },
      beautifyStr(){
        this.widget.fOption = beautifyJs(this.widget.fOption);
        this.widget.fDataOption = beautifyJs(this.widget.fDataOption);
        this.widget.fExtensionJs = beautifyJs(this.widget.fExtensionJs);
      },
      initUI(){
          let widget = this.widget,def = this.def;
          if(widget.fOption == ''){
            widget.fOption = def.fOption
          }
          if(widget.fDataOption == ''){
            widget.fDataOption = def.fDataOption
          }
          if(widget.fExtensionJs == ''){
            widget.fExtensionJs = def.fExtensionJs
          }
          if(widget.showSetting && widget.showSetting.includes('series')){
            store.commit("loadShowSetting",{sSetting:widget.showSetting});
          }
          this.beautifyStr()
      },
      async previewHandler(){
        let mainHeight = document.getElementById("ydp-widget-id001").offsetHeight - 170;
        this.widgetViewHeight = `height:${mainHeight > 400?mainHeight:400}px`;
        this.submitScript();
        let baseOption = JSON.parse(this.widget.fOption);
        //console.log('option',baseOption)
        let extJs = eval.bind(window)(this.widget.fExtensionJs);
        let dataOption = JSON.parse(this.widget.fDataOption);
        //console.log('dataOption','11');
        let resp= await store.dispatch("updateSourceData")//更新数据;
        //console.log('resp',resp);
           let dimension = dataOption.dimension,
            data = store.state.echarts.sourceData,
            OptionData = getOptionData(dimension,data);
        //console.info('--------------OptionData----------',OptionData)
            forOwn(OptionData,function (v, k) {
                 set(baseOption,k,v)
            })
           console.log("preview",OptionData,baseOption)
            if(extJs && typeof extJs =='function'){
              baseOption = extJs.apply(this,[baseOption,OptionData])
            }
            this.options = baseOption
            this.widget.fOption = JSON.stringify(baseOption)
            this.preview = true
            this.previewTimes += 1
      },
      save(){
        if(this.previewTimes < 1){
            message.warning("保存前最小预览一次")
        }else{
          let wg = this.widget;
          wg.showSetting = JSON.stringify(store.getters.getShowSetting)
          saveWidget({widgetsVO:wg}).then((resp) => {
            if (resp.success) {
              message.success("保存成功")
            }
            else message.warning(resp.msg)
          });
        }
      },
      back2WidgetList(){
        Router.push({ name: 'origin', params: { page:'Widget'}})
      },
      showScriptPanel(index,{position,name}){
          if(!this.curShowScriptPanel.includes(name)) {
            if (this.panels == 1) {
              this.scriptPanelConfig.forEach((panel, i) => {
                panel.show = (i === index)
              })
            } else {
              this.scriptPanelConfig.filter((panel) => {
                return panel.position == position
              }).forEach((p) => {
                p.show = (p.name == name)
              })
            }
          }
      },
      configScriptPanel(size){
        if(this.panels !== size){
          this.panels = size;
          this.panelsConfig.open = false;
          if(size === 2){//由 1 变 2
            let to2Panel = this.scriptPanelConfig[0];//显示数据与维度定义
            to2Panel.show = true;
          }else{//由 2 变 1
            this.scriptPanelConfig.forEach((panel)=>{
                if(panel.position == 2){
                  panel.show = false
                }
            })
          }
        }
      },
      changePosition(p){
          if(this.panels == 2){
            p.position == 1 ? p.position = 2:p.position = 1;
            if(p.show == true){
                p.show = false
            }
          }
      },
      submitScript(){
        let scripts = ['optionEdit','scriptEdit','dimensionEdit'];
        scripts.forEach((s)=>{
            this.$refs[s].submitText()
        })
      },
      dialogClassHandler(){
        let dialog = document.getElementsByClassName("mu-dialog-wrapper");
        for(let i = 0;i<dialog.length;i++){
          dialog[i].setAttribute("class","widgetInstance-dialog-wrapper")
        }
      }
    },

  }
</script>

