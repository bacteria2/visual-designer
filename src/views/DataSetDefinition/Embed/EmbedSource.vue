<template>
  <div class="card embed-source">
    <n-tool-bar class="st-toolbar" :title="sourceInfo.name">
      <mu-flat-button @click="open" color="#fff" class="btn">
        <mu-icon value="build"></mu-icon>数据源编辑
      </mu-flat-button>
      <mu-flat-button @click="showDimensionInfo=true" color="#fff" class="btn">
        <mu-icon value="settings"></mu-icon>
        数据项配置
      </mu-flat-button>
      <slot name="deleteSource"></slot>
    </n-tool-bar>

    <div class="table_wrapper">
      <data-table :rows="sourceInfo.data" :columns="tableColumns"></data-table>
    </div>
    <mu-dialog :open="showSourceInfo" title="数据源新增" dialogClass="data-definition-dialog">
      <mu-stepper :activeStep="stepper" :linear="false">
        <mu-step>
          <mu-step-button @click="stepper=0">
            设置数据源基础属性
          </mu-step-button>
        </mu-step>
        <mu-step>
          <mu-step-button @click="stepper=1">
            数据列定义
          </mu-step-button>
        </mu-step>
        <mu-step>
          <mu-step-button @click="stepper=2">
            完成数据源添加
          </mu-step-button>
        </mu-step>
      </mu-stepper>
      <div style="height: 100%;">
        <div v-if="stepper==0">
          <mu-text-field v-model="sourceInfo.name" label="数据源名称" labelFloat fullWidth></mu-text-field>
          <mu-text-field v-model="sourceInfo.description" label="数据源描述" multi-line labelFloat fullWidth></mu-text-field>
        </div>
        <div v-if="stepper==1" style="height: 100%;">
          <div style="margin-bottom: 15px;">
            <mu-raised-button @click="addNewColumn">新增</mu-raised-button>
          </div>
          <div style="height: calc(100% - 48px)" id="columns-table">
            <el-table :data="sourceInfo.columns" stripe :max-height="columnTableHeight"
                      :style="{'max-height': columnTableHeight+'px!important'}">
              <el-table-column prop="name" label="列名"></el-table-column>
              <el-table-column prop="type" label="类别"></el-table-column>
              <el-table-column label="控制" :width="160">
                <template scope="scope">
                  <el-button size="small" type="info" @click="columnEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="columnDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="stepper==2">
          完成数据源添加
        </div>
      </div>
      <div slot="actions">
        <mu-flat-button @click="showSourceInfo = false">退出</mu-flat-button>
        <mu-raised-button  primary @click.native="nextStep">{{stepper == 2 ? '保存' : '下一步'}}</mu-raised-button>
      </div>

    </mu-dialog>

    <!--列编辑-->
    <mu-dialog :open="showColumnInfo" title="新增列" dialogClass="data-definition-column">
      <mu-text-field v-model="singleColumn.name" label="列名(英文)" labelFloat fullWidth></mu-text-field>
      <mu-select-field v-model="singleColumn.type" labelFloat label="列类型" style="width: 100%">
        <mu-menu-item value="number" title="number"></mu-menu-item>
        <mu-menu-item value="string" title="string"></mu-menu-item>
      </mu-select-field>
      <mu-raised-button slot="actions" primary @click="saveAndAdd()">新增新记录</mu-raised-button>
      <mu-raised-button slot="actions" primary @click="showColumnInfo=false" style="color: white">关闭</mu-raised-button>
    </mu-dialog>

    <!--维度编辑 自动生成:根据目前所有的列生成一一对应的维度，会覆盖目前已配置的数据-->
    <mu-dialog :open="showDimensionInfo" title="维度配置" dialogClass="data-definition-dimension">
      <div>
        <mu-raised-button @click="autoGen">自动生成</mu-raised-button>
        <mu-raised-button @click="addEmbedDimension">新增</mu-raised-button>
      </div>
      <br>
      <div style="height: calc(100% - 48px)" id="dimension-table">
        <el-table :data="sourceInfo.dataItems" stripe :max-height="dimensionHeight"
                  :style="{'max-height': dimensionHeight+'px!important'}">
          <el-table-column prop="name" label="维度名"></el-table-column>
          <el-table-column prop="alias" label="别名"></el-table-column>
          <el-table-column label="列名">
            <template scope="scope">
              {{muiltiRowName(scope)}}
            </template>
          </el-table-column>
          <el-table-column label="控制" :width="160">
            <template scope="scope">
              <el-button size="small" type="info" @click="dimensionEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="dimensionDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <mu-raised-button slot="actions" primary @click="showDimensionInfo=false" style="color: white">关闭</mu-raised-button>
    </mu-dialog>

    <mu-dialog :open="showDimensionEdit" :title="singleDimension.name" dialogClass="data-definition-column">
      <mu-text-field labelFloat fullWidth v-model="singleDimension.alias" label="别名"></mu-text-field>
      <mu-select-field :multiple="singleDimension.type==2" v-model="singleDimension.columnNames" labelFloat label="列"
                       style="width: 100%">
        <mu-menu-item v-for="col,index in sourceInfo.columns" :value="index" :title="'列名:'+col.name" :key="index">
          <span slot="after" style="color: gainsboro;font-size: 12px">rowIndex:{{index}}</span>
        </mu-menu-item>
      </mu-select-field>
      <mu-checkbox :disabled="singleDimension.type!=1" label="返回单值" v-model="singleDimension.toValue" class="demo-checkbox"></mu-checkbox>
      <mu-checkbox :disabled="singleDimension.type==1" label="转换为对象" v-model="singleDimension.transferToObject" class="demo-checkbox"></mu-checkbox>
      <mu-raised-button slot="actions" primary @click="addEmbedDimension">添加新维度</mu-raised-button>
      <mu-raised-button  slot="actions" primary @click="showDimensionEdit=false" style="color: white">关闭</mu-raised-button>
    </mu-dialog>
  </div>
