import {getValueFromStore,updateOption} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyColor',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="property-color__picker"  >
        <color-picker value={getValueFromStore(props.optionKey)} onInput={value=>updateOption(props.optionKey,value)}></color-picker>
      </property-layout>)
  }
}

