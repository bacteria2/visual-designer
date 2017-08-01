import WidgetVueCommon from '../WidgetVueCommon'
import DataBlockRender from './render'


export default{
  name: 'WidgetImageText',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(DataBlockRender)
  },
}
