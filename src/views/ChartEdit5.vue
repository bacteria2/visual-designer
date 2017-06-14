<template>
  <div class="option-adjust">
    <v-navigation-drawer persistent clipped v-model="drawer" class="side-drawer blue-grey darken-4" light
                         enable-resize-watcher>
      <vertical-tab-panel :isIndicator="false" isSelectColor v-model="activeTab">
        <vertical-tab title="标题0" name="0">
          <vertical-tab-panel v-model="activeTab0" content-classes="vertical-tab__content__no-padding blue-grey darken-1">
            <vertical-tab title="标题12" name="0">
              <Property label="是否使用提示" ui="select" v-model="a1" :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
              <divider/>
              <subheader text="格式模版"/>
              <Property label="普通提示模版" ui="text"  v-model="a1"></Property>
              <Property label="孤岛提示模版" ui="text"  v-model="a1"></Property>
              <divider/>
              <subheader text="提示外观"/>
              <property-color label="背景颜色" v-model="a1"></property-color>
              <Property label="边框粗细" ui="number-px" v-model="a1"></Property>
              <property-color label="边框颜色" ui="color"     v-model="a1"></property-color>
              <Property label="边框圆角" ui="number-px" v-model="a1"></Property>
              <Property label="内边距"   ui="number-px" v-model="a1"></Property>
              <divider/>
              <subheader text="提示文本样式"/>
              <property-color label="文字颜色" ui="color"     v-model="a1"></property-color>
              <Property label="文字大小" ui="number-px" v-model="a1"></Property>
              <Property label="字体样式" ui="select"    v-model="a1" :options="[
          {text:'普通',value:'normal'},
          {text:'斜体（italic）',value:'italic'},
          {text:'倾斜文字（oblique）',value:'oblique'}
    ]"></Property>
              <Property label="字体粗细" ui="select"    v-model="a1" :options="[
          {text:'普通',value:'normal'},
          {text:'加粗',value:'bold'},
          {text:'更粗',value:'bolder'},
          {text:'更新',value:'lighter'}
    ]"></Property>
              <Property label="文本水平对齐方式" ui="select" v-model="a1" :options="[
          {text:'居左',value:'left'},
          {text:'居右',value:'right'},
          {text:'居中',value:'center'}
    ]"></Property>
              <Property label="文本垂直对齐方式" ui="select" v-model="a1" :options="[
          {text:'居上',value:'top'},
          {text:'居下',value:'bottom'},
          {text:'居中',value:'middle'}
    ]"></Property>
              <subheader text="外观"/>
              <divider/>
              <Property label="提示触发点" ui="select" v-model="a1" :options="[
          {text:'在项上触发',value:'item'},
          {text:'在轴上触发',value:'axis'},
    ]"></Property>
              <Property label="提示的指示器类型" ui="select" v-model="a1" :options="[
          {text:'提示线',value:'line'},
          {text:'提示阴影',value:'shadow'},
          {text:'无',value:'none'}
    ]"></Property>
              <subheader text="提示线样式设置"/>
              <property-color label="线条颜色"  ui="color"     v-model="a1"></property-color>
              <Property label="线条宽度"  ui="number-px" v-model="a1"></Property>
              <Property label="线条类型"  ui="select"    v-model="a1" :options="[
          {text:'实线',value:'solid'},
          {text:'点状线',value:'dotted'},
          {text:'虚线',value:'dashed'}
    ]"></Property>
              <subheader text="提示阴影样式设置"/>
              <Property label="区域填充颜色"  ui="select" v-model="a1" :options="[
          {text:'填充',value:'default'},
          {text:'不填充',value:undefined}
    ]"></Property>
              <property-color label="区域填充颜色自定义"  ui="color" v-model="a1"></property-color>
              <divider/>
              <subheader text="延时和动画"/>
              <Property label="显示延迟"     ui="number-px" v-model="a1"></Property>
              <Property label="隐藏延迟"     ui="number-px" v-model="a1"></Property>
              <Property label="动画变换时长" ui="number-px" v-model="a1"></Property>
            </vertical-tab>
            <vertical-tab title="标题12" name="1">标题22</vertical-tab>
            <vertical-tab title="标题12" name="2">标题23</vertical-tab>
            <vertical-tab title="标题12" name="3">标题24</vertical-tab>
            <vertical-tab title="标题12" name="4">标题25</vertical-tab>
            <vertical-tab title="标题12" name="5">标题26</vertical-tab>
          </vertical-tab-panel>
        </vertical-tab>
        <vertical-tab title="标题23" name="1">标题2</vertical-tab>
        <vertical-tab title="标题23" name="2">标题3</vertical-tab>
        <vertical-tab title="标题23" name="3">标题4</vertical-tab>
        <vertical-tab title="标题23" name="4">标题5</vertical-tab>
      </vertical-tab-panel>
    </v-navigation-drawer>
    <v-toolbar class="blue-grey" right light>
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
    <main class="main-container blue-grey darken-1">
      <v-container fluid class="fluid-container">
        <v-card height="100%" class="card blue-grey lighter-1">
          <div>
            <echarts-panel :text-script="textScript"></echarts-panel>
          </div>
        </v-card>
      </v-container>
    </main>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        a1:"",
        activeTab:"0",
        activeTab0:"0",
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
        colors: "",
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
        btnGroup: "32",
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
      ,
      click(a){
        console.log(a);
      }

    }
  }
</script>
