import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyColorList',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} onDisabled={value=>updateDisable(props.optionKey,value,props.seriesIndex,props.componentType)}  className="property-color__picker" >
      <color-picker-list overlay disabled={isDisabled(props.optionKey,props.seriesIndex,props.componentType)}  value={getValueFromStore(props.optionKey)} onInput={colorArr=>updateOption(props.optionKey,colorArr)}></color-picker-list>
    </property-layout>)
  }
}

