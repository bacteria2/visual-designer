<template>
  <property-row :name="name">
    <html5-editor :height="300" :zIndex="1000" :autoHeight="true" @editor="setValue"></html5-editor>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:"PropEditor",
    mixins:[mixinsProp],
//    methods: {
//      editValue(data){
//        if(this.model&&this.propName){
//          this.model[this.propName] = e;
//          this.model.count++;
//          if(this.binding)
//            this.render();
//        }
//      }
//    }
  }
</script>
