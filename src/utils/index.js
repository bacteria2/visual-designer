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

/*
export function rgbArrayToHex(rgba){
  let hexString="#";
  if(Array.isArray(rgba)){
    rgba.forEach(r=>{
      hexString+=parseInt(r).toString(16)
    })
  }
  return hexString;
}
*/

export  function toHex({ r, g, b }) {
  const INT_HEX_MAP = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };
  const hexOne = function(value) {
    value = Math.min(Math.round(value), 255);
    const high = Math.floor(value / 16);
    const low = value % 16;
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low);
  };
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '';
  return '#' + hexOne(r) + hexOne(g) + hexOne(b);
};
