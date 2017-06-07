import base from './chartBase'
import forOwn from 'lodash/forOwn'

const Bar = {
  xAxis:null,
  yAxis:null
}




const CHART = {
  Bar
}


forOwn(CHART, v => Object.assign(v, base()))

export default CHART;
