import store from '@/store'
import { VueRenderProxy } from './RenderProxy'


import { uuid } from '@/utils'

export default{
  store,
  render(h){
    let data = {
      attrs: {
        id: this.id
      },
      staticClass: 'charts-display__panel'
    }
    return h('div', data)
  },
  destroyed(){
    this.$data.$RenderProxy.destroy()
  },

  data(){
    return {
      id: uuid(),
      instance: null,
      //mergedOption: {},
      $RenderProxy: new VueRenderProxy(),
    }
  },
  watch: {
    option(val){
      this.renderWidget(val)
    }
  },
  props: {
    option: {},
    registry:{type:Boolean,default:true}
  },
  methods: {
   async commonInit(Render){
      let proxy= this.$data.$RenderProxy;
      let render=new Render(this.id);
      proxy.proxy(render);
      let instance=await proxy.init(this,this.registry);
      if(this.registry){
        proxy.render(this.$store.state.echarts.mergedOption);
      }
      return instance;
    },
    renderWidget(option){
      if (option && typeof option === 'object') {
        this.$data.$RenderProxy.render(option)
      }
    },
    resizeWidget(){
      this.$data.$RenderProxy.resize()
    },
    destroy(){
      this.$data.$RenderProxy.destroy()
    }
  }
}
