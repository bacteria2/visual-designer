<template>
    <el-row :gutter="20" style="height: 100%">
      <el-col :span="8" style="height: 100%;border-right: 1px dashed #ccc">
        <div>
          <p>
            注意:<br>
            1、当前原生组件的版本号:{{widget.fVersion}},低于该版本的实例可同步;<br>
            2、同步前应对原生组件做好测试;<br>
            3、同步将对实例进行下面操作:<br>
            <span>
              <div style="margin-left: 22px;color: #ff7b7b">
           3.1: 覆盖组件实例的可配置属性配置<br>
           3.2: 覆盖组件实例的Option（原始配置项）<br>
           3.3: 覆盖组件实例的扩展脚本（extJs）<br>
              </div>
            </span>
            4、一旦同步实例是不可逆转的，在进行同步前建议对数据库进行备份操作
          </p>
        </div>
        <div v-if="errorMsg.length > 0" class="errBox">
          <span style="color: darkred" v-for="err in errorMsg" :title="err.detail">{{err.name}}</span>
        </div>
      </el-col>
      <el-col :span="16" style="height: 100%">
        <p>请选择需要同步的组件实例</p>
        <el-tabs v-model="activeName">
          <el-tab-pane label="可同步实例" name="first">
            <el-table
              :data="oldVersionInstances"
              border
              :max-height="700"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="实例名称"
                width="300">
                <template scope="scope">{{ scope.row.fName }}</template>
              </el-table-column>
              <el-table-column
                label="版本号"
                width="250">
                <template scope="scope">{{ scope.row.fWidgetVersion }}</template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已同步的实例" name="second">
            <el-table
              :data="curVersionInstances"
              border
              :max-height="700">
              <el-table-column
                label="实例名称"
                width="300">
                <template scope="scope">{{ scope.row.fName }}</template>
              </el-table-column>
              <el-table-column
                label="版本号"
                width="250">
                <template scope="scope">{{ scope.row.fWidgetVersion }}</template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>
</template>
<style scoped>
  .errBox {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ccc;
    padding: 10px;
    height: calc(100% - 216px);
    border-bottom: 1px solid #ccc;
    overflow-y: auto;
  }
</style>
<script>
  import {getWidgetsInstanceByWidgetID} from '@/services/WidgetInstanceService'
  import {forOwn,message} from '@/utils'
  export default{
    props: {
      widget:{},
      errorMsg:{
          type:Array,
          default(){return []}
      }
    },
    async mounted(){
        let widgetID = this.widget.fID
        if(widgetID){
         let response = await getWidgetsInstanceByWidgetID({widgetID})
          if(response.success){
             this.instances = response.data
          }else{
              message.warning("获取实例失败")
          }
        }
    },
    computed:{
        oldVersionInstances(){
            return this.instances.filter(instance => {return instance.fWidgetVersion !== this.widget.fVersion})
        },
        curVersionInstances(){
           return this.instances.filter(instance => {return instance.fWidgetVersion == this.widget.fVersion})
        }
    },
    watch: {

    },
    data(){
      return {
        instances:[],
        selectedInstances:[],
        activeName:'first'
      }
    },
    methods: {
      handleSelectionChange(val){
        this.selectedInstances = val
      }
    }
  }
</script>
