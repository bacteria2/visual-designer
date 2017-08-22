<template>
  <div class="card server_side">
    <n-tool-bar class="st-toolbar" :title="sourceInfo.name">
      <mu-flat-button @click="open" color="#fff">
        <mu-icon value="build"></mu-icon> 数据源配置
      </mu-flat-button>
      <mu-flat-button @click="showDimensionInfo=true" color="#fff">
        <mu-icon value="settings"></mu-icon>
        数据项配置
      </mu-flat-button>
      <slot name="deleteSource"></slot>
    </n-tool-bar>
    <!--预览数据-->
    <div class="table_wrapper" style="color: black">
      <mu-table style="height: 100%;overflow-y:auto"
                fixedHeader
                :enableSelectAll="false" :selectable="false" :showCheckbox="false">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th v-for="header,index in headers" :key="header.text+index">
              <mu-checkbox :label="header.text" v-model="header.selected" @change="columnSelect"></mu-checkbox>
            </mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,itemIndex in previewData"  :key="item+itemIndex">
            <mu-td v-for="col,colIndex in sourceInfo.columns" :key="col+colIndex">{{item[colIndex]}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <!--数据源编辑-->
    <mu-dialog :open="showSourceInfo" title="数据源编辑" dialogClass="data-definition-dimension">
      <mu-stepper :activeStep="stepper" :linear="false">
        <mu-step>
          <mu-step-button @click="stepper=0">
            接口选择
          </mu-step-button>
        </mu-step>
        <mu-step>
          <mu-step-button @click="stepper=1">
            填写参数
          </mu-step-button>
        </mu-step>
        <mu-step>
          <mu-step-button @click="stepper=2">
            完成添加
          </mu-step-button>
        </mu-step>
      </mu-stepper>
      <div style="height: 100%;">
        <div v-if="stepper==0">

          <el-select v-model="selectedBean" placeholder="选择数据接口" filterable style="margin: 10px 0;width: 100%"
                     value-key="id" :filter-method="filterFuncs">
            <el-option
              v-for="(func,index) in funcList2"
              :key="func.id"
              :label="`${func.beanName}.${func.cnname}`"
              :value="func">
              <span style="float: left">{{ func.beanName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px" :title="func.cnname">{{func.name}}</span>
            </el-option>
          </el-select>
<!--
          <mu-select-field labelFloat v-model="selectedBean" label="接口bean" :maxHeight="500"
                           style="width: 100%">
            <mu-menu-item v-for="func,index in funcList" :key="index" :title="func.beanName" :value="func">
                    <span slot="after"  style="color: #ada9af;font-size: 12px">
                      class:{{ (function (text) {return text.substring(text.lastIndexOf('.') + 1)})(func.className)}}
                    </span>
            </mu-menu-item>
          </mu-select-field>-->

          <mu-text-field v-model="sourceInfo.description" labelFloat fullWidth label="数据源描述"></mu-text-field>
        </div>
        <div v-if="stepper==1" style="height: 100%;">
           <el-row v-for="param,index in selectedBean.params" :key="index" :gutter="20">
             <el-col :span="3">{{param.name}}</el-col>
             <el-col :span="9">
               <mu-text-field v-if="param.type === 'String'" v-model="param.value" :label="param.name" labelFloat fullWidth
                             style="width: 100%;"></mu-text-field>
               <mu-text-field v-else-if="param.type === 'Integer'" v-model="param.value" type="number" labelFloat fullWidth
                             :label="param.name" style="width: 100%;"></mu-text-field>
               <mu-text-field v-else-if="param.type === 'Float'" v-model="param.value" :label="param.name" labelFloat fullWidth
                             style="width: 100%;"></mu-text-field>
               <mu-date-picker v-else-if="param.type === 'Date'" v-model="param.value" :hintText="param.name"
                               format="yyyy-MM-dd" style="width: 100%;"></mu-date-picker>
               <mu-time-picker v-else-if="param.type === 'Timestamp'" v-model="param.value" :hintText="param.name"
                               format="24hr" style="width: 100%;"></mu-time-picker>
             </el-col>
           </el-row>
        </div>
        <div v-if="stepper==2">
          <h4>完成数据源添加</h4>
          <mu-checkbox label="是否自动加载预览数据?" v-model="isPreviewLoad" ></mu-checkbox>
        </div>
      </div>
      <div slot="actions">
        <mu-flat-button @click="showSourceInfo = false">退出</mu-flat-button>
        <mu-raised-button primary @click="nextStep">{{stepper == 2 ? '保存' : '下一步'}}</mu-raised-button>
      </div>
    </mu-dialog>

    <!--维度列表-->
    <mu-dialog :open="showDimensionInfo" title="数据项配置" dialogClass="data-definition-dimension">
     <div style="margin-bottom: 15px">
        <mu-raised-button @click="addServerSideDimension">新增</mu-raised-button>
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
  </div>
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
            return this.sourceInfo.dataItems.filter(el=>el.type===0).map(item=>{
                return item.id
            })
      }
    },
    watch: {
      async selectedBean(val){
        if (val) {
          let colListResp = await getColumn(val);
          if (colListResp.success) {
            this.sourceInfo.columns = colListResp.data;
            this.sourceInfo.di = {
              className: val.className,
              classCNName:val.beanName,
              funName: val.name,
              funCNName:val.cnname,
              params: val.params
            }
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
        funcList2:this.funcList,
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
        if (this.stepper < 2)
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
      },
      filterFuncs (val) {
        if(val.trim()==""){this.funcList2 = this.funcList}else{
          let Regx = /^[A-Za-z0-9]+/;
          if (Regx.test(val)) {
            this.funcList2 = this.funcList.filter(func =>func.name.indexOf(val) !== -1)
          }
        }
      },
    }
  }
</script>
