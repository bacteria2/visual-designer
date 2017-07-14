<template>
    <div  :style="containerStyle"  class="char-container">
    </div>
</template>
<style>
</style>
<script>
  import store from '@/store'
  import {clone} from '@/utils'
  export default {
    name: "WidgetRectangle",
    props:{
      id: [String,Number],
      dashBord:Object
    },
    computed:{
      containerStyle(){
        let style = clone(this.rectangle.style);
        for(let key of Object.keys(style)){
            let value = style[key];
            if(!isNaN(value)){ //值为数值
              style[key] = value + 'px';
            }else if(key==='backgroundImage'){
                if(value){
                  style[key] = `url(${value})`;
                }
            }
        }
        return style;

      }
    },
    mounted(){
//      this.render();
    },
    data(){

      let rectangle = this.dashBord.extendWidgets[this.id];

        if(!rectangle){
          rectangle = {
            id:this.id,
            style:{
              borderRadius: 0,
              backgroundColor: null,
              borderColor: null,
              borderWidth: null,
              borderStyle: null,
              imgUrl: null,
            }
          }
          this.dashBord.extendWidgets[this.id] = rectangle ;
        }

        return {
          tools:false,
          rectangle
        }
    }
  }
</script>
