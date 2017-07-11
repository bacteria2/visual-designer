import debounce from 'lodash/debounce'
import echarts from 'echarts'
import { uuid } from '@/utils'


function initEcharts (id) {
  // 基于准备好的dom，初始化echarts实例
  let element=document.getElementById(id)
  if(!element) {
    return
  }
  let chart = echarts.init(element);
  window.echarts=echarts;
  //添加resize事件
  window.addEventListener('resize',debounce(chart.resize,1000))
  return chart
}

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
  mounted(){
    this.instance= initEcharts(this.id);
  },
  data(){
    return {
      id: uuid(),
      instance: undefined,
    }
  },
  methods: {
    updateChart(option){
      if(option&&typeof option==='object'){
        this.instance.setOption(option,false)
      }
    },
    resizeChart(){
      this.instance.resize()
    }
  }
}
