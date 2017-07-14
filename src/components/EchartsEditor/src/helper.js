/**
 * Created by lenovo on 2017/5/9.
 */
import { formatTime } from '@/utils'


export async function initEcharts (id) {

  let echarts= await import(/* webpackChunkName: "echarts" */ 'echarts')

  // 基于准备好的dom，初始化echarts实例
  window.echarts = echarts
  let chart = echarts.init(document.getElementById(id))
  //添加resize事件
  window.addEventListener('resize', () => {
    chart.resize()
  })
  return chart
}


