<template>
  <div class="widget-box" :style="containerStyle">
    <el-upload class="avatar-uploader" v-show="false" :id="id"
               action="http://192.168.40.34:8080/ydp-visual-web/ydp/visual/upload/fileUpload.do"
               :multiple="false"
               :show-file-list="false" name="files" :data="{dashboardId:'222222'}"
               :on-success="imageWidgetSuccess">
    </el-upload>
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
      console.log(elem);
      elem.click();
    },
    data(){
      let image = this.dashBord.extendWidgets[this.id];
      if(!image){
        image = {
          id:this.id,
          style:{
            borderRadius: 0,
            opacity:1,
            imgUrl: null,
            backgroundRepeat:"no-repeat",
            backgroundSize:"100%,100%",
          }
        };
        this.dashBord.extendWidgets[this.id] = image ;
      }
      return {
        tools:false,
        image
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
