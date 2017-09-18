/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'

export default class CCMapRender extends Render {
  //load方法加载依赖
  constructor(el) {
    super(el);
    this.resizeAction=debounce(()=>{
      this.resize()
      },1000)
  }

  load (){}

  async init(){
    window.THREE=await import(/* webpackChunkName: "three" */ 'three/')
    let ChinaMapBase = require('./ChinaMapBase.min')
     window.ChinaMap =new ChinaMapBase({
      lookAtProvince: true,
      disableHighlightColor: false
  });

    this.widget = window.ChinaMap;
    //this.widget = ChinaMapBase;
    return this.widget;
  }

  afterInit(vueInstance,registry){
    window.addEventListener('resize',this.resizeAction)
    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }
  destroy() {
    this.widget.stop();
    window.removeEventListener('resize',this.resizeAction)
  }
  //render用于组件渲染
  render (option) {
    let element = document.getElementById(this.el),
      w = element.offsetWidth - 20,
      h =  element.offsetHeight - 20;
      element.style.lineHeight = '100%';
      element.style.textAlign = 'center';
    if(this.widget){
      element.appendChild(this.widget.domElement);
      this.widget.start(option);
      this.widget.resize(w,h*0.6);
      this.widget.appear();
    }
  }

  resize() {
    let element = document.getElementById(this.el),
      w = element.offsetWidth - 20,
      h =  element.offsetHeight - 20;
     if (this.widget) {
      this.widget.resize(w,h*0.6);
    }
  }

}

