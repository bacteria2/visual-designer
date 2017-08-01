import Render from '../WidgetRender'

export default class WidgetTableRender extends Render {

  //load方法加载依赖
  load(){
    require('./dataBlock.scss')
  }
  init () {
    this.load();
  }

  afterInit(vueInstance,registry){
    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }
  //render用于组件渲染
  render (option) {
    this.dataBlock(this.el,option)
  }
  dataBlock(id,option) {
    let parent=document.getElementById(id);

    let renderHtml=``;
    parent.innerHTML=renderHtml;
  };

}
