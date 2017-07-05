<template>
  <div class="option-adjust full-height">
    <view-header title="组件设计" :showMenus="true">
      <v-btn light class="blue-grey" @click.native="beautifyStr">美化文本<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey">预览组件<v-icon right light>pageview</v-icon></v-btn>
      <v-btn light class="blue-grey">保存组件<v-icon right light>save</v-icon></v-btn>
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
            <brace id="scriptEdit" :style="style.ace" :script.sync="widget.fExtensionJs"></brace>
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
            <brace id="demensionEdit" :style="style.ace" :script.sync="widget.fDataOption"></brace>
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
    <div  class="echart-board">
      <text-echarts ref="echart" :text-script="baseOption" ></text-echarts>
    </div>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
    </main>
  </div>
</template>
<script>
  /*import { loadTextScript } from '@/services/EditorService'*/
  import { debounceExec,beautifyJs,compact,set,clone} from '@/utils'
  import {edits} from './common/config'
  import store from '@/store'
  export default{
    mounted(){
      //设置全局变量
      store.commit("setPropertyCheckedControl",{type:1});
      //获取参数
      this.widget = this.$route.params.widget
      this.widgetType = this.$route.params.widgetType
      //格式化代码
      this.beautifyStr()
      //先获取widgetType，用于初始化widgetOptions
      this.widgetOptions = edits[this.widgetType]()
      this.seriesTagActive = this.widgetOptions.seriesType[0].component
      let seriesTypes = this.widgetOptions.seriesType.map((type)=>{return type.name})
      store.commit("initShowSetting",{seriesTypes})
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
            borderradius: "4px",
            borderradius: "4px"
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
        /*baseOption:`option={backgroundColor: '#ffffff',tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{feature:{mark:{show:true},dataView:{show:true,readOnly:true},magicType:{show:false,type:["line","bar"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value",name:"°C"}],series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10]},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0]}],color:["rgb(209, 117, 117)","rgb(146, 78, 219)"],grid:{x:47,y:64,x2:124,y2:27}}`,
        demension:'',
        script: '',*/

        handlerDown: false,
        seriesTagActive:'',
        widget:''
      }
    },
    methods: {
      /*handlerMove(e){
        if (this.handlerDown) {
          let left = e.clientX / window.innerWidth;
          let percentage = Math.min(0.9, Math.max(0.1, left));
          left = percentage * 100;
          this.style.ace.width = left + "%";
          this.style.echart.width = (100 - left) + "%";
          this.style.echart.left = left + "%";
          this.style.handler.left = left + "%";
          if (this.$refs && this.$refs.echart)
            debounceExec(_ => this.$refs.echart.resizeChart(), 500)
        }
      },
      switchView(index){
        this.panelIndex=index;
      },*/
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
        this.widget.fDataOption =  beautifyJs(this.widget.fDataOption);
        this.widget.fExtensionJs =   beautifyJs(this.widget.fExtensionJs);
      }
    },

  }
</script>
<style scoped>
.flex-left{
  padding-right: 0 !important;
}
.flex-right{
  padding-left: 0 !important;
}
.operational_zone{
  margin: 10px;
}
.preview_zone{
  padding-left: 0 !important;
  height:calc(100vh - 80px) !important;
  margin: 10px;
}

.ace_gutter{
  border-radius: 4px;
}
.my_tabs_item{
  height:calc(100vh - 140px);
}
.card_content{
  width: calc(100% - 80px);
  height: calc(100% - 20px) !important;
  left:70px;
  top: 10px;
  right: 10px;
  bottom: 10px;
  position: inherit;
}
.card__text{
    height: 100%;
    padding: 0 !important;
  }
</style>
