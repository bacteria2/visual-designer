<template>
  <div class="char-container" >
    <div style="position: absolute; width: 100%; height: 100%; z-index: 0 " :style="containerStyle"></div>
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

<style scoped>
  .char-container,.container_charpanel { width: 100%; height: 100%}
</style>

<script>
  import containerMixins from "../../mixins/containerMixins";
  export default {
    name: "ChartContainer",
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
    mounted(){
      this.render();
    },
    data(){
      let container = this.dashBord.getContainer(this.id);
      return {
        container
      }
    }
  }
</script>
