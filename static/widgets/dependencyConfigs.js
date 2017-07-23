/**
 * Created by lenovo on 2017/7/23.
 */
var dependencyConfigs = {
  Echart:function(){
    return { renderClass:'EchartsRender',
      dependency : [
        {id:"echarts", src:"/static/widgets/lib/echarts.min.js"},
        {id:"widgetRender",src:"/static/widgets/echarts/echartsRender.js"}
      ]}
  },
  EchartBar:function(){return this.Echart()},
  EchartLine:function(){return this.Echart()},
  EchartBarLine:function(){return this.Echart()},
  EchartScatter:function(){return this.Echart()},
  D3DashBoard:function(){
    return {
      renderClass: 'D3DashBoard',
      dependency: [
        {id: "d3", src: "/static/widgets/lib/d3.min.js"},
        {id: "tweenjs", src: "/static/widgets/lib/tweenjs-0.6.2.min.js"},
        {id: "dashboard", src: "/static/widgets/d3/dashboard/dashBoard.js"},
        {id: "widgetRender", src: "/static/widgets/d3/dashboard/dashboardRender.js"}
      ]
    }
  }
}
