/**
 * Created by lenovo on 2017/6/19.
 */
export default {
  name:'PropertyTitle',
  render(h){
    return (<span>
      <i class={['property-used','iconfont',{'icon-unselect':this.isDisabled,'icon-select':!this.isDisabled}]} onClick={this.changeDisabled}></i>
      <span style='margin-left:15px'>{this.label}</span></span>)
  },
  props: {
    label:String,
  },
  data(){
    return {
      isDisabled:false
    }
  },
  methods:{
    changeDisabled(){
      this.isDisabled=!this.isDisabled;
      this.$emit('updateDisabled',this.isDisabled)

    }
  }
}
