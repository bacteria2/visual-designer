<template>
    <div  :style="containerStyle"  class="char-container">
    </div>
</template>
<style>
</style>
<script>
  import store from '@/store'
  import containerMixins from "../mixins/containerMixins";
  export default {
    name: "WidgetRectangle",
    props:{
      id: [String,Number],
      dashBord:Object
    },
    mixins:[containerMixins],
    computed:{
      containerStyle(){
        return this.computeStyle(this.rectangle.style);
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
              opacity:1
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
