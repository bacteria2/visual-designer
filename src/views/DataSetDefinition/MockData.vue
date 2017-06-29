<template>
  <div>
    <mu-dialog :open="show" title="数据源新增" dialogClass="data-definition-dialog">
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
              <v-flex xs1>
                <!-- <v-subheader>数据源名称</v-subheader>-->
              </v-flex>
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
          <div style="height: calc(100% - 48px)">
            <el-table :data="sourceInfo.columns" stripe max-height="300">
              <el-table-column prop="name" label="列名"></el-table-column>
              <el-table-column prop="type" label="类别"></el-table-column>
              <el-table-column prop="alias" label="别名(选填)"></el-table-column>
              <el-table-column prop="mergeNumber" label="跨列数"></el-table-column>
              <el-table-column label="控制" :width="160">
                <template scope="scope">
                  <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="grey lighten-1 z-depth-1 mb-5">
            完成数据源添加,请记得保存
          </v-card>
        </v-stepper-content>
      </v-stepper>
      <v-btn slot="actions" primary @click.native="nextStep" light>{{stepper == 3 ? '保存' : '下一步'}}</v-btn>
    </mu-dialog>

    <mu-dialog :open="dialogColumn" title="新增列" dialogClass="data-definition-column">
      <v-text-field v-model="singleColumn.name" label="列名(英文)"></v-text-field>
      <mu-select-field v-model="singleColumn.type" labelFloat label="列类型" style="width: 100%">
        <mu-menu-item value="number" title="number"></mu-menu-item>
        <mu-menu-item value="string" title="string"></mu-menu-item>
      </mu-select-field>
      <v-text-field v-model="singleColumn.alias" label="别名(选填)"></v-text-field>
      <v-text-field v-model.number="singleColumn.mergeNumber" type="number" label="跨列" :min="1" :max="4"></v-text-field>

      <v-btn slot="actions" primary @click.native="saveAndAdd()">新增新记录</v-btn>
      <v-btn slot="actions" primary @click.native="dialogColumn=false" style="color: white">关闭</v-btn>
    </mu-dialog>
  </div>
</template>
<script>
  export default{
    name: "MockDataModal",
    props: {
      show: Boolean,
      sourceInfo: {
        type: Object,
        default: _ => ({name: "", description: "", columns: []})
      },
    },
    watch: {
      show(val){
        this.showDialog = val;
      }
    },
    data(){
      return {
        stepper: 1,
        showDialog: this.show,
        dialogColumn: false,
        singleColumn: {
          name: "列1", type: "string", alias: "", mergeNumber: 1
        },
      }
    },
    methods: {
      nextStep(){
        if (this.stepper < 3)
          this.stepper += 1;
        else
          this.close()
      },
      close(){
        this.$emit("update:show", false);
        let len = 0
       /* this.sourceInfo.columns.forEach((el) => {
          len += parseInt(el.mergeNumber);
        })
        let emptyArray=[new Array(len)];
        this.sourceInfo.data*/

        this.stepper = 1;
      },
      saveAndAdd(){
        let row = {name: "列", type: "string", alias: "", mergeNumber: 1};
        let data=this.sourceInfo.data;
        //添加列头记录
        this.sourceInfo.columns.push(row)
        //添加空白列记录,如果列为空白,则直接添加
        if(data.length<1){
          this.sourceInfo.data=[]
        }
        //如果存在行内数据，则在第一行追加数据
        else{

        }
        this.sourceInfo.data=[...this.sourceInfo.data,]
        this.singleColumn = row;
      },
      addNewColumn(){
        this.saveAndAdd();
        this.dialogColumn = true
      },
      handleEdit(index, row){
        this.singleColumn = this.sourceInfo.columns[index];
        this.dialogColumn = true
      },
      handleDelete(index,el){
        if (this.sourceInfo.columns.length < 2) {
          alert("至少有一列数据")
          return;
        }
        //删除这一列的记录
        this.sourceInfo.columns.splice(index, 1)
        //删除这一列的数据
        alert("数据需要手动删除")
      }
    }
  }
</script>
