import WidgetVueCommon from '../WidgetVueCommon'
import PieRender from './render'


export default{
  name: 'WidgetPie',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance = await this.commonInit(PieRender)
  }
}
