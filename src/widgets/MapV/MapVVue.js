/**
 * Created by lenovo on 2017/9/14.
 */
import WidgetVueCommon from '../WidgetVueCommon'
import MapVRender from './render'


export default{
  name: 'WidgetMapV',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(MapVRender)
  },
}
