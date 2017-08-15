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
// 直角坐标系单坐标轴
let catesian_axis_1 = [
  {title:'X轴',name:'XAxis',active:'EchartsXAxisBasic',
    'pages':[{title:'基础',name:'EchartsXAxisBasic',component:'EchartsXAxisBasic'},
      {title:'轴线',name:'EchartsXAxisLine',component:'EchartsXAxisLine'},
      {title:'标签',name:'EchartsXAxisLable',component:'EchartsXAxisLable'},
      {title:'刻度',name:'EchartsXAxisTick',component:'EchartsXAxisTick'},
      {title:'隔线',name:'EchartsXAxisSplitLine',component:'EchartsXAxisSplitLine'},
      {title:'隔区',name:'EchartsXAxisSplitArea',component:'EchartsXAxisSplitArea'}
    ]},
  {title:'Y轴',name:'YAxis',active:'EchartsYAxisBasic',
    'pages':[{title:'基础',name:'EchartsYAxisBasic',component:'EchartsYAxisBasic'},
      {title:'轴线',name:'EchartsYAxisLine',component:'EchartsYAxisLine'},
      {title:'标签',name:'EchartsYAxisLable',component:'EchartsYAxisLable'},
      {title:'刻度',name:'EchartsYAxisTick',component:'EchartsYAxisTick'},
      {title:'隔线',name:'EchartsYAxisSplitLine',component:'EchartsYAxisSplitLine'},
      {title:'隔区',name:'EchartsYAxisSplitArea',component:'EchartsYAxisSplitArea'}
    ]}
]

// 直角坐标系双坐标轴
let catesian_axis_2 = [
  {title:'X轴',name:'XAxis',active:'EchartsXAxisBasic',
    'pages':[{title:'基础',name:'EchartsXAxisBasic',component:'EchartsXAxisBasic'},
      {title:'轴线',name:'EchartsXAxisLine',component:'EchartsXAxisLine'},
      {title:'标签',name:'EchartsXAxisLable',component:'EchartsXAxisLable'},
      {title:'刻度',name:'EchartsXAxisTick',component:'EchartsXAxisTick'},
      {title:'隔线',name:'EchartsXAxisSplitLine',component:'EchartsXAxisSplitLine'},
      {title:'隔区',name:'EchartsXAxisSplitArea',component:'EchartsXAxisSplitArea'}
    ]},
  {title:'X轴2',name:'XAxis2',active:'EchartsXAxisBasic2',
    'pages':[{title:'基础',name:'EchartsXAxisBasic2',component:'EchartsXAxisBasic2'},
      {title:'轴线',name:'EchartsXAxisLine2',component:'EchartsXAxisLine2'},
      {title:'标签',name:'EchartsXAxisLable2',component:'EchartsXAxisLable2'},
      {title:'刻度',name:'EchartsXAxisTick2',component:'EchartsXAxisTick2'},
      {title:'隔线',name:'EchartsXAxisSplitLine2',component:'EchartsXAxisSplitLine2'},
      {title:'隔区',name:'EchartsXAxisSplitArea2',component:'EchartsXAxisSplitArea2'}
    ]},
  {title:'Y轴',name:'YAxis',active:'EchartsYAxisBasic',
    'pages':[{title:'基础',name:'EchartsYAxisBasic',component:'EchartsYAxisBasic'},
      {title:'轴线',name:'EchartsYAxisLine',component:'EchartsYAxisLine'},
      {title:'标签',name:'EchartsYAxisLable',component:'EchartsYAxisLable'},
      {title:'刻度',name:'EchartsYAxisTick',component:'EchartsYAxisTick'},
      {title:'隔线',name:'EchartsYAxisSplitLine',component:'EchartsYAxisSplitLine'},
      {title:'隔区',name:'EchartsYAxisSplitArea',component:'EchartsYAxisSplitArea'}
    ]},
  {title:'Y轴2',name:'YAxis2',active:'EchartsYAxisBasic2',
    'pages':[{title:'基础',name:'EchartsYAxisBasic2',component:'EchartsYAxisBasic2'},
      {title:'轴线',name:'EchartsYAxisLine2',component:'EchartsYAxisLine2'},
      {title:'标签',name:'EchartsYAxisLable2',component:'EchartsYAxisLable2'},
      {title:'刻度',name:'EchartsYAxisTick2',component:'EchartsYAxisTick2'},
      {title:'隔线',name:'EchartsYAxisSplitLine2',component:'EchartsYAxisSplitLine2'},
      {title:'隔区',name:'EchartsYAxisSplitArea2',component:'EchartsYAxisSplitArea2'}
    ]}
]

export default{
  EchartBar:_Merge_(catesian_axis_1,[{name:'bar',component:'Series-bar'}],'柱形图E'),
  EchartLine:_Merge_(catesian_axis_1,[{name:'line',component:'Series-line'}],'折线图E'),
  EchartBarLine:_Merge_(catesian_axis_1,[{name:'bar',component:'Series-bar'},{name:'line',component:'Series-line'}],'柱线图E'),
  EchartScatter:_Merge_(catesian_axis_1,[{name:'scatter',component:'Series-scatter'}],'散点图E'),
  EchartPie:_Merge_([],[{name:'pie',component:'Series-pie'}],'饼图E'),
  EchartBarLine2:_Merge_(catesian_axis_2,[{name:'bar',component:'Series-bar'},{name:'line',component:'Series-line'}],'双轴柱线图E'),
  EchartGauge:_Merge_([],[{name:'gauge',component:'Series-gauge'}],'仪表盘E'),
}




