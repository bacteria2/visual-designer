import Immutable from 'immutable'
import { requestWidgetById, requestWidgetMeta, requestWidgetList } from '../../service/widget';
import {notification} from 'antd';

export const WidgetSubmit='WIDGET_SUBMIT';
export const WidgetUpdate='WIDGET_UPDATE';
export const WidgetDelete='WIDGET_DELETE';
export const WidgetSubmitDeep='WIDGET_SUBMIT_DEEP';
export const WidgetUpdateDeep='WIDGET_UPDATE_DEEP';
export const WidgetDeleteDeep='WIDGET_DELETE_DEEP';

let propetyKey=key=>['currentWidget','rawOption'].concat(key.split('.'))

export const submitProperty=(key, value)=>({ type: WidgetSubmitDeep, key:propetyKey(key), value })
export const enableDisabledProperty= key=>({ type: WidgetSubmitDeep, key:propetyKey(key),value:null })
export const deleteProperty=key=>({ type: WidgetDeleteDeep, key:propetyKey(key) })
export const updateProperty=(key,value)=>({type:WidgetUpdateDeep,key:propetyKey(key),value})

export const changeLoading=value=>({ type: WidgetSubmit, key:'loading', value })
export const changeListLoading=value=>({ type: WidgetSubmit, key:'listLoading', value })
export const saveWidgetList =value=>({type: WidgetSubmit,key:'currentList',value})
export const saveWidget =value=>({type: WidgetSubmit,key:'currentWidget',value})
export const deleteDataItems= index=>({type:WidgetDeleteDeep,key:['currrentWidget','dataOption','dataItems',index]})

export function fetchWidget (id) {
  return async dispatch => {
    dispatch(changeLoading(true))
    const { success: widgetSuccess, data: widgetData } = await requestWidgetById(id)

    if (widgetSuccess){
      const {success: metaSuccess, data: metaData} = await requestWidgetMeta(widgetData.prototypeId);
      if (metaSuccess) {
        widgetData.widgetMeta=metaData;
        dispatch(saveWidget(Immutable.fromJS(widgetData)))
        dispatch(changeLoading(false))
      }else{
        notification.error({
          message:'请求widget错误',
          description:`请求widget:${widgetSuccess},请求meta${metaSuccess}`,
        })
      }
    }
  }
}

export function fetchWidgetList(queryObject){
  return async dispatch=>{
    dispatch(changeListLoading(true))
    const {success,data}=await requestWidgetList()
    if(success){
      dispatch(saveWidgetList(Immutable.fromJS(data)))
      dispatch(changeListLoading(false))
    }
  }
}