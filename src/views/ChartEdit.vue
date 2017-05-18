<template>
  <div class="container">
    <header>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">浏览图表</el-menu-item>
        <el-submenu index="2">
          <template slot="title">新增图表</template>
          <el-menu-item index="2-1">模板图表</el-menu-item>
          <el-menu-item index="2-2">自定义图表</el-menu-item>
        </el-submenu>
        <el-menu-item index="1">保存图表</el-menu-item>
        <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </header>
    <div class="main">
      <aside class="edit-panel" :style="style.editPanel">
        <ul class="side-button">
          <li><el-button @click="expandPanel">{{!collapse ? '收起' : '展开'}}</el-button></li>
          <li><el-button >刷新</el-button></li>
        </ul>
        <el-tabs v-show="!collapse" type="border-card" style="height: 100%">
          <el-tab-pane label="参数调整" name="first">
            <v-tabs active-tab-color="#04CCDF" active-text-color="white" type="pills" :start-index="1"  direction="vertical">
              <v-tab  title="基础" >
                <v-tabs active-tab-color="#04CCDF" active-text-color="white" type="pills" :start-index="1"  direction="vertical">
                  <v-tab title="通用"  >
                    11111
                  </v-tab>
                  <v-tab title="高级"  >
                    22222
                  </v-tab>
                </v-tabs>
              </v-tab>
              <v-tab title="标题"  >

              </v-tab>
              <v-tab title="视区"  >

              </v-tab>
              <v-tab title="X轴"  >

              </v-tab>
              <v-tab title="Y轴"  >

              </v-tab>
              <v-tab title="图例"  >

              </v-tab>
              <v-tab title="工具"  >

              </v-tab>
              <v-tab title="提示" >

              </v-tab>
              <v-tab title="视区" >

              </v-tab>
            </v-tabs>
          </el-tab-pane>
          <el-tab-pane label="数据设置" name="second">
          </el-tab-pane>
        </el-tabs>
      </aside>
      <div class="chart-panel">
        <echarts-panel :custom-style="{background:'#fff'}" :text-script="textScript"></echarts-panel>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  header {
    height: 60px;
    background: #eef1f6;
    border-bottom: 1px solid #000;
  }

  .container {
    height: 100vh;
    .main {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      height: calc(100% - 60px);
      .edit-panel {
        .side-button {
          list-style-type: none;
          float: right;
          position: relative;
          top: 60px;
          right: -60px;
          li{
            margin-bottom: 10px;
          }
          .el-button {
            border-radius: 0 4px 4px 0;
            border-left: none
          }
        }

        .el-tabs {
          position: relative;
          z-index: 5
        }
        transition: all linear 0.3s;
        height: 100%;
        .el-tabs__header {
          padding-left: 50px;
        }
      }
      .chart-panel {
        width: calc(100% - 50%);
        height: calc(100% - 120px);
        margin: 0 auto;
      }
    }
  }


</style>
<script>
  import ChartEditor from '../components/EchartsEditor/src/ChartEditor'
  import EchartsPanel from '../components/EchartsEditor/src/EchartsPanel'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button'
  import VueTabs from '../../node_modules/vue-nav-tabs/src/components/VueTabs'

  export default{
    components: {
      VueTabs,
      ElButton,
      EchartsPanel, ChartEditor
    },
    mounted(){

    },
    data(){
      return {
        style: {
          editPanel: {
            width: "40%"
          }
        },
        collapse: false,
        textScript: `option={tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{feature:{mark:{show:true},dataView:{show:true,readOnly:true},magicType:{show:false,type:["line","bar"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value",name:"°C"}],series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10]},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0]}],color:["rgb(209, 117, 117)","rgb(146, 78, 219)"],grid:{x:47,y:64,x2:124,y2:27}}`,

        tabs: [
          {title: "基础", icon: "ti-user", content: "123123123", key: "1"},
          {title: "标题", icon: "ti-check", content: "12312312",
            key: "2"
          }],
        msg: 'hello vue'
      }
    }, methods: {
      expandPanel(){
        if (this.collapse) {
          this.style.editPanel.width = "40%"
        } else {
          this.style.editPanel.width = "0%"
        }
        this.collapse = !this.collapse;
      }
    }
  }
</script>
