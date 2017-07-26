import WidgetViewCommon from '@/mixins/WidgetViewCommon'
import {loadDependencies} from '@/utils/load.js'

export default{
  name: 'WidgetPreview',
  mixins: [WidgetViewCommon],
  props:{
      widgetType:String,
      option:{}
  },
   mounted(){
     let widgetType = this.widgetType,
     dependencyConfig = dependencyConfigs[widgetType](),
     {renderClass,dependency} = dependencyConfig,that = this;
     if(dependency && renderClass){
       loadDependencies(dependency,renderClass,function () {
           that.init(renderClass,false); //回调 参数false：不注册registryInstance
           that.renderWidget(that.option)
       });
     }
  },
 watch:{
   option(val){
      this.renderWidget(val)
   }
 }
}
