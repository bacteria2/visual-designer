<template>
  <div class="table-wrap">
   <h5>数据源管理</h5>
    <div class="datasourceListWrap">
  <el-table
    :data="tableData"
    style="width: 100%; color: rgba(118, 118, 118, 1.0); "
    :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column type="expand">
      <template scope="props">
        <div class="expand-pannel">
          <p >
            <label class="prop_title">类名：</label>
            <span>{{ props.row.className }}</span>
          </p>
          <p>
            <label class="prop_title">方法：</label>
            <span>{{ props.row.name +'()' }}</span>
          </p>
          <p >
            <label class="prop_title">参数：</label>
            <span>
              <el-form :model="params[props.$index]"  :ref="'ruleForm'+props.$index"  :inline="true"   class="demo-form-inline">
              <template  v-for="(param,index) in props.row.params" >
                <!--<label :class="{'input_label':true,'input_label_first':index===0} " >{{param.name}}：</label>-->
                <el-form-item :label="param.name" :prop="param.index+''"
                              :rules="rules(param)" >
               <!--循环产生输入控件-->
                <el-input v-if="param.type==='String'" size="small" type="text" v-model="params[props.$index][param.index]=param.defaultValue"  :placeholder="'请输入参数'" class="input_widget" ></el-input>
                <el-input v-if="param.type==='Float'" size="small" type="text" v-model.number="params[props.$index][param.index]=param.defaultValue"  :placeholder="'请输入数字'" class="input_widget" ></el-input>
                <el-input-number v-if="param.type==='Integer'" size="small" v-model="params[props.$index][param.index]=param.defaultValue" :placeholder="'请输入整数'+(index+1)" class="input_widget"></el-input-number>
               <el-date-picker
                 v-if="param.type==='Date'"
                 v-model="params[props.$index][param.index]=param.defaultValue"
                 align="right"
                 type="date"
                 placeholder="选择日期"
                 >
                  </el-date-picker>
               <!--/循环产生输入控件-->
                </el-form-item>
              </template>
                <label class="input_label input_label_first" v-if="!props.row.params">无参数</label>
              </el-form>
            </span>
          </p>

          <p  style="margin-top: 12px">
            <label class="prop_title">&nbsp;</label>
            <span>
              <el-button
                :disabled="props.row.status!='1'"
                size="small"
                type="primary"
                @click="testInterface(props.$index,props.row.className,props.row.name,props.row.params)">测试接口</el-button>
            </span>
          </p>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="beanName"
      label="接口名称"
      sortable
      width="180">
    </el-table-column>

    <el-table-column
      prop="cnname"
      label="方法中文名"
      width="300"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="方法名"
      width="200"
      >
    </el-table-column>
    <el-table-column
      prop="params"
      label="参数"
      :formatter="paramFormatter"
      >
    </el-table-column>
    <el-table-column
      prop="cache"
      label="是否缓存"
      width="120"
      >
      <template scope="scope">
        <el-tag     :type="scope.row.cache? 'success' : 'danger'"
                    close-transition>{{scope.row.cache?'缓存':'不缓存'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="120"
      filter-placement="bottom-end"
    >
      <template scope="scope">
        <el-tag       :closable="true" :close-transition="false" @close="setStatus(scope.row)"
                      :type="scope.row.status === '1' ? 'success' : 'danger'"
                      close-transition>{{scope.row.status==='1'?'开启中':'关闭中'}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <mu-popup position="bottom" popupClass="popupTable-panel" :open="bottmPopup" @close="bottmPopup =false">
        <div class="popupTable">
          <template>
            <el-table
              :data="popupTableData"
              height="450"
              style="width: 100%">
              <el-table-column
                v-for="(col,index) in popupTableCols"
                :prop="index+''"
                :label="col.alias"
                :key="index"
                >
              </el-table-column>
            </el-table>
          </template>
    </div>
    </mu-popup>
  </div>
</template>


<script>
  import {message} from '@/utils'
  import {beanListAll,setStatus,previewData} from '@/services/ServerSideSourceService.js'
  import "@/style/comp/datasourceList.scss"

  export default {
    data(){
      let params=new Array();
     /* let tableData= [{"id":"4028a86a5d7c7f28015d7dc394b9003b",
        "className":"com.ys.ydp.visual.module.system.widgets.dsmanage.dlbeans.AAAAAAA",
        "beanName":"演示Bean",
        "name":"getDatas",
        "cnname":"获取本地模拟数据A",
        "status":"1",
        "des":"描述（备注）",
        "cache":false,
        "params":[{"type":"Integer","name":"月份","defaultValue":"12","required":true,"value":null,"index":1},
          {"type":"String","name":"姓名","defaultValue":"jack","required":true,"value":null,"index":3},
          {"type":"Data","name":"生日","defaultValue":"1987-12-12","required":true,"value":null,"index":2},
          {"type":"Float","name":"身高","defaultValue":"17.5","required":false,"value":null,"index":4}]},
        {"id":"4028a86a5d7c7f28015d7dc394ba003c","className":"com.ys.ydp.visual.module.system.widgets.dsmanage.dlbeans.AAAAAAA","beanName":"演示Bean","name":"getAnotherData","cnname":"获取另外一项数据B","status":"1","des":"描述（备注）","cache":false,"params":[{"type":"Integer","name":"类型","defaultValue":"0","required":true,"value":null,"index":1}]},
        {"id":"4028a86a5d7c7f28015d7dc394ba003d","className":"com.ys.ydp.visual.module.system.widgets.dsmanage.dlbeans.demodata.bean.LocalDataBean","beanName":"本地测试","name":"getDatas","cnname":"获取本地模拟数据","status":"1","des":"描述（备注）,方法的简要说明","cache":false,"params":null}];*/
      for(var i=0;i<1000;i++){
        params[i]={};
      }
      return {
        params,tableData:[],ruleForm:{},bottmPopup:false,popupTableData:[],popupTableCols:[]
      }
    },
    async mounted(){
      let resp = await beanListAll({});
      if(resp&&resp.success){
        this.tableData = resp.data;
        if(resp.data){
          this.params.splice(resp.data.length,1000-resp.data.length);
        }else{
          delete this.params;
        }
      }
    },
    methods: {
      formatterStatus({status}, column) {
        if(status=='1'){
          return "开启";
        }else{
          return "关闭";
        }
      },
      paramFormatter(row){
        let params = row.params;
        if(params){
          let paramUnion='';
          let count = 1;
          params.forEach(function(e){
            if(count>1){
              paramUnion += '、'
            }
            paramUnion = paramUnion + e.name +"("+e.type+")"
            count++;
          });
          return paramUnion;
        }else{
          return "无参数";
        }
      },
      cacheFormatter({cache}){
        if(cache){
          return "缓存";
        }else{
          return "不缓存";
        }
      },
      async setStatus(row){
        let statusToset = '';
        if(row.status === '1'){
          statusToset= '2'
        }else{
          statusToset = '1';
        }

        let params = {};
        params.className = row.className;
        params.name = row.name;
        params.status = row.status;
        let resp = await setStatus([params]);
        if(resp&&resp.success){
          row.status = statusToset;
        }else{
          message.warning('状态设置失败');
        }

      },
      async testInterface(index,className,funName,paramsDescribeArr){
//        console.log(index,paramsDescribeArr);


        let paramValue = this.params[index];
        let paramArr = [];
        if(paramValue){
          for(let key in paramValue){
            let currentParamDesArr = paramsDescribeArr.filter(param=>param.index == key);
            let currentParam = currentParamDesArr[0];
            currentParam.value = paramValue[key];
            paramArr.push(currentParam);
          }
        }

        await this.$refs['ruleForm'+index].validate((valid) => {
          if (valid) {
            previewData({className:className,funName:funName,params:paramArr}).then(data=>{
              if(data&&data.success){

                this.popupTableData = data.data;
                this.popupTableCols = data.cols;
                this.bottmPopup = true;
              }else{
                message.warning(data.msg)
              }
            });

          } else {
            message.warning('请输入正确的参数类型');
            return false;
          }
        });

      },

      rules(param){
        let paramType={Integer:{type:'number',msg:'数字'},Date:{type:'date',msg:'日期'},Float:{type:'number',msg:'数字'}};
        let rule =[
          { required: param.required, message:param.name+'不能为空'},
        ]
        if(param.type!='String'&&param.type!='Date'){
          let type = paramType[param.type].type;
          let msg = paramType[param.type].msg;
          let ruleItem = { type: type, message: param.name+'必须为'+msg};
          rule.push(ruleItem);
        }
        return rule

      }
    }
  }
</script>
