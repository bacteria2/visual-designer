<template>
 <div >
   <property-row name="输入组件:"  >
     <div class="extendWidgetContainer">
      <div id="search_widgets_input" class="search_widgets_input">
        <span>标签：</span><div class="search_widget" type="label"><label type="label">标题</label></div><br/>
        <span>日期：</span><div class="search_widget" type="date"><input type="date"/></div><br/>
        <span>文本：</span><div class="search_widget" type="text"><input type="text"/></div><br/>
        <span>数值：</span><div class="search_widget" type="number"><input type="number"/></div><br/>
        <span>多选：</span><div class="search_widget" type="checkbox"><input type="checkbox"/></div>
        <span>单选：</span><div class="search_widget" type="radio"><input type="radio"/></div>
      </div>
     </div>
   </property-row>

   <property-row v-if="activeType&&['date','text','number'].includes(activeType)" name="绑定参数:" size="small" >
       <el-cascader
         size="small"
         :options="beanClassByActived"
         v-model="paramBind"
         style="width: 100%"
       >
       </el-cascader>
   </property-row>

   <property-row v-if="activeType&&activeType==='label'" name="标签内容:" size="small" >
     <el-input v-model="labelText" size="small" ></el-input>
   </property-row>

   <property-row v-if="activeType&&['checkbox','radio'].includes(activeType)" name="绑定包:" size="small" >
     <el-select v-model="paramPackageBind" placeholder="请选择" size="small">
       <el-option
         v-for="item in dashboard.paramPackages"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select>

   </property-row>


   <property-row name="参数包:">
     <el-button type="primary" size="small" @click.native="bottmPopup=true">编辑参数包</el-button>
     <span style="color: #ccc">  (用于固定参数值的选择)</span>
   </property-row>
   <prop-input name="搜索按钮:" size="small"  :model="options" propName="searchTitle"></prop-input>

   <mu-popup position="bottom" popupClass="popupTable-panel" :open="bottmPopup" @close="bottmPopup =false">

     <div class="popupTable">
       <el-button type="text" size="small" @click.native="showParamPackageDialog" style=" margin:0 10px 10px 0">添加参数包</el-button>
       <el-table
         :data="dashboard.paramPackages"
         border
         style="width: 100%">
         <el-table-column
           label="参数包名称"
           width="180">
           <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.name }}</span>
             <a @click="topEditParamPackageName(scope.row.id)">编辑</a>
           </template>
         </el-table-column>
         <el-table-column
           label="参数包"
           width="800">
           <template scope="scope">
               <ol>
                 <li v-for="param in scope.row.params"><b>参数:</b>{{param.paramKey}}  &nbsp;&nbsp;<b>参数值:</b>{{param.value}}
                    <a @click="handleDeleteParam(scope.row.id,param.paramBind)">删除</a></li>
               </ol>
           </template>
         </el-table-column>
         <el-table-column label="操作">
           <template scope="scope">
             <el-button
               size="small"
               @click="handleEdit(scope.$index, scope.row)">添加参数</el-button>
             <el-button
               size="small"
               type="danger"
               @click="handleDelete(scope.$index,scope.row)">删除</el-button>
           </template>
         </el-table-column>
       </el-table>

       <el-dialog title="添加参数" :visible.sync="dialogFormVisible" :show-close="false" :modal-append-to-body="false">
         <el-form  v-model="formAddParam" :inline="true" class="demo-form-inline">
           <el-form-item label="参数名：" >
             <el-cascader
               size="small"
               :options="beanClassAll"
               v-model="formAddParam.paramBind"
               style="width: 100%"
               @change="formAddParamChange"
             >
             </el-cascader>
           </el-form-item>
           <el-form-item label="参数值：" >
       <!--      <el-input v-model="formAddParam.value" size="small" ></el-input>-->

             <el-input v-if="currentAddParamType==='String'" size="small" type="text" v-model="formAddParam.value"  :placeholder="'请输入参数值'"  ></el-input>
             <el-input v-if="currentAddParamType==='Float'" size="small" type="text" v-model.number="formAddParam.value"  placeholder="请输入数字类型参数值" ></el-input>
             <el-input-number v-if="currentAddParamType==='Integer'" size="small" v-model="formAddParam.value" placeholder="请输入整数类型参数值" ></el-input-number>
             <el-date-picker
               size="small"
               v-if="currentAddParamType==='Date'"
               v-model="formAddParam.value"
               type="date"
               placeholder="选择日期"
             >
             </el-date-picker>

           </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="addParamToPackage">确 定</el-button>
         </div>
       </el-dialog>

       <el-dialog title="添加参数包名" :visible.sync="addParamPackageDialog" :modal-append-to-body="false" :show-close="false" size="tiny" >
         <el-input  size="small" type="text" v-model="addParamPackageName"  placeholder="请输入参数包名称"  ></el-input>
         <div slot="footer" class="dialog-footer">
           <el-button @click="addParamPackageDialog = false">取 消</el-button>
           <el-button type="primary" @click="addParamPackage">确 定</el-button>
         </div>
       </el-dialog>

       <el-dialog title="编辑参数包名" :visible.sync="editParamPackageDialog" :modal-append-to-body="false" :show-close="false" size="tiny" >
         <el-input  size="small" type="text" v-model="editParamPackageName"  placeholder="请输入参数包名称"  ></el-input>
         <div slot="footer" class="dialog-footer">
           <el-button @click="editParamPackageDialog = false">取 消</el-button>
           <el-button type="primary" @click="saveEditParamPackageName">确 定</el-button>
         </div>
       </el-dialog>

     </div>

   </mu-popup>


 </div>
