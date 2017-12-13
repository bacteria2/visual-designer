/**
 * Created by lenovo on 2017/5/2.
 */
import axios from 'axios'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import config from './config'

let conf=window.config||config;

axios.defaults.baseURL = conf.apiPrefix;

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
    option
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${!isEmpty(data) ? `?${qs.stringify(data)}` : ''}`,option)
    case 'delete':
      return axios.delete(url,option)
    case 'head':
      return axios.head(url,option)
    case 'post':
      return axios.post(url,data,option)
    case 'put':
      return axios.put(url, data,option)
    case 'patch':
      return axios.patch(url, data,option)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let message
    let status
    if (response) {
      status = response.status
      const { data, statusText } = response
      message = data.message || statusText
    } else {
      status = 600
      message = 'Network Error'
    }
    return { success: false, status, message }
  })
}
