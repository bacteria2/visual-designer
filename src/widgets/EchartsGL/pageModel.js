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
    'pages':[{title:'基础',name:'EchartsToolboxBasic',component:'EchartsToolboxBasic'}]},
]

let Globe = [
  {title:'地球',name:'geo',active:'EchartsGlGlobe',
    'pages':[{title:'地球',name:'EchartsGlGlobe',component:'EchartsGlGlobe'},
      {title:'操控',name:'EchartsGlGlobeViewControl',component:'EchartsGlGlobeViewControl'}
    ]}]

export default{
  EchartGLGlobe:_Merge_(Globe,[{name:'lines3D',component:'Series-lines3D'}],'3D地球E')
}



