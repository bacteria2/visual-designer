<template>
  <v-card @mouseover.stop="tools = true" @mouseout.stop="tools = false" class="container">
    <div v-show="title" class="container_title">标题</div>
    <div v-show="tools&&true" class="container_tools_background">
    </div>
    <div v-show="tools&&true" class="container_tools">
      <v-btn v-tooltip:bottom="{html:'添加图表'}" icon small class="container_tools_btn">
        <v-icon class="deep-orange--text">add</v-icon>
      </v-btn>
      <v-btn icon small v-tooltip:bottom="{html:'删除图表'}" class="container_tools_btn">
        <v-icon class="deep-orange--text">delete</v-icon>
      </v-btn>
      <v-btn icon small v-tooltip:bottom="{html:'设置'}"  class="container_tools_btn">
        <v-icon class="deep-orange--text">settings</v-icon>
      </v-btn>
    </div>
    <v-card-row>{{id}}</v-card-row>
  </v-card>
</template>

<style scoped lang="scss">
  .container { position: relative; height: 300px; width: 300px; padding: 0;}
  .container_tools,.container_tools_background{
    height:30px; width: 100%; position: absolute;top:0; left: 0; text-align: right
  }
  .container_tools_background{background-color:#000;
    filter:alpha(opacity=10);-moz-opacity:0.1;-khtml-opacity: 0.1;opacity: 0.1;
  }

  .container_tools:hover{display: block}

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
.container_tools_btn{  margin:0 0 0 0;}
  .container_title { line-height: 40px; font-size: 13px; text-align: center; font-family: "Microsoft YaHei UI";}
</style>

<script>
  export default {
    name: "CharContainer",
    props:{
      id: String
    },
    data(){
        return {
          tools:false,
          title:true
        }
    },
    methods:{

    }
  }
</script>
