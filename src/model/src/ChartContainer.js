/**
 * Created by lenovo on 2017/7/5.
 */
import debounce from 'lodash/debounce'
import {getWidgetInstanceByID} from '@/services/dashBoardService'
import {RenderMapper} from '@/widgets/RenderMapper.js'
import { VueRenderProxy } from '@/widgets/RenderProxy.js'
import { getOption } from '@/utils/widgetDataHandler.js'
import {forOwn,set } from '@/utils'

export default class CharContainer{
  constructor(id) {
    this.id = id;               //容器ID
    this.chartType = undefined; //容器的类型
    this.chartId = undefined;   //图表实例ID，通过接口获取实例的配置信息
    this.chart = undefined ;    //容器的图表实例
    this.widgetsInstance = null;
    this.state = -1;     //图表的渲染状态，-1:未开始渲染 0：开始渲染，1：渲染完成
    this.option = {};       //图表配置数据
    this.dataOption = {};       //请求接口返回的数据，包括dataset和demention
    this.chartSetting = {};     //图表设置信息，包含增强脚本
    this.style =  {             //容器的样式
      borderRadius: 0,
      backgroundColor: 'rgba(0,0,0,0.1)',
      backgroundPosition:'center center',
      backgroundRepeat:'no-repeat',
      backgroundSize:'contain',
      backgroundImage:null,
      borderColor: 'rgba(0,0,0,0.1)',
      boxShadow:null,
      borderWidth: 0,
      borderStyle: 'solid',
      imgUrl: null,
      paddingTop:null,
      paddingBottom:null,
      paddingLeft:null,
      paddingRight:null,
      opacity:1
    };
    this.title = {
      show : false,
      text:'',
      style:{
        color:'#000',
        fontSize:14,
        fontWeight:null,
        fontFamily:null,
        fontStyle:null,
        height:30,
        lineHeight:30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        textAlign: 'center',
        paddingLeft: null,
        paddingTop: null,
        paddingBottom: null,
        paddingRight: null,
        zIndex:99
      }
    };
    this.footer = {
      show : false,
      text:'',
      style:{
        color:'#000',
        fontSize:14,
        fontWeight:null,
        fontFamily:null,
        fontStyle:null,
        height:30,
        lineHeight:30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        textAlign: 'center',
        paddingLeft: null,
        paddingRight: null,
        zIndex:99
      }
    };
  }

  /**
   * 预渲染：从服务器加载配置，加载依赖
   * @returns {Promise.<void>}
   */
  async perRender(){

    if(!this.chartId) {this.renderError('');return;}
    if(!this.chartType) {this.renderError('渲染出错。获取图表类型失败');return;}
    if(!widgetConfigs) {this.renderError('渲染出错。获取全局插件配置失败[widgetConfigs]');return;}

    let widgetConfig = widgetConfigs[this.chartType];
    let renderClassKey = widgetConfig.render;

    this.state = 0;
     //加载配置

    let response = await getWidgetInstanceByID({key:this.chartId});
    if(response){
      this.widgetsInstance = response.widgetsInstance;

      if(this.widgetsInstance){
        this.option = JSON.parse(this.widgetsInstance.fMergeOption);
        if(!this.option){
          this.option = JSON.parse(this.widgetsInstance.fDataOption);
        }

        /*获取dataset;*/
        this.dataOption = JSON.parse(this.widgetsInstance.fDataOption);
        let widgetDataset = this.dataOption.dataSet;
        let dimension = this.dataOption.dimension;


        if(widgetDataset){
          let dataoption = await getOption(widgetDataset,dimension);

          console.log("before",this.option,"dataoption",dataoption);
          if(dataoption){
            forOwn(dataoption, (v, k) =>{
              set(this.option,k,v)
            })


          }
          console.log("after",this.option);
        }
        /* ////获取dataset;*/


      }else{
        this.renderError('渲染出错，后台服务器错误');
        return;
      }
    }else{
      this.renderError('渲染出错，后台服务器错误');
      return;
    }

    if(renderClassKey&&RenderMapper.hasOwnProperty(renderClassKey)){
     let renderClass = new RenderMapper[renderClassKey](this.id);
      this.chart= new VueRenderProxy;
      this.chart.proxy(renderClass);
      this.init();
    }else{
      this.renderError('渲染出错,未指定图形渲染类[RenderMapper]:'+renderClassKey)
    }
  }

  async init(){
    if(this.chart) {

      try{
        await this.chart.init();
        //添加resize事件
        window.addEventListener('resize',debounce(this.resize,1000));
        this.render();
      }catch (e){
        if(console){
          console.log("组件:"+this.chartId+", 初始化出错！");
        }
      }
    }
  }

  render(){
    if(this.chart){
      try{
        this.chart.render(this.option);
      }catch (e){
        console.log(e);
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
    if(this.chart){
      try{
        this.chart.resize();
      }catch (e){
        if(console){
          console.log("组件:"+this.chartId+",resize出错！");
        }
      }
    }
  }
  analysisObj(e){
    if(e.id) this.id = e.id;
    if(e.chartType) this.chartType = e.chartType;
    if(e.chartId) this.chartId = e.chartId;
    if(e.style) this.style = e.style;
    if(e.title) this.title = e.title;
    if(e.footer) this.footer = e.footer;
  }

  renderError(msg){
    if(this.id){
      var renderHtml=`<div style="background: url(${require('../../assets/dashboard/themeBlue/container_nonechart.png')}) no-repeat center center;
                                  background-size: contain;
                                  position: absolute; width: 100%; height: 100%;
                        ">
                        ${msg}
                       </div>`;
      document.getElementById(this.id).innerHTML = renderHtml;
      this.state = 1;
    }
  }

}


