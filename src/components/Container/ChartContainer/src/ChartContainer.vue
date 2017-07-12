<template>
  <div class="char-container">
    <div  :style="container.style" @mouseover.stop="tools = true" @mouseout.stop="tools = false" class="char-container">
      <!--  <div v-show="container.title" class="container_title" :style="container.tileStyle">标题</div>-->
        <div v-show="tools" class="container_tools_background">
        </div>
        <div v-show="tools" class="container_tools">
          <v-btn v-tooltip:bottom="{html:'添加图表'}" icon small class="container_tools_btn">
            <v-icon class="deep-orange--text">add</v-icon>
          </v-btn>
          <v-btn icon small v-tooltip:bottom="{html:'删除图表'}" class="container_tools_btn">
            <v-icon class="deep-orange--text">delete</v-icon>
          </v-btn>
          <v-btn icon small v-tooltip:bottom="{html:'设置'}"  class="container_tools_btn">
          <v-icon class="deep-orange--text">settings</v-icon>
        </v-btn>
        </div>
       <div :id="id" class="container_charpanel" ></div>
    </div>
    <div v-if="!container.isRender()" class="container_progress" >
      <v-progress-circular indeterminate class="red--text" v-bind:size="70"></v-progress-circular>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import store from '@/store'
  export default {
    name: "ChartContainer",
    props:{
      id: [String,Number],
      dashBord:Object,
      containerWidth:Number,
      containerHeight:Number
    },
    mounted(){
      this.render();
    },
    data(){
        let container = this.dashBord.getContainer(this.id);
        return {
          tools:false,
          container
        }
    },
    methods:{
      /**
       * 渲染组件
       */
      render(){
//          this.container.setWidthAndHeight();
          let self = this;
          setTimeout(function(){
            self.container.perRender();
          },1);
      }
    }
  }
</script>
