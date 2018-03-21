import isString from 'lodash/isString'

export const pixel = {
  formatter (value) {return `${value}px` },
  parser (value) {return isString(value) ? value.replace('px', '')*1:value},
}

export const  percent= {
  formatter (value) { return `${value}%` },
  parser (value) {return isString(value) ? value.replace('%', '')*1:value},
  formatterHandler(value){return `${value}%`},
}

