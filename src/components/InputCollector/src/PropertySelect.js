import {getValueFromStore,updateOption} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertySelect',
  render(h, {props,data,listeners}){
    return (<property-layout {...props}>
      <check-group  value={getValueFromStore(props.optionKey)} options={props.options}  onInput={value=>updateOption(props.optionKey,value)}></check-group>
      </property-layout>)
  }
}

