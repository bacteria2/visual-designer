<template>
  <property-row :name="name">
    <el-checkbox v-model="value" @change="setValue"></el-checkbox>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:"PropCheckbox",
    mixins:[mixinsProp]
  }
</script>
