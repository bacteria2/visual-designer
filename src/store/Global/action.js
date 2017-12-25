import { fakeLogin } from '../../service/user'

export const ChangeLayoutCollapsed='ChangeLayoutCollapsed';
export const SaveNotices='SaveNotices';
export const SaveClearedNotices='SaveClearedNotices';
export const ChangeNoticeLoading='ChangeNoticeLoading';


function layoutCollapsed() {
  return dispatch=>dispatch({type:ChangeLayoutCollapsed})
}

