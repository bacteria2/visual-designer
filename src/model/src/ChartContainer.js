/**
 * Created by lenovo on 2017/7/5.
 */
import debounce from 'lodash/debounce'
import {getWidgetInstanceByID} from '@/services/dashBoardService'
import {RenderMapper} from '@/widgets/RenderMapper.js'
import { VueRenderProxy } from '@/widgets/RenderProxy.js'
import { getOption } from '@/utils/widgetDataHandler.js'
import {forOwn,set,clone,mergeWith} from '@/utils'

export default class CharContainer{
  constructor(id) {
    this.id = id;               //容器ID
    this.chartType = undefined; //容器的类型
    this.chartId = undefined;   //图表实例ID，通过接口获取实例的配置信息
    this.chart = undefined ;    //容器的图表实例
    this.widgetsInstance = null;
    this.state = -1;     //图表的渲染状态，-1:未开始渲染 0：开始渲染，1：渲染完成
    this.option = {};       //图表配置数据
    this.searchDataSets = {};       //搜索临时配置数据
    this.dataOption = {};       //请求接口返回的数据，包括dataset和demention
    this.chartSetting = {};     //图表设置信息，包含增强脚本
    this.interval = {           //定时设置
      openInterval:false,
      id:'',                    //定时器ID
      sec:1
    };
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

    await this._loadData(); //加载数据

    if(renderClassKey&&RenderMapper.hasOwnProperty(renderClassKey)){
     let renderClass = new RenderMapper[renderClassKey](this.id);
      this.chart= new VueRenderProxy;
      this.chart.proxy(renderClass);
      await this.init();
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




  //重新加载数据，并渲染,
  //params ：可选参数，搜索时由dashboard传入的参数
  //renderByParamValueChange:可选参数，是否在参数值改变时才渲染。
  async reRoadData(params,renderByParamValueChange){
    if(!this.dataOption) return;
    let widgetDataSet = this.dataOption.dataSet;
    let dimension = this.dataOption.dimension;

    if(widgetDataSet){
      let paramValueChange = false;
      let dataOption ;
      if(params){ //搜索条件
        paramValueChange = this._handlerSearchParam(widgetDataSet,params,paramValueChange);
        console.log("this.searchDataSet",this.searchDataSets);
        dataOption = await getOption(this.searchDataSets,dimension);
      }else{
        dataOption = await getOption(widgetDataSet,dimension);
      }

     /* if(dataOption){
       forOwn(dataOption, (v, k) =>{
       set(this.option,k,v)
       })
       }*/
      if(dataOption && dataOption.dynamicOption_0101){//动态序列
        this.option = mergeWith({},this.option,dataOption.dynamicOption_0101)
      }else{
        forOwn(dataOption, (v, k) =>{
          set(this.option,k,v)
        })
      }


      if(renderByParamValueChange){
        if(paramValueChange){
          this.render()
        }
      }else{
        this.render()
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
    if(this.state === 0){
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
    if(e.interval) {
      this.interval = e.interval
    }
  }

  renderError(msg){
    if(this.id){
      document.getElementById(this.id).innerHTML =`<div style="background: url(${require('../../assets/dashboard/themeBlue/container_nonechart.png')}) no-repeat center center;
                                  background-size: contain;
                                  position: absolute; width: 100%; height: 100%;
                        ">
                        ${msg}
                       </div>`;

      this.state = 1;
    }
  }



  async _loadData(){
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
        let widgetDataSet = this.dataOption.dataSet;
        let dimension = this.dataOption.dimension;

        if(widgetDataSet){
          let dataOption = await getOption(widgetDataSet,dimension);
          if(dataOption && dataOption.dynamicOption_0101){//动态序列
             this.option = mergeWith({},this.option,dataOption.dynamicOption_0101)
          }else{
            forOwn(dataOption, (v, k) =>{
              set(this.option,k,v)
            })
          }
        }
        /* ////获取dataset;*/
      }else{
        this.renderError('渲染出错，后台服务器错误');
        return false;
      }
    }else{
      this.renderError('渲染出错，后台服务器错误');
      return false;
    }
  }

  _handlerSearchParam(widgetDataSet,SearchParams){
    let paramValueChange =false;
    this.searchDataSets = clone(widgetDataSet);
    let diDataSets = this.searchDataSets.filter(e=>e.type===2);
    if(diDataSets instanceof Array&&diDataSets.length>0){
      let diDataSet = diDataSets[0];
      let di = diDataSet.di;
      let params = diDataSet.di.params;
      if(params&&params instanceof Array&&params.length>0){
        let paramKey_part1 = di.className +"_" + di.funName;
        params.forEach(e=>{
          let paramKey = paramKey_part1 +"_"+e.index;
          if(SearchParams[paramKey]){
            e.value = SearchParams[paramKey];
            paramValueChange = true;
          }
        })
      }
    }
    return paramValueChange;
  }

}


