<template>
  <property-row :name="name">
    <color-picker :value="value" @input="setValue" :rectangle="true"></color-picker>
  </property-row>
</template>

<script>
  import ColorPicker from "../../../ColorPicker/src/ColorPicker.vue";
  import mixinsProp from "../mixins"
  export default {
    name:"PropColor",
    mixins:[mixinsProp],
    components: { ColorPicker },
    mounted(){
      this.initValue();
      console.log(this.propName,this.model);
    },
  }
</script>
