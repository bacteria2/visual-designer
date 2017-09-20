<template>
  <div class="char-container" :style="containerStyle">
    <div style="position: absolute; width: 100%; height: 100%; z-index: 0 " :style="backgroundPannelStyle"></div>
    <!----------标题----------->
    <div  :style="titleStyle" v-show="container.title.show">{{container.title.text}}</div>
    <!----------/标题----------->
    <div :style="charStyle" :id="id +'_container'"  class="char-container">
      <div :id="id"  class="container_charpanel"  v-loading.body="!container.isRender()" ></div>
    </div>
    <!----------页脚---------->
    <div :style="footerStyle" v-show="container.footer.show">{{container.footer.text}}</div>
    <!----------/页脚---------->
  </div>
</template>

<style >
  .char-container,.container_charpanel { width: 100%; height: 100%}
/*  .char-container { position: relative; height: 100%; width: 100%; padding: 0; border: 0px solid #999; display: flex;
    flex-direction:column;align-items:stretch;
  }
  .char-container .container_charpanel{flex-grow: 1; position: relative; width: 100%;height: 100%;}*/
</style>

<script>
  import containerMixins from "../../mixins/containerMixins";
  export default {
    name: "ChartContainer",
    mixins:[containerMixins],
    watch:{
      'container.style.paddingTop'(){
        this.debounceResize(this.container);
      },
      'container.style.paddingBottom'(){
        this.debounceResize(this.container);
      },
      'container.style.paddingLeft'(){
        this.debounceResize(this.container);
      },
      'container.style.paddingRight'(){
        this.debounceResize(this.container);
      },
      'container.title.show'(){
        this.debounceResize(this.container);
      },
      'container.footer.show'(){
        this.debounceResize(this.container);
      },
    },
    destroy(){
      this.container.destroy();
    },
    async mounted(){
      await this.render();
      //定时刷新
      if(this.container){ //开启定时
        if(this.container.interval.openInterval){
          this.container.interval.id = setInterval(this.container.reRoadData.bind(this.container),this.container.interval.sec*1000);
        }else{
          clearInterval(this.container.interval.id);
        }
      }

    },
    data(){
      let container = this.dashboard.getContainer(this.id);
      return {
        container
      }
    }
  }
</script>
