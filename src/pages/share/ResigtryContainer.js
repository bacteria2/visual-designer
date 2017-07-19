/**
 * Created by lenovo on 2017/7/19.
 */
import Vue from 'vue'

const component = {
  sync: {},
  async: {
    //example
   /* echarts: {
      name: 'TextEcharts',
      async load(resolve){
        let panel = await  import('@/components/ChartsPanel')
        resolve(panel.TextEcharts)
      }
    }*/
  }
}
//注册同步组件
Object.keys(component.sync).forEach(el => Vue.component(el.name, el))

//注册异步组件
//Object.keys(component.async).forEach(el => Vue.component(el.name,el.load))
