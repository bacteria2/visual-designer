<template>
  <div>
  <p @click="addBord">添加</p>
  <div class="grid-stack">


    <div v-for="layout in layouts" style="" class="grid-stack-item"
         :data-gs-x="layout.x" :data-gs-y="layout.y"
         :data-gs-width="layout.w" :data-gs-height="layout.h">
      <div class="grid-stack-item-content">
        <!--<char-container id="abc"></char-container>-->
      </div>
    </div>

  </div>
  </div>
 </template>

<style scoped lang="scss">
  .grid-stack-item{
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
    border: solid 1px #31B0D5;
    -webkit-box-shadow: 0 1px 2px #31B0D5;
    -moz-box-shadow: 0 1px 2px #31B0D5;
    box-shadow: 0 1px 2px #31B0D5;
  }
  .grid-stack-highlight{
    border:1px dotted red;
    box-shadow:none;
  }

</style>
  <script type="text/javascript">

    import store from '@/store'
    import CharContainer from '@/components/CharContainer'
//    import $ from 'jquery/dist/jquery.min'
    import 'gridstack/dist/gridstack.css'
    import $ from 'gridstack/dist/gridstack.all'


    export default {
      components:{
        CharContainer
      },
      mounted(){
        $(function () {
            let options = {
              cellHeight: 60,
              verticalMargin: 10
            };
            $('.grid-stack').gridstack(options);
        });
      },
      data(){
          let layouts = store.getters.getLayouts;
          return {
            layouts
          }
      },
      methods:{
        addBord(){
            let id = Math.random().toString(36).substr(2,32);
            let newLayout = {x:1,y:2,w:4,h:4,id:id,container:{}};
            store.commit('addDashbordLayout',newLayout);
        }
      }
    }
  </script>
