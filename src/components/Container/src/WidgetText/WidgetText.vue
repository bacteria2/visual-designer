<template>
  <div class="widget-text" :style="containerStyle" v-text="getText">

  </div>
</template>
<style>
  .widget-text{
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import store from '@/store'
  import {clone} from '@/utils'
  export default {
    name: "WidgetText",
    props:{
      id: [String,Number],
      dashBord:Object,
    },
    computed:{
      containerStyle(){
        let style = clone(this.text.style);
        for(let key of Object.keys(style)){
          let value = style[key];
          if(!isNaN(value)){ //值为数值
            if(key==='opacity'){
              style[key] = value;
            }else{
              style[key] = value + 'px';
            }
          }
        }
        return style;
      },
      getText(){
          let text=clone(this.text.elemText);
          return text;
      }
    },
    mounted(){

    },
    data(){
      let text = this.dashBord.extendWidgets[this.id];
      if(!text){
        text = {
          id:this.id,
          style:{
            color:null,
            fontSize:14,
            fontFamily:null,
            fontWeight:null,
            fontStyle:null,
            textDecoration:null,
            textAlign:null,
            borderRadius: 0,
            opacity:1,
            backgroundColor: null,
            borderColor: null,
            borderWidth: null,
            borderStyle: null,
            overflow:"hidden",
            paddingTop: null,
            paddingRight: null,
            paddingBottom: null,
            paddingLeft: null,
          },
          elemText:null,
        };
        this.dashBord.extendWidgets[this.id] = text ;
      }
      return {
        tools:false,
        text,
        a:true
      }
    },
    methods:{

    }
  }
</script>
