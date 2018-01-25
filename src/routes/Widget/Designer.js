import React from 'react'
import { Card, Button, notification, Layout, Row, Col, Spin } from 'antd'
import { connect } from 'react-redux'
import { PropertyPage, SelectMenu } from '../../components/Widget'
import { submitProperty, DeleteProperty, PushProperty, requestWidget } from '../../store/Widget/action'
import { requestPropertyPagesByName, requestWidgetMeta } from '../../service/widget'
import { Map } from 'immutable'
import merge from 'lodash/merge'
import styles from './Designer.css'

//组合option和data
function rawOptionTransform ({rawOption, data,}) {
  let option = merge(rawOption.toJS(), data.toJS())
  return option
}

function replaceIndex (obj, index) {
  return JSON.parse(JSON.stringify(obj).replace(/\$i/g, index))
}

class ChartRender extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps (nextProps) {
    console.log('ReceiveProps')
    this.renderChart(nextProps)
  }

  componentDidMount(){
    let {Toolkit} = window
    this.charts = Toolkit.asyncCharts(document.getElementById('chart'))
    this.renderChart(this.props)
  }

  renderChart (props) {
    let {rawOption, rawOptionEnabled, data} = props
    let option = rawOptionTransform({rawOption, rawOptionEnabled, data})
    if (this.charts)
      this.charts.invoke('setOption', option, true)
  }

  render () {
    return <div id='chart' style={this.props.style}/>
  }
}

/**
 * 实例设计器:
 * 从store获取到实例id,加载实例数据到组件
 *
 * */
class Designer extends React.PureComponent {
  constructor (props) {
    super(props)
    let {id} = props.match.params
    if (id)
      props.dispatch(requestWidget(id))
  }

  state = {
    showProperty: true,
    rendering: true,
    loadingProperty: false,
    propertyPage: {
      properties: null,
      layout: null,
    },
  }
  //
  handleShowProperty = () => this.setState({showProperty: !this.state.showProperty})

  //
  handleSubmitProperty = (value, key) => this.props.dispatch(submitProperty(key.split('.'), value))
  handleDisabledProperty = (disabled, key) => {
    if (disabled)
      this.props.dispatch({type: DeleteProperty, payload: {key: key.split('.')}})
    else
      this.props.dispatch(submitProperty(key.split('.'), null))
  }

  handlePropertySpecified = async (name, index) => {
    //name不为空请求后台,获取property页面
    if (name) {
      this.setState({loadingProperty: true})
      let {success, data} = await requestPropertyPagesByName(name)
      if (success && data) {
        let {properties, layout} = data
        this.setState({
          propertyPage: {
            properties: properties.map(({optionKey, ...el}) => ({optionKey: optionKey.replace('$i', index), ...el})),
            layout: replaceIndex(layout, index),
          }
        })
      }
      this.setState({loadingProperty: false})
    } else {
      //name为空则清除property页面
      this.setState({
        propertyPage: {
          properties: null,
          layout: null,
        }
      })
    }

  }

  onAddableDelete = (key) => {
    //不显示properties
    this.setState({propertyPage: {properties: null, layout: null}})
    //删除property
    this.props.dispatch({type: DeleteProperty, payload: {key: key.split('.')}})
  }

  render () {
    let panelHeight = 'calc(100vh - 130px)'
    let {currentWidget, loading, dispatch} = this.props
    let {rawOption, data, widgetMeta: {optionMeta} = {}} = currentWidget.toObject()
    let {propertyPage, loadingProperty, showProperty} = this.state

    return loading ? <div className={styles.loading}><Spin size='large' tip="Loading Widget..."/></div> :
      <Row className={styles.noScrollBar}>
        <Col span={13}>
          <Card title='图表展示'>
            <ChartRender
              rawOption={rawOption}
              data={data}
              style={{height: 'calc(100vh - 368px)'}}
            />
          </Card>
          <Card style={{height: 120, marginTop: 12}}>
            <Button onClick={this.handleShowProperty}>测试窗口</Button>
            <Button onClick={this.handleShowProperty}>测试窗口</Button>
          </Card>
        </Col>
        <Col span={5}>
          <Card style={{height: panelHeight, overflowY: 'auto'}}>
            <SelectMenu
              optionMeta={optionMeta}
              rawOption={rawOption}
              onAddableAdd={key => dispatch({type: PushProperty, payload: {key: key.split('.'), value: {}}})}
              onAddableDelete={this.onAddableDelete}
              onPropertySpecified={this.handlePropertySpecified}
            />
          </Card>
        </Col>
        <Col span={showProperty ? 6 : 0}>
          <Card style={{height: panelHeight, overflowY: 'auto'}} bodyStyle={{padding: '12px 0'}}>
            <PropertyPage
              onPropChange={this.handleSubmitProperty}
              onPropDisable={this.handleDisabledProperty}
              getValue={key => rawOption.getIn(key.split('.'), null)}
              getEnabled={key => {
                let value = rawOption.getIn(key.split('.'))
                return undefined !== value
              }
              }
              loading={loadingProperty}
              layout={propertyPage.layout}
              properties={propertyPage.properties}
            />
          </Card>
        </Col>
        <Col span={showProperty ? 0 : 3}>
          <Card style={{height: panelHeight}}>
            22222222
          </Card>
        </Col>
        <Col span={showProperty ? 0 : 3}>
          <Card style={{height: panelHeight}}>
            22222222
          </Card>
        </Col>
      </Row>
  }
}

export default connect(state => state.get('widget').toObject())(Designer)