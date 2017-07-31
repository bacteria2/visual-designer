import Vue from 'vue'
//第三方UI组件
import Vuetify from 'vuetify'
import { Slider, Input,Button,Table,TableColumn,Form,FormItem,Select,Option,Collapse,
  CollapseItem,ColorPicker,Upload,InputNumber,Cascader,Checkbox,radioButton,radioGroup,Switch,CheckboxGroup,CheckboxButton,tooltip,Loading,Row,Col,Pagination,Tag,DatePicker} from 'element-ui'
import * as MuseCheckbox from 'muse-ui/src/checkbox'
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
import divider from 'muse-ui/src/divider'

//自定义UI组件
import VueDraggableResizable from '@/components/DraggableResizable/'
import AColorPicker from '@/components/ColorPicker'
import Brace from '@/components/Brace'
import * as MyButton from '@/components/CheckButton'
import ColorPickerList from '@/components/ColorPickerList'
import DataTable from  '@/components/DataTable'
import { VerticalTab, VerticalTabPanel } from '@/components/VerticalTab'
import * as ViewPanels from '@/components/WidgetViewPanels'
import * as PropertyGroup from '@/components/InputCollector'
import * as Layout from '@/components/Layout'
import * as EchartComponents from '@/views/Echarts/common'
import * as ViewCommon from '@/views/common'
import * as ExtendWidgets from '@/components/ExtendWidget/Render'
import * as ExtendWidgetsInput from '@/components/ExtendWidget/Input'
import * as BoardProperties from '@/components/BoardEditor/Properties'
import * as d3Components from '@/views/D3'
import * as BoardLayout from '@/components/BoardEditor/Layout'
import * as customWidget from  '@/views/custom'

//视图
import * as StyleInput from '@/views/Board/StyleInput'

Vue.use(Vuetify);

/*
 * 组件注入
 * */
const uiComponent = {
  //第三方组件
  Slider, Input,Button,Table,TableColumn,Form,FormItem,Select,Option,Collapse,CollapseItem,ColorPicker,InputNumber,Upload,Pagination,
  ...MuseCheckbox,...MuseMenu,MuseDialog,MuseSelect,MuseTextField,MuseRaiseButton,Cascader,MuseDataPicker,MuseTimePicker,
  VueDraggableResizable,Checkbox,radioButton,radioGroup,Switch, CheckboxGroup,CheckboxButton,tooltip,Row,Col,Tag,
  MuseDrawer,...MuseList,MusePopover,MuseDivider,MuseSubHeader,MuseSwitch,MuseIcon,MuseflatButton,DatePicker,MusePopup,
  MuseInfiniteScroll,divider,
  ...MuseStepper,MuseLinearProgress,
  //自定义组件
  AColorPicker,ColorPickerList,Brace, VerticalTab, VerticalTabPanel,DataTable,
  ...ViewPanels,
  ...PropertyGroup,
  ...Layout,
  ...ViewCommon,
  //自定义按钮
  ...MyButton,
  //视图
  ...StyleInput,
  //ECharts属性组件
  ...EchartComponents,
  //扩展组件
  ...ExtendWidgets,
  //扩展组件属性组件
  ...ExtendWidgetsInput,
  //面板属性封装组件
  ...BoardProperties,
  ...BoardLayout,
  //d3 组件属性组件
  ...d3Components,
  //自定义组件
  ...customWidget,

};

Vue.use(Loading.directive);

Object.keys(uiComponent).forEach(key=>{Vue.component(uiComponent[key].name,uiComponent[key])});

