export default{
  name: "Editor",
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
    return ( <div>
      <mu-raised-button label="富文本" onClick={this.open}/>
      <mu-dialog open={this.dialog} title="富文本编辑器" onClick={this.close}>
        <u-e onEditor={this.setValue} value={this.value}></u-e>
        <mu-flat-button slot="actions" primary  onClick={this.close} label="关闭"/>
      </mu-dialog>
  </div>
    )
  },
  data(){
    return {
      dialog: false
    }
  },
  methods:{
    setValue(data){
      this.$emit("input",data)
    },
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}

