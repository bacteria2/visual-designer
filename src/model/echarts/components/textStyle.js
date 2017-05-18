/**
 * Created by lenovo on 2017/5/16.
 */
import {style} from '../chart/common';


export default function (textStyle={}) {
  let styleBase={...style.fontStyle(),color:null,align:null,baseLine:null}
  return Object.assign({},styleBase ,textStyle)
}
