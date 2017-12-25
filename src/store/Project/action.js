import { queryProjectNotice } from '../../service/notice';

export const FetchingNotice='fetchingNotice';
export const NoticeLoading='noticeLoading';

export function fetchNotice(){
  return dispatch=>{
    dispatch({type:NoticeLoading,payload:true})
    return queryProjectNotice().then(notice=>{
      dispatch({type:FetchingNotice,payload:notice})
      dispatch({type:NoticeLoading,payload:false})
    })
  }
}