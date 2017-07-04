<template>
  <div>
  <p @click="addBord">添加</p>
  <div class="grid-stack">


    <div v-for="layout in layouts" style="" class="grid-stack-item"
         :data-gs-x="layout.x" :data-gs-y="layout.y"
         :data-gs-width="layout.w" :data-gs-height="layout.h">
      <div class="grid-stack-item-content">{{layout.html}}</div>
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

    import $ from 'jquery'
    import gridstack from 'gridstack'
    import ui from 'jquery-ui'

    let layoutArr =[{x:0,y:0,w:1,h:1,html:'哈哈哈',style:''},{x:0,y:0,w:1,h:1,html:'嘻嘻嘻'}];

    export default {
      mounted(){
        $(function () {
          $('.grid-stack').gridstack();
        });
      },
      data(){
          return {
              layouts:layoutArr
          }
      },
      methods:{
        addBord(){
            let newLayout = {x:0,y:0,w:1,h:1,html:'...'};
            this.layouts.push(newLayout);
        }
      }
    }
  </script>
