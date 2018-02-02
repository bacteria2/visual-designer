import Immutable from 'immutable'
import { requestWidgetById, requestWidgetMeta } from '../../service/widget';
import {notification} from 'antd';

export const SubmitProperty = 'WIDGET_SUBMIT_PROPERTY';
export const SaveWidget = 'WIDGET_SAVE_WIDGET';
export const ChangeLoading = 'WIDGET_CHANGE_LOADING';
export const DeleteProperty = 'WIDGET_DELETE_PROPERTY';
export const PushProperty = 'WIDGET_PUSH_PROPERTY';
export const LoadWidgetList = 'WIDGET_LOAD_WIDEGE_LIST';
export const AppendWidgetList = 'WIDGET_APPEND_WIDEGE_LIST';
export const ChangListLoading = 'WIDGET_CHANGE_LIST_LOADING';

export function submitProperty (key, value) {
  return {
    type: SubmitProperty,
    payload: {key, value},
  }
}

export function requestWidget (id) {
  return async dispatch => {
    dispatch({type: ChangeLoading, payload: true})
    let action = { type: SaveWidget }, {
        success: widgetSuccess,
        data: widgetData,
      } = await requestWidgetById(id)

    if (widgetSuccess){
      action.payload = Immutable.fromJS(widgetData)
      let {success: metaSuccess, data: metaData} = await requestWidgetMeta(action.payload.get('prototypeId'))
      if (widgetSuccess && metaSuccess) {
        action.payload = action.payload.set('widgetMeta', metaData)
        dispatch(action)
        dispatch({type: ChangeLoading, payload: false})
      }else{
        notification.error({
          message:'请求widget错误',
          description:`请求widget:${widgetSuccess},请求meta${metaSuccess}`,
        })
      }
    }
  }
}

export function requestList(queryObject){
  return async dispatch=>{
    dispatch({type: ChangListLoading, payload: true})
  }
}