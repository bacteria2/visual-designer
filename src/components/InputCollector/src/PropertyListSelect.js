import {getValueFromStore,updateOption,isDisabled,updateDisable} from '../InputCommon'

export default{
  functional: true,
  name: 'PropertyListSelect',
  render(h, {props,data,listeners}){
    let list = props.listObject.map(function (item) {
         return <el-option label={item.label} value={item.value}></el-option>
    })
    return (<property-layout {...props} className="value" onDisabled={value=>updateDisable(props.optionKey,value,props.seriesIndex,props.componentType)}>
      <el-select disabled={isDisabled(props.optionKey,props.seriesIndex,props.componentType)} size="mini"
                 value={getValueFromStore(props.optionKey,props.seriesIndex,props.componentType)}
                 onInput={value=>updateOption(props.optionKey,value,props.seriesIndex,props.componentType)}
                 value-key="value"
                 placeholder="请选择地图">
        {list}
    </el-select>
    </property-layout>)
  }
}

