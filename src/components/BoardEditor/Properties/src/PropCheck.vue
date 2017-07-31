<template>
  <property-row :name="name">
    <el-checkbox v-model="value" @change="changeValue"></el-checkbox>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:"PropCheckbox",
    mixins:[mixinsProp],
    methods:{
      changeValue(){
        this.setValue(this.value);
      }
    }
  }
</script>
