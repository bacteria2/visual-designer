/**
 * Created by lenovo on 2017/7/26.
 */
import Render from '@/widgets/WidgetRender'
import axios from 'axios'

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
          var _this=this;
          axios.defaults.baseURL = 'http://localhost:8081/';
          axios.get(url)
          .then(function (response) {
            _this.widget.innerHTML = response.data
          })
          .catch(function (error) {
            _this.widget.innerHTML = error
          });
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
