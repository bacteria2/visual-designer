<template>
  <property-row :name="name">
    <color-picker :value="value" @input="setValue" ></color-picker>
  </property-row>
</template>
<style >
  .color-picker {width: 22px;}
  .color-picker .color-picker__trigger .color-picker__color {
    border: 1px solid rgb(191, 204, 217);
    border-radius:4px;
    width: 30px;
    height: 30px ;
    background-color:#fff;
  }
.color-picker .color-picker__trigger .color-picker__color .color-picker__color-inner{
  /*border: 1px solid rgb(191, 204, 217);*/
  border-radius:0px;
  width:22px;height:22px;
  top:3px; left: 3px;
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
        value:''
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
    },
    methods:{
      setValue(e){
        if(this.model&&this.propName){
          this.model[this.propName] = e;
        }
      }
    }

  }
</script>
