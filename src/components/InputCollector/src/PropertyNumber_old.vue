<template>
  <div class="property">
    <v-layout row wrap>
      <v-flex xs4 offset-xs1 class="label caption">
        {{label}}
      </v-flex>
      <v-flex xs7>
        <v-layout row wrap>
          <v-flex xs11 pr-1>
            <el-slider v-model="inputValue" show-input :show-input-controls="false"></el-slider>
          </v-flex>
          <v-flex xs1 ml-0 pt-1 pl-0>{{unit}}</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import inputMixins from '../inputCollectorMixins';
  export default{
    mixins:[inputMixins],
    name:"PropertyNumber",
    props: {
      unit: {
        type: String,
        default: ''
      },
      value:{}
    },
    watch: {
      inputValue(){
        let result = this.inputValue;
        if('%'==this.unit){
          result = result+'%';
        }
        this.$emit("input",result)
      }
    }
  }
</script>
