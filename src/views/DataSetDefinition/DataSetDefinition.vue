<template>
  <div class="full-height data-definition">
  <code-view :show.sync="showCodeView" v-if="codeViewEnable"></code-view>
    <n-tool-bar title="数据源管理">
      <toolbar-button @click.native="saveDataSource" icon="save" title="暂存"></toolbar-button>
      <toolbar-button @click.native="showCode" icon="code" title="代码"></toolbar-button>
      <toolbar-button @click.native="exit" icon="clear" title="退出"></toolbar-button>
    </n-tool-bar>

    <main class="main-container">
      <div class="layout">
        <div class="source_menu">
          <mu-card>
            <mu-card-media>
              <nav style="display: flex;justify-content: space-between;background: linear-gradient(rgb(173, 175, 179), rgb(152, 156, 159));height: 64px;align-items: center">
                <div style="color:#fff;font-family: Roboto,Lato,sans-serif;line-height: 48px;width: 80px;text-align: center;font-size: 20px">数据源</div>
                <div>
                  <mu-icon-menu icon="add" >
                    <mu-menu-item title="内置数据" @click="addEmbedSource"/>
                    <mu-menu-item title="接口数据" @click="addServerSideSource" />
                  </mu-icon-menu>
                </div>
              </nav>
            </mu-card-media>
            <mu-list>
              <template v-for="(s,index) in dataSources" class="dataSet-item">
                <mu-list-item :title="s.name" :describeText="s.description" @click="switchSource(s)"></mu-list-item>
                <mu-divider v-if="index<dataSources.length-1"/>
              </template>
            </mu-list>
          </mu-card>
        </div>
        <div class="source_table">
          <componet v-if="sourceDisplay" :show-modal.sync="showModal" :is="sourceType" :source-info="source" :func-list="funcList">
            <mu-flat-button  @click="deleteSource" slot="deleteSource" color="#fff" class="btn">
              <mu-icon value="delete"></mu-icon>
              删除数据源
            </mu-flat-button>
          </componet>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  import AutoIncrementIndex from './AutoIncrementIndex'
  import EmbedSource from './Embed/EmbedSource.vue'
  import ServerSide from './ServerSide/ServerSide.vue'
  import store from '@/store';
  import { clone,message } from '@/utils';
  import { beanList } from "@/services/ServerSideSourceService"
  import  codeView from "@/views/common/codeView.vue"


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
        this.funcList = resp.data;
      }else {
        message.warning(`获取接口列表息出错,请检查.状态码:${resp.status}`)
      }
      this.dataSources = clone(this.$store.state.echarts.dataSet)
    },

    data(){
      return {
        //embed:this.$route.params.embedOnly?this.$route.params.embedOnly:this.embedOnly,
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
        this.showModal=false;
      },
      deleteSource(){
        this.dataSources = this.dataSources.filter(el => el !== this.source)
        this.sourceDisplay = false
      },
      saveDataSource(){
        this.$store.commit("saveDataSet", this.dataSources)
        this.$store.dispatch("updateSourceData")
        message.success("暂存成功")
      },
      showCode(){
        this.showCodeView = true
      },
      exit(){
          this.$emit('exit')
      }
    }
  }
</script>
