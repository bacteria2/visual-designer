import React from 'react';
import {Card,Button,notification,Layout,Row,Col} from 'antd';
import set from 'lodash/set';
import {connect} from 'react-redux';
import {PropertyPage} from '../../components/Widget';
import {disableProperty,submitProperty} from '../../store/Widget/action'
import { List,Map } from 'immutable';

const Mock={
  properties : {
    properties: [{
      name: 'TextInput',
      optionKey: 'title.text',
      label: '标题'
    },{
      name: 'TextInput',
      optionKey: 'title.text.a',
      label: '标题a'
    },{
      name: 'TextInput',
      optionKey: 'title.text.b',
      label: '标题b'
    }, {
      name: 'SliderInput',
      optionKey: 'title.textStyle.fontSize',
      min: 4,
      max: 16,
      label: '字体大小'
    }, {
      name: 'SliderInput',
      optionKey: 'title.textStyle.height',
      min: 8,
      max: 16,
      label: '字体间隔'
    }, {
      name: 'SliderInput',
      optionKey: 'title.textStyle.width',
      min: 8,
      max: 16,
      label: 'zlevel'
    }, {
      name: 'TextInput',
      optionKey: 'title.subtext',
      label: '副标题文本'
    },
      {
        name: 'SliderInput',
        optionKey: 'title.textStyle.range',
        min: 4,
        max: 16,
        range:true,
        label: '字体大小'
      }]
  },
  propertyLayout:[
    'p:title.text',
    'p:title.text.b',
    [
      {id: 'collapse:c1', bordered: true,defaultActiveKey:['1']},
      [
        {header:'基础',key:"1",},
        'p:title.textStyle.fontSize',
        'p:title.text.a',
      ],
      [
        {header:'示例',key:"2",},
        'p:title.textStyle.height'
      ],[
      {header:'基础',key:"3",},
      {
        id:'xxxTabs',
        panels: ['xpanel1', 'xpanel2'],
        'xpanel1': [
          {tab: '高亮', key: 'xhighlight',},
          'p:title.textStyle.xpanel1.fontSize',
          'p:title.textStyle.width',
        ],
        'xpanel2': [
          {tab: '普通', key: 'xnormal',},
          'p:title.textStyle.xpanel2.fontSize',
          'p:title.textStyle.xpanel2.height',
        ],
      }
    ]],
    {
      id:'tttt',
      panels: ['panel1', 'panel2'],
      'panel1': [
        {tab: '高亮', key: 'highlight',},
        'p:title.subtext',
        'p:title.textStyle.panel1.height',
      ],
      'panel2': [
        {tab: '普通', key: 'normal',},
        'p:title.textStyle.panel2.fontSize',
        'p:title.textStyle.panel2.height',
      ],
    }
  ]
}

function isCollection(value){
  return List.isList(value)||Map.isMap(value);
}

function rawOptionTransform(rawOption={}){
  let option={};
  rawOption.mapKeys(key=>{
    if(!rawOption.getIn([key,'disabled'],true)){
      let value=rawOption.getIn([key,'value']);
      if(isCollection(value)){
        set(option,key,rawOption.getIn([key,'value']).toJS());
      }
      else{
        set(option,key,rawOption.getIn([key,'value']));
      }
    }
  });
  return option
}

class  ChartRender extends React.PureComponent{
  componentWillReceiveProps(nextProps){
    this.renderChart(nextProps);
  }
  componentDidMount(){
    let {Toolkit}=window;
    this.charts= Toolkit.asyncCharts(document.getElementById('chart'))
    this.renderChart(this.props);
  }

  renderChart({rawOption}){
    let option=rawOptionTransform(rawOption);
    if(this.charts)
      this.charts.invoke('setOption',Object.assign({
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      },{
        name: '产量',
        type: 'bar',
        data: [15, 25, 46, 20, 30, 26]
      }]
    },option),true)
  }

  render(){
    return  <div id='chart' style={this.props.style} />
  }
}


class Designer extends React.PureComponent{

  state={
    showProperty:true,
  }

  handleShowProperty=()=>{
    this.setState({showProperty:!this.state.showProperty})
  }


  handleSubmitProperty=(value,key)=>this.props.dispatch(submitProperty(key,value))

  handleDisabledProperty=(value,key)=>this.props.dispatch(disableProperty(key,value))

  render(){
    let panelHeight='calc(100vh - 130px)';
    return  <Row >
      <Col span={13}>
        <Card title='图表展示' >
          <ChartRender
            rawOption={this.props.rawOption}
            style={{height:'calc(100vh - 368px)'}}
          />
        </Card>
        <Card style={{height:120,marginTop:12}}>
          <Button onClick={this.handleShowProperty}>测试窗口</Button>
          <Button onClick={this.handleShowProperty}>测试窗口</Button>
        </Card>
      </Col>
      <Col span={5}>
        <Card title={222} style={{height:panelHeight}}>
          {/*{<SelectMenu onMenuClick menu />}*/}
        </Card>
      </Col>
      <Col span={this.state.showProperty?6:0}>
        <Card style={{height:panelHeight}} bodyStyle={{padding:'12px 0'}}>
          <PropertyPage
            onPropChange={this.handleSubmitProperty}
            onPropDisable={this.handleDisabledProperty}
            getValue={key=>this.props.rawOption.getIn([key,'value'],null)}
            getDisabled={key=>this.props.rawOption.getIn([key,'disabled'],true)}
            layout={Mock.propertyLayout}
            properties={Mock.properties}
          />
        </Card>
      </Col>
      <Col span={this.state.showProperty?0:3}>
        <Card style={{height:panelHeight}}>
          22222222
        </Card>
      </Col>
      <Col span={this.state.showProperty?0:3}>
        <Card style={{height:panelHeight}}>
          22222222
        </Card>
      </Col>
    </Row>
  }
}


export default connect(state=>state.get('widget').toObject())(Designer);