<template>
  <div class="container-fluid" id="content">
    <el-row class="scroll-parent">
      <el-col :span="7">
        <configure-panel></configure-panel>
      </el-col>
      <el-col :span="17" class="chart-container">
        <h3 style="color: rgb(51, 51, 51);">示例预览</h3>
        <display-panel>
          <echarts-panel :text-script="script[0]"></echarts-panel>
          <echarts-panel  slot="even" :text-script="script[1]"></echarts-panel>
        </display-panel>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
  .chart-container {
    margin-bottom: 20px;
    padding: 0 15px 15px;
    h3 {
      margin-top: 20px;
      font-size: 1.5em;
    }
  }

  .nav {
    height: 125px;
  }

  .container-fluid {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;;
  }

  .el-row {
    margin-left: -15px;
    margin-right: -15px;
  }

  .scroll-parent {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 15px;
    right: 15px;
    overflow: hidden;
    > div {
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
<script>
  import ConfigurePanel from "./ConfigurePanel"
  import DisplayPanel from "./DisplayPanel"
  import EchartsPanel from '@/components/EchartsPanel'

  export default{
    name: "ThemeBuilder",
    components: {
      DisplayPanel, ConfigurePanel, EchartsPanel
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
          let t=[];
          for (let e = ["all", "category", "value", "log", "time"], a = ["通用", "类目", "数值", "对数", "时间"],l = 0; l < e.length; ++l)
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
        script:["",""],
        defaultTheme
      }
    }
  }
</script>
