import WidgetVueCommon from '../WidgetVueCommon'
import StructureRender from './render'


export default{
  name: 'WidgetStructure',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(StructureRender)
  },
}
