import {getValueFromStore,updateOption} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyText',
  render(h, {props,data,listeners}){
    return (<property-layout {...props} className="" >
        <el-input size="mini" value={getValueFromStore(props.optionKey)} onBlur={event=>updateOption(props.optionKey,event.target.value)}></el-input>
      </property-layout>)
  }
}

