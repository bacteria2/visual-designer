<template>
  <property-row :name="name">
    <color-picker :value="value" @input="setValue" :rectangle="true"></color-picker>
    <span style="display: inline-block; cursor: pointer" @click="deleteColor">
      <i class="material-icons icon my-btn-icon icon--dark icon--left" style="line-height: 30px">delete</i>
    </span>
  </property-row>
</template>

<script>
  import ColorPicker from "../../../ColorPicker/src/ColorPicker.vue";
  import mixinsProp from "../mixins"
  export default {
    name:"PropColor",
    mixins:[mixinsProp],
    components: { ColorPicker },
    methods:{
      deleteColor(){
        this.value='rgba(0,0,0,0)';
        this.setValue();

      }
    }
  }
</script>
