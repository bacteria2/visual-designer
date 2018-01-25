import React from 'react'
import isFunction from 'lodash/isFunction';
import { message, Spin } from 'antd';
import merge from 'lodash/merge'
import styles from './index.css';

//组合option和data
function rawOptionTransform ({rawOption, data,}) {
  return merge(rawOption.toJS(), data.toJS())
}

export default class ChartRender extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  state = {
    loading: true
  }

  componentWillReceiveProps (nextProps) {
    this.renderChart(nextProps)
  }
  componentDidMount () {
    let script=this.props.script;
    if(script){
      try {
        eval(`this.initiation=${script.get('initiation')}`)
        if (this.initiation && isFunction(this.initiation)) {
          this.chart = this.initiation.call(this)
          this.renderChart(this.props)
          setTimeout(()=>this.setState({loading: false}),1000)
        }
      } catch (err) {
        message.error(`eval initiation error:${err}`)
      }
    }
  }

  renderChart (nextProps) {
    if (this.chart) {
      let {rawOption, rawOptionEnabled, data} = nextProps
      let $chart=this.chart,
        $option = rawOptionTransform({rawOption, rawOptionEnabled, data})
      eval(this.props.script.get('render'))
    }
  }

  render () {
    //const loadingStyle=Object.assign({zIndex:this.state.loading?99:0},this.props.style)

    return  <React.Fragment>
      <div id='chart' style={this.props.style}>       </div>
      {this.state.loading&& <div className={styles.loading} style={this.props.style}><Spin size='large' tip="Loading Widget..."/></div>}
    </React.Fragment>

  }
}