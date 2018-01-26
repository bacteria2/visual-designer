import {requestJSON,apiPrefix} from './index'

export async function accountLogin(user){
  return requestJSON(apiPrefix+'/login/account',{method:'POST',body:user})
}

export async function getCurrentUser(user){
    return requestJSON(apiPrefix+'/user/currentUser')
}

export async function userRegistry(user){
   return  requestJSON(apiPrefix+'/user/registry',{method:'POST',body:user})

}