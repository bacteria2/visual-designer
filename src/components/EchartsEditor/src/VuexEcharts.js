import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import echarts from 'echarts'
import { uuid } from '@/utils'
import store from '@/store'

function initEcharts (id) {
  // 基于准备好的dom，初始化echarts实例
  window.echarts = echarts
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
    let data = {}
    data.id = this.id
    data.staticClass = 'charts-display__panel'
    return h('div', data)
  },
  props: {
    merged: {
      type: Boolean,
      default: true
    }
  },
  mounted(){
    let instance = initEcharts(this.id);
    //注册echarts
    this.$store.commit('registryInstance', instance)
  },
  watch: {
    textScript(newVal){
      if (!isEmpty(newVal))
        this.setOptions(newVal, true)
    },
    option: debounce(this.setOption, 500),
  },
  data(){
    return {
      id: uuid(),
      instance: this.$store.state.echartsInstance,
      option: this.$store.state.option
    }
  },
  methods: {
    updateChart(){

    },
    resizeChart(){
      this.instance.resize()
    }
  }
}
