import Immutable from "immutable"
import { ChangLoading, DisableProperty, SubmitProperty,SaveRawOption } from './action'

export  default function Widget (state=Immutable.Map(), {type,payload}) {
  switch (type){
    case ChangLoading:
      return state.set('loading',payload);
    case DisableProperty:
      return state.setIn(['rawOption',payload.key,'disabled'],payload.value);
    case SubmitProperty:
      return state.setIn(['rawOption',payload.key,'value'],payload.value);
    case SaveRawOption:
      return state;
    default:
      return state;
  }
}