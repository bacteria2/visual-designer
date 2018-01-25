import Immutable from 'immutable'
import { requestWidgetById, requestWidgetMeta } from '../../service/widget'

export const SubmitProperty = 'WIDGET_SUBMIT_PROPERTY'
export const SaveWidget = 'WIDGET_SAVE_WIDGET'
export const ChangLoading = 'WIDGET_CHANGELODING'
export const DeleteProperty = 'WIDGET_DELETE_PROPERTY'
export const PushProperty = 'WIDGET_PUSH_PROPERTY'

export function submitProperty (key, value) {
  return {
    type: SubmitProperty,
    payload: {key, value}
  }
}

export function requestWidget (id) {
  return async dispatch => {
    dispatch({type: ChangLoading, payload: true})
    let action = { type: SaveWidget }, {
        success: widgetSuccess,
        data: widgetData
      } = await requestWidgetById(id)

    if (widgetSuccess){
      action.payload = Immutable.fromJS(widgetData)
      let {success: metaSuccess, data: metaData} = await requestWidgetMeta(action.payload.get('prototypeId'))
      if (widgetSuccess && metaSuccess) {

        action.payload = action.payload.set('widgetMeta', metaData)
        dispatch(action)
        dispatch({type: ChangLoading, payload: false})
      }
    }
  }
}

