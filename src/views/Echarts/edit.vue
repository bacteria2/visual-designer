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
        <vertical-tab :title="seriesConfig.title" :name="seriesConfig.name" :key="seriesConfig.name">
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
      <v-toolbar-title>Toolbar
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="blue-grey"
        >
          保存
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="blue-grey "
        >
          Save
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>

        <v-dialog v-model="dataDialog" fullscreen transition="v-dialog-bottom-transition" :overlay=true>
          <v-btn light class="blue-grey" light slot="activator">数据设置</v-btn>
          <v-card class="blue-grey darken-1" light>
            <v-card-row>
              <v-toolbar light>
                <v-btn icon="icon" @click.native="dataDialogClose" light>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>数据设置</v-toolbar-title>
                <v-btn light flat @click.native="dataDialogSave">保存</v-btn>
              </v-toolbar>
            </v-card-row>
          <!---->
                <v-layout row>
                  <v-flex xs3 class="serieTile">
                    <v-card>
                      <v-card-title class="light-blue darken-4">
                        <span class="white--text title">序列配置</span>
                        <v-spacer></v-spacer>
                        <div class="serieToolBar">
                          <v-menu  transition="v-slide-x-transition"
                                   bottom
                                   right>
                            <v-btn flat small light slot="activator">
                              <v-icon light>add</v-icon>
                            </v-btn>
                            <v-list class="pink darken-4">
                              <v-list-item v-for="type in seriesType" :key="type.name" @click="addSeries(type.name)">
                                <v-list-tile>
                                  <v-list-tile-title>{{type.name}}</v-list-tile-title>
                                </v-list-tile>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                      </v-card-title>


                      <v-list one-line subheader>
                        <v-subheader inset>默认序列</v-subheader>
                        <v-list-item v-for="(obj,index) in defaultSeries" :key="index">
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon light>class</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content class="white--text">
                              <v-list-tile-title>{{'默认序列-'+index}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{ '类型:'+obj.type}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list-item>
                        <v-divider light></v-divider>
                        <v-subheader inset>自定义序列</v-subheader>
                        <v-list-item v-for="(obj,index) in customSeries" :key="index">
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon light>class</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content class="white--text">
                              <v-list-tile-title>{{'自定义序列-'+index}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{ '类型:'+obj.type}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                             <v-list-tile-action>
                               <v-btn icon  @click.native="deleteSeries(index)">
                                 <v-icon class="pink--text">delete</v-icon>
                               </v-btn>
                             </v-list-tile-action>
                          </v-list-tile>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex>
                  <v-flex xs7>
                       <component is="editDimension"></component>
                  </v-flex>
                </v-layout>
          </v-card>

        </v-dialog>

      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <main class="main-container blue-grey darken-1">
      <v-container fluid class="fluid-container">
        <v-card height="100%" class="card blue-grey lighter-1">
          <div>
            <echarts-panel></echarts-panel>
          </div>
        </v-card>
      </v-container>
    </main>
  </div>
</template>
<script>
import {edits} from './common/config'
import store from '@/store'
import debounce from 'lodash/debounce'
import {forOwn,map,set,get,remove} from '@/utils'

  export default {
    name:'EchartsEdit',
    store,
    mounted(){
      /*console.info("echart: loadSeriesFromOption");*/
      store.commit("loadSeriesFromOption");
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
          dataDialog:false,
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
      ok(a){
        console.log(a)
      },
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
      dataDialogClose(){
          console.log("dataDialogClose");
          this.refreshTab();
          this.dataDialog = false;
      },
      dataDialogSave(){
          this.dataDialogClose();
      },
    }
  }
</script>
<style>
  .serieTile{padding-left: 36px !important;}
</style>
