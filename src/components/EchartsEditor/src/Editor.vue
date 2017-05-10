<template>
  <div class="main-container">
    <ace :style="style.ace" :script.sync="script"> </ace>
    <div id="h-handler" class="handler" :style="style.handler" @mousedown="handlerDown=true"></div>
    <echart-board :style="style.echart" ref="echart" :text-script="script"></echart-board>
  </div>
</template>
<style scoped lang="scss">
  .main-container {
    background-color: #f3f3f3;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
  }
</style>
<script>
  import Ace from './Ace.vue'
  import EchartBoard from './EchartsPanel.vue'
  import { loadTextScript } from '@/services/EditorService'

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
            this.script = resp.text
          }
          else console.log(resp.message, resp.data)
        })
      }
    },
    components: {
      Ace, EchartBoard
    },
    data(){
      return {
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
            this.$refs.echart.$myChart.resize();
        }
      }
    }
  }
</script>
