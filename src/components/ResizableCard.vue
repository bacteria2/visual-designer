<template>
  <div id="resizable"   style="width: 80%; border: 1px solid red;"  class="ui-widget-content ui-resizable" @mouseup.prevent="test" @mousedown.prevent="dragHandler" @mousemove="handler">
    <Card>
      <p slot="title">缩放（Resizable</p>
      <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
    </Card>
    <div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;" @mouseover="horizontalHandler"
         @selectstart="dragHandler($event,0)"></div>
    <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;" @mouseover="verticalHandler" ></div>
    <div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"></div>
  </div>
</template>
<style scoped>
  .ui-icon, .ui-widget-content .ui-icon {
    /*noinspection CssUnknownTarget*/
    background-image: url(../assets/images/ui-icons_222222_256x240.png);
  }

  .ui-icon-gripsmall-diagonal-se {
    background-position: -64px -224px;
  }

  .ui-resizable-e {
    cursor: e-resize;
    width: 7px;
    right: -5px;
    top: 0;
    height: 100%;
  }

  .ui-resizable-handle {
    position: absolute;
    font-size: .1px;
    display: block;
  }

  .ui-resizable-s {
    cursor: s-resize;
    height: 7px;
    width: 100%;
    bottom: -5px;
    left: 0;
  }

  .ui-resizable-se {
    cursor: se-resize;
    width: 12px;
    height: 12px;
    right: 1px;
    bottom: 1px;
  }

  .ui-resizable {
    resize: horizontal;
    position: relative;
    border: 1px solid red;
  }
</style>
<script>
  export default{
    mounted(){

    },
    props: {
      width: {
        type:String ,
        default: '80%'
      },
      maxHeight: null,
      maxWidth: null,
      zIndex: 90,
    },
    data(){
      let style={width:this.width};
      return {
        style,
        minHeight: 10,
        minWidth: 10,
        position:{
          startX:0,
          startY:0
        },
        currentWidth:0,
        currentTop:0,
        resize: false,
      }
    },
    methods: {
      test(){
        console.log(123123);
        this.resize=false;
      },
      dragHandler(event){
        this.resize=true;
        let element=event.srcElement;
        if(element.className.search("ui-resizable-handle")!==-1){
          this.resize=true;
          console.log("resize!!!!")
        }
      },
      horizontalHandler(event){
        console.log(event,"mouse up")
        event.srcElement
        this.resize=false;
      },
      verticalHandler(event){
        console.log(event,"mouse up")
        this.resize=false;
      },
      handler(event){
        console.log(event)
      }
    }
  }
</script>
