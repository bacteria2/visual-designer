import {getValueFromStore,updateOption} from '../InputCommon'
import debounce from "lodash/debounce"


export default{
  functional: true,
  name: 'PropertyNumber',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="" >
      <number value={getValueFromStore(props.optionKey)}  unit={props.unit} onInput={debounce(value=>updateOption(props.optionKey,value),1000)} min={props.min} max={props.max} step={props.step}></number>
    </property-layout>)
  }
}

