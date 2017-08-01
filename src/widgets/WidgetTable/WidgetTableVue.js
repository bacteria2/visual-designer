import WidgetVueCommon from '../WidgetVueCommon'
import TableRender from './render'


export default{
  name: 'WidgetTable',
  mixins: [WidgetVueCommon],

  async mounted(){
    this.instance=await this.commonInit(TableRender)
  },
}
