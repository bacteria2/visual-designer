import {
  createStore, applyMiddleware,
} from "redux";
import thunkMiddleware from 'redux-thunk'
import User from './User';
import { combineReducers } from 'redux-immutable';
import Immutable from "immutable"



export default createStore(
  combineReducers({User}),Immutable.fromJS({
    User:{
      username:'admin',
      password:"************",
      status:'ok'
    }}),
  applyMiddleware(
    thunkMiddleware
  )
);