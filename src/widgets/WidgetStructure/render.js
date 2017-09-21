/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'


export default class EchartsRender extends Render {

  constructor (el) {
    super(el);
    this.wordCloudLoaded = false;

  }

  //load方法加载依赖
  load(){
    return import( /* webpackChunkName: "nebulaMap" */  './nebulaMap.js')
  }

  async init () {
    await this.load();
    this.widget = nebulaMap.init(this.el);
    return  this.widget ;
  }

  afterInit(vueInstance,registry){
    window.addEventListener('resize', debounce(()=>{
      if (this.widget) {
        this.widget.resize()
      }
    }, 1000));

    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }

  }

  //render用于组件渲染
  render (option) {
    if (this.widget) {
      try {
        this.widget.setOption(option)
      } catch (e) {
          console.log('组织结构图渲染失败!' + e.message);
      }
    }
  }

  destroy () {
    window.removeEventListener('resize', debounce(() => {
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
