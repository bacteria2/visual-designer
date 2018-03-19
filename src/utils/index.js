import moment from 'moment';
import beautifyConfig from './.jsbeautifyrc';
import isArray from 'lodash/isArray'
import { js_beautify } from 'js-beautify';

export function fixedZero (val) {
  return val * 1 < 10 ? `0${val}` : val
}

export function getTimeDistance (type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - (day * oneDay)

    return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`), moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)]
  }

  if (type === 'year') {
    const year = now.getFullYear()

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
  }
}

function getPlainNode (nodeList, parentPath = '') {
  const arr = []
  nodeList.forEach((node) => {
    const item = node
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    item.exact = true
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path))
    } else {
      if (item.children && item.component) {
        item.exact = false
      }
      arr.push(item)
    }
  })
  return arr
}

function isNull (value) {
  return null === value || undefined === value
}

function getRelation (str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!')  // eslint-disable-line
  }
  const arr1 = str1.split('/')
  const arr2 = str2.split('/')
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2
  }
  return 3
}

export function getRoutes (path, routerData) {
  let routes = Object.keys(routerData).filter(routePath =>
    routePath.indexOf(path) === 0 && routePath !== path);
  routes = routes.map(item => item.replace(path, ''));
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3)
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1)
    if (isAdd) {
      renderArr.push(routes[i])
    }
  }
  return renderArr.map((item) => {
    // let exact =routerData[`${path}${item}`].exact;
    //  if(isNull(exact))
    const exact = !routes.some(route => {return route !== item && getRelation(route, item) === 1})
    return {
      key: `${path}${item}`,
      path: `${path}${item}`,
      component: routerData[`${path}${item}`].component,
      exact,
    }
  })
}

export function digitUppercase (n) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ]
  let num = Math.abs(n)
  let s = ''
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '')
  })
  s = s || '整'
  num = Math.floor(num)
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = ''
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}

/**
 * RGBA值转换成16进制数
 * */
export function toHex ({r, g, b}) {
  const INT_HEX_MAP = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'}
  const hexOne = function (value) {
    value = Math.min(Math.round(value), 255)
    const high = Math.floor(value / 16)
    const low = value % 16
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low)
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) return ''
  return '#' + hexOne(r) + hexOne(g) + hexOne(b)
}

/**
 * 带函数的json字符串转换
 */
export function parseJSON (json) {
  return JSON.parse(JSON.stringify(json), function (key, value) {
    if (value.indexOf && value.indexOf('function') > -1) {
      return eval('(function(){return ' + value + ' })()')
    }
    return value
  })
}

/**
 *美化
 */
export function beautifyJs (text) {
    return js_beautify(text,beautifyConfig)
}

/**
 * 链接授权list,返回函数判断是否有权限
 * @param state {Map}
 * @param moduleName {string}
 * @return {function}
 * */
export function authConnect(state,moduleName){
  const moduleList=state.getIn(['authorization','entities','module',moduleName]);
  const userType=state.getIn(['user','currentUser','userType'])
  if(!moduleList)
    throw new Error(`can't find auth list of module:${moduleName}`)
  if(!userType)
    throw new Error(`current userType is empty`)

  return function(key){
    let authList,hasAuth=false,lenth=userType.size;
    Array.isArray(key)?authList=moduleList.getIn(key): authList= moduleList.getIn(key.split('.'))
    for(let i=0;i<lenth;i++){
      hasAuth=authList.some(auth=>auth===userType.get(i))
      if(hasAuth)
        break;
    }
    return hasAuth;
  }
}

/**
 * 用类似 VUE 的风格，结合 style module,生成类名。
 *  例： {workspaceGrid:dashboard.showGrid}
 * @param options
 * @param styles
 */
export function getClassName(options,styles){
   let className = "";
   for(let key in options){
     if(options[key]){
         className += styles[key] + " ";
     }
   }
   return className
}

/**
 * 比较两个数据的值是否完全一致，（浅比较）
 * @param arr1
 * @param arr2
 */
export function compaireArr(arr1,arr2){
    let same = false;
    if(isArray(arr1) && isArray(arr2)){
        if(arr1.length === arr2.length){
            let flag = true;
            arr1.forEach((arr1Value,i)=>{
                if(arr1Value !== arr2[i]) flag = false;
            });
            same = flag;
        }
    }
    return same;
}

export {default as captureMouse} from './captureMouse'