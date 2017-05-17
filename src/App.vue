<template>
  <div id="app" style="height: 100vh">
    <router-view></router-view>
  </div>
</template>
<style>


  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    height: 100%;
    overflow-y: hidden;
    background-color: #f8f8f8
  }

  ::-webkit-scrollbar-thumb {
    background-color: #e6e6e6
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px
  }
</style>
<script>
  import './iconfont/iconfont.css'

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
