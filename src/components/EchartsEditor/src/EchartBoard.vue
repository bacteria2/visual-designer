<template>
  <div class="container">
    <div id="canvas" class="panel">
    </div>
  </div>
</template>
<style scoped lang="scss">
  #canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    -webkit-tap-highlight-color: transparent;
    user-select: none;
    background: transparent;
  }

  .container {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    padding: 10px;
    border: none;
    z-index: 30;
    background: #f3f3f3;
  }
</style>
<script>
  import { initEcharts } from './helper'
  import isEmpty from 'lodash/isEmpty'
  export default{
    props: {
      textScript: {
        type: String,
        default: ""
      }
    },
    mounted(){
      this.$myChart = initEcharts('canvas')
    },
    watch: {
      textScript(newVal){
        if (!isEmpty(newVal))
          this.setOptions(newVal, true)
      }
    },
    data(){
      return {
        $myChart: null
      }
    },
    methods: {
      setOptions(text, notMerge){
        try {
          let option = null;
          eval(text);
          if (option && typeof option === 'object') {
            this.$myChart.setOption(option, notMerge);
          }
        } catch (e) {
          console.error(e);
          this.$emit("exec",{type:'error',msg:"执行错误"})
        }
      }
    }
  }
</script>
