<template>
    <div class="vertical-tab--item">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
  .vertical-tab {
    position: absolute;
    width: 60px;
    top: 10px;
    bottom: 10px;
    overflow: hidden;
    padding: 0;
    .vertical-tab--item {
      display: block;
      text-align: center;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      margin: 5px 0 0;
    }
  }
</style>
<script>
  export default{
    props:{
      text,
    },
    mounted() {
      this.$parent.addPanes(this);
    },
    computed:{
      isActive(){}

    },
    data(){
      return {
        index: null
      }
    }
  }
</script>
