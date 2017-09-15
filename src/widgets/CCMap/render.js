/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '../WidgetRender'
import debounce from 'lodash/debounce'

export default class CCMapRender extends Render {
  //load方法加载依赖
  load (){}

  async init(){
    window.THREE=await import(/* webpackChunkName: "three" */ 'three/')
    let ChinaMapBase = require('./ChinaMapBase.min')
    window.ChinaMap =new ChinaMapBase({
      lookAtProvince: true,
      disableHighlightColor: false
    });
    this.widget = window.ChinaMap;
    return this.widget;
  }

  afterInit(vueInstance,registry){
    window.addEventListener('resize', debounce(()=>{
      let element = document.getElementById(this.el),
        w = element.offsetWidth,
        h =  element.offsetHeight;
      console.log(w,h)
      if (this.widget) {
        this.widget.resize(w,h);
      }
    }, 1000))
    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }

  //render用于组件渲染
  render (option) {
    let element = document.getElementById(this.el),
    width = element.offsetWidth,
    height =  element.offsetHeight;
    if(this.widget){
      element.appendChild(this.widget.domElement);
      this.widget.start();
      this.widget.resize(width,height);
      this.widget.appear();
    }
  }

  resize() {
    let element = document.getElementById(this.el),
      width = element.offsetWidth,
      height =  element.offsetHeight;
      this.widget.resize(width,height);
  }

  }

