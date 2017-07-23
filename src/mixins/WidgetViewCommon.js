import store from '@/store'
import debounce from 'lodash/debounce'
import {uuid} from '@/utils'
export default{
  store,
  render(h){
    let data = {
      attrs:{
        id:this.id
      },
      staticClass:'charts-display__panel'
    }
    return h('div', data)
  },
  data(){
    return {
      id: uuid(),
      instance: undefined,
    }
  },
  methods:{
    init(renderClass,registryInstance){
      this.instance = new window[renderClass]();
      if(this.instance) {
      this.instance.init(this.id)
      //添加resize事件
      window.addEventListener('resize',debounce(this.resizeWidget,1000));
      if(registryInstance) {
        this.$store.commit('registryInstance', this);
        this.renderWidget(this.$store.state.echarts.option);
      }
      }
    },
    renderWidget(option){
      if(option && typeof option==='object'){
        this.instance.render(this.id,option)
      }
    },
    resizeWidget(){
      this.instance.resize()
    }
  }
}
