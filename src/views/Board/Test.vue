<template>
  <div>
  <button @click="show=true">加载</button>
  <button @click="show=false">取消</button>
  <extend-container-input v-if="show"  :targetObj="targetObj"></extend-container-input>
  </div>
</template>

<script>
  import {ExtendContainer} from '@/model'
  export  default {
    data(){
      let targetObj = new ExtendContainer();
        return {
          targetObj,
          widgetInput:undefined,
          show:false
      }
    }
  }
</script>
