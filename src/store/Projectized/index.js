import { ChangeLoading,  ChangeMemberList,ChangeProjectList, ChangeCurrentProject }from './action';

export  default function Preojectized (state, {type,payload}) {
  switch (type){
    case ChangeLoading:
      return state.set('loading',payload);
    case ChangeMemberList:
      return state.set('memberList',payload);
    case ChangeProjectList:
      return state.set('list' , payload);
    case ChangeCurrentProject:
      return state.set('currentProject',payload);
    default:
      return state;
  }
}


