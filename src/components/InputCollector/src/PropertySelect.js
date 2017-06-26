import {getValueFromStore,updateOption,updateDisable,isDisabled} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertySelect',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="value" onDisabled={value=>updateOption(props.optionKey,value)}>
      <check-group
        disabled={isDisabled(props.optionKey)}
        value={getValueFromStore(props.optionKey,props.seriesIndex,props.componentType)}
        options={props.options}
        onInput={value=>updateOption(props.optionKey,value,props.seriesIndex,props.componentType)}></check-group>
      </property-layout>)
  }
}

