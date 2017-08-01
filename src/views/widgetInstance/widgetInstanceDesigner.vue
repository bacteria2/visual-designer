<template>
  <div class="option-adjust full-height edit">
    <div v-if="!renderError">
      <mu-drawer :open="propertyDrawer" class="pc-drawer" @close="">
        <vertical-tab-panel :isIndicator="false" isSelectColor v-model="editConfig.active">
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
    <v-toolbar class="main-toolbar" light>
      <v-toolbar-title>实例设计器</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.native="showDataConfig = false;propertyDrawer = true" class="my-btn">
        <v-icon left class="my-btn-icon">dns</v-icon>属性</v-btn>
      <v-btn  @click.native="showDataPanel" class="my-btn" v-if="canDataConfig">
        <v-icon left class="my-btn-icon">dns</v-icon>
        数据
      </v-btn>
      <div class="cut-line"></div>
      <v-btn :loading="loading" @click.native="saveWidgetInstance" :disabled="loading" class="my-btn">
        <v-icon left class="my-btn-icon">save</v-icon>
        保存
      </v-btn>
      <v-btn class="my-btn"  @click.native.stop="back2WgiList">
        <v-icon left class="my-btn-icon">close</v-icon>
        退出
        </v-btn>
    </v-toolbar>
      <mu-drawer :open="true" class="widget-drawer" right>
          <div class="widgetView">
            <component :is="instance.fRenderClass" v-if="instance"></component>
          </div>
      </mu-drawer>
     <data-config-panel :show="showDataConfig" @showDataSetConfig="dataSetDialog = true" :seriesType="seriesType" v-if="canDataConfig"></data-config-panel>
      <mu-dialog :open="dataSetDialog" title="" dialogClass="widget-dataset-dialog" bodyClass="widget-dataset-dialogBody" actionsContainerClass="widget-dataset-action-zone" @show="dialogClassHandler">
        <component :is="dataSetDefine" :codeViewEnable="true" @exit="dataSetDialog = false"></component>
       <!-- <v-btn slot="actions" @click.native="dataSetDialog = false" >确定</v-btn>-->
      </mu-dialog>
  </div>
   <div v-if="renderError" style="height: inherit">
     <p class="display-3 pink--text text-xs-center error-box">WidgetInstance Designer Error</p>
   </div>
  </div>
</template>
<script>
import store from '@/store'
import debounce from 'lodash/debounce'
import {forOwn,map,set,get,remove,getOptionData,message} from '@/utils'
import Router from '@/router'
import {saveWidgetInstance} from '@/services/WidgetInstanceService'
import dataConfigPanel from './widgetDataConfig.vue'
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
        this.editConfig = widgetConfigs[this.widgetType]
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
      },
      widgetType(){
        return widgetInstance.fImageCode
      },
      canDataConfig(){
       return store.getters.getDataSet.length > 0
      }
    },
    data () {
      return {
          propertyDrawer: true,
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
      },
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
     /* dataSetConfig(){
        Router.push({ name: 'data_def', params: { from:'ChartEdit'}})
      },*/
      back2WgiList(){
        let srcUrl = this.$route.params.srcUrl;
        let param = this.$route.params.param;
        if(!srcUrl){
          srcUrl = 'widget';
        }
        Router.push({ name: srcUrl, params: { page:'ChartEdit',param:param}})
      },
      saveWidgetInstance(){
        let WidgetInstanceData = store.getters.getWidgetInstanceProperty,that = this
        forOwn(WidgetInstanceData,function (v,k) {
          widgetInstance[k] = v
        })
        let mergedOption = store.getters.getMergedOption;
        if(mergedOption && typeof mergedOption ==='object'){
          widgetInstance.fMergeOption = JSON.stringify(mergedOption)
        }
        saveWidgetInstance(widgetInstance).then((resp) => {
          if (resp.success) {
            that.loading = false;
            message.success("保存成功")
          }
          else{
            message.warning(`保存失败:${resp.msg}`)
          }
        });
      },
      showDataPanel(){
        this. propertyDrawer = false

        this.showDataConfig = true
        //初始化序列名
        this.$store.commit('initSeriesName')
        //加载sourceData
        this.$store.dispatch("updateSourceData")
      },
      dialogClassHandler(){
        let dialog = document.getElementsByClassName("mu-dialog-wrapper");
        for(let i = 0;i<dialog.length;i++){
          dialog[i].setAttribute("class","widgetInstance-dialog-wrapper")
        }
      }
    },
    components:{ dataConfigPanel }
  }
</script>


