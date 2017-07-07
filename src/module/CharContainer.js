/**
 * Created by lenovo on 2017/7/5.
 */
import echarts from 'echarts'
import debounce from 'lodash/debounce'

export default class CharContainer{
  constructor({id}) {

    this.type = '';
    this.chart = undefined ;
    this.id = id;
    // this.data = undefined ;
    // this.datadefine = undefined ;
    this.state = 0;
  }
  render(){
    this.state = 0;
    let element=document.getElementById(this.id);
    if(!element) return ;
    //判断图标类型，选择渲染方法
    this.chart = echarts.init(element);

    window.addEventListener('resize',debounce(this.chart.resize,1000));
    let option = {
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
    // 使用刚指定的配置项和数据显示图表。
    this.chart.setOption(option);
    let self = this;
    setTimeout(function(){
      self.state = 1;
    },3000);
    // this.state = 1;
  }
  getChart(){
    return this.chart;
  }
  isRender(){
      return this.state==1;
  }
  requireData(){

  }

}
