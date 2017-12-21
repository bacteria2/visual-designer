import {fakeLogin} from '../../service/user';

export const UserLogin='USER_LOGIN';
export const UserLogout='USER_LOGIN';
export const UserRegistry='USER_LOGIN';

export function userLogin(userInfo={}){
  return dispatch=>{
    dispatch({type:UserLogout});
    return fakeLogin(userInfo).then(user=>dispatch({type:UserLogin,payload:user}))
  }
}

function logout() {
  return {
    type:UserLogout,
  }
}

export function userRegistry(userInfo) {
  return dispatch=>{
    dispatch({type:UserLogout});
    return fakeLogin(userInfo).then(user=>dispatch({type:UserRegistry,payload:user}))
  }
}