import Immutable from "immutable"
import { queryProjectNotice } from '../../service/notice'
import {UpdateNoticeCount} from '../User/action'
import store from '../index'

export const ChangeLayoutCollapsed='ChangeLayoutCollapsed';
export const SaveNotices='SaveNotices';
export const SaveClearedNotices='SaveClearedNotices';
export const ChangeNoticeLoading='ChangeNoticeLoading';
export const ChangeControlMenu='CHANGE_CONTROL_MENU';
export const RemoveControlMenu='REMOVE_CONTROL_MENU';

export function fetchNotice(){
  return dispatch=>{
    dispatch({type:ChangeNoticeLoading,payload:true})
    return queryProjectNotice().then(({code,data:notices})=>{
      code===200&&dispatch({type:SaveNotices,payload:Immutable.List(notices)})
      dispatch({type:ChangeNoticeLoading,payload:false})
    })
  }
}

export function clearNotice(type){
  return dispatch=>{
    dispatch({type:SaveClearedNotices,payload:type})
    dispatch({type:UpdateNoticeCount,payload:store.getState().get('notices').count()})
  }
}