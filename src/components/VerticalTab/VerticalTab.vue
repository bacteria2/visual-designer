<template>
  <div>
    <ul class="vertical-tab">
      <slot></slot>
      <li class="vertical-tab--item">标题 </li>
      <li class="vertical-tab--item">标题</li>
      <li class="vertical-tab--item">标题</li>
      <li class="vertical-tab--item">标题</li>
      <li class="vertical-tab--item">标题</li>
    </ul>
    <div style="position: absolute;left: 60px;top: 10px;bottom: 10px;right: 10px" class="blue-grey ">
      <ul class="vertical-tab">
        <li class="vertical-tab--item">标题2</li>
        <li class="vertical-tab--item">标题2</li>
        <li class="vertical-tab--item">标题2</li>
        <li class="vertical-tab--item">标题2</li>
        <li class="vertical-tab--item">标题2</li>
      </ul>

    </div>
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
    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
