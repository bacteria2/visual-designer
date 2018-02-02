import { WidgetDelete,WidgetSubmit,WidgetDeleteDeep,WidgetSubmitDeep,WidgetUpdate,WidgetUpdateDeep } from './action';

export  default function Widget (state, {type,key,value}) {
  switch (type){
    case WidgetDelete:
      return state.delete(key);
    case WidgetSubmit:
      return state.set(key,value)
    case WidgetUpdate:
      return state.update(key,value)
    case WidgetUpdateDeep:
      return state.updateIn(key,value)
    case WidgetSubmitDeep:
      return state.setIn(key,value);
    case WidgetDeleteDeep:
      return state.deleteIn(key)
    default:
      return state;
  }
}