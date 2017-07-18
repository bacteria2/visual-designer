<template>
  <property-row :name="name">
    <color-picker :value="value" ></color-picker>
  </property-row>
</template>
<style >
  .color-picker {width: 22px;}
  .color-picker .color-picker__trigger .color-picker__color {
    width: 22px;
  }
.color-picker .color-picker__trigger .color-picker__color .color-picker__color-inner{
  border: 1px solid rgb(191, 204, 217);
  border-radius: 4px;
  width: 22px;height: 22px;
}
</style>

<script>
  import ColorPicker from "../../../ColorPicker/src/ColorPicker.vue";
  export default {
    components: { ColorPicker },
    props:{
      propName:String,
      model:Object,
      name:String
    },
    name:"PropColor",
    data(){
      return{
        value:'#000'
      }
    },
    watch:{
      value(e){
        if(this.model&&this.propName){
          this.model[this.propName] = e;
        }
      }
    },
    mounted(){
      if(this.model&&this.propName){
        this.value = this.model[this.propName];
      }
    }
  }
</script>
