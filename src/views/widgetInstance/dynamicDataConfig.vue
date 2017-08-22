<template>
  <div class="dataConfig">
    <mu-drawer :open="show" class="dc-drawer" @close="">
      <div class="dc-side-dy">
        <h2 class="title">
          <span>动态序列数据接口配置</span>
          <i class="material-icons icon mini action" title="加载数据" @click="loadData">done</i>
        </h2>
        <div class="dc-dy-body">
          <el-select v-model="selectedBean" placeholder="选择数据接口" filterable style="margin: 10px 0;width: 100%"
                     value-key="id" :filter-method="filterFuncs">
            <el-option
              v-for="(func,index) in funcList2"
              :key="func.id"
              :label="`${func.beanName}.${func.cnname}`"
              :value="func">
              <span style="float: left">{{ func.beanName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px" :title="func.cnname">{{func.name}}</span>
            </el-option>
          </el-select>

          <div v-show="Array.isArray(selectedBean.params) && selectedBean.params.length > 0"
               style="max-height:calc(70%)">
            <span>参数配置</span>
            <div>
              <el-row v-for="param,index in selectedBean.params" :key="index" :gutter="5" style="margin: 10px 0">
                <el-col :span="8" style="margin-top: 14px;border-bottom: 1px solid #ccc">{{param.name}}</el-col>
                <el-col :span="8">
                  <el-input v-if="param.type === 'String'" v-model="param.value" style="width: 100%"
                            ></el-input>
                  <el-input-number v-else-if="param.type === 'Integer'" v-model="param.value" type="number" style="width: 100%"
                                   ></el-input-number>
                  <el-input v-else-if="param.type === 'Float'" v-model="param.value" style="width: 100%"
                                 ></el-input>
                  <el-date-picker
                    v-else-if="param.type==='Date'"
                    v-model="param.value"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                  >
                  </el-date-picker>
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
  import {message, clone} from '@/utils'
  import {dyBeanList} from "@/services/ServerSideSourceService"
  import store from "@/store"
  import {mergeDataAndRefreshShow} from './widgetDataUtil'
  import debounce from 'lodash/debounce'

  export default{
    store,
    props: {
      show: Boolean
    },
    async mounted(){
      let resp = await dyBeanList();
      if (resp.success) {
        this.funcList = resp.data;
      } else {
        message.warning(`获取接口列表息出错,请检查.状态码:${resp.status}`)
      }
      let ds = store.getters.getDataSet[0];
      if (ds) {
        let beans = this.funcList.filter(fun => {
          return (fun.className == ds.di.className) && (fun.name == ds.di.funName)
        })
        if (beans && beans[0]) {
          this.selectedBean = beans[0]
          this.selectedBean.params = ds.di.params
        }
      }
      this.funcList2 = this.funcList;
    },
    watch: {
      selectedBean(bean){
        if (bean) {
          this.source.name = bean.cnname
          this.source.di = {
            className: bean.className,
            classCNName: bean.beanName,
            funName: bean.name,
            funCNName: bean.cnname,
            params: bean.params
          }
        }
      }
    },
    computed: {},
    data(){
      return {
        funcList: [],
        funcList2: [],
        source: {
          id: 1,
          type: 3,
          name: "",
          description: "",
          di: {className: "", classCNName: "", funName: "", funCNName: "", params: []}
        },
        selectedFuncID: "",
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
        if (this.source.di.funName.trim() !== "") {
          let dataSources = [this.source]
          this.$store.commit("saveDataSet", dataSources)
          await this.$store.dispatch("updateSourceData")
          this.$store.dispatch("refreshChartAsync")
        } else {
          message.warning("请先选择数据接口")
        }

      },
      filterFuncs (val) {
        if(val.trim()==""){this.funcList2 = this.funcList}else{
          let Regx = /^[A-Za-z0-9]+/;
          if (Regx.test(val)) {
            console.info("125544",val)
            this.funcList2 = this.funcList.filter(func =>func.name.indexOf(val) !== -1)
          }
        }
      },

    }
  }
</script>

