<template>
  <div class="property">
    <v-layout row wrap>
      <v-flex xs4 offset-xs1 class="label caption">
        {{label}}
      </v-flex>
      <v-flex xs7>
        <check-group  v-model="inputValue" :options="inputOptions"></check-group>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default{
    name:'PropertySelect',
    props: {
      value: {},
      options:{}
    },
    data(){
      return {
        inputOptions: this.options
      }
    }
  }
</script>
