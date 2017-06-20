
import { merge } from '@/utils'
export const edits = {
  EchartCommon(){
    return [{title:'基础',name:'Base',active:'EchartsBaseCommon','pages':[{title:'通用',name:'EchartsBaseCommon'},{title:'高级',name:'EchartsBaseAdvanced'}]},
             {title:'标题',name:'Title',active:'EchartsTitleContent','pages':[{title:'内容',name:'EchartsTitleContent'},{title:'样式',name:'EchartsTitleStyle'}]},
             {title:'图例',name:'Legend',active:'EchartsLegendBasic','pages':[{title:'基础',name:'EchartsLegendBasic'},{title:'高级',name:'EchartsLegendOthers'}]},
             {title:'提示',name:'Tooltip',active:'EchartTooltipCommon','pages':[{title:'通用',name:'EchartTooltipCommon'}]},
             {title:'工具',name:'Toolbox',active:'EchartsToolboxBasic','pages':[{title:'基础',name:'EchartsToolboxBasic'}]},
             {title:'序列',name:'Series',active:'EchartsToolboxBasic','pages':[{title:'基础',name:'EchartsToolboxBasic'}]},
            ];
  },
  EchartBar(){
    let bar = [{title:'X轴',name:'XAxis',active:'EchartsXAxisBasic','pages':[{title:'基础',name:'EchartsXAxisBasic'},
                             {title:'轴线',name:'EchartsXAxisLine'},
                             {title:'标签',name:'EchartsXAxisLable'},
                             {title:'刻度',name:'EchartsXAxisTick'},
                             {title:'隔线',name:'EchartsXAxisSplitLine'},
                             {title:'隔区',name:'EchartsXAxisSplitArea'}
    ]},
      {title:'Y轴',name:'YAxis',active:'EchartsYAxisBasic',
        'pages':[{title:'基础',name:'EchartsYAxisBasic'},
          {title:'轴线',name:'EchartsYAxisLine'},
          {title:'标签',name:'EchartsYAxisLable'},
          {title:'刻度',name:'EchartsYAxisTick'},
          {title:'隔线',name:'EchartsYAxisSplitLine'},
          {title:'隔区',name:'EchartsYAxisSplitArea'}
        ]}
    ],
    seriesType=['bar'];//配置组件可用的序列类型
    return this._Merge_(bar,seriesType);
  },

  _Merge_(edit,serieType){
     let common = this.EchartCommon();
     return {active:'Base',seriesType:serieType,pages:[...common,...edit]};
  }
}
