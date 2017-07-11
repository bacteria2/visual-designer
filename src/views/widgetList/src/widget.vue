<template>
  <div class="option-adjust full-height ydp-widget"> <!--class="option-adjust full-height""-->
    <mu-dialog :open="dataSetDialog" title="" dialogClass="widget-dataset-dialog" bodyClass="widget-dataset-dialogBody">
          <component :is="dataSetDefine" :codeViewEnable="true"></component>
      <v-btn slot="actions" @click.native="dataSetDialog = false" >确定</v-btn>
    </mu-dialog>
    <view-header title="组件设计" :showMenus="true">
      <v-btn light class="blue-grey" @click.native="beautifyStr">格式化<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="dataSetDialog = true">数据工具<v-icon right light>widgets</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="previewHandler">预览组件<v-icon right light>pageview</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="save">保存组件<v-icon right light>save</v-icon></v-btn>
    </view-header>
    <main class="brace-charts__container blue-grey darken-1">
<v-layout row wrap style="height: 100%">
  <v-flex xs6 class="flex-left">
    <v-card class="pink darken-4 operational_zone">
      <v-card-text>
    <v-tabs id="widgetTab" grow light style="height:100%" justify-space-around>
      <v-tabs-bar slot="activators" class="pink darken-4">
        <v-tabs-item href="#option" >
          <v-icon >settings</v-icon>option
        </v-tabs-item>
       <v-tabs-item href="#script">
          <v-icon >code</v-icon>脚本
        </v-tabs-item>
        <v-tabs-item href="#showSetting">
          <v-icon >visibility</v-icon>可配置选项
        </v-tabs-item>
        <v-tabs-item href="#demensionDefine">
          <v-icon >extension</v-icon>维度定义
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-content id="option" class="my_tabs_item">
        <v-card flat height="100%">
          <v-card-text class="card_content">
           <brace id="optionEdit" :style="style.ace" :script.sync="widget.fOption" :showToolbar="true"></brace>
          </v-card-text>
        </v-card>
      </v-tabs-content>
      <v-tabs-content id="script" class="my_tabs_item">
        <v-card flat height="100%">
          <v-card-text class="card_content">
            <brace id="scriptEdit" :style="style.ace" :script.sync="widget.fExtensionJs" :showToolbar="true"></brace>
          </v-card-text>
        </v-card>
      </v-tabs-content>
      <v-tabs-content id="showSetting" class="my_tabs_item">
        <v-card flat height="100%">
          <v-card-text>
            <vertical-tab-panel :isIndicator="false" isSelectColor v-model="widgetOptions.active">
              <vertical-tab v-for="page in widgetOptions.pages" :title="page.title" :name="page.name" :key="page.name">
                <vertical-tab-panel v-model="page.active" content-classes="vertical-tab__content__no-padding blue-grey darken-1">
                  <vertical-tab v-for="(subPage,pageIndex) in page.pages" :title="subPage.title" :name="subPage.name" :key="subPage.name">
                    <div class="chk-btn"  @click="showAll(subPage.component,true)" style="margin-left:16px">
                      <i><em></em></i>
                      <span style="color:#FFF">全选</span>
                    </div>
                    <div class="chk-btn"  @click="showAll(subPage.component,false)" >
                      <i><em></em></i>
                      <span style="color:#FFF">全不选</span>
                    </div>
                    <component :is="subPage.component" :ref="subPage.component"></component>
                  </vertical-tab>
                </vertical-tab-panel>
              </vertical-tab>
              <vertical-tab title="序列" name="series">
                <vertical-tab-panel v-model="seriesTagActive" content-classes="vertical-tab__content__no-padding blue-grey darken-1">
                  <vertical-tab v-for="(seriesPage,pageIndex) in widgetOptions.seriesType" :title="seriesPage.name" :name="seriesPage.component" :key="seriesPage.name">
                    <div class="chk-btn"  @click="showAll(seriesPage.component,true)" style="margin-left:16px">
                      <i><em></em></i>
                      <span style="color:#FFF">全选</span>
                    </div>
                    <div class="chk-btn"  @click="showAll(seriesPage.component,false)" >
                      <i><em></em></i>
                      <span style="color:#FFF">全不选</span>
                    </div>
                    <component :is="seriesPage.component" :ref="seriesPage.component"></component>
                  </vertical-tab>
                </vertical-tab-panel>
              </vertical-tab>
            </vertical-tab-panel>

          </v-card-text>
        </v-card>
      </v-tabs-content>
      <v-tabs-content id="demensionDefine" class="my_tabs_item">
        <v-card flat height="100%">
          <v-card-text class="card_content">
            <brace id="demensionEdit" :style="style.ace" :script.sync="widget.fDataOption" :showToolbar="true"></brace>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs>
      </v-card-text>
    </v-card>
  </v-flex>
  <v-flex xs6 class="flex-right">
    <!--<div id="h-handler" class="handler" :style="style.handler" @mousedown="handlerDown=true"></div>-->
    <v-card class="pink darken-4 preview_zone">
      <v-card-text>
    <div  class="echart-board" ><!--v-if="preview"-->
      <text-echarts ref="echart" :text-script="options" ></text-echarts>
    </div>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
    </main>
  </div>
</template>
<script>
  import { debounceExec,beautifyJs,compact,set,clone,forOwn,getOptionData,message} from '@/utils'
  import {edits} from '../../Echarts/common/config'
  import store from '@/store'
  import dataSetDefine from '@/views/DataSetDefinition'
  import {saveWidget} from '@/services/WidgetService'
  import dataModel from '@/model/src/dataModel.js'
  export default{
    mounted(){
      //设置全局变量
      store.commit("setPropertyCheckedControl",{type:1});
      //获取参数
      this.widget = dataModel.widget();
      console.log("2");
      if(this.$route.params.widget){
          let wg = this.widget,pwg = this.$route.params.widget;
          forOwn(wg,function (v,k) {
              let val = pwg[k];
             if(val && val !==''){
                 wg[k] = val
             }
          })
      }
      this.widgetType = this.$route.params.widgetCode
      //做一些初始化
      this.initUI()
      //先获取widgetType，用于初始化widgetOptions
      if(this.widgetType){
        this.widgetOptions = edits[this.widgetType]()
        this.seriesTagActive = this.widgetOptions.seriesType[0].component
        let seriesTypes = this.widgetOptions.seriesType.map((type)=>{return type.name})
        store.commit("initShowSetting",{seriesTypes})
      }
    },
    computed:{

    },
    data(){
      return {
        widgetType:'EchartBar',
        loading:false,
        panelIndex:1,
        style: {
          ace: {
            width: "100%",
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
        def:{fOption:'option = {}',fExtensionJs:'extJs = function(option,agrs){return option}',fDataOption:"dataOption={dataSet:[],dimension:[{id:'',label:'',key:'',required:false,type:'',measured:true,dataItem:{name:'',alias:'',key:''}}]}"}
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
      previewHandler(){
        let baseOption = eval.bind(window)(this.widget.fOption),
            extJs = eval.bind(window)(this.widget.fExtensionJs),
            dataOption = eval.bind(window)(this.widget.fDataOption),
            dimension = dataOption.dimension,
            data = store.state.echarts.sourceData,

            OptionData = getOptionData(dimension,data);
            forOwn(OptionData,function (v, k) {
                 set(baseOption,k,v)
            })
            if(extJs && typeof extJs =='function'){
              baseOption = extJs.apply(this,[baseOption,OptionData])
            }
            this.options = baseOption
            this.widget.fOption = 'option = '+JSON.stringify(baseOption)
            this.preview = true
      },
      save(){
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

  }
</script>

