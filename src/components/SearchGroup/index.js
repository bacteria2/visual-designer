import React from 'react';
import {Input,Select} from 'antd';
import isFun from "lodash/isFunction"

export default function SearchGroup(props){

    const options = props.options.map(e=>(
        <Select.Option key={e.value} value={e.value}>{e.text}</Select.Option>
    ));

    return (<Input.Group compact>
        <Select onChange={isFun(props.selected)?props.selected:''} style={{ width: '40%' }}  defaultValue={props.optionDefault}>
            {options}
        </Select>
        <Input.Search onChange={isFun(props.search)?props.search:''}  style={{ width: '60%',fontSize:'13px',fontFamily:'Microsoft YaHei UI'}} placeholder="输入搜索内容" />
    </Input.Group>)

}