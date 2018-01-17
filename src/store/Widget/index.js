import Immutable from "immutable"
import { ChangLoading, SaveProperty, UpdateNoticeCount, UserSaveList } from '../action'

export  default function User (state=Immutable.Map(), {type,payload}) {
  switch (type){
    case ChangLoading:
      return state.set('loading',payload);
    case SaveCurrentUser:
      return state.set('currentUser',payload);
    case UpdateNoticeCount:
      return state.setIn(['currentUser','notifyCount'],payload);
    case UserSaveList:
      return state;
    default:
      return state;
  }
}