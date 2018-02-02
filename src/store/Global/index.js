import { ChangeLayoutCollapsed, ChangeNoticeLoading, SaveClearedNotices,SaveNotices,ChangeControlMenu,RemoveControlMenu } from './action'


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
  controlMenu(state,{type,payload}){
    switch (type){
      case ChangeControlMenu:
        return payload;
      case RemoveControlMenu:
        return null;
      default:
        return state;
    }
  },
}

