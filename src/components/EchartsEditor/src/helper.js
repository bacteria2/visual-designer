/**
 * Created by lenovo on 2017/5/9.
 */
import echarts from 'echarts'
import { formatTime } from '@/utils'

export function initEcharts (id) {
  // 基于准备好的dom，初始化echarts实例
  window.echarts = echarts
  let chart = echarts.init(document.getElementById(id))
  //添加resize事件
  window.addEventListener('resize', () => {
    chart.resize()
  })
  return chart
}


