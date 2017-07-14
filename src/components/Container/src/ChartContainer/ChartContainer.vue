<template>
  <div class="char-container">
    <div style="height:100px; background-color: red">标题</div>
    <div  :style="containerStyle" @mouseover.stop="tools = true" @mouseout.stop="tools = false" class="char-container">
       <div :id="id" class="container_charpanel" ></div>
      <div v-if="!container.isRender()" class="container_progress" >
        <v-progress-circular indeterminate class="red--text" v-bind:size="70"></v-progress-circular>
      </div>
    </div>
    <div style="height:20px; background-color: red">页脚</div>
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
      dashBord:Object
    },
    watch:{
      'container.style.paddingTop'(){
         this.container.perRender();
      },
      'container.style.paddingBottom'(){
        this.container.perRender();
      },
      'container.style.paddingLeft'(){
        this.container.perRender();
      },
      'container.style.paddingRight'(){
        this.container.perRender();
      }
    },
    computed:{
      containerStyle(){
        let borderColor = this.container.style.borderColor;
        let borderWidth = this.container.style.borderWidth + 'px';
        let borderStyle = this.container.style.borderStyle;
        let borderRadius = this.container.style.borderRadius + 'px';
        let backgroundColor = this.container.style.backgroundColor;
        let paddingTop = this.container.style.paddingTop + 'px';
        let paddingBottom = this.container.style.paddingBottom + 'px';
        let paddingLeft = this.container.style.paddingLeft + 'px';
        let paddingRight = this.container.style.paddingRight + 'px';
        return {
          backgroundImage: this.container.style.imgUrl ? `url(${this.container.style.imgUrl})` : null,
          backgroundColor, borderStyle, borderWidth, borderColor, borderRadius,paddingTop,paddingBottom,
          paddingLeft,paddingRight,
          backgroundRepeat:'no-repeat',
          backgroundPosition:'center'
        }
      }
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
