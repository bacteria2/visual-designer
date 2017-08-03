import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider, Input,Button,Table,TableColumn,Form,FormItem,Select,Option,Collapse,
  CollapseItem,ColorPicker,Upload,InputNumber,Cascader,Checkbox,radioButton,radioGroup,Switch,CheckboxGroup,CheckboxButton,tooltip,Row,Col,Pagination,Tag,DatePicker} from 'element-ui'
/*import * as MuseCheckbox from 'muse-ui/src/checkbox'
import MuseSelect from 'muse-ui/src/selectField'
import * as MuseMenu from 'muse-ui/src/menu'
import MuseDialog from 'muse-ui/src/dialog'
import MuseDrawer from 'muse-ui/src/drawer'
import * as MuseList from 'muse-ui/src/list'
import MusePopover from 'muse-ui/src/popover'
import MuseDivider from  'muse-ui/src/divider'
import MuseSubHeader from 'muse-ui/src/subHeader'
import MuseDataPicker from 'muse-ui/src/datePicker'
import MuseTimePicker from 'muse-ui/src/timePicker'
import MuseTextField from 'muse-ui/src/textField'
import MuseSwitch from 'muse-ui/src/switch'
import MuseIcon from 'muse-ui/src/icon'
import MuseRaiseButton from 'muse-ui/src/raisedButton'
import MuseflatButton from 'muse-ui/src/flatButton'
import MusePopup from 'muse-ui/src/popup'
import MuseInfiniteScroll from 'muse-ui/src/infiniteScroll'
import * as MuseStepper from 'muse-ui/src/stepper'
import MuseLinearProgress from 'muse-ui/src/linearProgress'
import divider from 'muse-ui/src/divider'*/

//
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
Vue.component('Brace',()=>import ( '@/components/Brace'))
