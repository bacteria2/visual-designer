import { ChangeRegistryStatus,RegistrySubmitting } from './action'


export  default function User (state, {type,payload}) {
  switch (type){
    case ChangeRegistryStatus:
      return state.set('status',payload.get('status'));
    case RegistrySubmitting:
      return state.set('submitting',payload);
    default:
      return state;
  }
}