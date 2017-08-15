<template>
  <div class="table-wrap">
    <h5>图形分类</h5>
    <compt-type-base :show.sync="showComptTypeBase" :edittingObj="edittingComptType" @doRefresh="getComptTypes(1)"></compt-type-base>
    <el-input v-model="fName"  placeholder="组件分类名称" icon="circle-close" class="input-search" :on-icon-click="clearContent"></el-input>
    <mu-raised-button class="blue-grey" @click="filter">搜索</mu-raised-button>
      <el-table ref="multipleTable" :data="comptTypes" height="650" border tooltip-effect="dark"  class="wl-table" @selection-change="handleSelectionChange">
        <el-table-column type="selection" prop="id" width="55"></el-table-column>
        <el-table-column prop="name" label="组件分类名称" width="180"></el-table-column>
        <el-table-column prop="type" label="组件分类类型" width="180" :formatter="formatterType"></el-table-column>
        <el-table-column prop="description" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    <div>
      <el-pagination  :current-page.sync="curPage" :page-size="itemsOfPage" layout="prev, pager, next, jumper" :total="totalCompttypes">
      </el-pagination>
    </div>
  </div>
</template>
<style scope>
  body{background-color: #eee; }
  .table-wrap {background-color: #eee; padding: 20px;font-family: "Microsoft YaHei"; font-size: 12px; }
  .table-wrap h1{ }
  .input-search {width:200px;}
</style>
<script>
  import {compact,set,clone,message} from '@/utils'
  import ComptTypeBase from './comptTypeBase.vue'
  import store from '@/store'
  import {loadComptTypeList,addComptType,editComptType,getComptTypeByID,removeComptTypes} from '@/services/comptTypeService'
  import Router from '@/router'
  export default{
    components: { ComptTypeBase},
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
        fType:0,
        selectedCompttypes:[],
        multipleSelection: []
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
              return { id:bdo.fID,name:bdo.fName,type:bdo.fType,description:bdo.fDescription,vModel:bdo.fViewModel,rClass:bdo.fRenderClass};
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
    },handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }

  }
</script>

