import {
  ChangLoading,
  SaveCurrentUser,
  UpdateNoticeCount,
  UserSaveList
}from './action';
import Immutable from 'immutable';


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


