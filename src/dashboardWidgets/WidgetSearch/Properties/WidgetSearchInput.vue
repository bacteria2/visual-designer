<template>
 <div>
  <div id="search_widgets_input" class="search_widgets_input">
    <label class="search_widget" >标题</label>
    <input class="search_widget" type="date"/>
    <input class="search_widget"  type="text"/>
  </div>

  <div  class="search_widgets_container" >

  </div>
 </div>
</template>
<style scoped>
  input { border: 1px solid blue}

</style>
<script>
  import  "dragula/dist/dragula.min.css";
  export default{
    name: "WidgetSearchInput",
    props:{
      styles:Object,
      options:Object
    },
    mounted(){

      if(window.searchWidgetDragula){

        window.searchWidgetDragula.containers.push(document.getElementById("search_widgets_input"));

      }

    }

  }
</script>
