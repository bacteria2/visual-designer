<template>
  <div class="container" :style="computedStyle">
    <div :id="id" class="panel">
    </div>
  </div>
</template>
<style scoped lang="scss">
  .panel {
    height: 100%;
    width: 100%;
    padding: 10px;
    background: transparent;
  }

  .container {
    height: 100%;
    padding: 10px;
    z-index: 30;
  }
</style>
<script>
  import { initEcharts } from './helper'
  import { uuid } from '@/utils'
  import isEmpty from 'lodash/isEmpty'
  export default{
    name: "EchartsPanel",
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
        defaultStyle: {
          backgroundColor: "#f3f3f3"
        },
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
