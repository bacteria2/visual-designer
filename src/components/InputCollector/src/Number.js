export default{
  name: "Number",
  watch: {
    inputValue(){
      this.$emit("input",this.unit=='%'?this.inputValue+"%":this.inputValue+"")
    }
  },
  props: {
    unit: {
      type: String,
      default: '%'
    },
    value: {
      required: true
    },
  },
  render(h){
    return (  <v-layout row wrap v-show={true}>
        <v-flex xs11 pr-1>
          <el-slider value={this.inputValue} onInput={v=>this.inputValue=v} show-input show-input-controls={false}></el-slider>
        </v-flex>
        <v-flex xs1 ml-0 pt-1 pl-0>{this.unit}</v-flex>
      </v-layout>
    )
  },
  data(){
    return {
      inputValue: this.value,
    }
  }
}

