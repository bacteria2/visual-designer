<template>
  <v-card class="card server_side">
    <!--工作区工具栏-->
    <v-toolbar class="white--text" light>
      <v-toolbar-title>{{sourceInfo.name}}
        <v-btn light @click.native="loadPreviewData">Load Preview
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <v-btn light @click.native="open">数据源配置
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <v-btn light @click.native="showDimensionInfo=true">维度配置
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <slot name="deleteSource"></slot>
      </v-toolbar-title>
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
      <v-btn slot="actions" primary @click.native="nextStep" light>{{stepper == 3 ? '保存' : '下一步'}}</v-btn>
    </mu-dialog>

    <!--维度列表-->
    <mu-dialog :open="showDimensionInfo" title="维度配置" dialogClass="data-definition-dimension">
      <div>
        <v-btn @click.native="addServerSideDimension">新增</v-btn>
      </div>
      <div style="height: calc(100% - 48px)" id="dimension-table">
        <el-table :data="sourceInfo.dataItems" stripe :max-height="dimensionHeight"
                  :style="{'max-height': dimensionHeight+'px!important'}">
          <el-table-column prop="name" label="维度名"></el-table-column>
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
      <v-btn slot="actions" primary @click.native="showDimensionInfo=false" style="color: white">关闭</v-btn>
    </mu-dialog>

    <!--纬度编辑框-->
    <mu-dialog :open="showDimensionEdit" :title="singleDimension.name" dialogClass="data-definition-column">
      <v-text-field v-model="singleDimension.alias" label="别名"></v-text-field>

      <v-btn slot="actions" primary @click.native="addServerSideDimension">添加新维度</v-btn>
      <v-btn slot="actions" primary @click.native="showDimensionEdit=false" style="color: white">关闭</v-btn>
    </mu-dialog>
  </v-card>
</template>
<style>

</style>
<script>
  import {message} from "@/utils"
  import sourceCommon from '../SourceCommon'
  import dimension  from '../Dimension'
  import { getColumn, previewData} from "@/services/ServerSideSourceService"

  export default{
    name: "serverSide",
    mixins: [sourceCommon, dimension],
    props:{
      funcList:{type:Array,default(){return []}},
    },
    computed: {
      //预览数据表头, text:列别名,value:列名
      headers(){
        console.log("headers",this.sourceInfo)
        return this.sourceInfo.columns.map(el => ({
          text: el.alias,
          value: el.column,
          selected: false,
          left: true,
          sortable: false,
        }))
      }
    },
    watch: {
      async selectedBean(val){
        //selectedBean有变动时候,更新sourceInfo内的Columns和di
        if (val) {
          let className = val.className
          let colListResp = await getColumn({className});
          console.log("selectedBean",colListResp)
          if (colListResp.success) {
            this.sourceInfo.columns = colListResp.data;
            this.sourceInfo.di = {
              className: val.className,
              funName: val.name,
              params: val.params
            }
            console.log('sourceInfo',this.sourceInfo)
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

        let generatedItem = this.headers.filter(el => el.selected).map(el => {
            let item = {
              "name": "接口维度" + this.nextIndex,
              "alias": el.text,
              "type": 0,
              "columnName": el.value
            }
            this.updateIndex();
            return item;
          }
        );
        this.sourceInfo.dataItems = [...generatedItem, ...customItem];

      }
    }
  }
</script>
