/**
 * Created by lenovo on 2017/5/15.
 */
import { style ,textStyle } from './style'

let shadow = style.shadow;
let position = style.position;
let boarder = style.boarder;


let subtitle = {
  subtext: '',
  sublink: '',
  subtarget: 'blank',
}

export const title = {
  ...shadow, ...position, ...boarder, ...subtitle,
  show: true, text: '', link: '', target: 'blank',
  textAlign: null,
  padding: 5, itemGap: 10, z: 2, zlevel: 0, backgroundColor: 'transparent'
}

export default {
  'title':Object.assign({},title),
  'title|textStyle':Object.assign({},textStyle),
  'title|subtextStyle':Object.assign({},textStyle),
}
