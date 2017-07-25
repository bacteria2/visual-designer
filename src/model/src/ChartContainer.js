/**
 * Created by lenovo on 2017/7/5.
 */
import debounce from 'lodash/debounce'
import {getWidgetInstanceByID} from '@/services/dashBoardService'
import dependentArray from '@/views/Board/common/DependentConfig'
import {loadDependencies} from '@/utils/load.js'


export default class CharContainer{
  constructor(id) {
    this.id = id;               //容器ID
    this.chartType = undefined; //容器的类型
    this.chartId = undefined;   //图表实例ID，通过接口获取实例的配置信息
    this.chart = undefined ;    //容器的图表实例
    this.state = -1;     //图表的渲染状态，-1:未开始渲染 0：开始渲染，1：渲染完成
    this.option = option;       //图表配置数据
    this.dataOption = {};       //请求接口返回的数据，包括dataset和demention
    this.chartSetting = {};     //图表设置信息，包含增强脚本
    this.style =  {             //容器的样式
      borderRadius: 0,
      backgroundColor: 'rgba(0,0,0,0.1)',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center center',
      backgroundSize:'contain',
      backgroundImage:null,
      borderColor: 'rgba(0,0,0,0)',
      boxShadow:null,
      borderWidth: 0,
      borderStyle: 'solid',
      imgUrl: null,
      paddingTop:null,
      paddingBottom:null,
      paddingLeft:null,
      paddingRight:null,
      opacity:1,
      count:0
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
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'center',
        paddingLeft: null,
        paddingTop: null,
        paddingBottom: null,
        paddingRight: null,
        zIndex:99,
        count:0
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
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'center',
        paddingLeft: null,
        paddingRight: null,
        zIndex:99,
        count:0
      }
    };
  }

  /**
   * 预渲染：从服务器加载配置，加载依赖
   * @returns {Promise.<void>}
   */
  async perRender(){
    if(!this.chartId) return;
    this.state = 0;
     //加载配置
    if(this.chartId){
      let response = await getWidgetInstanceByID({key:this.chartId});
      let charInstance = response.widgetsInstance;
      if(response&&charInstance){
        this.option = JSON.parse(charInstance.fMergeOption);
        // this.dataOption = JSON.parse(charInstance.fDataOption);
        this.chartSetting = JSON.parse(charInstance.fSetting);
      }
    }
    //加载依赖，回调函数init和渲染组件
    let widgetType = this.chartType,
      dependencyConfig = dependencyConfigs[widgetType](),
      {renderClass,dependency} = dependencyConfig,that = this
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
      this.chart.render(this.id,this.option);
      this.state = 1;
    }
  }
/*  render(ChartDependencyLib){

    let element=document.getElementById(this.id);
    if(!element) return ;
    this.chart = ChartDependencyLib.init(element);
    window.addEventListener('resize',debounce(this.chart.resize,1000));
    this.chart.setOption(this.option);
    let self = this;
    setTimeout(function(){
      self.state = 1;
    },1);

  }*/

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
  analysisObj(e){
    if(e.id) this.id = e.id;
    if(e.chartType) this.chartType = e.chartType;
    if(e.chartId) this.chartId = e.chartId;
    if(e.style) this.style = e.style;
    if(e.title) this.title = e.title;
    if(e.footer) this.footer = e.footer;
  }

/*  get charType(){return this.charType}
  set charType(charType){this.charType=charType}

  get chart(){return this.chart}
  set chart(chart){this.chart=chart}

  get state(){return this.state}
  set state(state){this.state=state}

  get tileStyle(){return this.tileStyle}
  set tileStyle(tileStyle){this.tileStyle=tileStyle}

  get style(){return this.style}
  set style(style){this.style=style}

  get showTitle(){return this.showTitle}
  set showTitle(showTitle){this.showTitle=showTitle}

  get widthAndHeight(){return this.widthAndHeight}
  set widthAndHeight(widthAndHeight){this.widthAndHeight=widthAndHeight}*/

}

const  option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data:['销量']
  },
  xAxis: {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};


//resize of div

