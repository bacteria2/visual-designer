import Immutable from "immutable"
import { ChangLoading, SubmitProperty, SaveWidget, DeleteProperty, PushProperty } from './action'

export  default function Widget (state=Immutable.Map(), {type,payload}) {
  switch (type){
    case ChangLoading:
      return state.set('loading',payload);
    case SubmitProperty:
      return state.setIn(['currentWidget', 'rawOption'].concat(payload.key), payload.value)
    case DeleteProperty:
      return state.deleteIn(['currentWidget', 'rawOption'].concat(payload.key))
    case PushProperty:
      return state.updateIn(['currentWidget', 'rawOption'].concat(payload.key), list => list.push(payload.value))
    case SaveWidget:
      return state.set('currentWidget', payload)
    default:
      return state;
  }
}