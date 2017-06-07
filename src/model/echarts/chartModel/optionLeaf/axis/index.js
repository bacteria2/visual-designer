/**
 * Created by lenovo on 2017/5/15.
 */
import { style, axis }from '../../chart/common'

const axisBase = {
  ...style.z(),
  ...axis.axixName(),
  type: null,
  inverse: null,
  boundaryGap: null,
  min: null,
  max: null,
  scale: null,
  splitNumber: null,
  minInterval: null,
  interval: null,
  logBase: null,
  silent: null,
  triggerEvent: null,
  axisLine: null,
  axisTick: null,
  axisLabel: null,
  splitArea: null,
  data: null,
  axisPointer: null
}

let nameTextStyle = {...style.defaultFontStyle, color: null}

export const defaultAxis=Object.assign({},axisBase, {
  z: 0, zlevel: 0, ...axis.axixName({nameLocation: 'end', nameTextStyle, nameGap: 15}),
})



/** x轴*/
export const xAxis = {
  show: true,
  gridIndex: 0, position: null, ...axisBase
}

/** y轴*/
export const yAxis = {
  show: true,
  gridIndex: 0, position: null, ...axisBase
}
/**
 * 极坐标径向轴
 * */
export const radiusAxis = Object.assign({},axisBase,
  {
    polarIndex: 0,type:'value',  gridIndex: 0, position: null,})
