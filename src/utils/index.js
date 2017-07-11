/**
 * Created by lenovo on 2017/5/2.
 */
import { js_beautify } from 'js-beautify';
import beautifyConfig from './.jsbeautifyrc';
import debounce from 'lodash/debounce'
import _merge from 'lodash/merge'
import _mergeWith from 'lodash/merge'
import _forOwn from 'lodash/forOwn'
import _set from 'lodash/set'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _remove from 'lodash/remove'
import _cloneDeep from 'lodash/clonedeep'
import _uniqBy from 'lodash/uniqby'
import _compact from 'lodash/compact'
import {MessageBox,Message,Notification} from 'element-ui'
import dataModel from '@/model/src/dataModel'
import Vue from 'vue'


/**
 * set对象
 * */
export function set(object, path, value) {
  return _set(object, path, value);
}

/**
 * 合并对象
 * */
export function merge (object, [sources]) {
 return _merge(object,...sources);
}
/**
 * 合并对象
 * */
export function mergeWith (object, sources,func) {
  return _mergeWith(object,sources,func);
}

/**
* 循环Object自身可枚举的属性
* */
export function forOwn (object,funcion) {
  return _forOwn(object,funcion);
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
/**
 * 随机生成UUID
 * */
export function uuid() {
  var s = ['e'];
  var hexDigits = "abcdefghijkwe2sf1256789a";
  for (var i = 1; i < 13; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x17), 1);
  }
  var uuid = s.join("");
  return uuid;
}

/*let debounceFunc;
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
}*/

let debounceFunc;
export function debounceExec(func, timeout){
  if(debounceFunc){
    debounceFunc();
    return
  }
  debounceFunc = debounce(_=> {
    func();
    debounceFunc= null;
  }, timeout)
  debounceFunc();
}

/**
 * RGBA值转换成16进制数
 * */
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

export function map(array,func){
  return _map(array,func);
}

export function get(obj,path){
  return _get(obj,path);
}

export  function  remove(array,func) {
  return _remove(array,func);
}

export  function clone(obj){
  return _cloneDeep(obj);
}

export function uniqBy(array,property) {
  return _uniqBy(array,property);
}

export function compact(array){
  return _compact(array);
}

//控制 property checkBos的选项
export const checkedControlItem = ['disable','show']

//提示类
export const message = {
  /*
   * 通用提示
   * @param msg
   */
  warning(msg){
    Message({
      message: msg,
      type: 'warning'
    });
  },
  notify(msg){
    Notification({
      title: '警告',
      message: msg,
      type: 'warning'
    });
  },
  success(msg){
    Message({
      message: msg,
      type: 'success'
    });
  },
  confirm(msg,fun){
    MessageBox({
      title:'提示',
      message:msg,
      showCancelButton:true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then((action)=>{
      if(action==='confirm') {
        fun();
      }
    });
  }
}

/**
 *
 * @param option
 * @param data
 */
export function mergeOptionAndData(option,data) {

}

export function getOptionData(dimensions,sourceData){
   let optionDatas = {}
   dimensions.forEach((dimensionItem)=>{
     let odItem = dataModel.optionDataItem({key:dimensionItem.key,value:sourceData[dimensionItem.dataItem.key]})
     if(odItem.key&&odItem.value){
       if(!optionDatas.hasOwnProperty(odItem.key)){
         Vue.set(optionDatas, odItem.key, odItem.value)
       }
     }
   })
  return optionDatas
}

//去除换行和空格
export function ClearBrAndTrim(key) {
  key = key.replace(/\s+/g, "");
  key = key.replace(/<\/?.+?>/g,"");
  key = key.replace(/[\r\n]/g, "");
  return key;
}
