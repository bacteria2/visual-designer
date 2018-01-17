import {getCurrentUser as currentUser} from '../../service/user';
import Immutable from 'immutable';
export const ChangLoading='USER_CHANGE_LODING';
export const SaveCurrentUser='USER_SAVE_CUREENT_USER';
export const UserSaveList='USER_SAVE_LIST';
export const UpdateNoticeCount='USER_UPDATE_NOTICE_COUNT';

export function fetchCurrentUser(){
  return dispatch=>{
    dispatch({type:ChangLoading,payload:true});
    return currentUser()
      .then(({code,data:user})=>{
        code===200&&dispatch({type:SaveCurrentUser,payload:Immutable.fromJS(user)})
        dispatch({type:ChangLoading,payload:false})
      })
  }
}

