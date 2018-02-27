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
  }

  state = {
    loading: true,
  }

  componentWillReceiveProps (nextProps) {
      console.info('componentWillReceiveProps');
    this.renderChart(nextProps)
  }
  componentDidMount=async ()=> {
    console.info('componentDidMount');
    let script=this.props.script;
    if(script){
      try {
        eval(`try{${script};this.initFunction=initiation;this.renderFunction=render}catch(err){console.log(err);}`)
        if (this.initFunction && isFunction(this.initFunction)) {
          this.chart = await this.initFunction.call(this,requestResource)
          this.renderChart(this.props)
          setTimeout(()=>this.setState({loading: false}),1000)
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
        console.info('option',option)
      try {
        this.renderFunction&&this.renderFunction(chart,option);
      }
      catch  (err){
        message.error(`run render error:${err}`,5)
      }
    }
  }

  render () {
    //const loadingStyle=Object.assign({zIndex:this.state.loading?99:0},this.props.style)

    return  (<React.Fragment>
      <div id='chart' style={this.props.style}>       </div>
      {this.state.loading&& <div className={styles.loading} style={this.props.style}><Spin size='large' tip="Loading Widget..."/></div>}
    </React.Fragment>)

  }
}