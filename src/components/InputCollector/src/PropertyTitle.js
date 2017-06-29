/**
 * Created by lenovo on 2017/6/19.
 */
import {isDisabled} from '../InputCommon'
export default {
  name:'PropertyTitle',
  render(h){
    return (<span class={{'property-title__disabled':this.isDisabled}}>
      <i class={['property-used','iconfont',{'icon-unselect':this.isDisabled,'icon-select':!this.isDisabled}]} onClick={this.changeDisabled}></i>
      <span style='margin-left:15px'>{this.label}</span></span>)
  },
  watch:{
    isShow(val){
      this.isDisabled = val
    }
  },
  computed:{
    isShow(){return isDisabled(this.optionKey,this.seriesIndex,this.componentType)}
  },
  props: {
    label:String,
    optionKey:String,
    seriesIndex:Number,
    componentType:String,
  },
  data(){
    return {
      isDisabled:isDisabled(this.optionKey,this.seriesIndex,this.componentType)
    }
  },
  methods:{
    changeDisabled(){
      this.isDisabled=!this.isDisabled;
      this.$emit('updateDisabled',this.isDisabled,this.seriesIndex,this.componentType)
    }
  }
}
