import {getValueFromStore,updateOption} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyColorList',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="property-color__picker" >
      <color-picker-list value={getValueFromStore(props.optionKey)} onInput={colorArr=>updateOption(props.optionKey,colorArr)}></color-picker-list>
    </property-layout>)
  }
}

