import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import min from 'lodash/min'
import max from 'lodash/max'
import Continuity from './Continuity'
import Discrete from './Discrete'
/**
 * VisualMap 编辑控件
 * 根据传递的数据类型判断是使用连续性控件还是离散型控件
 */
export default function VmColorMapping(props){
    let {data,onChange,vm} = props,changeValue = false;
    if(!vm) vm = {};

    //默认赋值
    if(!vm.type){
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
            let minValue = vm.min;
            let maxValue = vm.max;

            if(!isNumber(minValue)) {
                minValue = min(data);
                vm.min = minValue;
                changeValue = true;
            }

            if(!isNumber(maxValue)) {
                maxValue = max(data);
                vm.max = maxValue;
                changeValue = true;
            }

            //提交默认数据
           if(changeValue) onChange(vm);

            return <Continuity min={minValue} max={maxValue} onChange={onChange} vm={vm}/>
        }else if(typeof data[0] === 'string'){
            //离散型数据
            return <Discrete data={data} onChange={onChange} vm={vm}/>
        }
    }
    return <div/>
}
VmColorMapping.defaultValue = {vm:{}};
VmColorMapping.propTypes = {
    data : PropTypes.array,
    onSave : PropTypes.func,
    vm : PropTypes.object,
};