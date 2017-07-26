<template>
  <v-app class="comptTypeList">
    <compt-type-base :show.sync="showComptTypeBase" :edittingObj="edittingComptType" @doRefresh="getComptTypes(1)"></compt-type-base>
    <v-toolbar fixed class="grey darken-3" light>
      <v-toolbar-title>
        <el-input v-model="fName"  placeholder="组件分类名称" icon="circle-close" class="input-search" :on-icon-click="clearContent"></el-input>
        <el-select v-model="fType" class="input-search" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <v-btn light class="blue-grey" @click.native="filter">搜索</v-btn>
      </v-toolbar-title>
      <v-btn light class="blue-grey" @click.native="addComptType">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="removeComptTypes">删除<v-icon right light>delete</v-icon></v-btn>
    </v-toolbar>
    <main>
      <el-table ref="multipleTable" :data="comptTypes" border tooltip-effect="dark" class="wl-table" @selection-change="handleSelectionChange">
        <el-table-column type="selection" prop="id" width="55"></el-table-column>
        <el-table-column prop="name" label="组件分类名称" width="180"></el-table-column>
        <el-table-column prop="type" label="组件分类类型" width="180" :formatter="formatterType"></el-table-column>
        <el-table-column prop="description" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template scope="scope">
            <el-button @click.native="editComptType(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
    </main>
    <v-footer class="grey darken-2 wl-footer">
        <v-pagination :length="pages" v-model="curPage"></v-pagination>
    </v-footer>
  </v-app>
</template>
<script>
  import {compact,set,clone,message} from '@/utils'
  import ComptTypeBase from './comptTypeBase.vue'
  import store from '@/store'
  import {loadComptTypeList,addComptType,editComptType,getComptTypeByID,removeComptTypes} from '@/services/comptTypeService'
  import Router from '@/router'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {
      ElInput,
      ComptTypeBase},
     mounted(){

      //获取Dashboard列表
      this.getComptTypes()
    },
    watch:{
       curPage(val){
         this.paginationHandler();
       }
    },
    computed:{
      pages(){
          let val = Number.parseInt(this.totalCompttypes / this.itemsOfPage),
              mod = this.totalCompttypes % this.itemsOfPage,
              pages = mod == 0?val:val+1
              return pages
      },
      selectedCTSize(){
          return this.multipleSelection.length
      }
    },
    data(){
      return {
        //左导航
        //drawer:true,
        //mini:false,
        showComptTypeBase:false,
        comptTypes:[],
        edittingComptType:'',
        curPage:1,
        totalCompttypes:0,
        itemsOfPage:15,
        fName:'',
        fType:'',
        selectedCompttypes:[],
        multipleSelection: [],
        options:[{id:'',label:"全部"},{id:0,label:"图形分类"},{id:1,label:"应用分类"}]
      }
    },
    methods: {
      addComptType(){
        this.showComptTypeBase = true,
          this.edittingComptType={}
      },
      editComptType(index, row){
          let that = this;
          let  id = row.id;
          this.loadComptTypeById(id,function () {
            that.showComptTypeBase = true;
          })
      },
      loadComptTypeById(id,fun){
        getComptTypeByID({key:id}).then((resp) => {
          if (resp.success) {
            this.edittingComptType = resp.ctVo;
            fun();
          }
          else{
            console.log(resp.success)
          }
        });
      },
      paginationHandler(){
         this.getComptTypes()
      },
      getComptTypes(initPage){
        if(initPage!=null && initPage!=""){
              this.curPage=initPage;
        }
        let page = {rows:this.itemsOfPage,page:this.curPage,name:this.fName,keyword:this.fType}
        loadComptTypeList({page}).then((resp) => {
          if (resp.success) {
            this.comptTypes = resp.rows.map((bdo)=>{
              return { id:bdo.fID,name:bdo.fName,type:bdo.fType,description:bdo.fDescription};
            })
            this.totalCompttypes = resp.total
          }
          else message.warning("**获取组件分类列表失败**")
        });
      },
      filter(){
            this.getComptTypes(1)
      },
      clearContent(){
          this.fName='';
      },
      removeComptTypes(){
          if(`${this.selectedCTSize}`==0){
              message.warning("请先选择需要删除的组件分类！")
              return;
          }else{
            let msg = `该操作将删除选择的（${this.selectedCTSize}）个组件分类，是否继续？`
            for(var i=0;i<`${this.selectedCTSize}`;i++){
              this.selectedCompttypes.push(this.multipleSelection[i].id)
            }
            message.confirm(msg,this.delComptTypes);
          };

      },
      delComptTypes(){
        let that = this;
        removeComptTypes(this.selectedCompttypes).then((resp) => {
          if (resp.success) {
            message.success(resp.msg)
            that.selectedCompttypes = []
            that.getComptTypes()
          }
          else message.warning("**删除失败，系统异常**")
        });
      },toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },formatterType(row,column){
        var type = row[column.property];
        if(type==0){
            return "图形分类";
        }else{
            return "应用分类";
        }
      }
    }
  }
</script>

