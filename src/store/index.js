import {
  createStore, applyMiddleware,
} from "redux";
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux-immutable';
import Immutable from "immutable"
import user from './User';
import state from './Global'



let defaultState={
  user:{
    username:'admin',
    password:"************",
    status:'ok'
  },
  collapsed: false,
  notices: [],
  fetchingNotices: false,
};

export default createStore(
  combineReducers({user,...state}),Immutable.fromJS(defaultState),
  applyMiddleware(
    thunkMiddleware
  )
);