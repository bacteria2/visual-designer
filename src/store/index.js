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
import widget from './Widget';

let {reduxDevToolEnable}=config;


let defaultState={
  widget:{
    rawOption:{
      'title.text':{value:"abdeeesc",disabled:true},
      'title.textStyle.fontSize':{value:16,disabled:false},
      'title.textStyle.height':{value:32,disabled:false},
      'title.textStyle.width':{value:120,disabled:false},
      'title.subtext':{value:11111,disabled:false},
      'color':{
        disabled:false,
        value:['#c23531','#2f4554', '#61a0a8', '#d48265']
      },
      'tooltip.formatter':{
        disabled:false,
        value:function(param){
          return param.name + 'w'
        }
      }
    },
    id:'',
    rendering:true,
  },
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

const composeEnhancers =
  typeof window === 'object' &&
  reduxDevToolEnable  &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export default createStore(
  combineReducers({user,...state,login,register,widget}),
  Immutable.fromJS(defaultState),
  composeEnhancers(applyMiddleware(
      thunkMiddleware
    ))
  // composeEnhancers(applyMiddleware(
  //   thunkMiddleware
  // ))
);