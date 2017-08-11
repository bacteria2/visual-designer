<template>
  <v-card class="card server_side">
    <!--工作区工具栏-->
    <v-toolbar class="st-toolbar">
      <v-toolbar-title>{{sourceInfo.name}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click.native="open">
          <v-icon>build</v-icon>
        数据源配置
      </v-btn>
      <v-btn flat @click.native="showDimensionInfo=true">
        <v-icon>settings</v-icon>
        数据项配置
      </v-btn>
      <!--<v-btn flat @click.native="loadPreviewData">
        <v-icon>pageview</v-icon>
        浏览数据
     </v-btn>-->
      <slot name="deleteSource"></slot>
    </v-toolbar>
    <!--预览数据-->
    <div class="table_wrapper" style="color: black">
      <v-data-table
        :headers="headers"
        :items="previewData"
        hide-actions style="height: 100%;overflow-y:auto">
        <template slot="headers" scope="headers">
          <mu-checkbox :label="headers.item.text" v-model="headers.item.selected" @change="columnSelect"></mu-checkbox>
        </template>
        <template slot="items" scope="props">
          <td v-for="col,index in sourceInfo.columns">{{ props.item[index]}}</td>
        </template>
      </v-data-table>
    </div>
    <!--数据源编辑-->
    <mu-dialog :open="showSourceInfo" title="数据源编辑" dialogClass="data-definition-dimension">
      <v-stepper non-linear v-model="stepper" style="height:100%;background: #f2f7f9;border: solid 1px #b5bbbb;">
        <v-stepper-header>
          <v-stepper-step :step="1" :complete="stepper > 1" editable>接口选择</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="2" :complete="stepper > 2" editable>填写参数</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="3" :complete="stepper > 3" editable>完成添加</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1" style="height: calc(100% - 72px)">
          <v-container fluid>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <mu-select-field labelFloat v-model="selectedBean" label="接口bean" :maxHeight="500"
                                 style="width: 100%">
                  <mu-menu-item v-for="func,index in funcList" :key="index" :title="func.beanName" :value="func">
                    <span slot="after"  style="color: #ada9af;font-size: 12px">
                      class:{{ (function (text) {return text.substring(text.lastIndexOf('.') + 1)})(func.className)}}
                    </span>
                  </mu-menu-item>
                </mu-select-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-text-field v-model="sourceInfo.description" label="数据源描述"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="2" style="position: relative;background: transparent;height: calc(100% - 72px)" class="bean_params">
          <v-container fluid>
            <v-layout row v-for="param,index in selectedBean.params" :key="index">
              <v-flex xs3 style="margin-top:auto;margin-bottom: auto;text-align: center ">
                {{param.name}}
              </v-flex>
              <v-flex xs8>
                <v-text-field v-if="param.type === 'String'" v-model="param.value" :label="param.name"
                              style="width: 100%;"></v-text-field>
                <v-text-field v-else-if="param.type === 'Integer'" v-model="param.value" type="number"
                              :label="param.name" style="width: 100%;"></v-text-field>
                <v-text-field v-else-if="param.type === 'Float'" v-model="param.value" :label="param.name"
                              style="width: 100%;"></v-text-field>
                <mu-date-picker v-else-if="param.type === 'Date'" v-model="param.value" :hintText="param.name"
                                format="yyyy-MM-dd" style="width: 100%;"></mu-date-picker>
                <mu-time-picker v-else-if="param.type === 'Timestamp'" v-model="param.value" :hintText="param.name"
                                format="24hr" style="width: 100%;"></mu-time-picker>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-container fluid>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-card class="z-depth-1 mb-5">
                  <i class="c-icon c-success"></i>已经完成数据源添加
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-checkbox label="是否自动加载预览数据?" v-model="isPreviewLoad" dark></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
      </v-stepper>
      <div slot="actions">
        <v-btn flat @click.native="showSourceInfo = false">退出</v-btn>
        <v-btn primary @click.native="nextStep" light>{{stepper == 3 ? '保存' : '下一步'}}</v-btn>
      </div>
    </mu-dialog>

    <!--维度列表-->
    <mu-dialog :open="showDimensionInfo" title="数据项配置" dialogClass="data-definition-dimension">
     <div>
        <v-btn @click.native="addServerSideDimension">新增</v-btn>
      </div>
      <div style="height: calc(100% - 48px)" id="dimension-table">
        <el-table :data="sourceInfo.dataItems" stripe :max-height="dimensionHeight"
                  :style="{'max-height': dimensionHeight+'px!important'}">
          <el-table-column prop="name" label="数据项"></el-table-column>
          <el-table-column prop="alias" label="别名"></el-table-column>
          <el-table-column prop="columnName" label="列名"></el-table-column>
          <el-table-column label="控制" :width="160">
            <template scope="scope">
              <el-button size="small" type="info" @click="dimensionEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" v-if="scope.row.type!=0" type="danger"
                         @click="dimensionDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button slot="actions" type="primary" @click="showDimensionInfo = false" style="margin-right:20px">关闭</el-button>
    </mu-dialog>

    <!--纬度编辑框-->
    <mu-dialog :open="showDimensionEdit" :title="singleDimension.name" dialogClass="data-definition-column">
      <data-define :dataItem="singleDimension" :columns="sourceInfo.columns" ref="dataDefine" @updateDataItem="updateDataItemHandler"></data-define>
      <el-button slot="actions" @click="showDimensionEdit=false" style="margin-right: 12px">取消</el-button>
      <el-button slot="actions" type="primary" @click="syncDataItemAndExit" style="margin-right: 20px">确定</el-button>
    </mu-dialog>
  </v-card>
</template>
<script>
  import {message} from "@/utils"
  import sourceCommon from '../SourceCommon'
  import dimension  from '../Dimension'
  import dataDefine from './DataItemDefinition'
  import { getColumn, previewData} from "@/services/ServerSideSourceService"

  export default{
    name: "serverSide",
    mixins: [sourceCommon, dimension],
    components:{dataDefine},
    props:{
      funcList:{type:Array,default(){return []}},
    },
    mounted(){
        this.loadSelectBeanFromDI();
        if(this.selectedBean.className && this.selectedBean.name){
          this.loadPreviewData();
        }
    },
    computed: {
      //预览数据表头, text:列别名,value:列名
      headers(){
        //console.log("headers",this.sourceInfo)
        return this.sourceInfo.columns.map((el,index) => ({
          text: el.alias,
          value: el.column,
          selected: this.selectedColumns ? this.selectedColumns.includes(index):false,
          left: true,
          sortable: false,
        }))
      },
      usedIndex(){
        return  this.sourceInfo.dataItems.filter(el=>el.type!==0).map(el=>el.id).sort()
      },
      selectedColumns(){
            return this.sourceInfo.dataItems.map(item=>{
                return item.id
            })
      }
    },
    watch: {
      async selectedBean(val){
        //selectedBean有变动时候,更新sourceInfo内的Columns和di
        console.log("val",val);
        if (val) {

          let colListResp = await getColumn(val);
          //console.log("selectedBean",colListResp)
          if (colListResp.success) {
            this.sourceInfo.columns = colListResp.data;
            this.sourceInfo.di = {
              className: val.className,
              funName: val.name,
              params: val.params
            }
            //console.log('sourceInfo',this.sourceInfo)
          }else{
            message.warning(`获取可用列信息出错,请检查.状态码:${colListResp.status}`)
          }
        }
      }
    },
    data(){
      return {
        isPreviewLoad:true,
        previewData: [],
        selectedBean: {
          "className": "",
          "name": "",
          "cnname": "",
          "params": []
        },
       // funList: [],
      }
    },
    methods: {
      async loadPreviewData(){
        if(this.selectedBean.className){
          let previewResp = await previewData(this.sourceInfo.di);
          if (previewResp.success) {
            this.previewData = previewResp.data
          }
          else {
            message.warning(`获取预览数据出错,请检查.接口:${this.selectedBean.className},状态码:${previewResp.status}`)
          }
        }else {
          message.warning(`接口名不存在,请检查数据或者网络 className:\"${this.selectedBean.className}\"`)
        }
      },
      nextStep(){
        if (this.stepper < 3)
          this.stepper += 1
        else {
          //关闭之前加载表格,勾选自动加载列表则读取接口数据
          if(this.isPreviewLoad)
            this.loadPreviewData();
          this.close()
        }
      },
      /**
       * 列头checkbox选择时触发,从computed计算的headers内获取selected=true的列,生成维度
       * */
      columnSelect(){
        //用户自定义的列
        let customItem = this.sourceInfo.dataItems.filter(el => el.type !== 0);
        let generatedItem = [];
        this.headers.filter(el => el.selected).forEach((el,index)=> {
            let item = {
              "name": `接口维度${index}`,
              "alias": el.text,
              "type": 0,
              "columnName": el.value,
              id:index
            };
          //  this.updateIndex();
            generatedItem.push(item) ;
          }
        );
        this.sourceInfo.dataItems = [...generatedItem, ...customItem];

      },
      loadSelectBeanFromDI(){
          let di = this.sourceInfo.di
          if(di && di.className && di.funName){
           let selectedBean = this.funcList.filter(fun=>{
                return (fun.className == di.className && fun.name == di.funName)
            })
            if(selectedBean.length > 0){
               this.$set(this.$data,'selectedBean',selectedBean[0])
            }
          }
      },
      syncDataItemAndExit(){
          this.$refs.dataDefine.submit()
          this.showDimensionEdit=false
      },
      updateDataItemHandler(dataItem){
        this.singleDimension = dataItem;
        this.sourceInfo.dataItems[this.editCustomDataItemIndex] = dataItem;
      }
    }
  }
</script>
