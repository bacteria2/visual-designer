<template>
  <div id="app" style="height: 100vh">
    <router-view></router-view>
  </div>
</template>
<style lang="stylus">
  $navigation-drawer-width := 660px
  @import '../node_modules/vuetify/src/stylus/main'



</style>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  ::-webkit-scrollbar-thumb{
    background-color: #fff
  }
  ::-webkit-scrollbar-track   {
    background-color: #546e7a
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
<script>
  import './assets/iconfont/iconfont.css'

export default {
  name: 'app'
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
