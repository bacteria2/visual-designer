/**
 * Created by lenovo on 2017/7/26.
 */
import WidgetVueCommon from '../WidgetVueCommon'
import CCMapRender from './render'

export default{
  name: 'CCMap',
  mixins: [WidgetVueCommon],

  async mounted(){
   /* let proxy= this.$data.$RenderProxy;
    let render=new D3Render(this.id);
    proxy.proxy(render);
     proxy.init(this,this.registry);*/

    this.instance=await this.commonInit(CCMapRender)

    //proxy.render(this.$store.state.echarts.option);
  },
}
