/**
 * Created by lenovo on 2017/5/2.
 */
import { js_beautify } from 'js-beautify';
import beautifyConfig from './.jsbeautifyrc';

export function saveLocal(obj,key){
  if (window.localStorage && obj &&key) {
    try {
      window.localStorage.setItem(key, code);
    } catch (e) {
      console.error(e);
    }
  }
}
export function  loadLocal(key){
  let obj=null;
  if (window.localStorage && key) {
    try {
      obj=window.localStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return obj;
}

// format time to string
export function formatTime(time) {
  let digits = [time.getHours(), time.getMinutes(), time.getSeconds()];
  let timeStr = '';
  for (let i = 0, len = digits.length; i < len; ++i) {
    timeStr += (digits[i] < 10 ? '0' : '') + digits[i];
    if (i < len - 1) {
      timeStr += ':';
    }
  }
  return timeStr;
}

//beautify JavaScript String
export function beautifyJs (text) {
  return js_beautify(text,beautifyConfig)
}



