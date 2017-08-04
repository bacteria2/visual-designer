/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '@/widgets/WidgetRender'

export default class EchartsRender extends Render {

  //load方法加载依赖
  load(){

  }

  async init () {
    this.widget = document.createElement("div");
  }

  afterInit(vueInstance,registry){

  }

  //render用于组件渲染
  render (option) {
    if(option){
      var options = option.options;
      if(options){
        var html = options['htmlContent'];
        if(html){
          this.widget.innerHTML = html;
        }
      }
    }
    document.getElementById(this.el).appendChild(this.widget);
  }

  destroy(){

  }

  resize () {

  }
}
