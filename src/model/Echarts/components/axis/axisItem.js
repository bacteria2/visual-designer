/**
 * Created by lenovo on 2017/5/16.
 */
import {style} from '../../common'
import lineStyleFunc from '../lineStyle'
import textStyleFunc from '../textStyle'
import areaStyleFunc from '../areaStyle'


let lineStyle=lineStyleFunc();
let textStyle=textStyleFunc();
let areaStyle=areaStyleFunc();

let itemBase={
  show:null,
  interval:null
}

export function axisTick (axisTick={}) {
  return Object.assign({},{
    ...itemBase,inside:null,
    alignWithLabel:null,length:null,lineStyle },axisTick)
}

export function axisLabel (axisLabel={}) {
  return Object.assign({},{
    ...itemBase,inside:null,
    formatter:null,showMinLabel:null,showMaxLabel:null,
    rotate:null,margin:null,textStyle },axisLabel)
}

export function splitLine (splitLine={}) {
  return Object.assign({},{...itemBase,lineStyle},splitLine)
}

export function splitArea (axisLabel={}) {
  return Object.assign({},{...itemBase,areaStyle },axisLabel)
}

export function data (data={}) {
  return Object.assign({},{value,textStyle },data)
}

export function axisPointer (axisLabel={}) {
  return Object.assign({},{...style.z(),
    ...itemBase,formatter:null,showMinLabel:null,showMaxLabel:null,
    rotate:null,margin:null,textStyle },axisLabel)
}
