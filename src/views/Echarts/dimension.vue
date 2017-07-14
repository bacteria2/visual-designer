<template>
  <!---->
  <v-layout row >
    <v-flex xs3 class="serieTile">
      <v-card class="customSerieContent">
        <v-card-title class="light-blue darken-4">
          <span class="white--text title ">序列配置</span>
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
        <v-list one-line subheader style=" padding: 0">
       <!--   <v-subheader inset class="serieEditTitme">默认序列</v-subheader>
          <v-divider light></v-divider>-->
          <v-divider inset></v-divider>
          <v-subheader inset class="serieEditTitme">默认序列</v-subheader>
          <v-list-item v-for="(obj,index) in defaultSeries" :key="index">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon light class="customSerie_icon">class</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>{{'默认序列-'+index}}</v-list-tile-title>
                <v-list-tile-sub-title>{{ '类型:'+obj.type}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-divider light></v-divider>
          <v-subheader inset class="serieEditTitme">自定义序列</v-subheader>
          <v-list-item v-for="(obj,index) in customSeries" :key="index">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon light  class="customSerie_icon">class</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>{{'自定义序列-'+index}}</v-list-tile-title>
                <v-list-tile-sub-title>{{ '类型:'+obj.type}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon  @click.native.stop="deleteSeries(index)">
                  <v-icon class="pink--text">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs7>
      <editDimension></editDimension>
    </v-flex>
  </v-layout>
</template>

<script>
  import editDimension from '@/views/common/dimensionEdit/editDimension.vue'
  import {edits} from './common/config'
  import store from '@/store'
  //import debounce from 'lodash/debounce'
  //import {forOwn,map,set,get,remove} from '@/utils'

  export default {
    name:'dimension',
    store,
    mounted(){
     /* store.commit("loadSeriesFromOption");
      store.commit("setPropertyCheckedControl",{type:0});
      this.loadSeriesPage();*/
    },
    props:{
      seriesType:{
          type:Array,
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
      }
    },
    data () {
     /* let editConfig =edits.EchartBar(),
        pages=editConfig.pages,
        seriesType = editConfig.seriesType,
        //seriesConfig = {title:'序列',name:'Series',active:'series[0]','pages':[]},
        series = this.$store.getters.getSeries*/
      return {
        //drawer: true,
        //loading: null,
        //loader: null,
        //dataDialog:false,
        //editConfig,
        //pages,
        //seriesType,
        //seriesConfig,
        series:this.$store.getters.getSeries
      }
    },
    watch: {
     /* loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }*/
    },
    methods: {

      //根据state.series生成序列界面所需的数据
     /* loadSeriesPage(){
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
      },*/
      addSeries(type){
        store.commit("addSerial",{type});
        //this.loadSeriesPage();
      },
      deleteSeries(index){
        let realIndex = index + this.defaultSeriesSize;
        this.$store.commit("delSerial",{realIndex});
        //this.loadSeriesPage();
      },
      /*refreshTab(){
        let activeTap = this.editConfig.active;
        if(activeTap ==="Series"){//模拟refresh
          this.editConfig.active = "Base";
          debounce(()=>{this.editConfig.active = "Series";},300)();
        }
      }*/
    },
    components:{
      editDimension
    }
  }
</script>

<style scoped>
  .serieTile{padding-left: 36px !important;}
  .serieEditTitme{font-family: "Microsoft YaHei UI"; color: #263238; font-weight: 600;line-height: 42px; margin:5px 0 5px 20px;}
  .customSerieContent{ background-color: #607d8b !important; font-family: 'Roboto', sans-serif; font-size: 13px }
  .list__tile__title { font-size: 13px;font-family: "Microsoft YaHei UI";}
  .list__tile__sub-title{font-size: 13px; color: #d0cfcf; font-style: italic; font-family: "Microsoft YaHei UI";}
  .customSerie_icon { line-height: 42px}
</style>


