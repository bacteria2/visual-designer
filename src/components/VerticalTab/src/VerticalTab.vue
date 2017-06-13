<template>
  <div v-if="isActivate">
    <slot></slot>
  </div>
</template>
<style scoped>

</style>
<script>
  export default{
    name: "VerticalTab",
    props: {
      title: {required: false, default: "标题"},
      name: {String, required: true}
    },
    computed: {
      isActivate(){
        return this.$parent.activeName === this.tabName
      }
    },
    data(){
      return {
        tabName: this.name
      }
    }
  }
</script>
