<template>
  <div class="theme-editor">
    <header class="chart-header">
      <div @click="expandMenu" class="control-btn">
        <i class="iconfont icon-xitongcaidan"></i>
      </div>
      <h3 style="color: rgb(51, 51, 51);">主题设置</h3>
    </header>
    <div class="layout">
      <transition name="fold">
        <aside class="side" v-show="isExpand">
          <configure-panel class="configure-panel"></configure-panel>
        </aside>
      </transition>
      <div class="panel-list">
        <echarts-panel :text-script="script[0]" style="height: 450px;min-width: 600px"></echarts-panel>
        <echarts-panel :text-script="script[1]" style="height: 450px;min-width: 600px"></echarts-panel>
        <echarts-panel :text-script="script[0]" style="height: 450px;min-width: 600px"></echarts-panel>
        <echarts-panel :text-script="script[1]" style="height: 450px;min-width: 600px"></echarts-panel>
      </div>
    </div>
  </div>

</template>
<style scoped lang="scss">
  .iconfont {
    display: block;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    line-height: 47px;
  }

  .theme-editor {
    height: 100%;
    overflow: auto;

    .chart-header {
      height: 47px;
      display: flex;
      background-color: #fff;
      width: 100%;
      justify-content: flex-start;
      .control-btn {
        height: 47px;
        width: 47px;
        &:hover {
          background-color: #c0eaff;
          .iconfont {
            font-size: 24px;
          }
        }
      }
      h3 {
        display: block;
        line-height: 47px;
      }
    }

    .layout {
      height: 100%;
      display: -webkit-flex;
      display: flex;
      flex-flow: row nowrap;
      .side {
        display: flex;
        flex: 0 0 350px;
        width: 350px;
        transition: all .5s linear;
        padding: 0 25px 25px 0;
        .configure-panel {
          width: 100%
        }
      }
      .panel-list {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        flex:1 0 calc(100% - 350px);
        justify-content: space-around;
      }
    }
  }



  .fold-enter-active {
    animation-name: fold-in;
    animation-duration: .5s;
  }

  .fold-leave-active {
    animation-name: fold-out;
    animation-duration: .5s;
  }

  @keyframes fold-in {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    50% {
      transform: translate3d(0, 50%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fold-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, 50%, 0);
    }
    100% {
      transform: translate3d(0, 100%, 0);
    }
  }
