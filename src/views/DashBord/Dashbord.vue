<template>
  <div>
  <p @click="addBord">添加</p>
  <div class="grid-stack">


    <div v-for="layout in layouts" style="" class="grid-stack-item"
         :data-gs-x="layout.x" :data-gs-y="layout.y"
         :data-gs-width="layout.w" :data-gs-height="layout.h">
      <div class="grid-stack-item-content">
        <char-container id="abc"></char-container>
      </div>
    </div>

  </div>
  </div>
 </template>

<style scoped lang="scss">
  div {
    border:1px solid #999;
  }

</style>
  <script type="text/javascript">
    import Vue from 'vue'
    import store from '@/store'
    import CharContainer from '@/components/CharContainer'
    import $ from 'jquery'
    import gridstack from 'gridstack'
    import ui from 'jquery-ui'

    Vue.component(CharContainer.name,CharContainer);

    export default {
      components:{
        CharContainer
      },
      mounted(){
        $(function () {
          $('.grid-stack').gridstack();
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
            let id = Math.random();
            let newLayout = {x:0,y:0,w:1,h:1,};
            store.commit('addDashbordLayout',newLayout);

        }
      }
    }
  </script>
