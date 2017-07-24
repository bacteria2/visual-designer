import WidgetViewCommon from '@/mixins/WidgetViewCommon'
import {loadDependencies} from '@/utils/load.js'

export default{
  name: 'WidgetView',
  mixins: [WidgetViewCommon],
  props:{
    widgetType:String
  },
  mounted(){
    let widgetType = this.widgetType,
      dependencyConfig = dependencyConfigs[widgetType](),
      {renderClass,dependency} = dependencyConfig,that = this
    if(dependency && renderClass){
      loadDependencies(dependency,renderClass,function () {
        that.init(renderClass,true); //回调 参数true：注册registryInstance
      });
    }
  }
}
