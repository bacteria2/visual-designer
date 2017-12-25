import Immutable from 'immutable';
import { ChangeLayoutCollapsed, ChangeNoticeLoading, SaveClearedNotices,SaveNotices } from './action'


export default{
  collapsed(state,{type,payload}){
     if(type===ChangeLayoutCollapsed){
       return payload;
     }
     return state;
  },
  notices(state,{type,payload}){
    switch (type){
      case  SaveClearedNotices:
        return state.set('notices',[]);
      case SaveNotices:
        return state.set('notices',payload);
      default:
        return state;
    }
  },
  fetchingNotices(state,{type,payload}){
    switch (type){
      case  ChangeNoticeLoading:
        return state.set('fetchingNotices',payload);
      default:
        return state;
    }
  }
}


// export  default function Global (state=Immutable.fromJS({
//     collapsed: false,
//     notices: [],
//     fetchingNotices: false,
//   }), {type,payload}) {
//   switch (type){
//     case ChangeLayoutCollapsed:
//       return state.set('collapsed',!state.get('collapsed'));
//     case ChangeNoticeLoading:
//       return state;
//     case SaveClearedNotices:
//       return state
//     case SaveNotices:
//       return state
//     default:
//       return state;
//   }
// }
