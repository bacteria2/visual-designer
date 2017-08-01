/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'


export default class EchartsRender extends Render {

  //load方法加载依赖
  load(){
    return import(/* webpackChunkName: "echarts" */ 'echarts')
  }

  async init () {
    let echarts = await this.load();
    window.echarts=echarts;

    let element = this.el
    if (typeof this.el === 'string') {
      element = document.getElementById(this.el)
    }
    this.widget= echarts.init(element);
    console.log(this,this.widget)
    return echarts;
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
    console.log("this.widget",this.widget,option);
    if (this.widget) {
      this.widget.setOption(option, true)
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
