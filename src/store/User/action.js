import {getCurrentUser as currentUser} from '../../service/user';
import Immutable from 'immutable';
export const ChangLoading='USER_CHANGE_LODING';
export const SaveCurrentUser='USER_SAVE_CUREENT_USER';
export const UserSaveList='USER_SAVE_LIST';
export const UpdateNoticeCount='USER_UPDATE_NOTICE_COUNT';


export function saveCurrentUser(user){
  return {
    type:SaveCurrentUser,
    payload:Immutable.fromJS(user),
  }
}

export function fetchCurrentUser(){
  return async dispatch=>{
    dispatch({type:ChangLoading,payload:true});
    const {success,data:user}= await currentUser()
    success&&dispatch(saveCurrentUser(user))
    dispatch({type:ChangLoading,payload:false})
  }
}



