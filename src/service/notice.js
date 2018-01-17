import {requestJSON,apiPrefix} from './index'

export function queryProjectNotice () {
  return requestJSON(apiPrefix+'/project/notice')
}