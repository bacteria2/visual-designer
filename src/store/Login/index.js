import { ChangeStatus,ChangeSubmitting } from './action'


export  default function User (state, {type,payload}) {
  switch (type){
    case ChangeStatus:
      return state.set('status',payload.status).set('redirectTarget',payload.redirectTarget);
    case ChangeSubmitting:
      return state.set('submitting',payload);
    default:
      return state;
  }
}