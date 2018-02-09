import {saveAuthList} from './action'

export default function(state,{type,payload}){
  switch (type){
    case saveAuthList:
      return payload
    default:
      return state;
  }
}