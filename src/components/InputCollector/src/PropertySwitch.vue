<template>
  <div class="property">
    <v-layout row wrap>
      <v-flex xs4 offset-xs1 class="label caption">
        <v-layout row wrap>
          <v-flex xs8>
            {{label}}
          </v-flex>
          <v-flex xs4>
            <v-btn icon class="green--text" @click.native="change">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs7>
        <v-layout row wrap v-show="curUi=='number-px'">
          <v-flex xs11 pr-1>
            <el-slider v-model="inputValue" show-input :show-input-controls="false"></el-slider>
          </v-flex>
          <v-flex xs1 ml-0 pt-1 pl-0>px</v-flex>
        </v-layout>

        <v-layout row wrap v-show="curUi=='number-%'">
          <v-flex xs11 pr-1>
            <el-slider v-model="inputValue" show-input :show-input-controls="false"></el-slider>
          </v-flex>
          <v-flex xs1 ml-0 pt-1 pl-0>%</v-flex>
        </v-layout>

        <!-- select -->
        <check-group  v-model="inputValue" v-show="curUi=='select'" :options="inputOptions"></check-group>
      </v-flex>

    </v-layout>
  </div>
</template>
<script>
  import inputMixins from '../inputCollectorMixins'
  import CheckGroup from '@/components/CheckButton/index'
  export default{
    components:{
      CheckGroup
    },
    mixins:[inputMixins],
    name:"PropertySwitch",
    props: {
      ui: {
        type: Array,
        default(){return[]}
      },
      value: {},
      options:{default(){return []}}
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
        inputOptions: this.options,
        curUi:this.ui[0]
      }
    },
    methods:{
        change(){
            let ui = this.ui,
                max = ui.length-1,
                curIndex = ui.indexOf(this.curUi);
            if(curIndex < max){
               curIndex++
            }else{
              curIndex = 0;
            }
          this.curUi = ui[curIndex];
        }
    }
  }
</script>
