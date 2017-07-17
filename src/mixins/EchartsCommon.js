import debounce from 'lodash/debounce'

import { uuid } from '@/utils'



export default{
  render(h){
    let data = {
      attrs:{
        id:this.id
      },
      staticClass:'charts-display__panel'
    }
    return h('div', data)
  },
  props: {
    merged: {
      type: Boolean,default: true
    }
  },
  data(){
    return {
      id: uuid(),
      instance: undefined,
    }
  },
  methods: {
    async initEcharts() {
      let echarts= await import(/* webpackChunkName: "echarts" */ 'echarts')
      // 基于准备好的dom，初始化echarts实例
      let element=document.getElementById(this.id)
      if(!element) {
        return
      }
      let chart = echarts.init(element);
      window.echarts=echarts;
      //添加resize事件
      window.addEventListener('resize',debounce(chart.resize,1000))
      this.instance=chart;
      return chart
    },
    updateChart(option){
      if(option&&typeof option==='object'){
        //chart.setOption(option, notMerge, lazyUpdate);
        this.instance.setOption(option,true)
      }
    },
    resizeChart(){
      this.instance.resize()
    }
  }
}
