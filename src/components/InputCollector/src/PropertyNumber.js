import {getValueFromStore,updateOption} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyNumber',
  render(h, {props,data,listeners}){
    console.info(props);
    return (<property-layout {...props} className="" >
      <base-number value={getValueFromStore(props.optionKey)}  unit={props.unit} onChange={value=>updateOption(props.optionKey,value)}></base-number>
    </property-layout>)
  }
}

