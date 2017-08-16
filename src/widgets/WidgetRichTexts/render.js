import Render from '../WidgetRender'

export default class WidgetRichTextsRender extends Render {

  //load方法加载依赖
  load(){
    require('./richText.scss')
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
    this.richText(this.el,option)
  }
  richText(id,option) {//数据块渲染方法
    let data=option.data;
    let parent=document.getElementById(id);//根据id值获取dom元素
    let html="";
    let htmlArr;
    if(option.richText.editor){
      htmlArr=option.richText.editor.split(/{{|}}/g);
    }
    htmlArr.map(value=>{
      if(value.startsWith("$")){
        let str=value.slice(1);
        html+=data[str]
      }else{
        html+=value;
      }
    });
    if(parent){
      parent.innerHTML=html;
    }
  }
}
