<template>
  <div style="height: 100%;color: #fff;">
    <v-navigation-drawer persistent clipped v-model="drawer" class="blue-grey darken-4"
                         style="box-shadow:rgba(0, 0, 0, 0.6) 0 0 3px" light enable-resize-watcher>
      <ul class="m-tab">
        <li class="m-tab--item">标题 </li>
        <li class="m-tab--item">标题</li>
        <li class="m-tab--item">标题</li>
        <li class="m-tab--item">标题</li>
        <li class="m-tab--item">标题</li>
      </ul>
      <div style="position: absolute;left: 60px;top: 10px;bottom: 10px;right: 10px" class="blue-grey ">
        <ul class="m-tab">
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
        </ul>
        <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
          <Property label="图的宽带"  ui="number-px" v-model="width" style="margin-top: 15px"></Property>
          <Property label="图的宽带1" ui="number-px" v-model="width1"></Property>
          <Property label="多X轴时本系列使用哪个X轴" ui="number-px" v-model="width2"></Property>

          <divider/>

          <Property label="背景颜色"  ui="color"     v-model="rgbaColors"></Property>

          <subheader text="属性A"/>

          <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
            <div slot="normal">
              <Property label="图的宽带"  ui="number-px" v-model="width" style="margin-top: 15px"></Property>
              <Property label="题目"  ui="text" v-model="width" ></Property>
            </div>
            <div slot="emphasis">
              <Property label="背景颜色"  ui="color"     v-model="rgbaColors"></Property>
            </div>
          </Group>
          <Property    label="水平方向"     ui="select"     v-model="btnGroup" style="margin-top: 15px"
                       :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></Property>

        </div>
      </div>
    </v-navigation-drawer>
    <v-toolbar class="blue-grey" right light style="">
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="blue-grey "
        >
          保存
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="blue-grey "
        >
          Save
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main style="height: calc(100% - 56px)" class="blue-grey darken-1">
      <v-container fluid class="container" >
        <v-card height="100%" class="card blue-grey lighter-1">
          <div style="height: inherit;padding: 24px;position: relative">
            <echarts-panel :text-script="textScript"></echarts-panel>
          </div>
        </v-card>
      </v-container>
    </main>
    <v-navigation-drawer persistent clipped v-model="dataPanel" class="blue-grey darken-4"
                         style="box-shadow:rgba(0, 0, 0, 0.6) 0 0 3px;width: 500px" light enable-resize-watcher right>
      <div id="datatable001" class="panel">
        <!--<HotTable :root="root" :settings="hotSettings"></HotTable>-->
      </div>
    </v-navigation-drawer>
  </div>
</template>
<style lang="scss" scoped>
  //设置card屏幕适应
  @media screen and (max-width: 900px){
    .card{
      width: 400px;
      padding: 24px;
    }
    .tabs__content
    .card{
      width: auto;
    }
  }
  @media screen and (min-width:901px){
    .card{
      width: 800px;
      padding: 24px;
    }

    .tabs__content
    .card{
      width: auto;
    }
  }
  .container{
    padding: 58px;
    height: 100%;
    align-items:center;
    justify-content: center;
    display: flex;
  }
  .m-tab {
    position: absolute;
    width: 60px;
    top: 10px;
    bottom: 10px;
    overflow: hidden;
    padding: 0;
    .m-tab--item {
      display: block;
      text-align: center;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      margin: 5px 0 0;
    }
  }
</style>

<script>
  import ColorPicker from "@/components/ColorPicker"
  import EchartsPanel from '@/components/EchartsEditor/src/EchartsPanel'
  import {Group,Property,subheader,divider} from '@/components/UiUtil'
  export default {
    components: {
      EchartsPanel,
      ColorPicker,Property,Group,subheader,divider
    },
    data () {
      return {
        height: 10,
        width: 20,
        width1: 20,
        width2: 20,
        drawer: true,
        drawer2: true,
        drawer3: true,
        drawer4: false,
        dataPanel: false,
        right: null,
        left: null,
        loader: null,
        loading: null,
        e3: null,
        colors: "#9BFF76",
        rgbaColors: "rgba(155,255,118,0.3)",
        textScript: `option={tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{feature:{mark:{show:true},dataView:{show:true,readOnly:true},magicType:{show:false,type:["line","bar"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value",name:"°C"}],series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10]},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0]}],color:["rgb(209, 117, 117)","rgb(146, 78, 219)"],grid:{x:47,y:64,x2:124,y2:27}}`,
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
        options: [
          {value: "1"},
          {text: "test2", value: "2"},
          {text: "test3", value: "3"},
          {text: "test4", value: "4"},
          {text: "test51", value: "51"},
          {text: "test232", value: "232"},
          {text: "test32", value: "32"},
          {text: "test42", value: "42"}],
        btnGroup:"32",
        items: [
          {text: 'State 1'},
          {text: 'State 2'},
          {text: 'State 3'},
          {text: 'State 4'},
          {text: 'State 5'},
          {text: 'State 6'},
          {text: 'State 7'}
        ],
        root: 'textTable',
        hotSettings: {
          colHeaders: true,
          Data: [
            ['', 'Maserati', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi'],
            ['2009', 0, 2941, 4303, 354, 5814],
            ['2010', 3, 2905, 2867, 412, 5284],
            ['2011', 4, 2517, 4822, 552, 6127],
            ['2012', 2, 2422, 5399, 776, 4151]]
        }
      }

    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    },
    methods: {
      ok(a){
        console.log(a)
      }

    }
  }
</script>
