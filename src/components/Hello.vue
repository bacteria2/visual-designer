<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <Card style="width:350px;resize:both;overflow: auto">
      <p slot="title" >无边框标题</p>
      <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
    </Card >
    <div style="border: 1px solid blue;width: 800px;"> <Resizable-card ></Resizable-card><Resizable-card></Resizable-card></div>
    <router-link to="/hello/bar">to bar</router-link>
    <router-link to="/hello/tex">to tex</router-link>
    <router-link to="/">to home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import ResizableCard from './ResizableCard'
  export default {
    name: 'hello',
    components:{ResizableCard},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      handler(event){
        console.log(event)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    a {
      color: #42b983;
    }
  }


</style>
