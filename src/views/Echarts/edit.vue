<template>
  <div class="option-adjust full-height edit">
    <div v-if="!renderError"> <!--grey lighten-3-->
    <v-navigation-drawer persistent clipped v-model="drawer" class="side-drawer blue-grey darken-4" light
                         enable-resize-watcher>
      <vertical-tab-panel :isIndicator="false" isSelectColor v-model="editConfig.active">
        <vertical-tab v-for="page in pages" :title="page.title" :name="page.name" :key="page.name">
          <vertical-tab-panel v-model="page.active" content-classes="vertical-tab__content__no-padding blue-grey darken-1">
            <vertical-tab v-for="(subPage,pageIndex) in page.pages" :title="subPage.title" :name="subPage.name" :key="subPage.name">
              <component :is="subPage.component"></component>
            </vertical-tab>
          </vertical-tab-panel>
        </vertical-tab>
      <!--series-->
        <vertical-tab :title="seriesConfig.title" :name="seriesConfig.name">
          <vertical-tab-panel v-model="seriesConfig.active" content-classes="vertical-tab__content__no-padding blue-grey darken-1">
            <vertical-tab v-for="(seriesPage,pageIndex) in seriesConfig.pages" :title="seriesPage.title" :name="seriesPage.name" :key="seriesPage.name">
              <component :is="seriesPage.component" :index="pageIndex"></component>
            </vertical-tab>
          </vertical-tab-panel>
        </vertical-tab>
      </vertical-tab-panel>
    </v-navigation-drawer>
    <v-toolbar class="grey lighten-3" right darken>
      <v-toolbar-title>实例设计器</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn light @click.native="showDataConfig = true" class="blue darken-4">
        数据设置
        <v-icon right light>dns</v-icon>
      </v-btn>
      <v-btn light @click.native="dataSetConfig" class="blue darken-4">
        数据集设置
        <v-icon right light>dns</v-icon>
      </v-btn>

     <!-- <v-dialog v-model="dataSetDialog" fullscreen transition="v-dialog-bottom-transition" :overlay=true>
        <v-btn light class="blue-grey" light slot="activator">维度设置<v-icon right light>widgets</v-icon></v-btn>
        <v-card class="blue-grey darken-1 dataEditPannel" light>
          <v-card-row>
            <v-toolbar light>
              <v-btn icon="icon" @click.native="dataDialogClose" light>
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>数据设置</v-toolbar-title>
              <v-btn light flat @click.native="dataDialogSave">确定</v-btn>
            </v-toolbar>
          </v-card-row>
          <component is="dimension" :seriesType="seriesType"></component>
        </v-card>
      </v-dialog>-->

      <v-btn light :loading="loading" @click.native="saveWidgetInstance" :disabled="loading" class="blue darken-4">
        保存
        <v-icon right light>save</v-icon>
      </v-btn>
      <v-btn light class="blue darken-4"  @click.native.stop="back2WgiList">
        退出
        <v-icon light>close</v-icon></v-btn>
    </v-toolbar>

    <main class="main-container blue-grey darken-1">
      <v-container fluid class="fluid-container widgetView">
        <v-card height="100%" class="card blue-grey lighter-1">
            <echarts-panel></echarts-panel>
        </v-card>
      </v-container>
    </main>
     <data-config-panel :show="showDataConfig" @showDataSetConfig="dataSetDialog = true" :seriesType="seriesType"></data-config-panel>
      <mu-dialog :open="dataSetDialog" title="" dialogClass="widget-dataset-dialog" bodyClass="widget-dataset-dialogBody">
        <component :is="dataSetDefine" :codeViewEnable="true"></component>
        <v-btn slot="actions" @click.native="dataSetDialog = false" >确定</v-btn>
      </mu-dialog>
  </div>
   <div v-if="renderError" style="height: inherit">
     <p class="display-3 pink--text text-xs-center error-box">WidgetInstance Designer Error</p>
   </div>
  </div>
