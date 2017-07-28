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
     {renderClass,dependency} = dependencyConfig;
     if(dependency && renderClass){
       loadDependencies(dependency,renderClass, () =>{
           this.init(renderClass,false); //回调 参数false：不注册registryInstance
       });
     }
  },
 watch:{
   option(val){
      this.renderWidget(val)
   }
 }
}
