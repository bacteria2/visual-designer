import { notification } from 'antd';
import config from '../config';

let {
  apiPrefix,
  resourcePrefix,
  serverPrefix,
  enableNotification}=config;


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if(enableNotification){
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: response.statusText,
    });
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export {apiPrefix,resourcePrefix,serverPrefix};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function requestJSON(url, options) {
  const defaultOptions = {
    credentials: 'include',
    headers:{
      Accept: 'application/json;application/text',
    }
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch((error) => {
      if (enableNotification) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }else {
        console.error(`message: ${error.name},description: ${error.message}`)
      }
      if ('stack' in error && 'message' in error &&enableNotification) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }else {
        console.error(`message:请求错误 ${url},description: ${error.message}`)
      }
      return {...error,isError:true};
    });
}

export function requestResource(url,option){
  const defaultOptions = {
    credentials: 'include',
    headers:{
      Accept: 'application/json',
    }
  };
  const newOptions = { ...defaultOptions, ...option };
  return fetch(`${resourcePrefix}?url=${url}` ,newOptions)
    .then(checkStatus)
    .catch((error) => {
      if (enableNotification) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }else {
        console.error(`message: ${error.name},description: ${error.message}`)
      }
      if ('stack' in error && 'message' in error &&enableNotification) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }else {
        console.error(`message:请求错误 ${url},description: ${error.message}`)
      }
      return {...error,isError:true};
    });
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function requestForm(url, options) {
    let paramStr = '';

    for(let key in options){
        if(typeof(options[key]) === 'string' ){
            paramStr += key + '=' + options[key] + "&";
        }else{
            paramStr += key + '=' + JSON.stringify(options[key]) + "&";
        }
    }

    const newOptions = {
        method:'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body : paramStr
    };

    return fetch(url, newOptions)
        .then(response => response.json())
        .catch((error) => {
            throw new  Error(error);
        });

}
