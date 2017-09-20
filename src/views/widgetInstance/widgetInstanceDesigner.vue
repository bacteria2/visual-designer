<template>
  <div class="option-adjust full-height edit">
    <div v-if="!renderError">
      <mu-drawer :open="propertyDrawer" class="pc-drawer" @show="">
        <vertical-tab-panel :isIndicator="false" isSelectColor v-model="widgetOptions.active">
          <vertical-tab v-for="page in pages" :title="page.title" :name="page.name" :key="page.name">
            <vertical-tab-panel v-model="page.active" content-classes="vertical-tab__content__no-padding property-box">
              <vertical-tab v-for="(subPage,pageIndex) in page.pages" :title="subPage.title" :name="subPage.name" :key="subPage.name">
                <component :is="subPage.component"></component>
              </vertical-tab>
            </vertical-tab-panel>
          </vertical-tab>
        <vertical-tab :title="seriesConfig.title" :name="seriesConfig.name" v-if="series.length > 0">
          <vertical-tab-panel v-model="seriesConfig.active" content-classes="vertical-tab__content__no-padding property-box">
            <vertical-tab v-for="(seriesPage,pageIndex) in seriesConfig.pages" :title="seriesPage.title" :name="seriesPage.name" :key="seriesPage.name">
              <component :is="seriesPage.component" :index="pageIndex"></component>
            </vertical-tab>
          </vertical-tab-panel>
        </vertical-tab>
        </vertical-tab-panel>
      </mu-drawer>
      <view-header title="实例设计器">
        <div slot="rightEnd">
        <toolbar-button @click.native="showDataConfig = false;showDyDataConfig=false;propertyDrawer = true"
                        icon="dns" title="属性">
        </toolbar-button>
        <toolbar-button @click.native="showDataPanel"
                        icon="dns" title="数据">
        </toolbar-button>
        <toolbar-button @click.native="saveWidgetInstance"
                        icon="save" title="保存">
        </toolbar-button>
          <toolbar-button @click.native="back2WgiList"
                          icon="exit_to_app" title="退出">
          </toolbar-button>
        </div>
      </view-header>
      <mu-drawer :open="true" class="widget-drawer" right>
          <div class="widgetView">
            <component :is="vueWrapper" v-if="vueWrapper"></component>
          </div>
      </mu-drawer>
     <data-config-panel :show="showDataConfig" @showDataSetConfig="dataSetDialog = true" :seriesType="seriesType" v-if="canDataConfig" @seriesChanged="loadSeriesPage" ref="dataConfig"></data-config-panel>
      <mu-dialog :open="dataSetDialog" title="" dialogClass="widget-dataset-dialog" bodyClass="widget-dataset-dialogBody" actionsContainerClass="widget-dataset-action-zone" @show="dialogClassHandler" >
        <component :is="dataSetDefine" :codeViewEnable="true" @exit="dataSetDialogExitHandler"></component>
      </mu-dialog>
      <dynamic-data-config :show="showDyDataConfig" v-if="isDynamicWidget"></dynamic-data-config>
  </div>
   <div v-if="renderError" style="height: inherit">
     <p class="display-3 pink--text text-xs-center error-box">WidgetInstance Designer Error</p>
   </div>
  </div>