</style>
<script>
  import ConfigurePanel from "./ConfigurePanel"
  import DisplayPanel from "./DisplayPanel"
  import EchartsPanel from '@/components/EchartsEditor/EchartsPanel'
  import { debounceExec } from '@/utils'

  export default{
    name: "ThemeBuilder",
    components: {
      DisplayPanel, ConfigurePanel, EchartsPanel
    },
    computed: {
      chartMdWidth(){
        return 24 - this.colWidth.md;
      },
      chartLgWidth(){
        return 24 - this.colWidth.lg;
      }
    },

    data(){
      let defaultTheme = {
        seriesCnt: 3,
        backgroundColor: "rgba(0, 0, 0, 0)",
        titleColor: "#333",
        subtitleColor: "#aaa",
        textColorShow: !1,
        textColor: "#333",
        markTextColor: "#eee",
        color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
        borderColor: "#ccc",
        borderWidth: 0,
        visualMapColor: ["#bf444c", "#d88273", "#f6efa6"],
        legendTextColor: "#333",
        kColor: "#c23531",
        kColor0: "#314656",
        kBorderColor: "#c23531",
        kBorderColor0: "#314656",
        kBorderWidth: 1,
        lineWidth: 2,
        symbolSize: 4,
        symbol: "emptyCircle",
        symbolBorderWidth: 1,
        lineSmooth: !1,
        graphLineWidth: 1,
        graphLineColor: "#aaa",
        mapLabelColor: "#000",
        mapLabelColorE: "rgb(100,0,0)",
        mapBorderColor: "#444",
        mapBorderColorE: "#444",
        mapBorderWidth: .5,
        mapBorderWidthE: 1,
        mapAreaColor: "#eee",
        mapAreaColorE: "rgba(255,215,0,0.8)",
        axes: function () {
          let t = [];
          for (let e = ["all", "category", "value", "log", "time"], a = ["通用", "类目", "数值", "对数", "时间"],
                 l = 0; l < e.length; ++l)
            t.push({
              type: e[l],
              name: a[l] + "坐标轴",
              axisLineShow: true,
              axisLineColor: "#333",
              axisTickShow: true,
              axisTickColor: "#333",
              axisLabelShow: true,
              axisLabelColor: "#333",
              splitLineShow: "category" !== e[l],
              splitLineColor: ["#ccc"],
              splitAreaShow: false,
              splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
            });
          return t
        }(),
        axisSeperateSetting: !0,
        axis: null,
        toolboxColor: "#999",
        toolboxEmpasisColor: "#666",
        tooltipAxisColor: "#ccc",
        tooltipAxisWidth: 1,
        timelineLineColor: "#293c55",
        timelineLineWidth: 1,
        timelineItemColor: "#293c55",
        timelineItemColorE: "#a9334c",
        timelineCheckColor: "#e43c59",
        timelineCheckBorderColor: "rgba(194,53,49, 0.5)",
        timelineItemBorderWidth: 1,
        timelineControlColor: "#293c55",
        timelineControlBorderColor: "#293c55",
        timelineControlBorderWidth: .5,
        timelineLabelColor: "#293c55",
        datazoomBackgroundColor: "rgba(47,69,84,0)",
        datazoomDataColor: "rgba(47,69,84,0.3)",
        datazoomFillColor: "rgba(167,183,204,0.4)",
        datazoomHandleColor: "#a7b7cc",
        datazoomHandleWidth: "100",
        datazoomLabelColor: "#333"
      }
      defaultTheme.axis = [defaultTheme.axes[0]];
      return {
        colWidth: {
          md: 6, lg: 5
        },
        isExpand: true,
        script: [`function randomData(){now=new Date(+now+oneDay);value=value+Math.random()*21-10;return{name:now.toString(),value:[[now.getFullYear(),now.getMonth()+1,now.getDate()].join('/'),Math.round(value)]}}var data=[];var now=+new Date(1997,9,3);var oneDay=24*3600*1000;var value=Math.random()*1000;for(var i=0;i<1000;i++){data.push(randomData())}option={backgroundColor:new echarts.graphic.RadialGradient(0.4,0.4,0.4,[{offset:0,color:'#f7f8fa'},{offset:1,color:'#cdd0d5'}]),title:{text:'折线图'},tooltip:{trigger:'axis',formatter:function(params){params=params[0];var date=new Date(params.name);return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' : '+params.value[1]},axisPointer:{animation:false}},xAxis:{type:'time',splitLine:{show:false}},yAxis:{type:'value',boundaryGap:[0,'100%'],splitLine:{show:false}},series:[{name:'模拟数据',type:'line',showSymbol:false,hoverAnimation:false,data:data}]};
`, `app.title='气泡图';var data=[[[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],[[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]];option={backgroundColor:new echarts.graphic.RadialGradient(0.3,0.3,0.8,[{offset:0,color:'#f7f8fa'},{offset:1,color:'#cdd0d5'}]),title:{text:'1990 与 2015 年各国家人均寿命与 GDP'},legend:{right:10,data:['1990','2015']},xAxis:{splitLine:{lineStyle:{type:'dashed'}}},yAxis:{splitLine:{lineStyle:{type:'dashed'}},scale:true},series:[{name:'1990',data:data[0],type:'scatter',symbolSize:function(data){return Math.sqrt(data[2])/5e2},label:{emphasis:{show:true,formatter:function(param){return param.data[3]},position:'top'}},itemStyle:{normal:{shadowBlur:10,shadowColor:'rgba(120, 36, 50, 0.5)',shadowOffsetY:5,color:new echarts.graphic.RadialGradient(0.4,0.3,1,[{offset:0,color:'rgb(251, 118, 123)'},{offset:1,color:'rgb(204, 46, 72)'}])}}},{name:'2015',data:data[1],type:'scatter',symbolSize:function(data){return Math.sqrt(data[2])/5e2},label:{emphasis:{show:true,formatter:function(param){return param.data[3]},position:'top'}},itemStyle:{normal:{shadowBlur:10,shadowColor:'rgba(25, 100, 150, 0.5)',shadowOffsetY:5,color:new echarts.graphic.RadialGradient(0.4,0.3,1,[{offset:0,color:'rgb(129, 227, 238)'},{offset:1,color:'rgb(25, 183, 207)'}])}}}]};`],
        defaultTheme
      }
    },
    methods: {
      expandMenu(){
        if (this.isExpand) {
          this.colWidth.md = 0;
          this.colWidth.lg = 0;
        } else {
          this.colWidth.md = 6;
          this.colWidth.lg = 5;
        }
        this.isExpand = !this.isExpand;
        debounceExec(_ => {
          let e = document.createEvent("Event");
          e.initEvent("resize", true, true);
          window.dispatchEvent(e);
        }, 800)
      }
    }
  }
</script>
