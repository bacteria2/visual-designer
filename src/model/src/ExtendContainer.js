import {loadDependencies} from '@/utils/load.js'
import debounce from 'lodash/debounce'

export default class ExtendContainer {
  constructor(id) {
    this.id = id;              //容器ID
    this.state = -1;           //图表的渲染状态，0：开始渲染，1：渲染完成
    this.style = {             //容器的样式
      count:0,
      backgroundSize:'contain',
      borderRadius: 0,
      borderColor:'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0.1)',
      opacity:1
    };
    this.title = {
      show: false,
      text: '',
      style: {
        count:0,
        color: '#000',
        fontSize: 14,
        height: 30,
        lineHeight: 30,
        backgroundColor: 'rgba(0,0,0,0)',

        textAlign: 'center',

        zIndex:99
      }
    };
    this.footer = {
      show: false,
      text: '',
      style: {
        count:0,
        color: '#000',
        fontSize: 14,
        height: 30,
        lineHeight: 30,
        backgroundColor: 'rgba(0,0,0,0)',
        boxShadow:null,
        textAlign: 'center',
        zIndex:99
      }
    };

    this.widgetConfigs ={}; // 依赖列表和渲染类名
    this.extendWidget = {
      style:{
        count:0,
        backgroundColor:'rgba(0,0,0,0)',
        opacity:1
      },
      options:{count:0, text:""}
    }
  }

  /**
   * 预渲染：从服务器加载配置，加载依赖
   * @returns {Promise.<void>}
   */
  async perRender(){
    this.state = 0;
    //加载依赖，回调函数init和渲染组件
    let dependency = this.widgetConfigs.dependency,renderClass=this.widgetConfigs.renderClass;
    if(dependency && renderClass){
      loadDependencies(dependency,renderClass, () =>this.init(renderClass));
    }
  }

  init(renderClass){
    this.chart = new window[renderClass]();
    if(this.chart) {
      this.chart.init(this.id);
      //添加resize事件
      window.addEventListener('resize',debounce(this.resize,1000));
      this.render();
    }
  }

  render(){
    if(this.chart){
      this.chart.render(this.id,this.extendWidget);
      this.state = 1;
    }
  }

  isRender(){
    if(this.state == 0){
      return false;
    }else{
      return true;
    }
  }

  resize(){
    if(this.chart){
      this.chart.resize();
    }
  }


  analysisObj(e) {
    if (e.id) this.id = e.id;
    if (e.style) this.style = e.style;
    if (e.title) this.title = e.title;
    if (e.footer) this.footer = e.footer;
    if (e.extendWidget) this.extendWidget = e.extendWidget;
  }

/*  setExtendStyle(key,value){
    this.extendWidget.style[key] = value;
    this.render();
  }
  setExtendOption(key,value){
    this.extendWidget.options[key] = value;
    console.log(key,value);
    this.render();
  }*/


}

//resize of div

