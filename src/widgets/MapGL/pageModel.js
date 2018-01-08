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

let Geo = [
  {title:'地图3D',name:'geo3D',active:'EchartsGlGeo3D',
    'pages':[{title:'地图3D',name:'EchartsGlGeo3D',component:'EchartsGlGeo3D'}]},
  {title:'工具箱',name:'tools',active:'EchartsVisualMap',
    'pages':[{title:'数据映射',name:'EchartsVisualMap',component:'EchartsVisualMap'}]
  }
    ]

let Tools=[
  {title:'工具箱',name:'tools',active:'EchartsVisualMap',
    'pages':[{title:'数据映射',name:'EchartsVisualMap',component:'EchartsVisualMap'},
             {title:'时间轴',name:'EchartsTimeLine',component:'EchartsTimeLine'}]
  }
]


export default{
  EchartGeo3DMap:_Merge_(Geo,[{name:'bar3D',component:'Series-bar3D'},{name:'map3D',component:'Series-map3D'}],'geo3D地图E'),
  EchartGlMap3D:_Merge_(Tools,[{name:'map3D',component:'Series-map3D'}],'Map3D地图E')
}



