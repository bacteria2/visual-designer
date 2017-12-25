import {requestJSON,apiPrefix} from './index'

export async function queryProjectNotice () {
  return requestJSON(apiPrefix+'/project/notice')
}