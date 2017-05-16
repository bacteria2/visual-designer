/**
 * Created by lenovo on 2017/5/15.
 */
import { commonStyle } from '../../mixin'

let textStyle = commonStyle.textStyle({color:'#333',fontStyle:'normal',fontWeight:'bolder',font})
let shadow=commonStyle.shadow()
let position=commonStyle.position();
let boarder=commonStyle.boarder()

function subtitle(subtitle={}){
  return Object.assign({}, {subtext: '', sublink: '', subtarget: 'blank', subtextStyle:commonStyle.textStyle()}, subtitle)
}

let titleBase={...shadow,...position,...boarder,
  show: true, text: '', link: '', target: 'blank',
  textStyle,textAlign:null,
  ...subtitle(),
  padding:5,itemGap:10,z:2,zlevel:0,backgroundColor:'transparent'}

export default function (title={}) {
  return Object.assign({},titleBase, title)
}