</template>
<style >
  .el-cascader-menu__item { font-size: 12px !important;}
  .el-cascader-menu {    min-width: 145px!important;}
  .el-cascader--small .el-cascader__label { line-height: 36px}
  .popupTable-panel{ width: 100%;}
  .popupTable{ width: 100%; height:500px; background-color: #fff; padding: 25px; font-family: "Microsoft YaHei"}
  .el-date-picker{z-index: 99999999 !important;}
  a {cursor: pointer}

</style>
<script>
  import Sortable from "sortablejs";
  import { uuid,message } from '@/utils'
  export default{
    name: "WidgetSearchInput",
    props:{
      styles:Object,
      options:Object,
      dashboard:Object
    },
    data(){
      return {paramBind:null,
        paramPackageBind:null,
        activeType:"text",
        labelText:'',
        bottmPopup:false,
        dialogFormVisible:false,
        addParamPackageDialog:false,
        editParamPackageDialog:false,
        editParamPackage:null,
        editParamPackageName:'',
        currentPackageId:'',
        currentAddParamType:'',
        addParamPackageName:'',
        formAddParam: {
          paramBind: [],
          paramKey: '',
          value: ''
        }}
    },
    watch:{
      "options.count"(){
        this.getActiveInputWdigetParamBind();
      },
      paramBind(v){
        let inputs = this.options.inputs;
        if(inputs&&inputs.length>0){
          let activeInputs = inputs.filter(e=>e.actived===true);
          if(activeInputs.length>0){
            let activeInput = activeInputs[0];
            activeInput.paramBind = v ;
          }
        }
      },
      paramPackageBind(v){
        let inputs = this.options.inputs;
        if(inputs&&inputs.length>0){
          let activeInputs = inputs.filter(e=>e.actived===true);
          if(activeInputs.length>0){
            let activeInput = activeInputs[0];
            activeInput.paramPackage = v ;
          }
        }
      },
      labelText(v){
        let inputs = this.options.inputs;
        if(inputs&&inputs.length>0){
          let activeInputs = inputs.filter(e=>e.actived===true);
          if(activeInputs.length>0){
            let activeInput = activeInputs[0];
            activeInput.label = v ;
          }
        }
      }
    },
    mounted(){
      //初始化绑定参数
      this.getActiveInputWdigetParamBind();

      //初始化拖拽
      var el = document.getElementById("search_widgets_input");
      Sortable.create(el,{
        sort:false,
        group:{ name: "search", pull: 'clone', put: false },
        handle:".search_widget",
        animation: 300,
      });
    },
    computed:{

      beanClassByActived(){
        let beanClasses = [];
        //计算接口参数
        let containers = this.dashboard.containers;
        this.getBeanclass(containers,beanClasses,true);
        return beanClasses;
      },
      beanClassAll(){
        let beanClasses = [];
        //计算接口参数
        let containers = this.dashboard.containers;
        this.getBeanclass(containers,beanClasses,false);
        return beanClasses;
      }
    },

    methods: {
      handleItemChange(val) {

      },
      getBeanclass(containers,beanClasses,editor){
        if(containers){
          for(let key in containers){
            let container = containers[key];
            if(container.dataOption){
              let dataSet = container.dataOption.dataSet;
              if(dataSet){
                let dataSetByDI = dataSet.filter(e=>e.type===2);
                dataSetByDI.forEach(e=>{
                  if(e.di)
                    this.setBeanClassAndFun(beanClasses,e.di,editor);
                });
              }
            }

          }
        }
      }
      ,
      setBeanClassAndFun(beanClasses,di,editor){
       if(beanClasses&&di&&di.params&&di.params.length>0){
         let beanClass = {};
         let fun = {};
         //设置bean
         let newBeanclasses = beanClasses.filter(e=>e.value === di.className);

         if(newBeanclasses.length>0){
           beanClass = newBeanclasses[0]
         }else{

           beanClass.children = [];
           beanClass.label = di.classCNName;
           beanClass.value = di.className;

         }

         //设置function
         let beanFuns =  beanClass.children.filter(e=>e.value = di.funName);

         if(beanFuns.length===0){

           fun.label = di.funCNName;
           fun.value = di.funName;
           fun.children = [];
           //设置参数
           di.params.forEach(e=>{
             let param = {};
             param.value = e.index;
             param.label = e.name;
             param.type = e.type;
             if(editor){
               if(this.activeType ==="date"){
                 if(e.type==="Date"){
                   fun.children.push(param);
                 }
               }else if(this.activeType ==="text"){
                 if(e.type==="String"){
                   fun.children.push(param);
                 }
               }else if(this.activeType ==="number"){
                 if(e.type==="Integer"||e.type==="Float"){
                   fun.children.push(param);
                 }
               }
             }else{
               fun.children.push(param);
             }


           });

           if(fun.children.length > 0){
             beanClass.children.push(fun);
           }

           if(beanClass.children.length>0){
             beanClasses.push(beanClass);
           }

         }

       }

      },
      getActiveInputWdigetParamBind(){
        let inputs = this.options.inputs;
        if(inputs&&inputs.length>0){
          let activeInputs = inputs.filter(e=>e.actived===true);
          if(activeInputs.length>0){
            let activeInput = activeInputs[0];
            if(!activeInput.paramBind)  activeInput.paramBind = [];
            this.paramBind = activeInput.paramBind;
            this.activeType = activeInput.type;
            this.labelText = activeInput.label;
            this.paramPackageBind = activeInput.paramPackage;
          }else{
            this.paramBind = [];
          }
        }
      },
      showParamPackageDialog(){
        this.addParamPackageDialog = true;
      },
      handleEdit(index,row){

        this.currentPackageId = row.id;
        this.dialogFormVisible = true;
        this.formAddParam = {
          param: [],
            value: ''
        }

      },
      handleDelete(index,row){

        this.dashboard.paramPackages = this.dashboard.paramPackages.filter(e=>e.id!==row.id);
      },
      handleDeleteParam(id,paramBind){

        if(id&&paramBind){
          let paramPackage = this.dashboard.paramPackages.filter(e=>e.id === id)[0];
          if(paramPackage){
            paramPackage.params = paramPackage.params.filter(e=>e.paramBind !==paramBind);
          }
        }
      },
      addParamToPackage(){
        if(!this.formAddParam.paramBind||this.formAddParam.paramBind.length!==3){
          message.warning("参数选择不完整");
          return;
        }else{
          if(!this.formAddParam.value){
            message.warning("参数值不能为空");
            return
          }
        }

        if(this.currentPackageId){
          console.log("currentPackageId",this.currentPackageId);
          let paramPackage = this.dashboard.paramPackages.filter(e=>e.id === this.currentPackageId)[0];
          if(this.formAddParam.paramBind&&this.formAddParam.paramBind.length===3){

            let paramKey = '' ;
            let bean = this.beanClassAll.filter(e=>e.value === this.formAddParam.paramBind[0])[0];
            paramKey = bean.label;
            let fun = bean.children.filter(e=>e.value === this.formAddParam.paramBind[1])[0];
            paramKey = paramKey+"/"+fun.label;
            let param = fun.children.filter(e=>e.value === this.formAddParam.paramBind[2])[0];
            paramKey = paramKey+"/"+param.label;
            this.formAddParam.paramKey =paramKey;
            if(!paramPackage.params){
              paramPackage.params = [];
            }
            paramPackage.params.push(this.formAddParam);

          }else{
            message.warning("参数添加失败，参数选择不完整")
          }
        }else{
          message.warning("参数包获取失败！")
        }
        this.dialogFormVisible = false;
      },
      //参数包设置  —— 添加参数是，参数变动时，改变当前参数值的编辑组件
      formAddParamChange(v){
        let bean = this.beanClassAll.filter(e=>e.value === v[0])[0];
        let fun = bean.children.filter(e=>e.value === v[1])[0];
        let param = fun.children.filter(e=>e.value ===v[2])[0];
        this.currentAddParamType =param.type;
      },
      addParamPackage(){
        let paramPackage = {};
        if(this.addParamPackageName){
          paramPackage.name = this.addParamPackageName;
          paramPackage.id = uuid();
          if(!this.dashboard.paramPackages){
            this.dashboard.paramPackages = [];
          }
          this.dashboard.paramPackages.push(paramPackage);
          this.addParamPackageDialog = false;
        }else{
          message.warning("参数包名称不能为空");
        }

      },
      topEditParamPackageName(id){
        this.editParamPackage= this.dashboard.paramPackages.filter(e=>e.id ===id)[0];
        if(this.editParamPackage){
          this.editParamPackageName = this.editParamPackage.name;
          this.editParamPackageDialog = true;
        }else{
          message.warning("编辑失败");
        }
      },
      saveEditParamPackageName(){
        if(this.editParamPackageName){
          this.editParamPackage.name=this.editParamPackageName;
          this.editParamPackageDialog = false;
        }else{
          message.warning("名称不能为空");
        }
      }
    },


  }
</script>
