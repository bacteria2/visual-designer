import {accountLogin} from '../../service/user';
import Immutable from 'immutable';
export const ChangeSubmitting="LOGIN_LOGIN_SUBMITTING";
export const ChangeStatus="LOGIN_CHANGE_LOGIN_STATUS";
export const UserLogout="LOGIN_USER_LOGOUT";

export function userAccountLogin(user,){
  return dispatch=>{
    dispatch({
      type:ChangeSubmitting,
      payload:true
    })
    return accountLogin(user).then(login=>{
      console.log('loginUser',login)
      if(login.status==='ok'){
        dispatch({
          type:ChangeStatus,
          payload:Immutable.Map(login)
        });

      }
      dispatch({
        type:ChangeSubmitting,
        payload:false
      })
    })
  }
}

export function logout () {

}