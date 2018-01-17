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
      case SaveClearedNotices:
        console.log(state.filter(notice=>notice.type!==payload),'SaveClearedNotices')
        return state.filter(notice=>notice.type!==payload);
      case SaveNotices:
        return payload;
      default:
        return state;
    }
  },
  fetchingNotices(state,{type,payload}){
    switch (type){
      case  ChangeNoticeLoading:
        return payload;
      default:
        return state;
    }
  },
}

