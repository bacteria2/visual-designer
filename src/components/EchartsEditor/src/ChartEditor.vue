<template>
  <v-tabs active-tab-color="#04CCDF" active-text-color="white" type="pills" :start-index="1" direction="vertical">
    <v-tab v-for="tab in tabs" :title="tab.title" :icon="tab.icon" :key="tab.key">
      {{tab.content}}
    </v-tab>
  </v-tabs>
</template>
<style scoped lang="scss">
  .container {
    height: 100%;
  }
</style>
<script>
  export default{
    data(){
      return {
        tabs: [
          {title: "1", icon: "ti-user", content: "123123123", key: "1"},

          {
          title: "2",
          icon: "ti-check",
          content: "12312312",
          key: "2"
        }, {title: "3", icon: "ti-settings", content: "123123123", key: "3"}],
        msg: 'hello vue'
      }
    }
  }
</script>
