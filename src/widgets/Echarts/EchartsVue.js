/**
 * Created by lenovo on 2017/7/26.
 */
import WidgetVueCommon from '../WidgetVueCommon'
import Render from './render'

export default{
  name: 'WidgetEcharts',
  mixins: [WidgetVueCommon],


  async mounted(){
    this.instance=await this.commonInit(Render)
  },
}
