<template>
  <div :id="id" class="charts-display__panel">
  </div>
</template>
<script>
  import { initEcharts } from './helper'
  import { uuid } from '@/utils'
  import isEmpty from 'lodash/isEmpty'
  import store from '@/store'
  export default{
    name: "EchartsPanel",
    store,
    props: {
      customStyle: {
        type: Object
      },
      textScript: {
        type: String,
        default: ""
      },
      theme: {
        type: Object,
      },
      instanceName: {
        type: String,
        default: "myChart"
      },
      merged: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      computedStyle(){
        return Object.assign({}, this.defaultStyle, this.customStyle)
      }
    },
    mounted(){
      this.$myChart = initEcharts(this.id);
      if (this.instanceName) window[this.instanceName] = this.$myChart;
      if (this.textScript) {this.setOptions(this.textScript)}
      this.$store.commit('registryInstance',this.$myChart)
       // this.$store.commit('updateOption',eval(this.textScript))
    },
    watch: {
      textScript(newVal){
        if (!isEmpty(newVal))
          this.setOptions(newVal, true)
      },
      theme(newVal){
        if (newVal) {

        }
      }
    },
    data(){
      return {
        id: uuid(),
        $myChart: null
      }
    },
    methods: {
      setOptions(text){
        try {
          eval.bind(window)(text);
          if (option && typeof option === 'object') {
            this.$myChart.setOption(option, !this.merged);
          }
        } catch (e) {
          console.error(e);
          this.$emit("exec", {type: 'error', msg: "执行错误"})
        }
      },
      resizeChart(){
        if (this.$myChart && this.autoResize) {
          this.$myChart.resize();
        }
      }
    }
  }
</script>
