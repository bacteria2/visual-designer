/**
 * Created by lenovo on 2017/5/16.
 */
import {style} from '../chart/common';

export default function (areaStyle) {
  let styleBase={...style.shadowO(),color:null}
  return Object.assign({},styleBase ,areaStyle)
}
