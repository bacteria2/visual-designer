<template>
  <div class="char-container" :style="containerStyle">
    <!----------标题----------->
    <div  :style="titleStyle" v-show="container.title.show">{{container.title.text}}</div>
    <!----------/标题----------->
    <div :style="widgetStyle"   class="char-container">
      <!----------扩展组件----------->
      <component :is="widgetComponent" :id="id"
                 :options="container.extendWidget.options"
                 :styles="extendWidgetStyle">
      </component>
      <!----------/扩展组件----------->
      <!----------加载中...---------->
      <div v-if="!container.isRender()" class="container_progress" >
        <v-progress-circular indeterminate class="red--text" v-bind:size="70"></v-progress-circular>
      </div>
      <!----------/加载中...---------->
    </div>
    <!----------页脚---------->
    <div :style="footerStyle" v-show="container.footer.show">{{container.footer.text}}</div>
    <!----------/页脚---------->
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import containerMixins from "../mixins/containerMixins";
  import WidgetRectangle from "@/components/Container/src/WidgetRectangle/WidgetRectangle.js"
  import Vue from 'vue'

  export default {
    name: "ExtendContainer",
    components:{WidgetRectangle},
    props:{
      id: [String,Number],
      dashBord:Object,
      type:String
    },
    mixins:[containerMixins],
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
            titleStyle.borderRadius =  this.container.style.borderRadius +'px' +" " + this.container.style.borderRadius +'px' +" 0px 0px";
          }
        return titleStyle;
      },
      footerStyle(){
        let footerStyle = this.computeStyle(this.container.footer.style);
        if(this.container.style.borderRadius){ //
          footerStyle.borderRadius ="0px 0px " + this.container.style.borderRadius +'px' +" " + this.container.style.borderRadius +'px';
        }
        return footerStyle;
      },
      widgetStyle(){
        let charStyle ={};
        if(this.container.style.paddingTop) charStyle.paddingTop = this.container.style.paddingTop + "px";
        if(this.container.style.paddingBottom) charStyle.paddingBottom = this.container.style.paddingBottom + "px";
        if(this.container.style.paddingLeft) charStyle.paddingLeft = this.container.style.paddingLeft + "px";
        if(this.container.style.paddingRight) charStyle.paddingRight = this.container.style.paddingRight + "px";
        return charStyle;
      },
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
        widgetComponent:'WidgetRectangle'
      }
    }

  }
</script>
