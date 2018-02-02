import React from 'react'
import { Card, Button, Row, Col, Spin, notification } from 'antd'
import { connect } from 'react-redux'
import { PropertyPage, SelectMenu, ChartRender, HeaderControl, DropBox } from '../../components/Widget'
import { submitProperty, DeleteProperty, PushProperty, requestWidget } from '../../store/Widget/action'
import { ChangeControlMenu, RemoveControlMenu } from '../../store/Global/action'
import { requestPropertyPagesByName } from '../../service/widget'
import styles from './Designer.css'
import CubeSchema from '../DataSource/Cube/CubeSchema'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

/**
 * 实例设计器:
 * 从store获取到实例id,加载实例数据到组件
 * */
const controlList = [
  {action (e) {console.log(1)}, text: 'test1', icon: 'plus'},
  {action (e) {console.log(2)}, text: 'test2', icon: 'check'},
]

function rawOptionKey (key) {
  return ['rawOption'].concat(key.split('.'))
}

@DragDropContext(HTML5Backend)
class Designer extends React.PureComponent {
  constructor (props) {
    super(props)
    props.dispatch({type: ChangeControlMenu, payload: <HeaderControl itemList={controlList}/>})
    let {id} = props.match.params
    if (id)
      props.dispatch(requestWidget(id))

  }

  //life cycle
  componentWillUnmount () {
    this.props.dispatch({type: RemoveControlMenu})
  }

  state = {
    showProperty: false,
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
  handleSubmitProperty = (value, key) => this.props.dispatch(submitProperty(rawOptionKey(key), value))
  handleDisabledProperty = (disabled, key) => {
    if (disabled)
      this.props.dispatch({type: DeleteProperty, payload: {key: rawOptionKey(key)}})
    else
      this.props.dispatch(submitProperty(rawOptionKey(key), null))
  }

  handlePropertySpecified = async (name) => {
    //name不为空请求后台,获取property页面
    if (name) {
      this.setState({loadingProperty: true})
      let {code, success, data, msg} = await requestPropertyPagesByName(name)
      if (success && data) {
        let {properties, layout} = data
        this.setState({
          propertyPage: {
            properties: properties,
            layout: layout,
          },
        })
      } else {
        notification.error({
          message: 'Load property error',
          description: `Maybe property ${name} is not found or server has an error. Detail: msg:${msg}, code:${code}.`,
          duration: 6,
        })

        this.setState({
          propertyPage: {
            properties: null,
            layout: null,
          },
        })
      }
      this.setState({loadingProperty: false})
    } else {
      //name为空则清除property页面
      this.setState({
        propertyPage: {
          properties: null,
          layout: null,
        },
      })
    }

  }

  //数据项删除
  handleDataItemRemove = (key,field) => {
    let list=this.props.currentWidget.getIn(['dataOption','dataItems']);
    if(list){
      const index=list.findIndex(el=>el.get('key')===key&&el.getIn(['value','field'])===field)
      if(index>-1)
        this.props.dispatch({type: DeleteProperty, payload: {key: ['dataOption','dataItems', index]}})
    }
  }

  //数据项新增
  handleDataItemAdd = (data) => {
    this.props.dispatch({type: PushProperty, payload: {key: ['dataOption','dataItems'], value: data}})
  }
  //数据项点击
  handleDataItemClick = () => {

  }

  onAddableDelete = (key) => {
    //不显示properties
    this.setState({propertyPage: {properties: null, layout: null}})
    //删除property
    this.props.dispatch({type: DeleteProperty, payload: {key: rawOptionKey(key)}})
  }

  render () {
    let panelHeight = 'calc(100vh - 130px)'
    let {currentWidget, loading, dispatch} = this.props
    if(loading)
      return <div className={styles.loading}><Spin size='large' tip="Loading Widget..."/></div>

    let {rawOption, data, script, widgetMeta: {optionMeta} = {}, dataOption} = currentWidget.toObject()
    let {propertyPage, loadingProperty, showProperty} = this.state
    let itemList=dataOption.get('dataItems');

    return (
      <Row className={styles.noScrollBar}>
        <Col span={13}>
          <Card>
            <ChartRender
              script={script}
              rawOption={rawOption}
              data={data}
              style={{height: 'calc(100vh - 312px)'}}
            />
          </Card>
          <Card style={{height: 120, marginTop: 12}}>
            <Button onClick={this.handleShowProperty}>测试窗口</Button>
            <Button onClick={this.handleShowProperty}>测试窗口</Button>
          </Card>
        </Col>
        <Col span={5}>
          <Card style={{height: panelHeight, overflowY: 'auto'}}>
            <h3 className={styles.areaTitle}>样式</h3>
            <SelectMenu
              optionMeta={optionMeta}
              rawOption={rawOption}
              onAddableAdd={key => dispatch({type: PushProperty, payload: {key: rawOptionKey(key), value: {}}})}
              onAddableDelete={this.onAddableDelete}
              onPropertySpecified={this.handlePropertySpecified}
            />
          </Card>
        </Col>
        <Col span={showProperty ? 6 : 0}>
          <Card style={{height: panelHeight, overflowY: 'auto'}} bodyStyle={{padding: '12px 0'}}>
            <h3 className={styles.areaTitle} style={{margin: '-12px 0 8px'}}>属性调整</h3>
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
            <h3 className={styles.areaTitle}>数据</h3>
            <DropBox.Dimension
              label='x1test'
              limit={3}
              uniqueId={'x1'}
              itemList={itemList}
              onDeleteClick={this.handleDataItemRemove}
              onItemClick={this.handleDataItemClick}
              onDrop={this.handleDataItemAdd}/>
            <DropBox.Measure
              label='x2test'
              limit={0}
              uniqueId={'x2'}
              itemList={itemList.filter(item=>item.get('key')==='x2')}
              onDeleteClick={this.handleDataItemRemove}
              onItemClick={this.handleDataItemClick}
              onDrop={this.handleDataItemAdd}/>

          </Card>
        </Col>
        <Col span={showProperty ? 0 : 3}>
          <Card style={{height: panelHeight}} bodyStyle={{padding: 0}}>
            <CubeSchema />
          </Card>
        </Col>
      </Row>)
  }
}

export default connect(state => state.get('widget').toObject())(Designer)