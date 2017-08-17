<template>
  <div class="dataConfig">
    <mu-drawer :open="show" class="dc-drawer" @close="">
      <div class="dc-side-dy">
        <h2 class="title">
          <span>动态序列数据接口配置</span>
          <i class="material-icons icon mini action" title="加载数据" @click="loadData">done</i>
        </h2>
        <div class="dc-dy-body">
          <mu-select-field labelFloat v-model="selectedBean" label="选择数据接口" :maxHeight="500"
                           style="width: 100%">
            <mu-menu-item v-for="func,index in funcList" :key="index" :title="func.beanName" :value="func">
                    <span slot="after"  style="color: #ada9af;font-size: 12px">
                      class:{{ (function (text) {return text.substring(text.lastIndexOf('.') + 1)})(func.className)}}
                    </span>
            </mu-menu-item>
          </mu-select-field>
          <div v-show="selectedBean.params.length > 0" style="max-height:calc(70%);overflow-y: auto">
              <span>参数配置</span>
                <div style="border: 1px solid #ccc;padding: 20px">
                  <el-row v-for="param,index in selectedBean.params" :key="index" :gutter="20">
                    <el-col :span="8" style="border-bottom: 1px solid #ccc;margin-top: 14px;">{{param.name}}</el-col>
                    <el-col :span="16">
                      <mu-text-field v-if="param.type === 'String'" v-model="param.value" :label="param.name" labelFloat fullWidth
                                     style="width: 100%;"></mu-text-field>
                      <mu-text-field v-else-if="param.type === 'Integer'" v-model="param.value" type="number" labelFloat fullWidth
                                     :label="param.name" style="width: 100%;"></mu-text-field>
                      <mu-text-field v-else-if="param.type === 'Float'" v-model="param.value" :label="param.name" labelFloat fullWidth
                                     style="width: 100%;"></mu-text-field>
                      <mu-date-picker v-else-if="param.type === 'Date'" v-model="param.value" :hintText="param.name"
                                      format="yyyy-MM-dd" style="width: 100%;"></mu-date-picker>
                      <mu-time-picker v-else-if="param.type === 'Timestamp'" v-model="param.value" :hintText="param.name"
                                      format="24hr" style="width: 100%;"></mu-time-picker>
                    </el-col>
                  </el-row>
                </div>
          </div>
        </div>
      </div>
    </mu-drawer>
  </div>
</template>
<script>
  import {message} from '@/utils'
  import { dyBeanList } from "@/services/ServerSideSourceService"
  import store from "@/store"
  import {mergeDataAndRefreshShow} from './widgetDataUtil'

  export default{
    store,
    props:{
      show:Boolean
    },
    async mounted(){
      let resp = await dyBeanList();
      if (resp.success) {
        this.funcList = resp.data;
      }else {
        message.warning(`获取接口列表息出错,请检查.状态码:${resp.status}`)
      }
      let ds = store.getters.getDataSet[0];
      if(ds){
        let beans = this.funcList.filter(fun=>{
            return (fun.className == ds.di.className) && (fun.name == ds.di.funName)
        })
        if(beans && beans[0]){
            this.selectedBean = beans[0]
            this.selectedBean.params = ds.di.params
        }
      }
    },
    watch:{
       selectedBean(val){
        if (val) {
            this.source.name=val.cnname
            this.source.di = {
              className: val.className,
              classCNName:val.beanName,
              funName: val.name,
              funCNName:val.cnname,
              params: val.params
            }
        }
      }
    },
    computed:{
    },
    data(){
      return {
        funcList:[],
        source: {
          id: 1,
          type: 3,
          name: "",
          description: "",
          di:{className: "", classCNName:"", funName: "", funCNName:"", params:[]}
        },
        selectedBean: {
          "className": "",
          "name": "",
          "cnname": "",
          "params": []
        },
      }
    },
    methods: {
       async loadData(){
          if(this.source.di.funName.trim() !== ""){
            let dataSources = [this.source]
            this.$store.commit("saveDataSet", dataSources)
            await this.$store.dispatch("updateSourceData")
            this.$store.dispatch("refreshChartAsync")
          }else{
              message.warning("请先选择数据接口")
          }

        }
    }
  }
</script>

