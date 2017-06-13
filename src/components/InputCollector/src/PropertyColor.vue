<template>
  <div class="property">
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 class="label caption">
        {{label}}
      </v-flex>
      <v-flex xs8 class="property-color__picker">
        <color-picker v-model="inputValue"></color-picker>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default{
    name:"PropertyColor",
    props: {
      label: {
        type: String,
        default: '标签'
      },
      value:String,
    },
    watch: {
      inputValue(){
        this.$emit("input",this.inputValue)
      }
    },
    data(){
      return {
        inputValue: this.value,
      }
    }
  }
</script>
