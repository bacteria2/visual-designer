<template>
  <div class="searchWrap">
    <div :id="divid" :class="divid" class="searchWrap ">
      <span  class="spanWidget">ssssssssss</span>
      <span  >ssssssssss</span>
    </div>
  </div>
</template>
<style scoped>
  .searchWrap { position: relative; width: 100%; height: 100%}
</style>
<script>
  import dragula from "dragula";
  import Sortable from "sortablejs";
  import  "dragula/dist/dragula.min.css";

  import { uuid, message, clone } from '@/utils'
  export default {

  name: 'WidgetSearch',
  props:{
    styles:Object,
    options:Object
  },
  mounted(){
    var el = document.getElementById(this.divid);
    var sortable = Sortable.create(el);

    if(!window.searchWidgetDragula){
      window.searchWidgetDragula = dragula([document.getElementById(this.divid)], {
        copy: function (el, source) {
          return source === document.getElementById("search_widgets_input");
        },
        accepts: function (el, target) {
          return target !== document.getElementById("search_widgets_input");
        },
        removeOnSpill: true
      });
    }else{
      window.searchWidgetDragula.containers.push(document.getElementById(this.divid));
    }

  },
    data(){
      let divid = uuid();
      return {divid};
    }
    ,
    methods:{


    }
}
</script>
