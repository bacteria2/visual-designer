import debounce from 'lodash/debounce'
import {RenderMapper} from '@/dashboardWidgets/RenderMapper.js'
import { VueRenderProxy } from '@/widgets/RenderProxy.js'
export default class ExtendContainer {
  constructor(id) {
    this.id = id;                 //容器ID
    this.widget = null;           //扩展组件渲染对象
    this.widgetName = undefined;  //扩展组件名称
    this.state = -1;              //图表的渲染状态，0：开始渲染，1：渲染完成
    this.style = {                //容器的样式
      count:0,
      backgroundSize:'contain',
      backgroundColor: 'rgba(0,0,0,0.1)',
      backgroundPosition:'center center',
      backgroundRepeat:'no-repeat',
      backgroundImage:null,
      borderRadius: 0,
      borderColor: null,
      borderWidth: null,
      borderStyle: null,
      paddingTop: null,
      paddingBottom: null,
      paddingLeft: null,
      paddingRight: null,
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

    if(!this.widgetName )return;
    let renderClass = new RenderMapper[this.widgetName](this.id);
    this.widget= new VueRenderProxy;
    this.widget.proxy(renderClass);
    this.init();
  }

  async init(){
    if(this.widget) {
      try{
        await this.widget.init();
        //添加resize事件
        window.addEventListener('resize',debounce(this.resize,1000));
        this.render();
      }catch (e){
        if(console){
          console.log("扩展组件:"+this.widgetName+", 初始化出错！");
        }
      }
    }
  }

  render(){

    if(this.widget){

      try{
        this.widget.render(this.extendWidget);
      }catch (e){
        this.renderError("组件配置参数错误，渲染出错！");
      }
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
    if(this.widget){
      try{
        this.widget.resize();
      }catch (e){
        if(console){
          console.log("扩展组件:"+this.widgetName+",resize出错！");
        }
      }
    }
  }


  analysisObj(e) {
    if (e.id) this.id = e.id;
    if (e.style) this.style = e.style;
    if (e.title) this.title = e.title;
    if (e.footer) this.footer = e.footer;
    if (e.extendWidget) this.extendWidget = e.extendWidget;
  }

  renderError(msg){
    if(this.id){
      var renderHtml=`<div style="width: 100%; height: 100%;">
                        ${msg}
                       </div>`;
      document.getElementById(this.id).innerHTML = renderHtml;
      this.state = 1;
    }
  }


}

//resize of div

