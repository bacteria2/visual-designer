import React from 'react';
import {Row,Col,InputNumber,Radio,Switch} from 'antd'
import style from './Continuity.css'
import update from 'immutability-helper'
import isFunc from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class BaseProps extends  React.PureComponent{

    state = {
        type:this.props.data.type,
        min :this.props.data.min,
        max :this.props.data.max,
        splitNumber:this.props.data.splitNumber,
        show:this.props.data.show,
    };

    onChange = (key,value) => {

        if(typeof value === 'object'){
            value = value.target.value;
        }

        if(key === 'min' || key === 'max' || key === 'splitNumber'){
            if(!isNumber(value)) return;
        }

        this.setState(update(
            this.state,{
                [key]:{$set:value}}
        ));

        //回调函数,改变上级组件的值
        if(isFunc(this.props.onChange)){
           this.props.onChange(key,value)
        }

    };

    render(){
        const {type,min,max,splitNumber} = this.props.data;
        return (<div>

            <Row gutter={16} className={style.row}>
                <Col span={5} className={style.row_title}>类型：</Col>
                <Col span={19}>
                    <RadioGroup defaultValue={type} size="small" onChange={this.onChange.bind(null,'type')}>
                        <RadioButton value="continuous">连续型</RadioButton>
                        <RadioButton value="piecewise">分段型</RadioButton>
                    </RadioGroup>
                </Col>
            </Row >

            <Row gutter={16} className={style.row}>
                <Col span={5} className={style.row_title}>范围：</Col>
                <Col span={19}>
                    <Row gutter={16}>
                        <Col span={8}><InputNumber size="small" defaultValue={min} onChange={this.onChange.bind(null,'min')}/></Col>
                        <Col span={2}>至</Col>
                        <Col span={9}><InputNumber size="small" defaultValue={max} onChange={this.onChange.bind(null,'max')}/></Col>
                    </Row>
                </Col>
            </Row>

            {
                this.state.type === 'piecewise' &&
                <Row gutter={16} className={style.row}>
                    <Col span={5} className={style.row_title}>分段数：</Col>
                    <Col span={19}><InputNumber size="small" defaultValue={splitNumber} onChange={this.onChange.bind(null,'splitNumber')}/></Col>
                </Row>
            }
            <Row gutter={16} className={style.row}>
                <Col span={5} className={style.row_title}>控制器：</Col>
                <Col span={19} >
                    <Switch defaultChecked={this.state.show}  size="small"
                            onChange={this.onChange.bind(null,'show')} />

                </Col>
            </Row >
        </div>)
    }
}
BaseProps.defaultValue = {data:{}};