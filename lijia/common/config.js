/**
 * Created by lenovo on 2017/6/12.
 */
export const edits = {
  EchartCommon(){
    return [{title:'基础',name:'Base',active:'EchartsBaseCommon','pages':[{title:'通用',name:'EchartsBaseCommon'},{title:'高级',name:'EchartsBaseAdvanced'}]},
             {title:'标题',name:'Title',active:'EchartsTitleContent','pages':[{title:'内容',name:'EchartsTitleContent'},{title:'样式',name:'EchartsTitleStyle'}]},
             {title:'图例',name:'Legend',active:'EchartsLegendBasic','pages':[{title:'基础',name:'EchartsLegendBasic'},{title:'高级',name:'EchartsLegendOthers'}]},
             {title:'提示',name:'Tooltip',active:'EchartTooltipCommon','pages':[{title:'通用',name:'EchartTooltipCommon'}]},
             {title:'工具',name:'Toolbox',active:'EchartsToolboxBasic','pages':[{title:'基础',name:'EchartsToolboxBasic'}]},
            ];
  },
  EchartBar(){
    let bar = [];
    return this._Merge_(bar);
  },
  _Merge_(edit){
     return {active:'Base',pages:Object.assign([],edit,this.EchartCommon())};
  }
}
