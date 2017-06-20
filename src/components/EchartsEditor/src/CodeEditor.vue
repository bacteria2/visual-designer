<template>
  <div class="container">
    <header><el-button @click='switchView(1)'>1</el-button><el-button @click='switchView(2)'>2</el-button></header>

    <div v-if="panelIndex==1" class="main-panel">
      <ace :style="style.ace" class="ace" :script.sync="script"></ace>
      <div id="h-handler" class="handler" :style="style.handler" @mousedown="handlerDown=true"></div>
      <echart-board ref="echart" :style="style.echart" :text-script="script" class="echart-board" :custom-style="{padding:0}"></echart-board>
    </div>
    <div v-if="panelIndex==2"  class="main-panel">
      <chart-editor></chart-editor>
      <echart-board ref="echart" :style="style.echart" :text-script="script" class="echart-board" :custom-style="{padding:0}"></echart-board>
    </div>
  </div>
</template>
<style scoped lang="scss">
  header {
    height: 47px;
  }
  .container {
    background-color: #f3f3f3;
    height: 100%;
    .main-panel{
      .ace{
        height: 100%;
        width: 40%;
      }
      position: relative;
      height: calc(100% - 47px);
      .handler {
        position: absolute;
        left: 40%;
        top: 0;
        bottom: 0;
        width: 10px;
        cursor: col-resize;
        z-index: 100;
        background-color: transparent;
        border-left: 1px solid #ccc;
      }
      .echart-board{
        position: absolute;
        top: 0;
        right: 0;
        width: 60%;
      }
    }

  }
</style>
<script>
  import Ace from '../../Brace'
  import EchartBoard from './EchartsPanel.vue'
  import ChartEditor from './ChartEditor.vue'
  import { loadTextScript } from '@/services/EditorService'
  import { debounceExec,beautifyJs } from '@/utils'
  import ElButton from '../../../../node_modules/element-ui/packages/button/src/button'

  export default{
    name: "Editor",
    props: {
      id: {
        type: String,
        default: "2"
      }
    },
    mounted(){
      window.addEventListener("mouseup", () => this.handlerDown = false);
      window.addEventListener("mousemove", this.handlerMove);

      if (this.id) {
        loadTextScript({id: this.id}).then((resp) => {
          if (resp.success) {
            this.script = beautifyJs(resp.text)
          }
          else console.log(resp.message, resp.data)
        })
      }
    },
    components: {
      ElButton,ChartEditor,
      Ace, EchartBoard
    },
    data(){
      return {
        panelIndex:1,
        style: {
          ace: {
            width: "40%"
          },
          handler: {
            left: "40%",
          },
          echart: {
            left: "40%",
            width: "60%"
          }
        },
        script: "",
        handlerDown: false
      }
    },
    methods: {
      handlerMove(e){
        if (this.handlerDown) {
          let left = e.clientX / window.innerWidth;
          let percentage = Math.min(0.9, Math.max(0.1, left));
          left = percentage * 100;
          this.style.ace.width = left + "%";
          this.style.echart.width = (100 - left) + "%";
          this.style.echart.left = left + "%";
          this.style.handler.left = left + "%";
          if (this.$refs && this.$refs.echart)
            debounceExec(_ => this.$refs.echart.$myChart.resize(), 500)
        }
      },
      switchView(index){
        this.panelIndex=index;
      }
    },

  }
</script>
