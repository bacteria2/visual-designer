import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyColor',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="property-color__picker"  onDisabled={value=>updateDisable(props.optionKey,value)} >
        <color-picker disabled={isDisabled(props.optionKey)} value={getValueFromStore(props.optionKey)} onInput={value=>updateOption(props.optionKey,value)}></color-picker>
      </property-layout>)
  }
}

