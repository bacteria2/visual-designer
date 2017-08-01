/**
 * Created by lenovo on 2017/7/26.
 */
import WidgetVueCommon from '../WidgetVueCommon'
import D3Render from './render'

export default{
  name: 'WidgetD3',
  mixins: [WidgetVueCommon],

  async mounted(){
   /* let proxy= this.$data.$RenderProxy;
    let render=new D3Render(this.id);
    proxy.proxy(render);
     proxy.init(this,this.registry);*/

    this.instance=await this.commonInit(D3Render)

    //proxy.render(this.$store.state.echarts.option);
  },
}
