import {requestJSON,apiPrefix} from './index';


export function getAuthorityList(){
  return requestJSON(apiPrefix+'/authorization/list')
}