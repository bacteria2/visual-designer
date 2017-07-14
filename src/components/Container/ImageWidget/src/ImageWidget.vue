<template>
  <div class="widget-box" :style="">

  </div>
</template>
<style>
  .widget-box{
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import store from '@/store'
  export default {
    name: "ImageWidget",
    props:{
      id: [String,Number],
      dashBord:Object,
      containerWidth:Number,
      containerHeight:Number
    },
    computed:{
      containerStyle(){
        let borderColor = this.container.style.borderColor;
        let borderWidth = this.container.style.borderWidth + 'px';
        let borderStyle = this.container.style.borderStyle;
        let borderRadius = this.container.style.borderRadius + 'px';
        let backgroundColor = this.container.style.backgroundColor;
        return {
          backgroundImage:`url(${this.dashBord.imageWidget})`,
          backgroundColor, borderStyle, borderWidth, borderColor, borderRadius,
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
