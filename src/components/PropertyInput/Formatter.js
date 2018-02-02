import isString from 'lodash/isString'

export const pixel = {
  formatter (value) {return `${value}px` },
  parser (value) {if (isString(value)) return value.replace('px', '') },
}

export const  percent= {
  formatter (value) { return `${value}%` },
  parser (value) {if (isString(value)) return value.replace('%', '')},
}

