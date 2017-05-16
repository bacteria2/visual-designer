/**
 * Created by lenovo on 2017/5/15.
 */
import {style} from '../common';

export default function (lineStyle) {
  let styleBase={...style.shadowO(),color:null,width:null,type:null}
  return Object.assign({},styleBase ,lineStyle)
}
