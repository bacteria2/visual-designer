<template>
  <div class="dataConfig">
    <mu-drawer :open="show" class="dc-drawer" @close="">
      <div class="dc-side-left">
        <h2 class="title"><span>数据源</span></h2>
        <el-button class="ds-select-btn" size="small" ref="dataSetConfig" @click = "dataSetConfig.open = true">
          {{curDataSet.name}}
        <i class="el-icon-arrow-down ds-select-icon"></i>
        </el-button>
        <mu-popover popoverClass="ds-select-pop" :open="dataSetConfig.open" :autoPosition="false" :trigger="dataSetConfig.trigger" :anchorOrigin="dataSetConfig.anchorOrigin" :targetOrigin="dataSetConfig.targetOrigin" @close="dataSetConfig.open = false">
          <mu-list class="ds-select-list">
            <mu-list-item title="数据集管理" @click="showDataSetConfig">
              <i class="el-icon-setting" slot="right"></i>
            </mu-list-item>
            <mu-divider/>
            <mu-list-item v-for="(ds,index) in dataSet" :key="ds.id" :title="ds.name" @click="dataSetSelectedHandle(index)" :class="ds.id == curDataSet.id ? 'ds-active':''"/>

          </mu-list>
        </mu-popover>
        <div class="dc-dataItem-area">
          <div class="head">
            <span>数据项</span>
          </div>
          <div class="dc-di-a-body">
            <ul class="dataItems-list">
              <li class="dataItem" v-for="item in dataItems" :key="item.key" @dragover="dragOver" @dragstart="dataItemDrag">
                  <div draggable="true" :id="item.key">
                  <i class="material-icons icon  mini">dns</i>
                  <span class="dataItem-title">{{item.alias}}</span>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="dc-side-main">
        <h2 class="title"><span>组件数据绑定</span></h2>
        <div class="dc-dimension-body">
          <div class="dc-dimension-box" v-for="dim in dimensions" :key="dim.id">
                <div class="title">{{dim.label}}</div>
                <div class="receiveBox" @drop = "receivedDataItem($event,dim.id)" @dragover="dragOver">
                  <div class="reced-dataitem" v-if="dim.dataItem">
                    <i class="material-icons icon  mini">dns</i>
                    <span class="dataItem-title">{{dim.dataItem.alias}}</span>
                  </div>
                </div>
                <ul>
                  <!--<li>{{dim.measured?'度量':'维度'}}</li>-->
                  <li v-if="dim.required && !dim.dataItem" class="required">必填</li>
                </ul>
          </div>
        </div>
      </div>
      <div class="dc-side-right">
        <h2 class="title">
          <span>序列配置</span>
          <i class="material-icons icon icon--dark title-btn" @click="togetherSeriesSetting">transform</i>
        </h2>
        <div v-show="!seriesNameSetting">
        <div class="dc-series-toolbar">
                <el-button class="ds-select-btn" size="small" ref="seriesAddBox" @click = "seriesConfig.open = true">
                  添加序列
                <i class="el-icon-arrow-down ds-select-icon"></i>
                </el-button>
                <mu-popover popoverClass="ds-series-pop"
                            :open="seriesConfig.open"
                            :autoPosition="false"
                            :trigger="seriesConfig.trigger"
                            :anchorOrigin="seriesConfig.anchorOrigin"
                            :targetOrigin="seriesConfig.targetOrigin"
                            @close="seriesConfig.open = false">
                  <mu-list class="ds-select-list">
                  <mu-list-item v-for="type in seriesType" :key="type.name" @click="addSeries(type.name)" :title="type.name"/>
                  </mu-list>
                </mu-popover>
        </div>
        <div class="dc-series-body">
          <mu-list class="ds-select-list">
           <!-- <mu-sub-header>默认序列</mu-sub-header>
            <mu-list-item v-for="(obj,index) in defaultSeries" :key="index" :title="obj.name" :describeText="'类型:'+obj.type">
              <i class="material-icons icon icon&#45;&#45;dark mini" slot="leftAvatar">list</i>
            </mu-list-item>
            <mu-divider/>-->
            <mu-sub-header>序列</mu-sub-header>
            <mu-list-item v-for="(obj,index) in series" :key="index"  :title="obj.name" :describeText="'类型:'+obj.type" :disabled="true">
              <i class="material-icons icon icon--dark mini" slot="leftAvatar">list</i>
              <el-tooltip content="删除" placement="right" effect="light" slot="right">
              <i class="material-icons icon icon--dark mini series-del-btn" @click="deleteSeries(index)">close</i>
              </el-tooltip>
            </mu-list-item>
          </mu-list>
        </div>
        </div>
        <div v-show="seriesNameSetting">
          <div class="dc-series-toolbar">
            <div class="dc-switch">
            <el-switch v-model="configResult.legendIsSeriesName" on-text="" off-text="">
            </el-switch>
            <span>图例与序列名一致</span>
            </div>
          </div>
          <div class="dc-series-body">
            <div class="head">
              <span>序列重命名</span>
              <i class="material-icons icon icon--dark title-btn" @click="seriesRenameSave">save</i>
            </div>
            <div class="dc-rename-box" v-for="(s,index) in series" :key="s.name">
              <div class="title">{{`序列${index+1}`}}</div>
              <el-input v-model.lazy="configResult.reSeriesName[index]" class="name-input"></el-input>
            </div>
          </div>
        </div>
        </div>
    </mu-drawer>
  </div>
