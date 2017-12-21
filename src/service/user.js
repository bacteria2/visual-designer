import {requestJSON,apiPrefix} from './index'

export async function Login(user){
  return requestJSON(apiPrefix+'/user/login',{method:'post',body:user})
}

export async function fakeLogin(user){
  return new Promise(function (resolve,reject) {
    resolve({id:'43827126723',
      username:'bacteria',
      password:'tesasewqt@',
      phone:'18620533221',
      role:user.auth?['admin']:[]})
  })
}

export async function fakeRegistry(user){
  return new Promise(function (resolve,reject) {
    resolve({id:'43827126723',
      username:user.name,
      password:'tesasewqt@',
      phone:'18620533221',
      role:user.auth?['admin']:[]})
  })
}