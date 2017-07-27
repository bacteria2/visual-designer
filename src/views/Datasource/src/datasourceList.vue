<template>
  <div class="table-wrap">
   <h5>数据源管理</h5>
  <el-table
    :data="tableData"
    style="width: 100%; margin-top:20px;color: rgba(118, 118, 118, 1.0); "
    :default-sort = "{prop: 'date', order: 'descending'}"
  >
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
              <el-form :model="params[props.$index]" :inline="true"  ref="ruleForm" class="demo-form-inline">
              <template v-if="props.row.params" v-for="(param,index) in props.row.params">
                <!--<label :class="{'input_label':true,'input_label_first':index===0} " >{{param.name}}：</label>-->
                <el-form-item label="活动名称" :prop="index"
                              :rules="[
                                { required: true, message: '年龄不能为空'},
                                { type: 'number', message: '年龄必须为数字值'}
                              ]" >
                <el-input size="small" type="text" v-model="params[props.$index].index=param.defaultValue"  :placeholder="'请输入参数'+(index+1)" class="input_widget" >
                </el-input>
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
                size="small"
                type="primary"
                @click="testInterface(props.$index,props.row.className,props.row.name)">测试接口</el-button>
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
</template>

<style scope>
  body{background-color: #eee; }
.table-wrap {background-color: #eee; padding: 30px;font-family: "Microsoft YaHei"; font-size: 12px; }
  .table-wrap h1{ }
  .input_label {
    text-align: center;
    width: 60px;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: rgb(72, 88, 106);
    line-height: 1;
    padding: 11px 0;
    box-sizing: border-box;color: #aaa}
  .input_widget {float: left;width: 110px; margin-top: 3px;}
  .input_widget .el-input__inner {color: #aaa}
  .input_label_first { text-align: left; width: 50px;}
  .expand-pannel p { width: 100%; clear: both; line-height: 35px; height: 35px; margin-bottom: 0;color: #aaa}
  .expand-pannel p .el-form-item__label { color: #aaa}
  .expand-pannel p label.prop_title { width: 80px; text-align: left; display: inline-block; float: left; }
  .expand-pannel p span { text-align: left; display: inline-block; float: left}
</style>

<script>
  export default {
    data() {
      let tableData= [{"id":"4028a86a5d7c7f28015d7dc394b9003b",
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
        {"id":"4028a86a5d7c7f28015d7dc394ba003c","className":"com.ys.ydp.visual.module.system.widgets.dsmanage.dlbeans.AAAAAAA","beanName":"演示Bean","name":"getAnotherData","cnname":"获取另外一项数据B","status":"1","des":"描述（备注）","cache":false,"params":[{"type":"Integer","name":"类型","defaultValue":"0","required":true,"value":null,"index":1}]},{"id":"4028a86a5d7c7f28015d7dc394ba003d","className":"com.ys.ydp.visual.module.system.widgets.dsmanage.dlbeans.demodata.bean.LocalDataBean","beanName":"本地测试","name":"getDatas","cnname":"获取本地模拟数据","status":"1","des":"描述（备注）,方法的简要说明","cache":false,"params":null}];
      let params = new Array();
      for(var i=0;i<tableData.length;i++){
        params[i]=new Array();
      }
      return {
        params,tableData,ruleForm:{},
        rules: {
          paramInputRule: [
            { required: true, message: '该参数为必填', trigger: 'blur' }
          ]
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
      setStatus(row){
        if(row.status === '1'){
          row.status = '2';
        }else{
          row.status = '1';
        }

      },
      testInterface(index,className,funName){
        let paramValue = this.params[index];

        console.log(params);
      },
      statusTag(value,row){
        console.log(value,row);
        return row.status === value;
      }
    }
  }
</script>
