import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'
import debounce from "lodash/debounce"

export default{
  functional: true,
  name: 'PropertyNumber',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} onDisabled={value=>updateDisable(props.optionKey,value,props.seriesIndex,props.componentType)}>
      <number disabled={isDisabled(props.optionKey,props.seriesIndex,props.componentType)} value={getValueFromStore(props.optionKey,props.seriesIndex,props.componentType)}  unit={props.unit} onInput={debounce(value=>updateOption(props.optionKey,value,props.seriesIndex,props.componentType),1000)} min={props.min} max={props.max} step={props.step}></number>
    </property-layout>)
  }
}

