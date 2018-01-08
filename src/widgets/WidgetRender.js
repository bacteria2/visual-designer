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
    require('./Widgetrender.scss')
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
    if(this.widget == null){
      this.widget = {id:this.el+'_inner'}
    }
    if(!this.widget.id){
      this.widget.id = this.el+'_inner'
    }
    if(document.getElementById(this.widget.id)){
        return;
    }
    let element =  document.getElementById(this.el),
       container = element.parentNode;
    if(container) {
      let textColor = '#ccc';
      if (window.cur_ydp_theme && window.cur_ydp_theme.obj.textStyle.color) {
        textColor = window.cur_ydp_theme.obj.textStyle.color
      }
      //let innerDom = "<h1 style='width:auto;position: relative;top:40%;left:35%;letter-spacing:15px;" + 'color:' + textColor + "'>暂无数据</h1>",
      let appendDom = document.createElement('div');
      appendDom.id = this.widget.id

      appendDom.style.height = element.clientHeight + 'px'
     // console.log(element.clientHeight,appendDom.style.height)
      appendDom.className  = "widget_none_data_error"
      appendDom.innerHTML = `<table border="0" valign="middle" class="widget_none_data_error_box"><tr><td><h1 style="color: ${textColor}">暂无数据</h1></td></tr></table>`
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
    console.info(option)
    this.render(option)
  }

  resize(){

  }

  _showNullDataLabel(show){
        let options = show?['block','none']:['none','block']

        let box1 = document.getElementById(this.widget.id);
        if(box1){
          box1.style.display = options[0]
        }

        let box2 = document.getElementById(this.el);
        if(box2){
          box2.style.display = options[1]
        }

  }

}
