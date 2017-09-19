<template>
  <property-row :name="name">
    <u-e :value="value" @editor="setValue" ></u-e>
</property-row>
</template>

<script>
  import mixinsProp from "../mixins"
  export default {
    name:"PropUE",
    mixins:[mixinsProp]

  }
</script>
