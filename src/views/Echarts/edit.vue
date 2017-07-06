<template>
  <div class="option-adjust full-height">
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
    <v-toolbar class="blue-grey" right light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>设计器
        <v-btn light @click.native="dataSetConfig" class="blue-grey ">
          数据集设置
          <v-icon right light>dns</v-icon>
        </v-btn>
        <v-dialog v-model="dataSetDialog" fullscreen transition="v-dialog-bottom-transition" :overlay=true>
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
            <component is="dataSet"></component>
          </v-card>
        </v-dialog>
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="blue-grey"
        >保存<v-icon right light>save</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <main class="main-container blue-grey darken-1">
      <v-container fluid class="fluid-container widgetView">
        <v-card height="100%" class="card blue-grey lighter-1">

            <echarts-panel></echarts-panel>

        </v-card>
      </v-container>
    </main>
  </div>
</template>
<script>
import {edits} from './common/config'
import store from '@/store'
import debounce from 'lodash/debounce'
import {forOwn,map,set,get,remove,getOptionData} from '@/utils'
import dataSet from '@/views/Echarts/dimension.vue'
import Router from '@/router'
  export default {
    name:'EchartsEdit',
    store,
    mounted(){
      /*console.info("echart: loadSeriesFromOption");*/
      store.commit("loadSeriesFromOption");
      store.commit("setPropertyCheckedControl",{type:0});
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
     let editConfig =edits.EchartBar(),
         pages=editConfig.pages,
         seriesType = editConfig.seriesType,
         seriesConfig = {title:'序列',name:'Series',active:'series[0]','pages':[]},
         series = this.$store.getters.getSeries
      return {
          drawer: true,
          loading: null,
          loader: null,
          dataSetDialog:false,
          editConfig,
          pages,
          seriesType,
          seriesConfig,
          series
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
      addSeries(type){
        store.commit("addSerial",{type});
        this.loadSeriesPage();
      },
      deleteSeries(index){
        let realIndex = index + this.defaultSeriesSize;
         this.$store.commit("delSerial",{realIndex});
        this.loadSeriesPage();
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
      dataSetConfig(){
        Router.push({ name: 'data_def', params: { from:'ChartEdit'}})
      }
    },
    components:{
      dataSet
    }
  }
</script>
<style scoped="">
   .dataEditPannel {background-color: #6666 !important}
   .widgetView{height: calc(100vh - 56px)}
</style>

