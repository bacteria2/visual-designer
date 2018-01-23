import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Col, Input, InputNumber, Row, Slider } from 'antd';
import {SimpleColor,ColorList,RangeColorList} from './Color';
import Select from './Select'

function onChangeHandler (callback,key) {
  return function (e) {
    e.persist();
    callback(e.target.value,key);
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
    return <Row gutter={8} align='middle' style={customStyle}>
      <Col span={2}>
        <Checkbox onChange={e=>handleDisableCheck(!e.target.checked,props.optionKey)} defaultChecked={!disabled}/>
      </Col>
      <Col span={8}>
        <div>{label}</div>
      </Col>
      <Col span={14}>
        <FormInput {...props} value={value} disabled={disabled} />
      </Col>
    </Row>
  }
}

export const TextInput = simpleInputCommon(function (props) {
  let {optionKey,value,inputChangeHandler,disabled,...other}=props;
  return <Input
    defaultValue={value}
    onChange={onChangeHandler(inputChangeHandler,optionKey)}
    disabled={disabled}
    {...other}
    size='small'/>
})

export const TextAreaInput = simpleInputCommon(function (props) {
  let {optionKey,value,inputChangeHandler,disabled,...other}=props;
  return <Input.TextArea
    defaultValue={value}
    onChange={onChangeHandler(inputChangeHandler,optionKey)}
    disabled={disabled}
    {...other}
    size='small'/>
})

export const NumberInput = simpleInputCommon(function (props) {
  let {optionKey,value:defaulValue,inputChangeHandler,disabled,...other}=props;
  return <InputNumber
    defaultValue={defaulValue||0}
    onChange={value=>inputChangeHandler(value,optionKey)}
    disabled={disabled}
    {...other}
    size='small'/>
})
export const SliderInput = simpleInputCommon(function (props) {
  let {optionKey,value:defaulValue,inputChangeHandler,disabled,...other}=props;
  return <Slider
    defaultValue={defaulValue||0}
    onChange={value=>inputChangeHandler(value,optionKey)}
    disabled={disabled}
    {...other}
    size='small'/>
})

export const ColorInput = simpleInputCommon(function ({optionKey,value,inputChangeHandler,disabled}) {
    return <SimpleColor
        defaultValue={value}
        onChange={value=>inputChangeHandler(value,optionKey)}
        disabled={disabled}
    />
})

export const ColorListInput = simpleInputCommon(function ({optionKey,value,inputChangeHandler,disabled}) {
    return <ColorList
        defaultValue={value}
        onChange={value=>inputChangeHandler(value,optionKey)}
        disabled={disabled}
        />
})

export const RangeColorListInput = simpleInputCommon(function ({optionKey,value,inputChangeHandler,disabled}) {
    return <RangeColorList
        defaultValue={value}
        onChange={value=>inputChangeHandler(value,optionKey)}
        disabled={disabled}
        />
})

export const SelectInput = simpleInputCommon(function ({optionKey,value,inputChangeHandler,disabled,multiple,options}) {
    return <Select
        defaultValue={value}
        onChange={value=>inputChangeHandler(value,optionKey)}
        disabled={disabled}
        multiple={multiple}
        options = {options}
    />
})



