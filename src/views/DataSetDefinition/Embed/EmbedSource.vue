<template>
  <v-card class="card embed-source">
    <v-toolbar class="white--text" light>
      <v-toolbar-title>{{sourceInfo.name}}
        <v-btn light @click.native="open">数据源编辑
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <v-btn light @click.native="showDimensionInfo=true">维度配置
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <slot name="deleteSource"></slot>
      </v-toolbar-title>
    </v-toolbar>
    <div class="table_wrapper">
      <data-table :rows="sourceInfo.data" :columns="tableColumns"></data-table>
    </div>
    <mu-dialog :open="showSourceInfo" title="数据源新增" dialogClass="data-definition-dialog">
      <v-stepper non-linear v-model="stepper" style="height:100%;background: #f2f7f9;border: solid 1px #b5bbbb;">
        <v-stepper-header>
          <v-stepper-step :step="1" :complete="stepper > 1" editable>设置数据源基础属性</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="2" :complete="stepper > 2" editable>数据列定义</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="3" :complete="stepper > 3" editable>完成数据源添加</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1" style="height: calc(100% - 72px)">
          <v-container fluid>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-text-field v-model="sourceInfo.name" label="数据源名称"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-text-field dark v-model="sourceInfo.description" label="数据源描述" multi-line></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="2" style="position: relative;background: transparent;height: calc(100% - 72px)">
          <div>
            <v-btn @click.native="addNewColumn">新增</v-btn>
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
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="z-depth-1 mb-5">
            完成数据源添加
          </v-card>
        </v-stepper-content>
      </v-stepper>
      <v-btn slot="actions" primary @click.native="nextStep" light>{{stepper == 3 ? '保存' : '下一步'}}</v-btn>
    </mu-dialog>

    <!--列编辑-->
    <mu-dialog :open="showColumnInfo" title="新增列" dialogClass="data-definition-column">
      <v-text-field v-model="singleColumn.name" label="列名(英文)"></v-text-field>
      <mu-select-field v-model="singleColumn.type" labelFloat label="列类型" style="width: 100%">
        <mu-menu-item value="number" title="number"></mu-menu-item>
        <mu-menu-item value="string" title="string"></mu-menu-item>
      </mu-select-field>
      <v-btn slot="actions" primary @click.native="saveAndAdd()">新增新记录</v-btn>
      <v-btn slot="actions" primary @click.native="showColumnInfo=false" style="color: white">关闭</v-btn>
    </mu-dialog>

    <!--维度编辑 自动生成:根据目前所有的列生成一一对应的维度，会覆盖目前已配置的数据-->
    <mu-dialog :open="showDimensionInfo" title="维度配置" dialogClass="data-definition-dimension">
      <div>
        <v-btn @click.native="autoGen">自动生成</v-btn>
        <v-btn @click.native="addEmbedDimension">新增</v-btn>
      </div>
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
      <v-btn slot="actions" primary @click.native="showDimensionInfo=false" style="color: white">关闭</v-btn>
    </mu-dialog>

    <mu-dialog :open="showDimensionEdit" :title="singleDimension.name" dialogClass="data-definition-column">
      <v-text-field v-model="singleDimension.alias" label="别名"></v-text-field>
      <mu-select-field :multiple="singleDimension.type==2" v-model="singleDimension.columnNames" labelFloat label="列"
                       style="width: 100%">
        <mu-menu-item v-for="col,index in sourceInfo.columns" :value="index" :title="'列名:'+col.name" :key="index">
          <span slot="after" style="color: gainsboro;font-size: 12px">rowIndex:{{index}}</span>
        </mu-menu-item>
      </mu-select-field>
      <mu-checkbox :disabled="singleDimension.type==1" label="转换为对象" v-model="singleDimension.transferToObject" class="demo-checkbox"></mu-checkbox>
      <v-btn slot="actions" primary @click.native="addEmbedDimension">添加新维度</v-btn>
      <v-btn slot="actions" primary @click.native="showDimensionEdit=false" style="color: white">关闭</v-btn>
    </mu-dialog>
  </v-card>
</template>
<script>
  import debounce from 'lodash/debounce'
  import sourceCommon from '../SourceCommon'
  import Dimension from '../Dimension'
  import DataTable from '../../../components/DataTable/src/Table'

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
    },
    data(){
      return {
        columnTableHeight: 300,
     /*   dimensionHeight: 300,*/
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
          alert("至少有一列数据")
          return;
        }
        //删除这一列的记录
        this.sourceInfo.columns.splice(index, 1)
        //删除这一列的数据
        this.sourceInfo.data.forEach(el => el.splice(index, 1))
      },
      autoGen(){
        this.sourceInfo.dataItems = this.dimensionGenerated(this.sourceInfo.columns)
      },
      nextStep(){
        if (this.stepper < 3)
          this.stepper += 1
        else {
          //关闭之前加载表格
          this.close()
        }
      },
    }
  }
</script>
