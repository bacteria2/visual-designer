/**
 * Created by lenovo on 2017/5/15.
 */
export function shadow (s = {}) {
  let {shadowBlur, shadowOffsetX, shadowOffsetY, shadowColor} = s
  return {shadowBlur, shadowOffsetX, shadowOffsetY, shadowColor}
}

export function shadowO (s = {}) {
  let {opacity} = s
  return {...shadow(), opacity}
}

export function boxLayout (b = {}) {
  let {width, height} = b
  return {...position(), width, height}
}

export function position (p = {}) {
  let {left, top, right, bottom} = p
  return {left, top, right, bottom}
}

export function fontStyle (s = {}) {
  let {fontStyle, fontWeight, fontSize, fontFamily} = s
  return {fontStyle, fontWeight, fontSize, fontFamily}
}

export const defaultFontStyle= {
  ...fontStyle({fontStyle:'normal', fontWeight:'normal', fontSize:12, fontFamily:'sans-serif'})
}

export function boarder (boarder = {}) {
  let {boarderType, boarderColor, boarderWidth} = boarder
  return {boarderType, boarderColor, boarderWidth}
}

/**Z轴*/
export function z (z = {}) {
  let {z, zlevel} = z
  return {z, zlevel}
}

/**动画*/
export function animation (ani = {}) {
  let {
    animation,
    animationThreshold,
    animationDuration, animationDurationUpdate,
    animationEasing, animationEasingUpdate,
    animationDelay, animationDelayUpdate
  } = ani
  return {
    animation,
    animationThreshold,
    animationDuration, animationDurationUpdate,
    animationEasing, animationEasingUpdate,
    animationDelay, animationDelayUpdate
  }
}

/**
 * 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
 * */
export function linearColor (linearColor = {}) {
  let { x,y,x2,y2,colorStops, globalCoord}=linearColor
  return {type: 'linear',x,y,x2,y2,colorStops, globalCoord}
}

/**
 * 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
 * */
export function radialColor (radialColor = {}) {
  let { x,y,r,colorStops,globalCoord}=radialColor
  return {type: 'radial',x,y,r,colorStops,globalCoord}
}

/**
 * 纹理填充
 * */
export function imageColor (imageColor = {}) {
  let{ image, repeat}=imageColor
  return {
    image,// 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
    repeat // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
  }
}
