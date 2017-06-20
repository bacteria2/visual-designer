/**
 * Created by lenovo on 2017/6/16.
 */
export default {
  props:{
    value: {
      required: false
    }
  },
  watch:{
    value(){
      this.inputValue=this.value
    },
    inputValue(val){
      this.$emit('input',val)
    }
  },
  data(){
    return {
      inputValue:this.value
    }
  }
}
