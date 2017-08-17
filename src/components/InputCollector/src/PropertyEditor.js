import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyEditor',
  render(h, {props,data,listeners}){
    return (
      <property-layout {...props} className="property-editor"  onDisabled={value=>updateDisable(props.optionKey,value,props.seriesIndex,props.componentType)} >
        <editor  disabled={isDisabled(props.optionKey,props.seriesIndex,props.componentType)} value={getValueFromStore(props.optionKey,props.seriesIndex,props.componentType)} onInput={value=>updateOption(props.optionKey,value,props.seriesIndex,props.componentType)}></editor>
      </property-layout>)
  }
}

