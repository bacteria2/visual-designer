import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import min from 'lodash/min'
import max from 'lodash/max'
import Continuity from './Continuity'
import Discrete from './Discrete'
import update from 'lodash/update'
/**
 * VisualMap 编辑控件
 * 根据传递的数据类型判断是使用连续性控件还是离散型控件
 */
export default class VmColorMapping extends React.PureComponent{
    constructor(props){
        super(props);
        const data = VmColorMapping.dataHandler(props);
        this.state = {
            continuityType:data.continuityType,
            vm:data.vm}
    }

    componentWillReceiveProps(props){
        const data = VmColorMapping.dataHandler(props);
        this.setState(update(this.state,{
            continuityType:{$set:data.continuityType},
            vm:{$set:data.vm}}));
        // console.log("componentWillReceiveProps");
    }

    static dataHandler(props){
        let {data,onChange,vm} = props,changeValue = false,continuityType = false;
        if(!vm) vm = {};

        //默认赋值
        if( !vm.type ){
            vm.type = 'piecewise';
            changeValue = true;
        }

        if(!vm.splitNumber){
            vm.splitNumber = 5;
            changeValue = true;
        }

        if(!isBoolean(vm.show)){
            vm.show = false;
            changeValue = true;
        }

        if(isArray(data) && data.length > 0){
            if(typeof data[0] === 'number'){

                //连续性数据
                if(!isNumber(vm.min)) {
                    vm.min = min(data);
                    changeValue = true;
                }

                if(!isNumber(vm.max)) {
                    vm.max = max(data);
                    changeValue = true;
                }

                continuityType = true;

                //提交默认数据
                if(changeValue) onChange(vm);

            }else{
                //离散型数据处理
                //***********
                //***********
                continuityType = false;
            }
        }
        return {vm,continuityType}
    }

    render(){

       const {onChange,data} = this.props;

       if(this.state.continuityType){
           return <Continuity onChange={onChange} vm = {this.state.vm}/>
       }else{
           return <Discrete data={data} onChange={onChange} vm={this.state.vm}/>
       }
    }
}
VmColorMapping.defaultValue = {vm:{}};
VmColorMapping.propTypes = {
    data : PropTypes.array,
    onSave : PropTypes.func,
    vm : PropTypes.object,
};