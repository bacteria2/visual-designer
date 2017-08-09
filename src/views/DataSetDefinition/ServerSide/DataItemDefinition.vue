<template>
    <div class="dataItem-define-panel">
      <h2 class="title"><span>配置面板</span></h2>
      <div class="dataItem-define-panel-body">
         <div class="dis-left">
           <div class="body">
             <el-form label-width="50px">

               <el-form-item label="别名">
                 <el-input size="mini" v-model="item.alias"></el-input>
               </el-form-item>
<!--

               <el-form-item label="过滤">
                 <el-switch on-text="" off-text="" v-model="filterEnable" :disabled="item.type == 1"></el-switch>
               </el-form-item>

               <el-form-item label="过滤设定" v-show="filterEnable">

                 <el-col :span="11">
                   <el-select  placeholder="选择需过滤的列" size="mini" v-model="dataFilter.column">
                     <el-option v-for="column in columns" :label="column.alias" :value="column.column" :key="column.column"></el-option>
                   </el-select>
                 </el-col>

                 <el-col :span="2" style="padding-left:5px">=</el-col>

                 <el-col :span="11">
                   <el-input  placeholder="过滤值" size="mini" v-model="dataFilter.value"></el-input>
                 </el-col>

               </el-form-item>
-->

               <el-form-item label="类型">

                 <el-select  placeholder="设定自定义数据项类型" size="mini" v-model="item.type">
                   <el-option label="函数" :value="1"></el-option>
                   <el-option label="合成数组列表" :value="2"></el-option>
                   <el-option label="合成对象列表" :value="3"></el-option>
                 </el-select>

               </el-form-item>

             </el-form>
           </div>
         </div>
         <div class="dis-right">
           <div class="body">
               <div class="function" v-show="item.type == 1">
                 <el-form label-width="50px">
                 <el-form-item label="函数">
                 <el-select  placeholder="选择函数" size="mini" v-model="fun.name">
                   <el-option v-for="f in funList" :label="f" :value="f" :key="f"></el-option>
                 </el-select>
                 </el-form-item>
                 <el-form-item label="列">
                 <el-select  placeholder="选择需要聚会的列" size="mini" v-model="fun.params">
                   <el-option v-for="c in funColumn" :label="c.label" :value="c" :key="c.value.name"></el-option>
                 </el-select>
                 </el-form-item>
                 </el-form>
               </div>
               <div class="arrList" v-show="item.type == 2">
                 <el-transfer v-model="arrformater" :data="funColumn" :titles="['待选列', '已选列']"></el-transfer>
                 <div class="index-box-out">
                  <span style="padding: 4px">组合顺序</span>
                 <ul class="index-box">
                   <li v-for="item in arrList" :key="item" class="item">{{item}}</li>
                 </ul>
                 </div>
               </div>
               <div class="objList" v-show="item.type == 3">
                  <table class="obj-table" cellspacing="1px">
                    <thead class="header">
                    <tr><th class="k">键</th><th class="v">值</th><th class="o"><el-button size="mini" flat @click="addObjItem">增加</el-button></th></tr>
                    </thead>
                    <tbody>
                    <tr><td colspan="3">
                      <div class="obj-table-body">
                        <table>
                          <tr class="obj-row" v-for="(obj,index) in objformatter" :keys="obj.key">
                            <td><el-input size="mini" v-model="obj.key"></el-input></td>
                            <td><el-select  placeholder="选择数据列" size="mini" v-model="obj.column">
                              <el-option v-for="c in funColumn" :label="c.label" :value="c" :key="c.key"></el-option>
                            </el-select></td>
                            <td>
                              <el-button size="mini" flat @click="delObjItem(index)" style="margin-left: 10px">删除</el-button>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td></tr>
                    </tbody>
                  </table>
               </div>
           </div>
         </div>
      </div>
    </div>
</template>

<script>
  import {message} from "@/utils"
  import sourceCommon from '../SourceCommon'
  import dimension  from '../Dimension'
  import { getColumn} from "@/services/ServerSideSourceService"

  export default{
    name: "dataItemDefintion",
    mixins: [sourceCommon, dimension],
    props:{
      dataItem:{
          default:{name: "自定义接口维度", alias: "自定义维度",columnNames:[],type:1}
      },
      columns:{},
    },
    mounted(){
      switch(this.dataItem.type){
        case 1:
          let srcFun = this.dataItem.function
          if(srcFun){
              this.fun.name = srcFun.name;
              if(srcFun.params && srcFun.params[0] && srcFun.params[0].name){
                this.fun.params = this.funColumn.filter(c=>{
                    return c.key == srcFun.params[0].name;
                })[0]
              }
          }
          break;
        case 2:
          this.arrformater = this.dataItem.formatter ? this.dataItem.formatter : []
          break;
        case 3:
          let objs = this.dataItem.objformatter
          if(objs && objs[0]){
               objs.forEach(obj=>{
                 let column = this.funColumn.filter(c=>{
                   return c.index == obj.index;
                 })[0],
                 objFormatterItem = {key:obj.key,column};
                 this.objformatter.push(objFormatterItem)
               })
          }
          break;
      }
    },
    computed: {
        funColumn(){
           return this.columns.map(column=>{
                return {label:column.alias,value:{name:column.column,type:column.type},key:column.column,index:column.index}
            })
        },
        arrList(){
            let list = [];
            this.arrformater.forEach(colKey=>{
               list.push(this.columns.filter(c=>{return c.column == colKey})[0].alias)
            })
          return list
        }
    },
    watch: {},
    data(){
      return {
          filterEnable:false,
          item:this.dataItem,
          dataFilter:{column:"",value:""},
          fun:{name:'',params:''},
          arrformater:[],
          objformatter:[],
          funList:['sum','max','min','count','distinct'],
      }
    },
    methods: {
        addObjItem(){
          let objFormatterItem = {key:'',column:{}};
          this.objformatter.push(objFormatterItem)
        },
        delObjItem(index){
          this.objformatter.splice(index,1)
        },
        submit(){
            let baseItem = Object.assign({},this.item),
                dataItem,temp
            switch(this.item.type){
              case 1:
                  temp={"function":{name:this.fun.name,params:[this.fun.params.value]}}
                  break;
              case 2:
                 /* if(this.filterEnable && this.dataFilter.column !=='' && this.dataFilter.value !==''){
                    temp = {"datafilter":this.dataFilter,"formatter":this.arrformater};
                  }else{*/
                    temp = {"formatter":this.arrformater}
                  //}
                  break;
              case 3:
                let ofs = this.objformatter.map(item=>{
                    return {key:item.key,column:item.column.key,index:item.column.index}
                })
               /* if(this.filterEnable && this.dataFilter.column !=='' && this.dataFilter.value !==''){
                  temp = {"datafilter":this.dataFilter,"objformatter":ofs};
                }else{*/
                  temp = {"objformatter":ofs}
                //}
                break;
            }
            dataItem = Object.assign(baseItem,temp)
            this.$emit("updateDataItem",dataItem)
        }
    }
  }
</script>
