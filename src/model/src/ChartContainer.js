/**
 * Created by lenovo on 2017/7/5.
 */
// import echarts from 'echarts'
import debounce from 'lodash/debounce'
import {getWidgetInstanceByID} from '@/services/dashBoardService'
import $ from 'jquery'
export default class CharContainer{
  constructor({id}) {
    this.id = id;               //容器ID
    this.chartType = undefined; //容器的类型
    this.chartId = undefined;   //图表实例ID，通过接口获取实例的配置信息
    this.chart = undefined ;    //容器的图表实例
    this.state = undefined;     //图表的渲染状态，0：开始渲染，1：渲染完成
    this.style = {};            //容器的样式
    this.option = option;       //图表配置数据
    this.dataOption = {};       //请求接口返回的数据，包括dataset和demention
    this.chartSetting = {}      //图表设置信息，包含增强脚本
  }

  async perRender(){
    if(this.chartId){
      let response = await getWidgetInstanceByID({key:this.chartId});
      let charInstance = response.widgetsInstance;
      if(response&&charInstance){
        console.log(charInstance);
        this.option = JSON.parse(charInstance.fOption);
        // this.dataOption = JSON.parse(charInstance.fDataOption);
        this.chartSetting = JSON.parse(charInstance.fSetting);
      }
    }
    renderCharByType(this);
  }

  render(ChartDependencyLib){
    this.state = 0;
    let element=document.getElementById(this.id);
    if(!element) return ;
    //判断图标类型，选择渲染方法
    this.chart = ChartDependencyLib.init(element);
    window.addEventListener('resize',debounce(this.chart.resize,1000));
    // 使用刚指定的配置项和数据显示图表。
    this.chart.setOption(this.option);
    let self = this;
    setTimeout(function(){
      self.state = 1;
    },1);
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

