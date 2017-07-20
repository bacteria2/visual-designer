<template>
  <div :style="mainStyle" style="overflow: hidden">
    <div class="loading" :style="{display:loading?'block':'none'}">
      <img v-if="Math.random()>0.5" src="../../assets/loading.gif">
      <img v-else-if="0.2<Math.random()<0.5"  src="../../assets/loading2.gif">
      <img v-else  src="../../assets/error.png">
    </div>
    <div class="layout" :style="{visibility:loading?'hidden':'visible'}" >
      <div class="layout-item" v-for="{height,width,x,y,z:zIndex,containerId,widgetName} in  dashboard.layouts"
           :style="{height:`${height}px`,width:`${width}px`,left:`${x}px`,top:`${y}px`,zIndex}">
        <component :is="layout.widgetName==='chartContainer'?'ChartContainer':'ExtendContainer'"
                   :widgetName="widgetName"
                   :id="containerId"
                   :dashBord="dashboard"></component>
      </div>
    </div>
    <div class="error_cover"></div>
  </div>
</template>
<style>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #143254;
    text-align: center;
  }
  .layout{
    height: 100%;
    width: 100%;
    position: relative;
  }
  .layout-item{
    position: absolute;
  }
</style>
<script>
  import DashboardFactory from '@/model/src/DashboardFactory'

  let json = DashboardFactory.getBlankDashboard();
  if (process.env.NODE_ENV === 'development') {
    json = require('./testDashboard.json')
  }

  export default{
    computed: {
      scale(){
        return (this.innerWidth) / parseInt(this.dashboard.style.width)
      },
      mainStyle(){
        let borderColor = this.dashboard.style.boarderColor;
        let borderWidth = this.dashboard.style.boarderWidth + 'px';
        let borderStyle = this.dashboard.style.boarderStyle;
        let borderRadius = this.dashboard.style.boardRadius + 'px';
        let backgroundColor = this.dashboard.style.backgroundColor;

        return {
          height: this.dashboard.style.height + 'px',
          width: this.dashboard.style.width + 'px',
          backgroundImage: this.dashboard.style.imgUrl ? `url(${this.dashboard.style.imgUrl})` : null,
          backgroundColor, borderStyle, borderWidth, borderColor, borderRadius,
          transform: `scale(${this.scale})`,
          transformOrigin: "left top  0px"
        }
      },
    },
    mounted(){
      let resp={"success":true,"data":{"id":"demoId","containers":{"eskggjjdf1ef5":{"id":"eskggjjdf1ef5","chartType":"EchartScatter","chartId":"4028a86b5d3ebb43015d3ed1ddeb000d","state":1,"style":{"borderRadius":0,"backgroundColor":null,"borderColor":null,"borderWidth":0,"borderStyle":null,"imgUrl":null,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"opacity":1},"title":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}},"footer":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}}},"eeadhf8eifdca":{"id":"eeadhf8eifdca","chartType":"EchartLine","chartId":"4028a86b5d3b48d1015d3b48d1220000","state":1,"style":{"borderRadius":0,"backgroundColor":null,"borderColor":null,"borderWidth":0,"borderStyle":null,"imgUrl":null,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"opacity":1},"title":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}},"footer":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}}},"eff66hse2e2k5":{"id":"eff66hse2e2k5","chartType":"EchartLine","chartId":"4028a86b5d34b49e015d359b76870010","state":1,"style":{"borderRadius":0,"backgroundColor":null,"borderColor":null,"borderWidth":0,"borderStyle":null,"imgUrl":null,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"opacity":1},"title":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}},"footer":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}}},"ejeh6f2h2iia7":{"id":"ejeh6f2h2iia7","chartType":"EchartBar","chartId":"4028a86b5d39750f015d39ae37da0006","state":1,"style":{"borderRadius":0,"backgroundColor":null,"borderColor":null,"borderWidth":0,"borderStyle":null,"imgUrl":null,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"opacity":1},"title":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}},"footer":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}}}},"extendContainers":{"ef2fbs76ffg81":{"id":"ef2fbs76ffg81","state":-1,"style":{"borderRadius":0,"borderColor":null,"borderWidth":0,"borderStyle":null,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"backgroundColor":null,"opacity":1},"title":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}},"footer":{"show":false,"text":"","style":{"color":"#000","fontSize":14,"fontFamily":null,"height":30,"lineHeight":30,"backgroundColor":null,"textAlign":"center","paddingLeft":0,"paddingRight":0,"zIndex":99}},"extendWidget":{"style":{"backgroundColor":"rgba(219,81,81,1)","opacity":1},"options":{}}}},"layouts":[{"x":540,"y":140,"width":300,"height":300,"active":false,"id":0,"containerId":"eskggjjdf1ef5","widgetName":"chartContainer","z":2},{"x":1320,"y":150,"width":300,"height":300,"active":false,"id":1,"containerId":"eeadhf8eifdca","widgetName":"chartContainer","z":2},{"x":560,"y":460,"width":300,"height":300,"active":false,"id":2,"containerId":"eff66hse2e2k5","widgetName":"chartContainer","z":2},{"x":940,"y":160,"width":300,"height":300,"active":false,"id":3,"containerId":"ejeh6f2h2iia7","widgetName":"chartContainer","z":2},{"x":690,"y":100,"width":950,"height":560,"active":false,"id":4,"containerId":"ef2fbs76ffg81","widgetName":"widgetRectangle"}],"style":{"scale":0.7,"height":1080,"width":1920,"borderRadius":4,"backgroundColor":"#C47C7C","backgroundRepeat":"no-repeat","backgroundPosition":"center","borderColor":"#A75A5A","borderWidth":1,"borderStyle":"solid","imgUrl":null}}}
      setTimeout(()=>{
        this.loading=false
        this.dashboard=resp.data
        console.log(resp.data)
      },5000)
      window.addEventListener('resize',(e)=>{
        this.innerWidth=window.innerWidth;
      })
    },
    data(){
      return {
        innerWidth:window.innerWidth,
        dashboard: json,
        loading:true,
      }
    }
  }
</script>
