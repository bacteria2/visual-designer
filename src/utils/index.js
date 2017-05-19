/**
 * Created by lenovo on 2017/5/2.
 */
import { js_beautify } from 'js-beautify';
import beautifyConfig from './.jsbeautifyrc';
import debounce from 'lodash/debounce'
import mixin from 'lodash/mixin'

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

export function uuid() {
  var s = ['e'];
  var hexDigits = "abcdefghijkwe2sf1256789a";
  for (var i = 1; i < 13; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x17), 1);
  }
  var uuid = s.join("");
  return uuid;
}

export function debounceExec(func, timeout){
  if(window._debounceFunc){
    window._debounceFunc();
    return
  }
  window._debounceFunc = debounce(_=> {
    func();
    window._debounceFunc= null;
  }, timeout)
  window._debounceFunc();
}

export function  mixins (obj,arg) {
  return mixin(obj,...arg)
}

export function  nullObject (obj,arg) {
  return mixin(obj,...arg)
}

export function buildOption(){

}
