<template>
  <div class="property">
    <v-layout row wrap>
      <v-flex xs4 offset-xs1 class="label caption">
        {{label}}
      </v-flex>
      <v-flex xs7>
        <el-input size="mini" v-model="inputValue"></el-input>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>

  export default{

    name:'PropertyText',
    props: {
      value: {},
    }
  }
</script>
