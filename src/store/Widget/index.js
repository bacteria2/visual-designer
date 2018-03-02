import { ChangeLoading,ChangeCurrentList,ChangeListLoading,ChangeWidget } from './action';

export  default function Widget (state, {type,payload}) {
  switch (type){
    case ChangeLoading:
      return state.set('loading',payload);
    case ChangeListLoading:
      return state.set('listLoading',payload)
    case ChangeCurrentList:
      return state.set('currentList',payload)
    case ChangeWidget:
      return state.set('currentWidget',payload)
    default:
      return state;
  }
}