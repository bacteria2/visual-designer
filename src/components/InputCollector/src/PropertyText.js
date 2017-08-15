import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyText',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="value" onDisabled={value=>updateDisable(props.optionKey,value,props.seriesIndex,props.componentType)}>
        <el-input disabled={isDisabled(props.optionKey,props.seriesIndex,props.componentType)} size="mini"
                  value={getValueFromStore(props.optionKey,props.seriesIndex,props.componentType)}
                  onBlur={event=>updateOption(props.optionKey,event.target.value,props.seriesIndex,props.componentType)}></el-input>
      </property-layout>)
  }
}

