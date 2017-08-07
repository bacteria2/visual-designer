/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '@/widgets/WidgetRender'
import request from "@/utils/request"

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
        var url = options['htmlUrl'];
        if(url){
          var html=request({
            url:url,
            method:'post',
          });
          console.log(html);
          this.widget.innerHTML=html?html:"请求出错，请检查路径是否正确？";
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
