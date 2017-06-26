/**
 * Created by lenovo on 2017/6/23.
 */
import Handsontable from 'handsontable'


export function tableInit(vueInstance){
  vueInstance.table = new Handsontable(vueInstance.$el, settingsMapper.prepare(...unmappedSettings));
}
