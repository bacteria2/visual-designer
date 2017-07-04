<template>
  <div>
  <p @click="addBord">添加</p>
  <div class="grid-stack">
    <div class="grid-stack-item"
         data-gs-x="0" data-gs-y="0"
         data-gs-width="4" data-gs-height="2">
      <div class="grid-stack-item-content">aaaaaaaaaaaaa</div>
    </div>
      <div class="grid-stack-item"
         data-gs-x="4" data-gs-y="0"
         data-gs-width="4" data-gs-height="4">
      <div class="grid-stack-item-content"></div>
    </div>
  </div>
  </div>
 </template>

<style>
  body { background-color: #4c4e59}
</style>
  <script type="text/javascript">

    import $ from 'jquery'
    import gridstack from 'gridstack'
    import ui from 'jquery-ui'

    export default {
      mounted(){
        $(function () {
          $('.grid-stack').gridstack();
        });
      },
      methods:{
        addBord(){
          let grid=$('.grid-stack').data('gridstack');
          let elem=$('<div><div class="grid-stack-item-title">hgjadhk</div><div class="grid-stack-item-content"></div></div>');
          grid.addWidget(elem, 0, 0, 1,1, true);
        }
      }
    }
  </script>
