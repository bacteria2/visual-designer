import {userRegistry} from '../../service/user';
import Immutable from 'immutable';
export const RegistrySubmitting="REGISTER_REGISTRY_SUBMITTING";
export const ChangeRegistryStatus="REGISTER_CHANGE_REGISTRY_STATUS";
//export const UserLogout="LOGIN_USER_LOGOUT";

export function accountRegistry(user){
  return dispatch=>{
    dispatch({
      type:RegistrySubmitting,
      payload:true
    })
    return userRegistry(user).then(loginUser=>{
      loginUser.code==200&&dispatch({
        type:ChangeRegistryStatus,
        payload:Immutable.Map(loginUser)
      });
      dispatch({
        type:RegistrySubmitting,
        payload:false
      })
    })
  }
}