</template>
<script>
  import debounce from 'lodash/debounce'
  import sourceCommon from '../SourceCommon'
  import Dimension from '../Dimension'
  import DataTable from '../../../components/DataTable/src/Table'
  import {message} from '@/utils'

  export default{
    components: {DataTable},
    name: "EmbedSource",
    mixins: [sourceCommon, Dimension],
    mounted(){
      window.addEventListener("resize", debounce(this.resize, 500))
    },
    updated(){
      this.resize();
    },
    computed: {
      tableColumns(){
        return this.sourceInfo.columns.map(el => el.name)
      },
      /**
       * 返回一个默认排序的列表
       * */
      usedIndex(){
        return  this.sourceInfo.dataItems.filter(el=>el.type===2).map(el=>el.id).sort()
      }
    },
    data(){
      return {
        columnTableHeight: 300,
        showColumnInfo: false,
        singleColumn: {name: "列1", type: "string"},
      }
    },
    methods: {
      muiltiRowName(scope){
        if (scope.row && Array.isArray(scope.row.columnNames))
          return scope.row.columnNames.map(el => this.sourceInfo.columns[el].name).join(",");
        return ""
      },
      resize(){
        let tableContainer = document.getElementById("columns-table");
        let dimensionContainer = document.getElementById("dimension-table");
        if (tableContainer && tableContainer.clientHeight)
          this.columnTableHeight = tableContainer.clientHeight - 10;
        if (dimensionContainer && dimensionContainer.clientHeight)
          this.dimensionHeight = dimensionContainer.clientHeight - 10;
      },
      saveAndAdd(){
        let row = {name: "列", type: "string"};
        //添加列头记录
        this.sourceInfo.columns.push(row);
        this.sourceInfo.data[0].push("");
        this.singleColumn = row;
      },
      addNewColumn(){
        this.saveAndAdd();
        this.showColumnInfo = true
      },
      columnEdit(index){
        this.singleColumn = this.sourceInfo.columns[index];
        this.showColumnInfo = true
      },
      columnDelete(index, el){
        if (this.sourceInfo.columns.length < 2) {
          message.warning("至少有一列数据")
          return;
        }
        //没有被引用
        let rel=this.sourceInfo.dataItems.filter(dataItem=>dataItem.columnNames.indexOf(index)!==-1);
        if(rel.length===0){
          //删除这一列的记录
          this.sourceInfo.columns.splice(index, 1)
          //删除这一列的数据
          this.sourceInfo.data.forEach(el => el.splice(index, 1))
        }else {
          message.warning("数据被维度引用")
        }
      },
      autoGen(){
        this.sourceInfo.dataItems = this.dimensionGenerated(this.sourceInfo.columns)
      },
      nextStep(){
        if (this.stepper < 2)
          this.stepper += 1
        else {
          //关闭之前加载表格
          this.close()
        }
      },
    }
  }
</script>
