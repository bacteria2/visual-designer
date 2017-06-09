<template>
  <div>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 30px" class="caption">
        {{label}}
      </v-flex>
      <v-flex xs7>
        <el-slider  v-model="value" show-input :show-input-controls="false"> </el-slider>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default{
    props: {
        label:{
            type:String,
            default:'标签'
        },
        value:{
        }
    },
    data(){
      return {
        option:[]
      }
    }
  }
</script>
