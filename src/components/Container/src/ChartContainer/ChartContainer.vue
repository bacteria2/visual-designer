<template>
  <div class="char-container" >
    <div style="position: absolute; width: 100%; height: 100%; z-index: 0 " :style="containerStyle"></div>
    <!----------标题----------->
    <div  :style="titleStyle" v-show="container.title.show">{{container.title.text}}</div>
    <!----------/标题----------->
    <div :style="charStyle"   class="char-container">
      <div :id="id"  class="container_charpanel" ></div>
      <div v-if="!container.isRender()" class="container_progress" >
        <v-progress-circular indeterminate class="red--text" v-bind:size="70"></v-progress-circular>
      </div>
    </div>
    <!----------页脚---------->
    <div :style="footerStyle" v-show="container.footer.show">{{container.footer.text}}</div>
    <!----------/页脚---------->
  </div>

</template>
<script>
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
        let containerStyle = this.computeStyle(this.container.style);
        delete containerStyle.paddingTop;
        delete containerStyle.paddingBottom;
        delete containerStyle.paddingLeft;
        delete containerStyle.paddingRight;
        return containerStyle;
      },
      titleStyle(){
          let titleStyle = this.computeStyle(this.container.title.style);
          if(this.container.style.borderRadius){ //
            titleStyle.borderRadius =  this.container.style.borderRadius +'px' +" " + this.container.style.borderRadius +'px' +" 0 0";
          }
        return titleStyle;
      },
      footerStyle(){
        let footerStyle = this.computeStyle(this.container.footer.style);
        if(this.container.style.borderRadius){ //
          footerStyle.borderRadius ="0 0 " + this.container.style.borderRadius +'px' +" " + this.container.style.borderRadius +'px';
        }
        return footerStyle;
      },
      charStyle(){
          let charStyle ={};
          if(this.container.style.paddingTop) charStyle.paddingTop = this.container.style.paddingTop + "px";
          if(this.container.style.paddingBottom) charStyle.paddingBottom = this.container.style.paddingBottom + "px";
          if(this.container.style.paddingLeft) charStyle.paddingLeft = this.container.style.paddingLeft + "px";
          if(this.container.style.paddingRight) charStyle.paddingRight = this.container.style.paddingRight + "px";
          return charStyle;
      }
    },
    mounted(){
      this.render();
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
    }
  }
</script>
