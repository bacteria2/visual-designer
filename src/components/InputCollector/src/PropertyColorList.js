import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyColorList',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} onDisabled={value=>updateDisable(props.optionKey,value,props.seriesIndex,props.componentType)}  className="property-color__picker" >
      <color-picker-list isGaugeColors={props.isGaugeColors} overlay disabled={isDisabled(props.optionKey,props.seriesIndex,props.componentType)}  value={getValueFromStore(props.optionKey,props.seriesIndex,props.componentType)} onInput={value=>updateOption(props.optionKey,value,props.seriesIndex,props.componentType)}></color-picker-list>
    </property-layout>)
  }
}

