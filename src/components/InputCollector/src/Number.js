export default{
  name: "Number",
  watch: {
    inputValue(){
      this.$emit("input",this.unit=='%'?this.inputValue+"%":this.inputValue)
    }
  },
  props: {
    unit: {
      type: String,
      default: ''
    },
    value: {
      required: true
    },
    min:Number,
    max:Number,
    step:Number,
    optionKey:String,
    seriesIndex:Number,
    disabled:{
      type:Boolean,
      default:false
    }
  },
  render(h){
    return (  <el-row gutter={5}>
        <el-col span={23}>
          {/*<el-slider class={this.disabled?'property-title__disabled':''} value={this.inputValue} onInput={v=>this.inputValue=v} show-input show-input-controls={false} show-tooltip={false} min={this.min} max={this.max} step={this.step} disabled={this.disabled}></el-slider>*/}
          <el-input-number size="mini" value={this.inputValue} onInput={v=>this.inputValue=v} controls={false} min={this.min} max={this.max} step={this.step} disabled={this.disabled} debounce={1000}></el-input-number>
        </el-col>
        <el-col span={1} class={this.disabled?'property-title__disabled':''} style=""><span>{this.unit}</span></el-col>
      </el-row>
    )
  },
  data(){
    return {
      inputValue: this.getValue(),
    }
  },
  methods:{
     getValue(){
       return parseFloat(this.value);
     }
  }
}

