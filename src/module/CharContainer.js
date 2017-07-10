/**
 * Created by lenovo on 2017/7/5.
 */
// import echarts from 'echarts'
import debounce from 'lodash/debounce'
import $ from 'jquery'
export default class CharContainer{
  constructor({id}) {
    this.id = id;               //容器ID
    this.charType = 'echarts';  //容器的类型
    this.charId = undefined;    //图表实例ID，通过接口获取实例的配置信息
    this.chart = undefined ;    //容器的图表实例
    this.state = 0;             //图表的渲染状态，0：开始渲染，1：渲染完成
    this.tileStyle={};          //容器标题的样式
    this.style = {};            //容器的样式
    this.showTitle = false;         //是否显示标题
    this.widthAndHeight = {     //容器的高宽，默认 250*200
      height:'200px',width:'250px'};
    this.option = option;       //图表配置数据
  }

  render(){
    let ChartDependencyLib = this.getCDL();
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
    },3000);
    // this.state = 1;
  }

  isRender(){
    if(this.state == 1){
        return true;
    }else{
      return false;
    }
  }

  resize(){
    this.chart.resize();
  }

  getCDL() {
    if (this.charType == 'echarts') {
      return require('echarts');
    } else {
      return require("./requireTest");
    }
  }

  bindResizeEvent(){

  }
  setWidthAndHeight(containerWidth,containerHeight){
    let content = $("#"+this.id);
    if(content){
      let width = containerWidth;
      let height = containerHeight;
      if(width<=0||height<=0) return;
      //显示标题的情况下减去标题的高度
      if(this.showTitle){
        let titleE = content.parent().find(".container_title");
        if(titleE){
          height = height - titleE.height();
        }
      }
      let paddingTop = content.parent().css('padding-top').replace('px','');
      let paddingBottom = content.parent().css('padding-bottom').replace('px','');
      let marginTop = content.parent().css('margin-top').replace('px','');
      let marginBottom = content.parent().css('margin-bottom').replace('px','');

      if(paddingTop>0) height = height - paddingTop;
      if(paddingBottom>0) height = height - paddingBottom;
      if(marginTop>0) height = height - marginTop;
      if(marginBottom>0) height = height - marginBottom;
      this.widthAndHeight.height=height+"px";
      this.widthAndHeight.width=width+"px";
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