</template>
<script>
import {edits} from './common/config'
import store from '@/store'
import debounce from 'lodash/debounce'
import {forOwn,map,set,get,remove,getOptionData,message} from '@/utils'
import dimension from '@/views/Echarts/dimension.vue'
import Router from '@/router'
import {saveWidgetInstance} from '@/services/WidgetInstanceService'
import dataConfigPanel from '@/views/widgetInstance/src/widgetDataConfig.vue'
import dataSetDefine from '@/views/DataSetDefinition'
let widgetInstance = undefined
  export default {
    name:'WidgetInstanceEdit',
    store,
    beforeCreate(){
      if(this.$route.params.widgetInstance){
        widgetInstance = this.$route.params.widgetInstance
        store.commit("initEchartState",{widgetInstance});
      }
    },
    mounted(){

      store.commit("setPropertyCheckedControl",{type:0});
      if(widgetInstance && widgetInstance.fImageCode){
        this.editConfig = edits[widgetInstance.fImageCode]()
        this.pages = this.editConfig .pages;
        this.seriesType = this.editConfig .seriesType;
      }else{
        this.renderError = true
      }
      this.loadSeriesPage();
    },
    computed:{
      defaultSeries(){
         return this.series.filter((s)=>{return s.baseSeries})
      },
      customSeries(){
        return this.series.filter((s)=>{return !s.baseSeries})
      },
      defaultSeriesSize(){
          return this.defaultSeries.length
      }
    },
    data () {
      return {
          drawer: true,
          loading: null,
          loader: null,
          dataSetDialog:false,
          editConfig:{},
          pages:{},
          seriesType:[],
          seriesConfig:{title:'序列',name:'Series',active:'series[0]','pages':[]},
          series:this.$store.getters.getSeries,
          renderError:false,
          instance:widgetInstance,
          showDataConfig:false,
         dataSetDefine:dataSetDefine
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    },
    methods: {
      //根据state.series生成序列界面所需的数据
      loadSeriesPage(){
        let seriePages = [];
        map(this.series,function(s){
          let component = 'Series-'+s.type;
          return {title:'',name:'',component};
        }).forEach((seriesPage,index)=>{
          seriesPage.title = '序列-'+index;
          seriesPage.name  = 'series['+index+']';
          seriePages.push(seriesPage);
        });
        this.seriesConfig.pages = seriePages;
      },/*,
      addSeries(type){
        store.commit("addSerial",{type});
        this.loadSeriesPage();
      },
      deleteSeries(index){
        let realIndex = index + this.defaultSeriesSize;
         this.$store.commit("delSerial",{realIndex});
        this.loadSeriesPage();
      },*/
      refreshTab(){
         let activeTap = this.editConfig.active;
         if(activeTap ==="Series"){//模拟refresh
           this.editConfig.active = "Base";
           debounce(()=>{this.editConfig.active = "Series";},300)();
         }
      },
      dataDialogSave(){
        store.dispatch("updateSourceData")//加载数据
        let data = store.state.echarts.sourceData,
        dimension = store.getters.getDemension,
        optionData =  getOptionData(dimension,data);
        //合并数据更新图形显示
        store.dispatch("refreshChartAsync",{optionData})
        this.dataDialogClose();
      },
      dataDialogClose(){
        this.refreshTab();
        this.dataSetDialog = false;
      },
      dataSetConfig(){
        Router.push({ name: 'data_def', params: { from:'ChartEdit'}})
      },
      back2WgiList(){
        Router.push({ name: 'WidgetInstanceList', params: { page:'ChartEdit'}})
      },
      saveWidgetInstance(){
        let WidgetInstanceData = store.getters.getWidgetInstanceProperty,that = this
        forOwn(WidgetInstanceData,function (v,k) {
          widgetInstance[k] = v
        })
        saveWidgetInstance(widgetInstance).then((resp) => {
          if (resp.success) {
            that.loading = false;
            message.success("保存成功")
          }
          else{
            message.warning(`保存失败:${resp.msg}`)
          }
        });
      }
    },
    components:{
      dimension,dataConfigPanel
    }
  }
</script>
<style scoped="">
   .dataEditPannel {background-color: #6666 !important}
   .widgetView{height: calc(100vh - 56px)}
</style>

