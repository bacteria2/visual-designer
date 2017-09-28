/**
 * Created by lenovo on 2017/7/26.
 */
import { getOption } from '@/utils/widgetDataHandler.js'
import {forOwn,set,mergeWith} from '@/utils'


export default class WidgetRender {
  constructor (el) {
    this.widget=null;
    this.el=el;
  }

  load() {
    // console.log('beforeLoad')
  }

  beforeLoad () {
    // console.log('beforeLoad')
  }

  afterLoad () {
    // console.log('afterLoad')
  }

  async init(){
    // console.log('init')
  }

  beforeInit(){

  }

  afterInit(){
    if(document.getElementById(this.widget.id)){
        return;
    }
    let container = document.getElementById(this.el); /*parentNode*/
    if(container) {
      let textColor = '#ccc';
      if (window.cur_ydp_theme && window.cur_ydp_theme.obj.textStyle.color) {
        textColor = window.cur_ydp_theme.obj.textStyle.color
      }
      let innerDom = "<h1 style='width:auto;position: relative;top:40%;left:35%;letter-spacing:15px;" + 'color:' + textColor + "'>暂无数据</h1>",
        appendDom = document.createElement('div');
      appendDom.id = this.widget.id
      appendDom.style.height = 'inherit'
      appendDom.style.width = 'inherit'
      appendDom.style.display = 'none'
      appendDom.innerHTML = innerDom
      container.appendChild(appendDom)
    }
  }


  beforeRender () {
    // console.log('beforeRender')
  }

  afterRender () {
    // console.log('afterRender')
  }

  render () {
    // console.log('render')
  }

  beforeDestroy(){
    // console.log('beforeDestroy')
  }

  destroy(){
    // console.log('destroy')
  }

  afterDestroy(){
    // console.log('afterDestroy')
  }

  async mergeAndRender(option,dOption,urlOption,rawData){
    let dataSet = dOption.dataSet,
    dimension = dOption.dimension,
    dataOption,
      extJsStr = rawData.extJs
    if(Array.isArray(dataSet) && dataSet.length > 0){
      try{
        dataOption = await getOption(dataSet,dimension,urlOption);
      }
      catch(e){
         if(e.message == 'null data'){
           this._showNullDataLabel(true);
           return;
         }
      }
      this._showNullDataLabel(false)
      if(dataOption && dataOption.dynamicOption_0101){//动态序列
        option = mergeWith({},option,dataOption.dynamicOption_0101)
        if(rawData && rawData.rawData && rawData.disabled){
          let data = rawData.rawData,disabled = rawData.disabled;
          forOwn(data,(value,key)=>{
            if(value !== null && !disabled[key]){
              set(option,key,value)
            }
          });
        }
      }else{
        forOwn(dataOption, (v, k) =>{
          set(option,k,v)
        })
      }
    }
    if(extJsStr){ // 处理后置脚本
      let extJs = eval(extJsStr)
      if (extJs && typeof extJs == 'function') {
        option = extJs.apply(this, [option, {}])
      }
    }
    this.render(option)
  }

  resize(){

  }

  _showNullDataLabel(show){
      if(show){
        document.getElementById(this.widget.id).style.display = 'block'
        document.getElementById(this.el).firstElementChild.style.display = 'none'
      }else{
        document.getElementById(this.widget.id).style.display = 'none'
        document.getElementById(this.el).firstElementChild.style.display = 'block'
      }
  }

}
