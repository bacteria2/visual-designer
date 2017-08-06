import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider, Input,Button,Table,TableColumn,Form,FormItem,Select,Option,Collapse,
  CollapseItem,ColorPicker,Upload,InputNumber,Cascader,Checkbox,radioButton,radioGroup,Switch,CheckboxGroup,CheckboxButton,tooltip,Row,Col,Pagination,Tag,DatePicker,Loading} from 'element-ui'


import MuseUI from 'muse-ui'
Vue.use(MuseUI)


//自定义UI组件
import VueDraggableResizable from '@/components/DraggableResizable/'
import AColorPicker from '@/components/ColorPicker'
import * as MyButton from '@/components/CheckButton'
import ColorPickerList from '@/components/ColorPickerList'
import DataTable from  '@/components/DataTable'
import { VerticalTab, VerticalTabPanel } from '@/components/VerticalTab'
import * as PropertyGroup from '@/components/InputCollector'
import * as DashboardToolsCommon from '@/components/DashboardTools/common'
import * as DashboardToolsTools from '@/components/DashboardTools/tools'
import * as Layout from '@/components/Layout'
import * as BoardProperties from '@/components/BoardEditor/Properties'
import * as BoardLayout from '@/components/BoardEditor/Layout'
//视图
import * as StyleInput from '@/views/Board/StyleInput'
import * as ViewCommon from '@/views/common'
import '@/widgets/VueCompLoader'
import '@/widgets/PageModels'
import '@/dashboardWidgets/VueCompLoader'
import '@/dashboardWidgets/PageModelsAndDashboardAccess'
import {RenderMapper,WrapperNameList} from '@/widgets/RenderMapper'

Vue.use(Vuetify);

/*
 * 组件注入
 * */
const uiComponent = {
  //第三方组件
  Slider, Input,Button,Table,TableColumn,Form,FormItem,Select,Option,Collapse,CollapseItem,ColorPicker,InputNumber,Upload,Pagination,DatePicker,Cascader,
  VueDraggableResizable,Checkbox,radioButton,radioGroup,Switch, CheckboxGroup,CheckboxButton,tooltip,Row,Col,Tag,
  //自定义组件
  AColorPicker,ColorPickerList, VerticalTab, VerticalTabPanel,DataTable,
  ...PropertyGroup,
  ...Layout,
  ...ViewCommon,
  //驾驶舱工具栏公共组件
  ...DashboardToolsCommon,
  //驾驶舱工具栏工具
  ...DashboardToolsTools,
  //自定义按钮
  ...MyButton,
  //视图
  ...StyleInput,
  //ECharts属性组件
  //面板属性封装组件
  ...BoardProperties,
  ...BoardLayout,
};

Object.keys(uiComponent).forEach(key=>{Vue.component(uiComponent[key].name,uiComponent[key])});


//异步组件
Vue.component('Brace',()=>import ( /* webpackChunkName: 'brace' */ '@/components/Brace'))

