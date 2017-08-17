import WidgetVueCommon from '../WidgetVueCommon'
import RichTextsRender from './render'


export default{
  name: 'WidgetRichTexts',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(RichTextsRender)
  },
}
