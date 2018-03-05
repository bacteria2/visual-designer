import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import min from 'lodash/min'
import max from 'lodash/max'
import Continuity from './Continuity'
import Discrete from './Discrete'
/**
 * VisualMap 编辑控件
 * 根据传递的数据类型判断是使用连续性控件还是离散型控件
 */
export default function VmColorMapping(props){
    const {data,onChange,vm} = props;
    if(isArray(data) && data.length > 0){
        if(typeof data[0] === 'number'){
            //连续性数据
            let minValue = vm.min;
            let maxValue = vm.max;
            if(!isNumber(minValue)) minValue = min(data);
            if(!isNumber(maxValue)) maxValue = max(data);
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