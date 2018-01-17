import { UserLogout,ChangeLoginStatus,LoginSubmitting } from './action'


export  default function User (state, {type,payload}) {
  switch (type){
    case ChangeLoginStatus:
      return state.set('status',payload.get('status')).set('type',payload.get('type'));
    case LoginSubmitting:
      return state.set('submitting',payload);
    case UserLogout:
      return state.set('loading',payload);
    default:
      return state;
  }
}