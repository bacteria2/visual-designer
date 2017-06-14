import {getValueFromStore,updateOption} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertySelect',
  render(h, {props,data,listeners}){
    console.info(props);
    return (<property-layout {...props} className="" >
      <check-group  value={getValueFromStore(props.optionKey)} options={props.options}  onChange={value=>updateOption(props.optionKey,value)}></check-group>
      </property-layout>)
  }
}

