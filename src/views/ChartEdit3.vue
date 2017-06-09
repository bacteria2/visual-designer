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
      <div style="position: absolute;left: 80px;top: 10px;bottom: 10px;right: 10px" class="blue-grey ">
        <ul class="m-tab">
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
        </ul>
        <div style="position: absolute;left: 70px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
          <v-layout row wrap style="margin-top: 15px">
            <v-flex xs3 offset-xs1 style="line-height: 38px">
              图的高度
            </v-flex>
            <v-flex xs7>
              <el-slider v-model="height" show-input :show-input-controls="false"></el-slider>
            </v-flex>
          </v-layout>

          <Property label="图的宽带" :value.sync="width"></Property>
          <Property label="图的宽带1" :value.sync="width1"></Property>
          <Property label="多X轴时本系列使用哪个X轴" :value.sync="width2"></Property>
          <v-layout row wrap>
            <v-flex xs3 offset-xs1 style="line-height: 58px">
              系列的图形类型
            </v-flex>
            <v-flex xs7>
              <v-text-field light
                            name="input-1"
                            id="testing"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 offset-xs1 style="line-height: 58px" elevation-5>
              折线转为平滑曲线
            </v-flex>
            <v-flex xs7>
              <v-text-field light  name="input-1"  id="testing"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 offset-xs1 style="line-height: 58px">
              Focus
            </v-flex>
            <v-flex xs7>
              <v-select label="Select" :items="items" v-model="e3" light item-value="text"></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 offset-xs1 style="line-height: 58px">
              Focus
            </v-flex>
            <v-flex xs7>
              <color-picker  v-model="rgbaColors"></color-picker>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 offset-xs1 style="line-height: 58px">
              Focus
            </v-flex>
            <v-flex xs7>
              <v-text-field light
                            name="input-1"
                            id="testing"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </v-navigation-drawer>
    <v-toolbar class="blue-grey" light style="">
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
  </div>
</template>
<style lang="scss" scoped>
  //设置card屏幕适应
  @media screen and (max-width: 900px){
    .card{
      width: 400px;
      padding: 24px;
    }
  }
  @media screen and (min-width:901px){
    .card{
      width: 800px;
      padding: 24px;
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
    width: 70px;
    top: 10px;
    bottom: 10px;
    overflow: hidden;
    padding:0;
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
  import EchartsPanel from '../components/EchartsEditor/src/EchartsPanel'
  import Property from '../components/property'
  export default {
    components: {
      EchartsPanel,
      ColorPicker,
      Property
    },
    data () {
      return {
        height: 10,
        width:20,
        width1:20,
        width2:20,
        drawer: true,
        drawer2: true,
        drawer3: true,
        drawer4: false,
        right: null,
        left: null,
        loader: null,
        loading: null,
        e3: null,
        colors:"#9BFF76",
        rgbaColors:"rgba(155,255,118,0.3)",
        textScript: `option={tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{feature:{mark:{show:true},dataView:{show:true,readOnly:true},magicType:{show:false,type:["line","bar"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value",name:"°C"}],series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10]},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0]}],color:["rgb(209, 117, 117)","rgb(146, 78, 219)"],grid:{x:47,y:64,x2:124,y2:27}}`,
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
        items: [
          {text: 'State 1'},
          {text: 'State 2'},
          {text: 'State 3'},
          {text: 'State 4'},
          {text: 'State 5'},
          {text: 'State 6'},
          {text: 'State 7'}
        ],
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
