<template>
    <div class="dataItem-define-panel">
      <h2 class="title"><span>配置面板</span></h2>
      <div class="dataItem-define-panel-body">
         <div class="dis-left">
           <div class="body">
             <el-form label-width="80px">

               <el-form-item label="别名">
                 <el-input size="mini"></el-input>
               </el-form-item>

               <el-form-item label="过滤">
                 <el-switch on-text="" off-text=""></el-switch>
               </el-form-item>

               <el-form-item label="过滤设定">

                 <el-col :span="11">
                   <el-select  placeholder="选择需过滤的列" size="mini">
                     <el-option label="区域一" value="shanghai"></el-option>
                   </el-select>
                 </el-col>

                 <el-col :span="2">=</el-col>

                 <el-col :span="11">
                   <el-input  placeholder="过滤值" size="mini"></el-input>
                 </el-col>

               </el-form-item>

               <el-form-item label="类型">

                 <el-select  placeholder="设定自定义数据项类型" size="mini">
                   <el-option label="区域一" value="shanghai"></el-option>
                 </el-select>

               </el-form-item>

             </el-form>
           </div>
         </div>
         <div class="dis-right">
           <div class="body">

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
    name: "serverSide",
    mixins: [sourceCommon, dimension],
    props:{},
    mounted(){},
    computed: {},
    watch: {},
    data(){
      return {}
    },
    methods: {}
  }
</script>
