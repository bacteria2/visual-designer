import Immutable,{ List } from "immutable";
import { ChangeLoading, SubmitProperty, SaveWidget, DeleteProperty, PushProperty } from './action';

export  default function Widget (state=Immutable.Map(), {type,payload}) {
  switch (type){
    case ChangeLoading:
      return state.set('loading',payload);
    case SubmitProperty:
      return state.setIn(['currentWidget'].concat(payload.key), payload.value)
    case DeleteProperty:
      return state.deleteIn(['currentWidget'].concat(payload.key))
    case PushProperty:
      return state.updateIn(['currentWidget'].concat(payload.key), (list=List()) => list.push(payload.value))
    case SaveWidget:
      return state.set('currentWidget', payload)
    default:
      return state;
  }
}