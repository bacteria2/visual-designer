import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import echarts from 'echarts'
import { uuid } from '@/utils'
import store from '@/store'

function initEcharts (id) {
  // 基于准备好的dom，初始化echarts实例
  //window.echarts = echarts
  let element=document.getElementById(id)
  if(!element)
    return
  let chart = echarts.init(element);
  //添加resize事件
  window.addEventListener('resize',debounce(chart.resize,1000))
  return chart
}

export default{
  name: 'EchartsPanel',
  store,
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
    //如果成功初始化,注册echarts
    if(this.instance){
      this.$store.commit('registryInstance', this)
      this.updateChart(this.$store.state.echarts.option)
    }
  },
  data(){
    return {
      id: uuid(),
      instance: undefined,
    }
  },
  methods: {
    updateChart(option){
      console.log(option)
      if(option&&typeof option==='object'){
        console.log('updated')
        this.instance.setOption(option)
      }

    },
    resizeChart(){
      this.instance.resize()
    }
  }
}
