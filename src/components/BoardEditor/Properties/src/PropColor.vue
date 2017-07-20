<template>
  <property-row :name="name">
    <color-picker :value="value" @input="setValue" :rectangle="true"></color-picker>
  </property-row>
</template>


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