</template>
<script>
  import {message} from '@/utils'
  import store from "@/store"
  import debounce from 'lodash/debounce'
  import {mergeDataAndRefreshShow} from './widgetDataUtil'
  import {Loading} from 'element-ui';

  export default{
    props:{
      show:Boolean,
      seriesType:{
        type:Array,
      }
    },
    mounted(){
      console.log("doMounted",this.$store.getters.getDataSet,this.dataSet)
      this.dataSetConfig.trigger = this.$refs.dataSetConfig.$el;
      this.seriesConfig.trigger = this.$refs.seriesAddBox.$el;
      store.commit('addDemensionIds'); //为维度定义增加id用于设置值
    if(this.dataSet[0]){
          this.curDataSet = Object.assign({},this.dataSet[0])
      }
    },
    watch:{
      curDataSet(val){
          let dataSetType = val.type,dataItem = val.dataItems;
        if(dataSetType == 1){//内置数据集
          let datasetID = val.id;
          this.dataItems = dataItem.map((d)=>{
            let key = d.type == 2?datasetID+'-'+d.id:datasetID+'-'+d.id+'-gen'
            return {name:d.name,alias:d.alias,key:key}
          })
        }else if(dataSetType == 2){
          this.dataItems = dataItem.map((d)=>{
          return {name:d.name,alias:d.alias,key:d.name}})
        }
      },
      seriesItemHandlerState(val){
          if(val){
            if(!this.loadingInstance){
                this.loadingInstance = Loading.service({ fullscreen: true,lock:true,text:'正在处理序列'});
            }
          }else{
              if(this.loadingInstance){
                this.loadingInstance.close();
              }
          }
      }
    },
    computed:{
      dataSet(){
        return store.getters.getDataSet;
      },
      /*defaultSeries(){
        return this.series.filter((s)=>{return s.baseSeries})
      },
      customSeries(){
        return this.series.filter((s)=>{return !s.baseSeries})
      },*/
      defaultSeriesSize(){
        return this.defaultSeries.length
      },
      dimensions(){
        return store.getters.getDemension
      },
      series(){
        return store.getters.getSeries
      },
     /* seriesItemHandlerState(){
          return store.getters.getSeriesItemHandlerState
      }*/
    },

    data(){
      return {
        dataSetConfig:{
          open:false,
          trigger:null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          targetOrigin: {
            vertical: 'top',
            horizontal: 'left'
          }
        },
        seriesConfig:{
          open:false,
          trigger:null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          targetOrigin: {
            vertical: 'top',
            horizontal: 'left'
          }
        },
        dataItems:[],
        curDataSet:{},
        seriesNameSetting:false,
        configResult:{'legendIsSeriesName':false,reSeriesName:[]},
        loadingInstance:null,
        seriesItemHandlerState:false
      }
    },
    methods: {
      close(){
          this.$emit('close')
      },
      save(){

      },
      showDataSetConfig(){
          this.$emit('showDataSetConfig')
      },
      dataSetSelectedHandle(index){
          this.dataSetConfig.open = false;
          this.curDataSet = this.dataSet[index]
      },
      addSeries(type){
        this.seriesConfig.open = false
        store.commit("addSerial",{type});
        this.$emit("seriesChanged");
        this.$store.dispatch("refreshChartAsync")
      },
      deleteSeries(index){
        this.seriesItemHandlerState = true
        let realIndex = index;
        this.$store.commit("delSerial",{realIndex});
        this.$emit("seriesChanged");
        this.seriesItemHandlerState = false
        this.$store.dispatch("refreshChartAsync")
        //mergeDataAndRefreshShow()
      },
      dataItemDrag(ev){
        let key = ev.target.id;
        ev.dataTransfer.effectAllowed = "copy";
        ev.toElement.style.color = "#fff"
        ev.toElement.style.paddingLeft = "10px"
        ev.toElement.style.background="#629eb3";
        ev.toElement.style.borderRadius="4px";
        ev.toElement.style.borderWidth="1px";
        ev.toElement.style.borderStyle="dashed";
        ev.target.style.width = "136px";
        ev.dataTransfer.clearData();
        ev.dataTransfer.setData("text",key);
        return true
      },
      dragOver(e){
        e.preventDefault();
        e.target.style = null
      },
      receivedDataItem(ev,key){
        ev.preventDefault();
        let dimKey = ev.dataTransfer.getData("text"),
          dimDataItem = this.dataItems.filter((item)=>{
            return item.key == dimKey
          })
        this.updataDimDataItem(key,dimDataItem[0])
        mergeDataAndRefreshShow()
      },
      updataDimDataItem(key,value){
        store.dispatch('updateDemension',{key,value});
      },
      togetherSeriesSetting(){
        this.seriesNameSetting = !this.seriesNameSetting
        this.configResult.reSeriesName = this.series.map((s)=>{
            return s.name
        })
      },
      seriesRenameSave(){
        store.dispatch('seriesRenameSaveHandler',{config:this.configResult});
        mergeDataAndRefreshShow()
      },
      updateCurDataSet(){
          let curDataSetID = this.curDataSet.id;
          if(curDataSetID){
            let curDs = this.dataSet.filter(ds=>{return ds.id = curDataSetID});
            if(curDs && curDs[0]){
                this.curDataSet = curDs[0]
            }else{//没找到
              this.curDataSet = this.dataSet[0]
            }
          }
      }
    }
  }
</script>

