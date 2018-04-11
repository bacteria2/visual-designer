import React from 'react';
import {PropertyPage} from '../../components/Widget';
import {requestPropertyPagesByName} from '../../service/widget'
import propTypes from 'prop-types';
import {List,Map} from 'immutable';
import {Button} from 'antd'

export default class CondtionItemPropertyPage extends React.PureComponent{
  state={
    loading:true,
  }

  static propTypes={
    propertyPageName:propTypes.string,
    conditionItemList:propTypes.instanceOf(Map),
    onConditionPropertySubmit:propTypes.func,
    onConditionPropertyDisable:propTypes.func,
  }

  async componentDidMount(){
    const {propertyPageName='series-bar-others'}=this.props
    const {success,data={}}=await requestPropertyPagesByName(propertyPageName)
    success&&this.setState({layout:data.layout,loading:false,properties:data.properties})
  }

  render(){
    const {onConditionPropertySubmit,onConditionPropertyDisable,conditionItemList,currentIndex,dataItemId}=this.props;
    const {layout,properties,loading}=this.state;
    const propertyloading=loading||!layout||!properties;
    const option=conditionItemList.getIn([dataItemId,currentIndex,'style'],Map());
    return (<PropertyPage onPropChange={onConditionPropertySubmit}
                         onPropDisable={onConditionPropertyDisable}
                         getValue={key => option.getIn(key.split('.'), null)}
                         getEnabled={key => undefined !== option.getIn(key.split('.'))}
                         loading={propertyloading}
                         layout={layout}
                         properties={properties}/>)
  }
}