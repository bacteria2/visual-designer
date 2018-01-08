import { merge } from '@/utils'

function _Merge_(edit,seriesType,alias){
  return {active:'Base',seriesType,pages:[...EchartCommon,...edit],alias};
}

let EchartCommon=[
    {title:'基础',name:'Base',active:'EchartsBaseCommon',
      'pages':[{title:'通用',name:'EchartsBaseCommon',component:'EchartsBaseCommon'}, {title:'高级',name:'EchartsBaseAdvanced',component:'EchartsBaseAdvanced'}]},
    {title:'标题',name:'Title',active:'EchartsTitleContent',
      'pages':[{title:'内容',name:'EchartsTitleContent',component:'EchartsTitleContent'},{title:'样式',name:'EchartsTitleStyle',component:'EchartsTitleStyle'}]},
    {title:'图例',name:'Legend',active:'EchartsLegendBasic',
      'pages':[{title:'基础',name:'EchartsLegendBasic',component:'EchartsLegendBasic'},{title:'高级',name:'EchartsLegendOthers',component:'EchartsLegendOthers'}]},
    {title:'提示',name:'Tooltip',active:'EchartTooltipCommon',
      'pages':[{title:'通用',name:'EchartTooltipCommon',component:'EchartTooltipCommon'}]},
    {title:'工具',name:'Toolbox',active:'EchartsToolboxBasic',
      'pages':[{title:'基础',name:'EchartsToolboxBasic',component:'EchartsToolboxBasic'},{title:'数据映射',name:'EchartsVisualMap',component:'EchartsVisualMap'}]},
]

let Geo = [
  {title:'地图',name:'geo',active:'EchartsGeo',
    'pages':[{title:'地图',name:'EchartsGeo',component:'EchartsGeo'}]}]

export default{
  EchartMap:_Merge_(Geo,[{name:'map',component:'Series-map'},{name:'scatter',component:'Series-scatter'},{name:'effectScatter',component:'Series-effectScatter'}],'地图E'),
  EchartGeoMap:_Merge_(Geo,[{name:'scatter',component:'Series-scatter'},{name:'effectScatter',component:'Series-effectScatter'}],'Geo地图E'),
}



