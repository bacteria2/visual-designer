import Immutable from 'immutable'
import { requestWidgetById, requestWidgetMeta, requestWidgetList } from '../../service/widget'
import { notification } from 'antd'

export const ChangeWidget = 'WIDGET_CHANGE_WIDGET'
export const ChangeLoading = 'WIDGET_CHANGE_LOADING'
export const ChangeCurrentList = 'WIDGET_CHANGE_CURRENTLIST'
export const ChangeListLoading = 'WIDGET_CHANGE_LIST_LOADING'

const propetyKey = key => ['rawOption'].concat(key.split('.'))
const propety2SeriesKey = key => ['data','series'].concat(key.split('.'))

export const submitProperty = (widget, key, value) => {
  const payload = widget.setIn(propetyKey(key), value)
  return {type: ChangeWidget, payload}
}

export const submitProperty2Series = (widget, key, value) => {
    const payload = widget.setIn(propety2SeriesKey(key), value)
    return {type: ChangeWidget, payload}
}

export const enableDisabledProperty = (widget, key) =>submitProperty(widget,key,null)

export const deleteProperty = (widget, key) => {
    const payload = widget.deleteIn(propetyKey(key))
    return {type: ChangeWidget, payload}
}

export const enableDisabledSeriesProperty = (widget, key) =>submitProperty2Series(widget,key,null)

export const deleteSeriesProperty = (widget, key) => {
  const payload = widget.deleteIn(propety2SeriesKey(key))
  return {type: ChangeWidget, payload}
}
export const updateProperty = (widget, key, value) => {
  const payload=widget.updateIn(propetyKey(key),value)
  return {type: ChangeWidget, payload}
}
export const deleteDataItems = (widget,index) => {
  const payload=widget.deleteIn(['dataOption', 'dataItems', index])
  return {type: ChangeWidget, payload}
}

const changeLoading = payload => ({type: ChangeLoading, payload})
const changeListLoading = payload => ({type: ChangeListLoading, payload})


export function fetchWidget (id) {
  return async dispatch => {
    dispatch(changeLoading(true))
    const {success: widgetSuccess, data: widgetData} = await requestWidgetById(id)

    if (widgetSuccess) {
      const {success: metaSuccess, data: metaData} = await requestWidgetMeta(widgetData.prototypeId)
      if (metaSuccess) {
        widgetData.widgetMeta = metaData
        dispatch({type:ChangeWidget,payload:Immutable.fromJS(widgetData)})
        dispatch(changeLoading(false))
      } else {
        notification.error({
          message: '请求widget错误',
          description: `请求widget:${widgetSuccess},请求meta${metaSuccess}`,
        })
      }
    }
  }
}

export function fetchWidgetList (queryObject) {
  return async dispatch => {
    dispatch(changeListLoading(true))
    const {success, data} = await requestWidgetList()
    if (success) {
      dispatch({type:ChangeCurrentList,payload:Immutable.fromJS(data)})
      dispatch(changeListLoading(false))
    }
  }
}