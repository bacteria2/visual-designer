<template>
  <div class="property">
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 class="label caption">
        {{label}}
      </v-flex>
      <v-flex xs8>
        <!-- number-px -->
        <v-layout row wrap v-if="ui == 'number-px'">
          <v-flex xs11 pr-1>
            <el-slider v-model="inputValue" show-input :show-input-controls="false"></el-slider>
          </v-flex>
          <v-flex xs1 ml-0 pt-1 pl-0>px</v-flex>
        </v-layout>
        <!-- color -->
        <color-picker v-model="inputValue" v-if="ui=='color'"></color-picker>
        <!-- select -->
        <check-group  v-model="inputValue" v-if="ui=='select'" :options="inputOptions"></check-group>
        <!-- text -->
        <el-input size="mini" v-model="inputValue" v-if="ui=='text'"></el-input>
      </v-flex>

    </v-layout>
  </div>
</template>
<script>
  import ColorPicker from "@/components/ColorPicker"
  import  CheckGroup  from '@/components/CheckButton'
  export default{
    name:"Property",
    components: {
      ColorPicker,CheckGroup
    },
    props: {
      label: {
        type: String,
        default: '标签'
      },
      ui: {
        type: String
      },
      value: {},
      options:{}
    },
    watch: {
      inputValue(){
        let result = this.inputValue;
        switch(this.ui){
          case 'number-px':
            result = result+'px';
             break;
          case 'number-%':
            result = result+'%';
            break;
          default:
        }
        this.$emit("input",result)
      }
    },
    data(){
      return {
        inputValue: this.value,
        inputOptions: this.options
      }
    }
  }
</script>
