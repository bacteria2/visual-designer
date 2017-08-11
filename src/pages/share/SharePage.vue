<template>
  <div :style="mainStyle" class="share_board">
    <div class="loading" :style="{display:loading?'block':'none'}">
      <img v-if="Math.random()>0.5" src="../../assets/loading2.gif" class="loading-img">
      <img v-else src="../../assets/loading.gif" class="loading-img">
    </div>
    <div class="layout" :style="{visibility:loading?'hidden':'visible'}">
      <div class="layout-item" v-for="{height,width,x,y,z:zIndex,containerId,widgetName} in  dashboard.layouts"
           :style="{height:`${height}px`,width:`${width}px`,left:`${x}px`,top:`${y}px`,zIndex}">
        <component :is="widgetName==='chartContainer'?'chart-container':'extend-container'"
                   :widgetName="widgetName"
                   :id="containerId"
                   :dashBord="dashboard"></component>
      </div>
    </div>
    <div class="error_cover"></div>
  </div>
</template>

<style>
  .share_board {
    overflow-x: hidden;
    overflow-y: auto;
    transform-origin: left top 0;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #143254;
  }

  .loading-img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    margin: -150px 0 0 -150px;
  }

  .layout {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .layout-item {

  }

  .layout-item {
    position: absolute;

  }
</style>
<script>
  import DashboardFactory from '@/model/src/DashboardFactory'
  import { readDashboard } from "@/services/dashBoardService"


  let json = DashboardFactory.getBlankDashboard();

  export default{
    computed: {
      scale(){
        return (this.innerWidth) / parseInt(this.dashboard.style.width)
      },
      mainStyle(){
        if (!this.loading) {
          let borderColor = this.dashboard.style.boarderColor;
          let borderWidth = this.dashboard.style.boarderWidth + 'px';
          let borderStyle = this.dashboard.style.boarderStyle;
          let borderRadius = this.dashboard.style.boardRadius + 'px';
          //let backgroundColor = this.dashboard.style.backgroundColor;
          //let background = this.dashboard.style.imgUrl ? `url(https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/ea0c33d413277331fd81909835340c12.jpg) 0% 0% / 100%` : null
          return {
            height: this.dashboard.style.height + 'px',
            width: this.dashboard.style.width + 'px',
            borderStyle, borderWidth, borderColor, borderRadius,
            transform: `scale(${this.scale})`,
          }
        }
        return {}
      },
    },
    async mounted(){

      //根据url id参数，读取记录
       let reg = new RegExp("(^| )id=([^;]*)(;|$)"), result = window.location.search.substr(1).match(reg);
       let id = (result && result[2])?result[2]:'testId';

      //加载数据
      let data = await DashboardFactory.getInstance(id);
      if (data) {
        this.dashboard = data;
        document.body.style.backgroundColor = this.dashboard.style.backgroundColor;
        document.body.style.backgroundImage = this.dashboard.style.backgroundImage ? `url(${this.dashboard.style.backgroundImage})` : null;
        document.body.style.backgroundSize = '100%'
          setTimeout(() => {
            this.loading = false
          }, 2000)

        window.addEventListener('resize', (e) => {
          this.innerWidth = window.innerWidth;
        })
      }
    },
    data(){
      return {
        innerWidth: window.innerWidth,
        dashboard: json,
        loading: true,
      }
    },
    methods: {}
  }
</script>
