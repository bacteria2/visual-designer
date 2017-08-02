import store from '@/store'
import debounce from 'lodash/debounce'
import { VueRenderProxy } from './RenderProxy'
import domtoimage from 'dom-to-image'

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
      mergedOption: {},
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
        proxy.render(this.$store.state.echarts.option);
      }
      return instance;
    },

    renderWidget(option){

      if (option && typeof option === 'object') {
        this.mergedOption = option
        this.$data.$RenderProxy.render(option)
      }
    },
    resizeWidget(){
      this.$data.$RenderProxy.resize()
    },
    thumbnailHandler(){
      let node = document.getElementById(this.id),
          setting = {bgcolor:'#fff',height:'340px',width:'200px',quality:0.9}
      domtoimage.toPng(node,setting)
        .then(function (pngData) {
             return pngData
        })
        .catch(function (error) {
            //这里并不处理错误
        })
    }
  }
}
