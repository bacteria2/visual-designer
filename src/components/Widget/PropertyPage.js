import React from 'react'
import { getPropertyInputByTagName } from '../PropertyInput'
import { Collapse, Tabs, Spin } from 'antd'
import { normalize, schema } from 'normalizr'
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';


const Panel = Collapse.Panel;
const TabPane=Tabs.TabPane;

/**
 * 获取组件的property定义,生成属性调整列表
 * @param layout 控件布局配置
 * @param props 其他属性透传
 */
function propertyDefintToComponent({layout=[],...props}){
  return layout.map(element=>{
    if(isString(element)&&element.startsWith('p:')){
      return getPropertyInput(element,{style:{margin:'4px 26px'},...props})
    }
    //数组视为collapse
    if (isArray(element))
      return collapseProcessor(element,props)
    //对象视为tabs
    if(isObject(element))
      return tabProcessor(element,props,{style:{margin:'4px 16px'}})
  })
}
//tab处理函数
function tabProcessor ({id,panels,...tabs},props,config) {
  return (<Tabs key={id} {...config}>
    {panels.map(panel=>{
      let [config,...properties]= tabs[panel];
      return (<TabPane  {...config} key={panel}>
        {properties.map(propety=>getPropertyInput(propety,props))}
      </TabPane>)
    })}
  </Tabs>)

}

//collapse处理函数
function collapseProcessor ([config,...children],props) {
  return (<Collapse {...config} key={config.id} >
    {children.map(child=>{
      if(isArray(child)){
        let [config,...properties]=child;
        properties=properties.map(property=>{
          //对象当作tab处理
          if(isObject(property))
            return tabProcessor(property,props);
          //其他当作普通properties处理
          return getPropertyInput(property,props);
        })
        return (<Panel {...config}>
          {properties}
        </Panel>)
      }
    })}
  </Collapse>)
}

/**
 * @param optionKey 传入的optionkey
 * @param onPropChange 属性改变时的回调
 * @param onPropDisable 属性禁用回调
 * @param disabled 其他透传属性
 * @param value 其他透传属性
 * */
function getPropertyInput (optionKey, {properties, onPropChange, onPropDisable, getEnabled, getValue, style}) {
  optionKey=optionKey.substring(2);
  let { properties:propertyList }=properties.entities;
  let {inputType, ...props} = propertyList[optionKey] || {}
  let PropertyInput = getPropertyInputByTagName(inputType)
  props.style=style;

  return (<PropertyInput
    inputChangeHandler={onPropChange}
    handleDisableCheck={onPropDisable}
    disabled={!getEnabled(optionKey)}
    value={getValue(optionKey)}
    key={optionKey}
    {...props}
  />)
}

//对输入的properties进行转化
function propertyPreproccess(properties=[]){
  const property = new schema.Entity('properties',{},{
    idAttribute:value => value.optionKey,
  })
  const propertiesSchema = [property]
  return  normalize(properties, propertiesSchema)
}

//传入onPropChange和onPropDisable以及rawOption
export default ({properties, loading, ...props}) => {
  const style = {textAlign: 'center', margin: '24px auto'}
  let page = <div style={style}><p>请选择一个二级属性</p></div>
  if (loading)
    page = <div style={style}><Spin size='large' tip='loading properties...'/></div>

  if (!loading && properties)
    page = propertyDefintToComponent({properties: propertyPreproccess(properties), ...props})
  return (<React.Fragment>
    {page}
  </React.Fragment>)
}
