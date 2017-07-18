import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyColor',
  render(h, {props,data,listeners}){
    return (
      <property-layout {...props} className="property-color__picker"  onDisabled={value=>updateDisable(props.optionKey,value,props.seriesIndex,props.componentType)} >
        <color-picker overlay disabled={isDisabled(props.optionKey,props.seriesIndex,props.componentType)} value={getValueFromStore(props.optionKey,props.seriesIndex,props.componentType)} onInput={value=>updateOption(props.optionKey,value,props.seriesIndex,props.componentType)}></color-picker>
      </property-layout>)
  }
}

