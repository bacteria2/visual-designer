<template>
  <div class="ydp">
    <view-header title="Dashboard编辑器">
      <v-btn light class="blue-grey" @click.native="addBord">添加布局<v-icon right light>add</v-icon></v-btn>
      <v-btn light class="blue-grey" @click.native="pageSet">页面设置<v-icon right light>web</v-icon></v-btn>
    </view-header>
    <main>
      <Dash-page></Dash-page>
    </main>
  </div>
</template>

<style scoped lang="scss">
  .ydp{
    height: 100%;
    position: relative;
  }
  .toolbar{
    position: absolute;
  }
  main{
    height: 100%;
    box-sizing: border-box;
    padding-top: 56px;
    overflow: auto;
  }
</style>
  <script type="text/javascript">

    import store from '@/store'
    import DashPage from './DashPage'
    import $ from 'jquery';
    import 'jquery-ui';

    export default {
      components:{
        DashPage
      },
      mounted(){

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
            let newLayout = {x:0,y:0,w:1,h:1,id:id,container:{}};
            store.commit('addDashbordLayout',newLayout);
        },
        pageSet(){
          $(".ydp-dashPage").css({background:"#fffbb9",padding:10});
        }
      }
    }
  </script>
