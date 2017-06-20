import {getValueFromStore,updateOption} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyText',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="value">
        <el-input size="mini" value={getValueFromStore(props.optionKey)} onBlur={event=>updateOption(props.optionKey,event.target.value)} disabled={props.disabled}></el-input>
      </property-layout>)
  }
}

