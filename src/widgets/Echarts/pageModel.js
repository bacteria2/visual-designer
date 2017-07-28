import { merge } from '@/utils'

function _Merge_(edit,seriesType){
  return {active:'Base',seriesType,pages:[...EchartCommon,...edit]};
}


let EchartCommon=[
    {title:'基础',name:'Base',active:'EchartsBaseCommon','pages':[{title:'通用',name:'EchartsBaseCommon',component:'EchartsBaseCommon'}, {title:'高级',name:'EchartsBaseAdvanced',component:'EchartsBaseAdvanced'}]},
    {title:'标题',name:'Title',active:'EchartsTitleContent','pages':[{title:'内容',name:'EchartsTitleContent',component:'EchartsTitleContent'},{title:'样式',name:'EchartsTitleStyle',component:'EchartsTitleStyle'}]},
    {title:'图例',name:'Legend',active:'EchartsLegendBasic','pages':[{title:'基础',name:'EchartsLegendBasic',component:'EchartsLegendBasic'},{title:'高级',name:'EchartsLegendOthers',component:'EchartsLegendOthers'}]},
    {title:'提示',name:'Tooltip',active:'EchartTooltipCommon','pages':[{title:'通用',name:'EchartTooltipCommon',component:'EchartTooltipCommon'}]},
    {title:'工具',name:'Toolbox',active:'EchartsToolboxBasic','pages':[{title:'基础',name:'EchartsToolboxBasic',component:'EchartsToolboxBasic'}]},
]

let bar = [{title:'X轴',name:'XAxis',active:'EchartsXAxisBasic',
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
  ];

let line = [{title:'X轴',name:'XAxis',active:'EchartsXAxisBasic',
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
  ];
let barLine = [{title:'X轴',name:'XAxis',active:'EchartsXAxisBasic',
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
  ];
let scatter = [{title:'X轴',name:'XAxis',active:'EchartsXAxisBasic',
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
];
export default{
  EchartCommon,
  EchartBar:_Merge_(bar,[{name:'bar',component:'Series-bar'}]),
  EchartLine:_Merge_(line,[{name:'line',component:'Series-line'}]),
  EchartBarLine:_Merge_(barLine,[{name:'bar',component:'Series-bar'},{name:'line',component:'Series-line'}]),
  EchartScatter:_Merge_(scatter,[{name:'scatter',component:'Series-scatter'}]),
}




