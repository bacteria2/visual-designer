<template>
  <div>
    <mu-dialog :open="showDialog" title="数据集定义" dialogClass="data-definition-column">
      <div style="height: 600px;width: 730px;border:1px dashed">
        <brace id="code" :style="style.ace" :script="dataSet" :showToolbar="false"></brace>
      </div>
      <mu-flat-button slot="actions" @click="close" >确定</mu-flat-button >
    </mu-dialog>
  </div>
</template>
<script>
  import store from '@/store'
  import {beautifyJs} from '@/utils'

  export default{
    store,
    props: {
      show: Boolean,
    },
    computed:{
      dataSet(){
          let ds = store.getters.getDataSet;
          return beautifyJs(JSON.stringify(ds))
      }
    },
    watch:{
        show(val){
            this.showDialog = val
        }
    },
    data(){
      return {
        showDialog: this.show,
        style: {
          ace: {width: "100%",}
        }
      }
    },
    methods: {
      close(){
        this.$emit("update:show", false);
      }
    }
  }
</script>
