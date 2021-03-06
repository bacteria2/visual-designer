<template>
  <div class="full-height data-definition">
  <code-view :show.sync="showCodeView" v-if="codeViewEnable"></code-view>
    <view-header title="数据源配置" :showMenus="!codeViewEnable">
      <v-btn light class="blue-grey" @click.native="saveDataSource">
        保存<v-icon right light>save</v-icon>
      </v-btn>
      <v-btn v-if="codeViewEnable" light class="blue-grey" @click.native="showCode">代码
        <v-icon right light>code</v-icon>
      </v-btn>
    </view-header>
    <main class="main-container blue-grey darken-1">
      <v-container fluid class="fluid_container">
        <v-layout class="layout">
          <v-flex xs2 class="source_menu">
            <v-card>
              <v-toolbar class="teal white--text" light style="z-index: 111;">
                <v-toolbar-title>数据源</v-toolbar-title>
                <v-menu bottom right :nudge-right="20">
                  <v-icon right light slot="activator">add</v-icon>
                  <v-list class="menu">
                    <v-list-item class="menu-item" @click="addEmbedSource">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>内置数据</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider class="menu-divider"></v-divider>
                    </v-list-item>
                    <v-list-item  v-if="!embed" class="menu-item" @click="addServerSideSource">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>接口数据</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
              <v-list>
                <v-list-item v-for="(s,index) in dataSources"
                             style="box-shadow: 2px 6px 12px 0 rgba(0,0,0,.15);border: solid 1px gainsboro;background-color: white;margin-bottom:-1px;"
                             :key="index" @click="switchSource(s)">
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-icon class="pink--text">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{s.name}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon dark>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs10 class="source_table">
            <componet v-if="sourceDisplay" :show-modal.sync="showModal" :is="sourceType" :source-info="source" :func-list="funcList" >
              <v-btn light @click.native="deleteSource" slot="deleteSource">删除数据源
                <v-icon right light>cloud_upload</v-icon>
              </v-btn>
            </componet>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>
<style>

</style>
<script>
  import AutoIncrementIndex from './AutoIncrementIndex'
  import EmbedSource from './Embed/EmbedSource.vue'
  import ServerSide from './ServerSide/ServerSide.vue'
  import store from '@/store';
  import { clone,message } from '@/utils';
  import { beanList } from "@/services/ServerSideSourceService"
  import  codeView from "@/views/common/codeView/src/codeView"

  export default{
    store,
    props:{
      embedOnly:false,
      codeViewEnable:{
          type:Boolean,
          default:false
      }
    },
    components: {
      EmbedSource, ServerSide,codeView
    },
    mixins: [AutoIncrementIndex],

    computed: {
      sourceType(){
        return [null, "embed-source", "server-side"][parseInt(this.source.type)]
      },
      usedIndex(){
        return this.dataSources.map(el => el.id).sort()
      }
    },
    //加载的时候调用service获取可用接口列表
    async mounted(){
      //加载时获取接口列表数据
      let resp = await beanList();
      if (resp.success) {
          console.log(resp)
        this.funcList = resp.data;
      }else {
        message.warning(`获取接口列表息出错,请检查.状态码:${resp.status}`)
      }
      this.dataSources = clone(this.$store.state.echarts.dataSet)
    },

    data(){
      return {
        embed:this.$route.params.embedOnly?this.$route.params.embedOnly:this.embedOnly,
        //数据源列表
        funcList:[],
        dataSources: [],
        dialogType: "mock-data",
        //目前编辑状态的数据源
        source: {
          id: 1,
          type: 1,
          name: "",
          description: "",
          columns: [{name: "", type: ""}],
          data: [[""]],
          dataItems: []
        },
        sourceDisplay: false,
        showModal:false,
        showCodeView:false
      }
    },
    methods: {
      /**
       * 新增一个mock数据源,并且设定source为mock数据源,打开编辑对话框
       * */
      addEmbedSource(){
        let row = {
          id: this.nextIndex,
          type: 1,
          name: "内置数据源" + this.nextIndex,
          description: "",
          columns: [{name: "列1", type: "string"}],
          data: [[""]],
          dataItems: []
        }
        this.dataSources.push(row)
        this.source = row;
      },
      /**
       * 新增一个serverSide数据源,并且设定source为mock数据源,打开编辑对话框
       * */
      addServerSideSource(){
        let row = {
          id: this.nextIndex, type: 2, name: "接口数据源" + this.nextIndex, description: "",
          di: {
            className:null,params: []
          }, columns: [], dataItems: []
        }
        this.dataSources.push(row)
        this.source = row;
      },
      /**
       * 更换当前显示数据源
       * */
      switchSource(source){
        this.source = source;
        this.sourceDisplay = true;
        this.showModal=true;
      },
      deleteSource(){
        this.dataSources = this.dataSources.filter(el => el !== this.source)
        this.sourceDisplay = false
      },
      saveDataSource(){
        this.$store.commit("saveDataSet", this.dataSources)
        this.$store.dispatch("updateSourceData", this.dataSources)
        message.success("保存成功")
      },
      showCode(){
        this.showCodeView = true
      }
    }
  }
</script>
