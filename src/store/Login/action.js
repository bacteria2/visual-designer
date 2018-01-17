import {accountLogin} from '../../service/user';
import Immutable from 'immutable';
export const LoginSubmitting="LOGIN_LOGIN_SUBMITTING";
export const ChangeLoginStatus="LOGIN_CHANGE_LOGIN_STATUS";
export const UserLogout="LOGIN_USER_LOGOUT";

export function userAccountLogin(user){
  return dispatch=>{
    dispatch({
      type:LoginSubmitting,
      payload:true
    })
    return accountLogin(user).then(loginUser=>{
      dispatch({
        type:ChangeLoginStatus,
        payload:Immutable.Map(loginUser)
      });
      dispatch({
        type:LoginSubmitting,
        payload:false
      })
    })
  }
}

export function logout () {

}