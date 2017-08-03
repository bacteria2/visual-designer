import WidgetVueCommon from '../WidgetVueCommon'
import ImageTextRender from './render'


export default{
  name: 'WidgetImageText',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(ImageTextRender)
  },
}
