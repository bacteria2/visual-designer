/**
 * Created by lenovo on 2017/6/14.
 */
export default {

  props: {
    label: {
      type: String,
      default: '标签'
    }
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
