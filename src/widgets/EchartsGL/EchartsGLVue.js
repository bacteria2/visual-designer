/**
 * Created by lenovo on 2017/7/26.
 */
import WidgetVueCommon from '../WidgetVueCommon'
import Render from './render'

export default{
  name: 'WidgetEchartsGL',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(Render)
  }

}
