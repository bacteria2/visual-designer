import {
  createStore, applyMiddleware,
} from "redux";
import thunkMiddleware from 'redux-thunk'
import User from './User/index';
import { combineReducers } from 'redux';

export default createStore(
  combineReducers({User}),{
    user:{
      username:'admin',
      password:"************",
      status:'ok'
    }},
  applyMiddleware(
    thunkMiddleware
  )
);;