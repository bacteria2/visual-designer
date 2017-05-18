/**
 * Created by lenovo on 2017/5/16.
 */
/**轴标签名*/
import style from './commonStyle'

export function axixName (n = {}) {
  let {
    name,
    nameLocation,
    nameTextStyle,
    nameGap,
    nameRotate
  } = n
  return {name,nameLocation,nameTextStyle:Object.assign({...style.fontStyle(),color:null},nameTextStyle),nameGap,nameRotate}
}
