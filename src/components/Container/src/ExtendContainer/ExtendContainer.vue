<template>
  <div class="char-container" >
    <div style="position: absolute; width: 100%; height: 100%; z-index: 0 " :style="containerStyle"></div>
    <!----------标题----------->
    <div  :style="titleStyle" v-show="container.title.show">{{container.title.text}}</div>
    <!----------/标题----------->
    <div :style="charStyle"   class="char-container">
      <!----------扩展组件----------->
      <!--两种渲染方式：1 组件渲染 2 JavaScript方法渲染-->
      <component  v-if="isCompontRender" :is="widgetComponent" :id="id"
                 :options="container.extendWidget.options"
                 :styles="extendWidgetStyle"  v-loading.body="!container.isRender()">
      </component>

      <div v-else :id="id"  class="container_charpanel"  v-loading.body="!container.isRender()" ></div>
      <!----------/扩展组件----------->
    </div>
    <!----------页脚---------->
    <div :style="footerStyle" v-show="container.footer.show">{{container.footer.text}}</div>
    <!----------/页脚---------->
  </div>
</template>
<style scoped>
  p{
    padding: 0;
    margin: 0;
  }
  .char-container,.container_charpanel { width: 100%; height: 100%}
</style>
<script>
  import containerMixins from "../../mixins/containerMixins";

  export default {
    name: "ExtendContainer",
    mixins:[containerMixins],
    props:{
      widgetName:{
        type:String
      }
    },
    watch:{
      'container.extendWidget.options'(){
        if(!this.isCompontRender){
          this.debounceRender();
        }
      }
    },
    mounted(){
      if(widgetConfigs.simpleWidgets&&this.widgetName){
        let extendWidgetConfigs = widgetConfigs.simpleWidgets.filter((widget)=>widget.name===this.widgetName);
        let extendWidgetConfig = extendWidgetConfigs[0];
        if(extendWidgetConfig.component){
          //通过组件渲染
          this.widgetComponent = extendWidgetConfig.component;
        }else if(extendWidgetConfig.renderClass&&extendWidgetConfig.dependency){
          //通过javascript渲染
          this.isCompontRender = false;
          this.container.widgetConfigs.renderClass = extendWidgetConfig.renderClass;
          this.container.widgetConfigs.dependency = extendWidgetConfig.dependency;
          this.render();
        }
      }
    },
    computed:{
      extendWidgetStyle(){
        let style = this.computeStyle(this.container.extendWidget.style);
        if(this.container.style.borderRadius&&!this.container.title.show) { //
          style.borderRadius = this.container.style.borderRadius + "px"+" "+this.container.style.borderRadius + "px";
        }else{
          style.borderRadius = "0px 0px "
        }
        if(this.container.style.borderRadius&&!this.container.footer.show) { //
          style.borderRadius =style.borderRadius + this.container.style.borderRadius + "px"+" "+this.container.style.borderRadius + "px";
        }else{
          style.borderRadius = style.borderRadius +"0px 0px"
        }
        return style;
      }
    },
    data(){
      let container = this.dashBord.getExtendWidget(this.id);
      return {
        container,
        widgetComponent:'',
        isCompontRender:true
      }
    },
    methods:{

    }

  }
</script>
