<template>
  <v-card>
    <v-card-row class="container_tools"></v-card-row>
    <v-card-row>{{id}}</v-card-row>
  </v-card>
</template>

<style scoped lang="scss">

</style>

<script>
  export default {
    name: "CharContainer",
    props:{
      id: String
    },
    data(){
        return {
           
        }
    }
  }
</script>
