import React from 'react'
import isFunction from 'lodash/isFunction';
import { message, Spin } from 'antd';
import merge from 'lodash/merge'
import styles from './index.css';
import { requestResource } from '../../service'

//组合option和data
function rawOptionTransform ({rawOption, data}) {
  return merge(rawOption.toJS(), data.toJS())
}

export default class ChartRender extends React.PureComponent {
  constructor (props) {
    super(props);
    this.initFunction=null;
    this.renderFunction=null;
    this.divId='chart';
  }

  state = {
    loading: true,
  }

  componentWillReceiveProps (nextProps) {
    this.renderChart(nextProps)
  }
  componentDidMount=async ()=> {
    let script=this.props.script;
    if(script){
      try {
        eval(`${script};this.initFunction=initiation;this.renderFunction=render`)
        if (this.initFunction && isFunction(this.initFunction)) {
          this.chart = await this.initFunction(this.divId)
          this.setState({loading: false})
          this.renderChart(this.props)
        }
      } catch (err) {
        message.error(`eval initiation error:${err}`,5)
      }
    }
  }

  renderChart (nextProps) {
    if (this.chart) {
      let {rawOption, rawOptionEnabled, data} = nextProps
      let chart=this.chart, option = rawOptionTransform({rawOption, rawOptionEnabled, data})
      try {
        this.renderFunction&&this.renderFunction(chart,option);
      }
      catch  (err){
        message.error(`run render error:${err}`,5)
      }
    }
  }

  render () {
    return  (<React.Fragment>
      <div id={this.divId} style={this.props.style}/>
      {this.state.loading&& <div className={styles.loading} style={this.props.style}><Spin size='large' tip="Loading Widget..."/></div>}
    </React.Fragment>)

  }
}