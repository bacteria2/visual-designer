import React from 'react';
import { Checkbox, Col, Input, InputNumber, Row, Slider } from 'antd';
import {SimpleColor,ColorList,RangeColorList} from './Color';
import Select from './Select'
import * as formatterList from './Formatter';
import {ArrayComponent} from "./Array";


function onChangeHandler (callback,key) {
  return function (e) {
    e.persist();
    callback(e.target.value,key);
  }
}
//
function organizeFormatter (formatterType,defaulValue) {
  if(formatterType&&formatterList[formatterType]){
    let {formatter,parser}=formatterList[formatterType];
    return {
      formatter,parser,defaulValue:parser(defaulValue),
    }
  }else{
    return {defaulValue}
  }
}

//传入输入控件,包装成组件属性调整输入框
function simpleInputCommon(FormInput){
  /**
   * @param:disable 属性输入的启用/禁用状态
   * @param:handleDisableCheck 属性启用禁用触发的回调函数
   * @param:lable 标签
   * @param:value 控件初始化的默认值
   * @param:props 其他透传到input的输入值
   * */
  return function({disabled,handleDisableCheck,label,value,style,...props}){
    let customStyle=Object.assign({margin: '4px 8px',lineHeight:'36px'},style)
    return (<Row gutter={8} align='middle' style={customStyle}>
      <Col span={2}>
        <Checkbox onChange={e=>handleDisableCheck(!e.target.checked,props.optionKey)} checked={!disabled}/>
      </Col>
      <Col span={8}>
        <div>{label}</div>
      </Col>
      <Col span={14}>
        <FormInput {...props} value={value} disabled={disabled} />
      </Col>
    </Row>)
  }
}
//可切换控件包装函数
function SwitchInput(switchable){
  return class extends React.PureComponent{
    constructor(props){
      super(props);
      this.switchable=switchable;
    }
    state={
      index:0,
    }
    handleSwitchClick=()=>{
      let {inputChangeHandler,optionKey,disabled,ui}=this.props;
      if(!disabled){
        let index=this.state.index;
        index+=1;
        if(index>ui.length-1)
          index=0;
        this.setState({index})
        inputChangeHandler(null,optionKey)
      }
    }

    render(){
      let { ui, disabled, handleDisableCheck, label, value ,style, ...others }=this.props,
        { name, ...props}=ui[this.state.index];
      const FormInput=this.switchable[name],
        customStyle=Object.assign({margin: '4px 8px',lineHeight:'36px'},style);

      return (<Row gutter={8} align='middle' style={customStyle}>
        <Col span={2}>
          <Checkbox onChange={e=>handleDisableCheck(!e.target.checked,others.optionKey)} defaultChecked={!disabled}/>
        </Col>
        <Col span={5}>
          <div>{label}</div>
        </Col>
        <Col span={3}>
          <a style={disabled?{color:'#bfbfbf',cursor:'not-allowed'}:{}} onClick={this.handleSwitchClick}>转换</a>
        </Col>
        <Col span={14}>
          {!FormInput?
            <div>not found input '{name}',only allow follow:{Object.keys(this.switchable).join(',')}</div>
            :<FormInput {...props} {...others} value={value} disabled={disabled} />}
        </Col>
      </Row>)
    }
  }
}

//输入控件
function TextInput (props) {
  let {optionKey,value,inputChangeHandler,disabled,...other}=props;
  return (<Input
    defaultValue={value}
    onChange={onChangeHandler(inputChangeHandler,optionKey)}
    disabled={disabled}
    {...other}
    size='small'/>)
}
function TextAreaInput(props) {
  let {optionKey,value,inputChangeHandler,disabled,...other}=props;
  return (<Input.TextArea
    defaultValue={value}
    onChange={onChangeHandler(inputChangeHandler,optionKey)}
    disabled={disabled}
    {...other}
    size='small'/>)
}
function NumberInput (props) {
  let {optionKey,value:defaulValue=0,inputChangeHandler,disabled,formatterType,...other}=props;
  let {formatterHandler,...formatter}=organizeFormatter(formatterType,defaulValue)
  return (<InputNumber
    onChange={value=>inputChangeHandler(formatterHandler?formatterHandler(value):value,optionKey)}
    disabled={disabled}
    {...other}
    {...formatter}
    size='small'/>)
}
function SliderInput(props) {
  let {optionKey,value:defaulValue=0,inputChangeHandler,disabled,formatterType,...other}=props;
  let {formatterHandler,...formatter}=organizeFormatter(formatterType,defaulValue)

  formatter.tipFormatter=formatter.formatter;

  return (<Slider
    onChange={value=>inputChangeHandler(formatterHandler?formatterHandler(value):value,optionKey)}
    disabled={disabled}
    {...other}
    {...formatter}
    size='small'/>)
}
function ColorInput({optionKey, value, inputChangeHandler, ...other}) {
  return (<SimpleColor
    defaultValue={value}
    onChange={value=>inputChangeHandler(value,optionKey)}
    {...other}
  />)
}
function ColorListInput({optionKey, value, inputChangeHandler, ...other}) {
  return (<ColorList
    defaultValue={value}
    onChange={value=>inputChangeHandler(value,optionKey)}
    {...other}
  />)
}

function RangeColorListInput({optionKey, value, inputChangeHandler,  ...other}) {
  return (<RangeColorList
    defaultValue={value}
    onChange={value=>inputChangeHandler(value,optionKey)}
    {...other}
  />)
}
function SelectInput({optionKey, value, inputChangeHandler, ...other}) {
  return (<Select
    defaultValue={value}
    onChange={value=>inputChangeHandler(value,optionKey)}
    {...other}
  />)
}
function ArrayInput({optionKey, value, inputChangeHandler, ...other}) {
  return (<ArrayComponent
    defaultValue={value}
    onChange={value=>inputChangeHandler(value,optionKey)}
    {...other}
  />)
}

export const text = simpleInputCommon(TextInput)
export const textArea = simpleInputCommon(TextAreaInput)
export const number = simpleInputCommon(NumberInput)
export const slider = simpleInputCommon(SliderInput)
export const color = simpleInputCommon(ColorInput)
export const colorList = simpleInputCommon(ColorListInput)
export const rangeColorList = simpleInputCommon(RangeColorListInput)
export const select = simpleInputCommon(SelectInput)

//
export const switchable=SwitchInput({select:SelectInput,number:NumberInput,slider:SliderInput})
export const array = simpleInputCommon(ArrayInput)


