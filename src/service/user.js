import { requestJSON, apiPrefix } from './index'

export function accountLogin (user) {
  return requestJSON(apiPrefix + '/login/submit', { method: 'POST',body: user})
}
export function getLoginUser(){
  return requestJSON(apiPrefix + '/login/status')
}
export function userLogout(){
  return requestJSON(apiPrefix + '/login/logout')
}

export function getCurrentUser () {
  return requestJSON(apiPrefix + '/user/currentUser')
}

export function userRegistry (user) {
  return requestJSON(apiPrefix + '/user/registry', {method: 'POST', body: user})
}

export function getUserList(query){
  return  requestJSON(apiPrefix+'/user/list',{method:'POST',body:query})
}

export async function saveUser(user){
  return  requestJSON(apiPrefix+'/user/save',{method:'POST',body:user})
}

export async function updateStatus({ids=[],status}){
  return  requestJSON(apiPrefix+'/user/updateStatus',{method:'POST',body:{ids,status}})
}