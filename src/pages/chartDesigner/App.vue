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
  html
    overflow-y:auto
  .navigation-drawer
    padding:0!important
</style>

<!--第三方依赖样式-->
<style>
  @import "../../style/third/element/themes/icon.css";
  @import "../../style/third/element/themes/slider.css";
  @import "../../style/third/element/themes/button.css";
  @import "../../style/third/element/themes/table.css";
  @import "../../style/third/element/themes/table-column.css";
  @import "../../style/third/element/themes/form.css";
  @import "../../style/third/element/themes/select.css";
  @import "../../style/third/element/themes/select-dropdown.css";
  @import "../../style/third/element/themes/collapse.css";
  @import "../../style/third/element/themes/color-picker.css";
  @import "../../style/third/element/themes/message-box.css";
  @import "../../style/third/element/themes/message.css";
  @import "../../style/third/element/themes/notification.css";
  @import "../../style/third/element/themes/cascader.css";
  @import "../../style/third/element/themes/checkbox.css";
  @import "../../style/third/element/themes/radio.css";
  @import "../../style/third/element/themes/radio-group.css";
  @import "../../style/third/element/themes/radio-button.css";
  @import "../../style/third/element/themes/switch.css";

  @import "../../style/third/element/themes/cascader.css";
  @import "../../style/third/element/themes/checkbox-button.css";
  @import "../../style/third/iconfont/iconfont.css";
  @import '../../style/third/material-Icons/material-icons.css';
  @import '../../style/third/ronoto-font/Roboto.css';
  @import '../../style/third/animate/animate.css';

</style>

<script>
export default {
  name: 'app'
}
</script>
