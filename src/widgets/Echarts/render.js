/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'



export default class EchartsRender extends Render {

  //load方法加载依赖
   load(){
    return import(/* webpackChunkName:'echarts' */ 'echarts')
  }

  async init () {
    let echarts = await this.load();
    window.echarts=echarts;
    window.wordCloud = await import(/* webpackChunkName:'echarts-wordcloud' */'echarts-wordcloud');

    let element = this.elnpm
    if (typeof this.el === 'string') {
      element = document.getElementById(this.el)
    }
    this.widget= echarts.init(element);
    return  this.widget ;
  }

  afterInit(vueInstance,registry){
    window.addEventListener('resize', debounce(()=>{
      if (this.widget) {
        this.widget.resize()
      }
    }, 1000))

    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }

  //render用于组件渲染
  render (option) {
   // console.log(this.widget,option)
    if (this.widget) {
      try {
        this.widget.setOption(option, true)
      }catch(e){
        if(e.message.startsWith('`setOption` should not be called during main process')){
            console.log("charts 实例错误，正在重建")
            this.widget.dispose()
            this.init()
            console.log("charts 实例错误，重建完成")
        }
      }
    }
  }

  destroy(){
    window.removeEventListener('resize', debounce(()=>{
      if (this.widget) {
        this.widget.resize()
      }
    }, 1000))
  }

  resize () {
    if (this.widget) {
      this.widget.resize()
    }
  }
}
