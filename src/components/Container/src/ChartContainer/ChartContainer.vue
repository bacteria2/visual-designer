<template>
  <div class="char-container">
    <!----------标题----------->
    <div  :style="titleStyle" v-show="container.title.show">{{container.title.text}}</div>
    <!----------/标题----------->
    <div  :style="containerStyle"  class="char-container">
       <div :id="id"  class="container_charpanel" ></div>
      <div v-if="!container.isRender()" class="container_progress" >
        <v-progress-circular indeterminate class="red--text" v-bind:size="70"></v-progress-circular>
      </div>
    </div>
    <!----------页脚---------->
    <div style="height:20px; background-color: red" v-show="container.footer.show">页脚</div>
    <!----------/页脚---------->
  </div>
</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
<script>
  import store from '@/store'
  import debounce from 'lodash/debounce'
  import containerMixins from "../mixins/containerMixins";
  export default {
    name: "ChartContainer",
    props:{
      id: [String,Number],
      dashBord:Object
    },
    mixins:[containerMixins],
    watch:{
      'container.style.paddingTop'(){
          this.debounceRender(this.container);
      },
      'container.style.paddingBottom'(){
        this.debounceRender(this.container);
      },
      'container.style.paddingLeft'(){
        this.debounceRender(this.container);
      },
      'container.style.paddingRight'(){
        this.debounceRender(this.container);
      },
      'container.title.show'(){
        this.debounceRender(this.container);
      },
      'container.footer.show'(){
        this.debounceRender(this.container);
      },
    },
    computed:{
      containerStyle(){
        return this.computeStyle(this.container.style);
      },
      titleStyle(){
        return this.computeStyle(this.container.title.style);
      }
    },
    mounted(){
      this.render(this.container);
    },
    data(){
        let container = this.dashBord.getContainer(this.id);
        return {
          container
        }
    },
    methods:{
      /**
       * 延迟渲染组件
       */
      debounceRender:debounce((container)=>{container.perRender();},1000,{leading: true}),
      /**
       * 渲染组件
       */
      render(){
          this.container.perRender();
      }
      /*render(container){
        container.perRender();
      }*/
    }
  }
</script>
