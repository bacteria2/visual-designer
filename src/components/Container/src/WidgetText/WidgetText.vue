<template>
  <div class="widget-text" :style="containerStyle">

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
  import {clone} from '@/utils'
  export default {
    name: "ImageWidget",
    props:{
      id: [String,Number],
      dashBord:Object,
    },
    computed:{
      containerStyle(){
        let style = clone(this.image.style);
        for(let key of Object.keys(style)){
          let value = style[key];
          if(!isNaN(value)){ //值为数值
            if(key==='opacity'){
              style[key] = value;
            }else{
              style[key] = value + 'px';
            }
          }else if(key==='imgUrl'){
            if(value){
              style["backgroundImage"] = `url(${value})`;
            }
          }
        }
        return style;
      }
    },
    mounted(){
      let elem=document.getElementById(this.id).getElementsByClassName('el-upload__input')[0];
      elem.click();
    },
    data(){
      let text = this.dashBord.extendWidgets[this.id];
      if(!text){
        text = {
          id:this.id,
          style:{
            borderRadius: 0,
            opacity:1,
            imgUrl: null,
            backgroundRepeat:"no-repeat",
            backgroundSize:"100%,100%",
          }
        };
        this.dashBord.extendWidgets[this.id] = text ;
      }
      return {
        tools:false,
        text
      }
    },
    methods:{
      imageWidgetSuccess(resp){
        if (resp.success){
          this.image.style.imgUrl =  resp.data.url;
        }
      }
    }
  }
</script>
