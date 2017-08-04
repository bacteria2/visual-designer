import WidgetVueCommon from '../WidgetVueCommon'
import DataBlockRender from './render'


export default{
  name: 'WidgetDataBlock',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(DataBlockRender)
  },
}
