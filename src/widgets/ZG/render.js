/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'


export default class ZGNumberRender extends Render {

  //load方法加载依赖
  async load () {
  }

  async init(){
    require('./zg');
    this.widget = window.Toolkit;
    return this.widget;
  }

  afterInit(vueInstance,registry){
    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }

  //render用于组件渲染
  render (option) {
    console.log('render1',option)
    if(this.widget){
      console.log('render2',option)
      let element = document.getElementById(this.el);
      let {length=4,value=1000,size,background,margin} = option;
      this.widget.newRollingNumber(element,{length,value,size,background,margin})
    }
  }

  resize () {

  }

}
