/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'
import { getGeoMapById } from '@/services/WidgetService'

export default class EchartsMapRender extends Render {

  load() {
    return import(/* webpackChunkName:'echarts' */ 'echarts')
  }

  async init() {
    let echarts = await this.load();
    window.echarts = echarts;

    let element = this.el
    if (typeof this.el === 'string') {
      element = document.getElementById(this.el)
    }
    this.widget = echarts.init(element);
    return this.widget;
  }

  afterInit(vueInstance, registry) {
    window.addEventListener('resize', debounce(() => {
      if (this.widget) {
        this.widget.resize()
      }
    }, 1000))

    if (registry && vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }

  //render用于组件渲染
  async render(option) {
    if (this.widget) {
      await this._loadMap(option)
      try {
        this.widget.setOption(option, true)
      } catch (e) {
        if (e.message.startsWith('`setOption` should not be called during main process')) {
          console.log("charts 实例错误，正在重建")
          this.widget.dispose()
          this.init()
          console.log("charts 实例错误，重建完成")
        }
      }
    }
  }

  async _loadMap(option) {
    if (!option.series && !option.geo) return;
    let maps = []
     option.series.forEach( s=>{
       let type = s["mapType"] || s["map"]
         if(type){
           maps.push(type)
         }
     })
    if(option.geo && option.geo.map){
        maps.push(option.geo.map)
    }
     let response = await getGeoMapById(maps)
     if(response.success){
       response.data.forEach(m=>{
           echarts.registerMap(m.fId,JSON.parse(m.fMapJson))
       })
     }
  }

  destroy() {
    window.removeEventListener('resize', debounce(() => {
      if (this.widget) {
        this.widget.resize()
      }
    }, 1000))
  }

  resize() {
    if (this.widget) {
      this.widget.resize()
    }
  }
}
