import {
  UserLogin,
  UserLogout,
  UserRegistry
}from './action';
import Immutable from 'immutable';

// state:{
//   id:'',
//   username:'',
//   password:'',
//   phone:'',
//   role:[],
// },

export  default function User (state=Immutable.fromJS({
  User:{
    username:'admin',
    password:"************",
    status:'ok'
  }}), {type,payload}) {
  switch (type){
    case UserLogin:
      return {...payload,status:'ok'};
    case UserLogout:
      return {id:'',username:'',password:'',phone:'',role:[],status:'offline'};
    case UserRegistry:
      return payload
    default:
      return state;
  }
}


