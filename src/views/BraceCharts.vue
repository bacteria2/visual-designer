<template>
  <div class="brace-charts__header full-height">
    <view-header title="原始图表新增">
      <v-btn light class="blue-grey">保存原始图表<v-icon right light>cloud_upload</v-icon></v-btn>
    </view-header>
    <main class="brace-charts__container blue-grey darken-1">
      <brace id="dimensionEdit" :style="style.ace"  :script.sync="script"></brace>
      <div id="h-handler" class="handler" :style="style.handler" @mousedown="handlerDown=true"></div>
      <div :style="style.echart" class="echart-board">
        <text-echarts ref="echart"  :text-script="script" ></text-echarts>
      </div>
    </main>
  </div>
</template>
<script>
  import { loadTextScript } from '@/services/EditorService'
  import { debounceExec,beautifyJs } from '@/utils'

  export default{
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
    data(){
      return {
        loading:false,
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
        script: `option={backgroundColor: '#cd7845',tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{feature:{mark:{show:true},dataView:{show:true,readOnly:true},magicType:{show:false,type:["line","bar"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value",name:"°C"}],series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10]},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0]}],color:["rgb(209, 117, 117)","rgb(146, 78, 219)"],grid:{x:47,y:64,x2:124,y2:27}}`,
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
            debounceExec(_ => this.$refs.echart.resizeChart(), 500)
        }
      },
      switchView(index){
        this.panelIndex=index;
      }
    },

  }
</script>
