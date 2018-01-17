import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Col, Input, InputNumber, Row, Slider } from 'antd'

function onChangeHandler (callback,key) {
  return function (e) {
    e.persist();
    callback(e.target.value,key);
  }
}

function rawValue(key,raw,defaultValue){
  if(raw[key])
    return raw[key].value;
  return defaultValue
}

function simpleInputCommon (FormInput) {
  return class InputCommon extends React.PureComponent  {
    constructor(props){
      super(props)
      let {optionKey,optionRaw}=props;

      this.state={
        enable:optionRaw[optionKey]&&optionRaw[optionKey].enable
      }

    }
    static defaultProps={
      optionRaw:{},
      checkChangeHandler(value,key){console.log(value,key)}
    }

    static  propTypes={
      optionRaw:PropTypes.object,
      checkChangeHandler:PropTypes.func,
      optionKey:PropTypes.string,
      inputChangeHandler:PropTypes.func
    }
    state={
      enable:false
    }


    handleChecked=(e)=>{
      let {checkChangeHandler,optionKey}=this.props;
      this.setState({enable:e.target.checked})
      checkChangeHandler(e.target.checked,optionKey)
    }

    render(){
      let {title} =this.props

      return <Row gutter={8} align='middle' style={{margin: '12px 8px',lineHeight:'36px'}}>
        <Col span={2}>
          <Checkbox onChange={this.handleChecked} defaultChecked={this.state.enable}/>
        </Col>
        <Col span={8}>
          <div>{title}</div>
        </Col>
        <Col span={14}>
          <FormInput {...this.props} disabled={!this.state.enable} />
        </Col>
      </Row>
    }
  }
}

export const TextInput = simpleInputCommon(function (props) {
  return <Input
    defaultValue={rawValue(props.optionKey,props.optionRaw,'')}
    onChange={onChangeHandler(props.inputChangeHandler,props.optionKey)}
    disabled={props.disabled}
    size={props.size}/>
})

export const TextAreaInput = simpleInputCommon(function (props) {
  return <Input.TextArea
    defaultValue={rawValue(props.optionKey,props.optionRaw,'')}
    onChange={onChangeHandler(props.inputChangeHandler,props.optionKey)}
    disabled={props.disabled}
    size={props.size}/>
})

export const NumberInput = simpleInputCommon(function (props) {
  return <InputNumber
    defaultValue={rawValue(props.optionKey,props.optionRaw,0)}
    onChange={value=>props.inputChangeHandler(value,props.optionKey)}
    disabled={props.disabled}
    size={props.size}/>
})
export const SliderInput = simpleInputCommon(function (props) {
  return <Slider
    defaultValue={rawValue(props.optionKey,props.optionRaw,0)}
    onChange={value=>props.inputChangeHandler(value,props.optionKey)}
    disabled={props.disabled}
    size={props.size}/>
})