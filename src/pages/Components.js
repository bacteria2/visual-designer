import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider, Input,Button,Table,TableColumn,Cascader} from 'element-ui'
import * as MuseCheckbox from 'muse-ui/src/checkbox'
import MuseSelect from 'muse-ui/src/selectField'
import * as MuseMenu from 'muse-ui/src/menu'
import MuseDialog from 'muse-ui/src/dialog'
import MuseDataPicker from 'muse-ui/src/datePicker'
import MuseTimePicker from 'muse-ui/src/timePicker'
//自定义UI组件
import ColorPicker from '@/components/ColorPicker'
import Brace from '@/components/Brace'
import CheckGroup from '@/components/CheckButton'
import ColorPickerList from '@/components/ColorPickerList'
import DataTable from  '@/components/DataTable'
import { VerticalTab, VerticalTabPanel } from '@/components/VerticalTab'
import * as Charts from '@/components/ChartsPanel'
import * as PropertyGroup from '@/components/InputCollector'
import * as Layout from '@/components/Layout'
import * as EchartComponents from '@/views/Echarts/common'

import * as ViewCommon from '@/views/common'
Vue.use(Vuetify);

/*
 * 组件注入
 * */
const uiComponent = {
  //第三方组件
  Slider, Input,Button,Table,TableColumn,Cascader,
  ...MuseCheckbox,...MuseMenu,MuseDialog,MuseSelect,MuseDataPicker,MuseTimePicker,

  //自定义组件
  ColorPicker,ColorPickerList,  CheckGroup,Brace, VerticalTab, VerticalTabPanel,DataTable,
  ...Charts,
  ...PropertyGroup,
  ...Layout,
  ...ViewCommon,
  //ECharts属性组件
  ...EchartComponents
};

Object.keys(uiComponent).forEach(key=>{Vue.component(uiComponent[key].name,uiComponent[key])})

