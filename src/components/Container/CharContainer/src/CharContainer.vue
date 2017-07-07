<template>
  <div :style="customStyle" @mouseover.stop="tools = true" @mouseout.stop="tools = false" class="char-container">
    <div v-show="title" class="container_title" :style="containerTitlerStyle">标题</div>
    <div v-show="tools&&true" class="container_tools_background">
    </div>
    <div v-show="tools&&true" class="container_tools">
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
    <div v-show="!container.isRender()" class="container_progress" :style="{height:'200px',width:'250px'}">
      <v-progress-circular indeterminate class="red--text" v-bind:size="70"></v-progress-circular>
    </div>
    <transition name="fade">
      <div v-show="container.isRender()" :id="id" class="container_charpanel" :style="widthAndHeight"></div>
    </transition>
  </div>
</template>

<style >
</style>

<script>
  import store from '@/store'
  import CharContainer from '@/module/CharContainer'
  import $ from 'jquery'
  export default {
    name: "CharContainer",
    props:{
      id: String,
      dashBord:Object,
      containerWidth:Number,
      containerHeight:Number
    },
    mounted(){
      this.render();
    },
    data(){
        let layouts = this.dashBord.getLayouts();
        let layout = layouts.filter((layout)=>layout.id==this.id);
        let customStyle = layout[0].container.style||{};
        let title = layout[0].container.title||false;
        let containerTitlerStyle = layout[0].container.tilesStyle||{};
        let container = new CharContainer({id:this.id});
        return {
          tools:false,
          title,
          customStyle,
          containerTitlerStyle,
          container,
          widthAndHeight:{height:'200px',width:'250px'},
        }
    },
    methods:{
      /**
       * 渲染组件
       */
      render(){
          this.getWidthAndHeight();
          let self = this;
          setTimeout(function(){
            self.container.render();
          },1);

      },
      getWidthAndHeight(){
          let content = $("#"+this.id);

          if(content){
            let width = this.containerWidth;
            let height = this.containerHeight;
            if(width<=0||height<=0) return;
            //显示标题的情况下减去标题的高度
            if(this.title){
                let titleE = content.parent().find(".container_title");
                if(titleE){
                  height = height - titleE.height();
                }
            }
            let paddingTop = content.parent().css('padding-top').replace('px','');
            let paddingBottom = content.parent().css('padding-bottom').replace('px','');
            let marginTop = content.parent().css('margin-top').replace('px','');
            let marginBottom = content.parent().css('margin-bottom').replace('px','');
            if(paddingTop>0) height = height - paddingTop;
            if(paddingBottom>0) height = height - paddingBottom;
            if(marginTop>0) height = height - marginTop;
            if(marginBottom>0) height = height - marginBottom;
            this.widthAndHeight.height=height+"px";
            this.widthAndHeight.width=width+"px";
          }
      }
    }
  }
</script>
