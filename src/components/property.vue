<template>
  <div>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 30px" class="caption">
        {{label}}
      </v-flex>

      <v-flex xs8>
        <v-layout row wrap>
          <v-flex xs11 pr-1>
        <el-slider  v-model="value" show-input :show-input-controls="false"></el-slider>
          </v-flex>
          <v-flex xs1 ml-0 pt-1 pl-0>{{unit}}</v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </div>
</template>
<style scoped>

  @media only screen and (min-width: 0){
    .layout .flex.offset-xs1 {
      margin-left: 3.333333333333332% !important;
    }
  }
</style>
<script>
  export default{
    props: {
        label:{
            type:String,
            default:'标签'
        },
        value:{
        },
        unit:{
            type:String,
            default:'px'
        }
    },
    data(){
      return {
        option:[]
      }
    }
  }
</script>
