<template>
  <div class="option-adjust full-height">
    <v-navigation-drawer persistent clipped v-model="drawer" class="side-drawer grey darken-4" light
                         enable-resize-watcher>
      <vertical-tab-panel content-classes="vertical-tab__content__no-padding grey darken-1" v-model="editConfig.active">
        <vertical-tab v-for="page in editConfig" :title="page.title" :name="page.name" :key="page.name">
          <!--<component is="pagePropertyEdit"></component>-->
          <page-property-edit></page-property-edit>
        </vertical-tab>
      </vertical-tab-panel>
    </v-navigation-drawer>
    <v-toolbar class="cyan darken-1" right light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Dashboard
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="cyan darken-1"
        >
          添加布局
          <v-icon right light>add_box</v-icon>
        </v-btn>
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="cyan darken-1 "
        >
          页面设置
          <v-icon right light>settings_applications</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main class="main-container">
      <v-container fluid class="fluid-container perview grey darken-2">
        <v-card height="100%" class="card grey darken-1">
            <upload-image></upload-image>
        </v-card>
      </v-container>
    </main>
  </div>
</template>
<script>
  import {edits} from '@/views/DashBord/property/config'
  import store from '@/store'
  import debounce from 'lodash/debounce'
  import {forOwn,map,set,get,remove} from '@/utils'
  import pagePropertyEdit from '@/views/DashBord/property/component/pagePropertyEdit.vue'
  import uploadImage from '@/views/DashBord/property/component/uploadImage'

  export default {
    name:'propertyEdit',
    store,
    mounted(){
      /*console.info("echart: loadSeriesFromOption");*/
     /* store.commit("loadSeriesFromOption");
      store.commit("setPropertyCheckedControl",{type:0});
      this.loadSeriesPage();*/
    },
    computed:{
     /* defaultSeries(){
        return this.series.filter((s)=>{return s.baseSeries})
      },
      customSeries(){
        return this.series.filter((s)=>{return !s.baseSeries})
      },
      defaultSeriesSize(){
        return this.defaultSeries.length
      }*/
    },
    data () {
      let editConfig =edits.PropertyCommon();
      return {
        drawer: true,
        loading: null,
        loader: null,
        editConfig
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
      /*loadSeriesPage(){
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
        this.dataDialogClose();
      },
      dataDialogClose(){
        this.refreshTab();
        this.dataSetDialog = false;
      }*/
    },
    components:{
      pagePropertyEdit,
      uploadImage
    }
  }
</script>
<style scoped="">
  .dataEditPannel {background-color: #6666 !important}
  .perview{height: calc(100vh - 56px)}
</style>

