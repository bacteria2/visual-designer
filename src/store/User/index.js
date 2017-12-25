import {
  UserLogin,
  UserLogout,
  UserRegistry
}from './action';
import Immutable from 'immutable';


export  default function User (state=Immutable.Map(), {type,payload}) {
  switch (type){
    case UserLogin:
      return state.set('status','ok');
    case UserLogout:
      return {id:'',username:'',password:'',phone:'',role:[],status:'offline'};
    case UserRegistry:
      return payload
    default:
      return state;
  }
}


