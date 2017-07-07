<template>
  <div>
    <p @click="addBord">添加</p>
    <div class="grid-stack">
      <div v-for="layout in layouts"  class="grid-stack-item"
           :data-gs-x="layout.x" :data-gs-y="layout.y"
           :data-gs-width="layout.w" :data-gs-height="layout.h">
        <div class="grid-stack-item-content">
             <char-container :containerWidth="300" :containerHeight="268"  :id="layout.id" :dashBord="dashBord">
             </char-container>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style  >
  .grid-stack-item-contentr{
    text-align: center;
    background-color: #ffffff;
    -webkit-border-top-right-radius: 5px;
    -webkit-border-bottom-right-radius: 5px;
    -webkit-border-bottom-left-radius: 5px;
    -webkit-border-top-left-radius: 5px;
    -moz-border-radius-topright: 5px;
    -moz-border-radius-bottomright: 5px;
    -moz-border-radius-bottomleft: 5px;
    -moz-border-radius-topleft: 5px;
    border-radius: 5px;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: solid 0px #31B0D5;
    -webkit-box-shadow: 0 1px 2px #31B0D5;
    -moz-box-shadow: 0 1px 2px #31B0D5;
    box-shadow: 0 1px 2px #31B0D5;
  }

</style>
<script type="text/javascript">
  import store from '@/store'
  import CharContainer from '@/components/Container/CharContainer'
  import DashboardFactory from '@/module/DashboardFactory'
  import $ from 'jquery'
  import 'gridstack/dist/gridstack.all'
  import 'gridstack/dist/gridstack.css'
  import { uuid } from '@/utils'

  export default {
    components:{
        CharContainer
    },
    mounted(){
      window.onload = function () {
        let options = {
          cellHeight: 60,
          verticalMargin: 10
        };
        $('.grid-stack').gridstack(options);
      }
    },
    data(){
      //实例对象
      let dashBord =DashboardFactory.getInsance();
      let layouts = dashBord.getLayouts();
      return {
        dashBord,
        layouts
      }
    },
    methods:{
      addBord(){
        let id = uuid();
        let container =  {style:{},tilesStyle:{}};
        let newLayout = {x:2,y:0,w:2,h:2,id:id,container:container};
        /*store.commit('addDashbordLayout',newLayout);*/
        this.layouts.push(newLayout);
      }
    }
  }
</script>
