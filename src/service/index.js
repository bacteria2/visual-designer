import { notification } from 'antd';

const {
  apiPrefix='/visual/api',
  timeout=2000,
  enableNotification=false,
}= window.VisualConfig||{};


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

export {apiPrefix};

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
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch((error) => {
      if (error.code&&enableNotification) {
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
      return error;
    });
}
