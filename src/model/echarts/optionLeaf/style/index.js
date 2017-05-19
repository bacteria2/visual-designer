import * as css  from './css';


export const colorStops=[
  {
    offset: 0, color: 'red' // 0% 处的颜色
  }, {
    offset: 1, color: 'blue' // 100% 处的颜色
  }
]

/**
 * 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
 * */
export const linearColor = {
  type: 'linear', x:0, y:0, x2:0, y2:1, colorStops, globalCoord:false
}


/**
 * 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
 * */
export const radialColor = {type: 'radial', x:0.5, y:0.5, r:0.5, colorStops, globalCoord:false }

/**
 * 纹理填充
 * */
export const imageColor = {
  image:null,// 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
  repeat:'no-repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
}

export const areaStyle = {
  ...css.shadow,opacity:1, color: null
}

export const textStyle = {
  ...css.fontStyle, color: null, align: null, baseLine: null
}

export const lineStyle = {
  ...areaStyle, width: null, type: null
}
export  const style={...css};
