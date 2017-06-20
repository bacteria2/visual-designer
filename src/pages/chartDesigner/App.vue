<template>
  <div id="app" style="height: 100vh">
    <router-view></router-view>
  </div>
</template>

<!--scss主样式-->
<style lang="scss">
  @import "../../style/index";
</style>

<!--vuetify自定义样式-->
<style lang="stylus">
  $navigation-drawer-width := 660px
  @import '../../../node_modules/vuetify/src/stylus/main'
  .navigation-drawer
    padding:0!important
</style>

<!--第三方依赖样式-->
<style>
  @import "../../style/third/element/themes/slider.css";
  @import "../../style/third/element/themes/button.css";
  @import "../../style/third/iconfont/iconfont.css";
  @import '../../style/third/material-Icons/material-icons.css';
  @import '../../style/third/ronoto-font/Roboto.css';
</style>

<script>
export default {
  name: 'app'
}
</script>
