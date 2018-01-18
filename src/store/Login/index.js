import { UserLogout,ChangeStatus,ChangeSubmitting } from './action'


export  default function User (state, {type,payload}) {
  switch (type){
    case ChangeStatus:
      return state.set('status',payload.get('status')).set('type',payload.get('type'));
    case ChangeSubmitting:
      return state.set('submitting',payload);
    case UserLogout:
      return state.set('loading',payload);
    default:
      return state;
  }
}