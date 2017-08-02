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
  methods:{
    thumbnailHandler(){ //直接使用echart方法取得缩略图数据
       return this.instance.getDataURL({
         pixelRatio: 0.4,
         backgroundColor: '#fff'
       })
    }
  }
}
