<template>
  <property-row :name="name">
    <el-checkbox v-model="value"></el-checkbox>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:"PropCheckbox",
    mixins:[mixinsProp]
  }
</script>