</template>
<script>
import store from '@/store'
import debounce from 'lodash/debounce'
import {forOwn,map,set,get,remove,getOptionData,message,stringify} from '@/utils'
import Router from '@/router'
import {saveWidgetInstance,getWidgetInstanceByID} from '@/services/WidgetInstanceService'
import dataConfigPanel from './widgetDataConfig.vue'
import dataSetDefine from '@/views/DataSetDefinition'
import ThumbnailHelp from '@/mixins/ThumbnailHelp'
import ViewHeader from "../common/Header";
import dynamicDataConfig from './dynamicDataConfig.vue'
  export default {
    name: 'WidgetInstanceEdit',
    store,
    mixins:[ThumbnailHelp],
    async mounted(){
      let id = this.$route.params.widgetId;
      if (id) {
        let resp = await getWidgetInstanceByID({key: id})
        if (resp.success) {
          this.edittingWidget = resp.widgetsInstance;
          let widgetInstance = this.edittingWidget;
          store.commit("initEchartState", {widgetInstance});
          store.commit("setPropertyCheckedControl", {type: 0});
          if (widgetInstance && widgetInstance.fViewModel) {
            this.widgetType = widgetInstance.fViewModel

            this.widgetOptions = widgetConfigs[this.widgetType]
            //console.log(this.widgetType,widgetConfigs)
          } else {
            this.renderError = true
          }
          this.series = this.$store.getters.getSeries;
          this.loadSeriesPage();

          this.isDynamicWidget = widgetInstance.fDynamic
        }
        else {
          message.warning(`获取组件实例数据失败:${resp.msg}`)
        }
      }
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
      },
      canDataConfig(){
        return store.getters.getDataSet.length > 0
      },
      pages(){
          return this.widgetOptions.pages;
      },
      seriesType(){
         return this.widgetOptions.seriesType;
      }
    },
    data () {
      return {
          widgetType:undefined,
          propertyDrawer: true,
          dataSetDialog:false,
          seriesConfig:{title:'序列',name:'Series',active:'series[0]','pages':[]},
          series:[],
          renderError:false,
          edittingWidget:null,
          showDataConfig:false,
          dataSetDefine:dataSetDefine,
          isDynamicWidget:false,
          showDyDataConfig:false
      }
    },
    watch: {
      /*loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }*/
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
      },
      refreshTab(){
         let activeTap = this.widgetOptions.active;
         if(activeTap ==="Series"){//模拟refresh
           this.widgetOptions.active = "Base";
           debounce(()=>{this.widgetOptions.active = "Series";},300)();
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
      back2WgiList(){
        let that = this;
        function exit(){
          let srcUrl = that.$route.params.srcUrl;
          let dashboard = that.$route.params.dashboard;
          let pageInfo = that.$route.params.pageInfo
          store.commit("clearEchartState"); // 退出时清除state中的数据
          if (!srcUrl) {
            Router.push({
              name: 'widget', params: {page: 'ChartEdit',pageInfo}
            })
            return
          }
          Router.push({
            name: srcUrl, params: {page: 'ChartEdit',dashboard,dashboardId:dashboard.id,}
          })
        }
        message.confirm("确认要退出设计器",exit)
      },
     async saveWidgetInstance(){
        let WidgetInstanceData = store.getters.getWidgetInstanceProperty,that = this
        forOwn(WidgetInstanceData,function (v,k) {
          that.edittingWidget[k] = v
        })
        let mergedOption = store.state.echarts.mergedOption
        //console.log('mergedOption',mergedOption)
        if(mergedOption && typeof mergedOption ==='object'){
          this.edittingWidget.fMergeOption = stringify(mergedOption)
        }
        this.widgetRender = store.getters.getRenderVueWrapper
        if(this.widgetRender){ //处理缩略图
          if(!this.$route.params.dashboard){//不是来源于dashboard时的编辑截图
            await this.thumbnailHandler();
          }
        }
        this.edittingWidget.fRender = this.widgetOptions.render
        saveWidgetInstance({widgetInstance:this.edittingWidget,thumbnail: this.thumbnail}).then((resp) => {
          if (resp.success) {
            message.success("保存成功")
          }
          else{
            message.warning(`保存失败:${resp.msg}`)
          }
        });
      },
      showDataPanel(){
         if(!this.isDynamicWidget){
           this. propertyDrawer = false
           this.showDataConfig = true
           //初始化序列名
           this.$store.commit('initSeriesName')
           //加载sourceData
           this.$store.dispatch("updateSourceData")
         }else{
           this. propertyDrawer = false
           this.showDyDataConfig = true
         }
      },
      dialogClassHandler(){
        let dialog = document.getElementsByClassName("mu-dialog-wrapper");
        for (let i = 0; i < dialog.length; i++) {
          dialog[i].setAttribute("class", "widgetInstance-dialog-wrapper")
        }
      },
      dataSetDialogExitHandler(){
          this.dataSetDialog = false;
          let dc = this.$refs.dataConfig
          if(dc){
             dc.updateCurDataSet()
         }
      }
    },
    components: {dataConfigPanel,dynamicDataConfig}
  }
</script>


