import {
  createStore, applyMiddleware,compose
} from "redux";
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux-immutable';
import config from '../config'
import Immutable from "immutable"
import user from './User';
import state from './Global';
import login from './Login';
import register from './Register';

let {reduxDevToolEnable}=config;


let defaultState={
  user:{
    list:[],
    loading:false,
    currentUser:{
    }
  },
  login:{
    status:null,
    submitting:false,
    type:null,
  },
  register:{
    status:null,
    submitting:false,
  },
  collapsed: false,
  notices: [],
  fetchingNotices: false,
};

function reduxDevTool(middleware){
  if(reduxDevToolEnable){
      if(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        return  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware)
      }
  }
  return compose(middleware)
}

export default createStore(
  combineReducers({user,...state,login,register}),Immutable.fromJS(defaultState),
  reduxDevTool(applyMiddleware(
    thunkMiddleware
  ))
);