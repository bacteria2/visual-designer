import {
  createStore, applyMiddleware, compose,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux-immutable'
import config from '../config'
import Immutable from 'immutable'
import user from './User'
import state from './Global'
import login from './Login'
import register from './Register'
import widget from './Widget'

let {reduxDevToolEnable} = config
let defaultState = {
  widget: {
    currentWidget: {},
    loading: true,
    currentList:[],
    listLoading:true,
  },
  user: {
    list: [],
    loading: false,
    currentUser: {},
  },
  login: {
    status: null,
    submitting: false,
    type: null,
  },
  register: {
    status: null,
    submitting: false,
  },
  controlMenu:null,
  collapsed: false,
  notices: [],
  fetchingNotices: false,
}

const composeEnhancers =
  typeof window === 'object' &&
  reduxDevToolEnable &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose

export default createStore(
  combineReducers({user, ...state, login, register, widget}),
  Immutable.fromJS(defaultState),
  composeEnhancers(applyMiddleware(
    thunkMiddleware
  ))
  // composeEnhancers(applyMiddleware(
  //   thunkMiddleware
  // ))
)