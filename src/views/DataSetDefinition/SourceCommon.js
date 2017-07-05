/**
 * Created by lenovo on 2017/6/26.
 */
export default {
  props: {
    sourceInfo: {
      type: Object,
      default: _ => ({name: '', type: 1, description: '', columns: [], data: [['']], dataItems: []})
    },
    showModal:Boolean,
  },
  watch:{
    showModal(val){
      this.showSourceInfo=val;
    }
  },
  data(){
    return {
      showSourceInfo: this.showModal,
      stepper: 1,
    }
  },
  methods: {
    open(){
      this.showSourceInfo = true;
      this.$emit("update:showModal",this.showSourceInfo)
    },
    close(){
      this.showSourceInfo = false
      this.stepper = 1;
      this.$emit("update:showModal",this.showSourceInfo)
    },
  }
}
