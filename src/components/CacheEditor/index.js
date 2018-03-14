import React from 'react';
import { Row,Col,Divider,Switch,Radio,InputNumber,Select,message} from 'antd';
import isFunc from 'lodash/isFunction'
import update from 'immutability-helper'
import styles from './CacheEditor.css'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const weeks = [0,1,2,3,4,5,6];
const weeksLable = ["周一","周二","周三","周四","周五","周六","周日"];

export default class CacheEditor extends React.Component{

    constructor(props){
        super(props);

        let type = 0;
        let {defaultValue:{flushTime,enable}} = props;

        if(flushTime){
            type = 1 ;
            //解析表达式
            flushTime = CacheEditor.analysisEl(flushTime);
        }

        this.state = {
            type, //0:定时 1:周期
            flushTime,
            enable,
        }
    }

    static analysisEl(el){
        // {
        //     flushTimeType:'day',
        //     week:0,
        //     day:0,
        //     hour:0,
        //     min:0,
        //     el:'0000', //表达式
        // }
        let flushTime = {},hourIndexStart = 0,hourIndexEnd = 1,minIndexStart = 2,minIndexEnd = 3;

        const strArr = el.split("");
        if(strArr.length === 4){
            //每天
            flushTime.type = 'day';


        }else if(strArr.length === 6){
            if(el.startsWith('W')){
                //每周
                flushTime.type = 'week';
                flushTime.week = Number(strArr[1]);
            }else{
                //每月
                flushTime.type = 'month';
                flushTime.day = Number(strArr[0] + strArr[1]);
            }
            hourIndexStart = 2 ;
            hourIndexEnd = 3 ;
            minIndexStart = 4 ;
            minIndexEnd = 5 ;

        }else{
            message.error("缓存时间表达式错误，解析失败");
        }

        flushTime.hour = Number(strArr[hourIndexStart] + strArr[hourIndexEnd]);
        flushTime.min = Number(strArr[minIndexStart] + strArr[minIndexEnd]);

        return flushTime
    }



    handleEnable = (v) => {
        const newData = update(this.props,{enable:{$set:v}});
        if(isFunc(this.props.onChange)){
            this.props.onChange(newData);
        }
        this.setState({enable:v});
    };

    handleCacheType = (event) => {
        this.setState({
            type:event.target.value,
        });
    };

    render(){

        return (<div className={styles.mainWrap}>
                    <Row gutter={16} className={styles.row}>
                        <Col span={6} className={styles.row_title}>开启缓存：</Col>
                        <Col span={18}>
                            <Switch defaultChecked={this.props.defaultValue.enable} size="small" onChange={this.handleEnable} />
                        </Col>
                    </Row>
                    <Row gutter={16} className={styles.row}>
                        <Col span={6} className={styles.row_title}>缓存类型：</Col>
                        <Col span={18}>
                            <RadioGroup disabled={!this.state.enable} size="small" onChange={this.handleCacheType} defaultValue={this.state.type}>
                                <RadioButton value={0}>周期缓存</RadioButton>
                                <RadioButton value={1}>定时缓存</RadioButton>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Divider >{this.state.type === 0?'周期缓存':'定时缓存'}</Divider>
                    {
                        this.state.type === 0
                        ?    <Row gutter={16} className={styles.row}>
                                <Col span={6} className={styles.row_title}>缓存频率：</Col>
                                <Col span={18}>
                                    <InputNumber size="small" min={1} defaultValue={this.props.defaultValue.interval} />  (单位:分钟)
                                </Col>
                            </Row>
                        :   [
                            <Row key="everyDay" gutter={16} className={styles.mini_row}>
                                <Col span={2}  className={styles.row_title}>
                                    <Switch checked={this.state.custom} size="small" onChange={this.handleSwitch} />
                                </Col>
                                <Col span={5} className={styles.row_title} >每天：</Col>
                                <Col span={17} >
                                    <Select defaultValue={this.state.flushTime.hour} size="small" style={{ width: 75 }} onChange={()=>{}}>
                                        {hours.map(e=>(<Option key={e} value={e}>{e}点</Option>))}
                                    </Select>
                                    <InputNumber size="small" min={0} style={{ width: 75 }} max={59}
                                                 defaultValue={this.state.flushTime.min}
                                                 formatter={value => `${value}分`}
                                                 parser={value => value.replace('分', '')}/>
                                </Col>
                            </Row>,
                            <Row key="everyWeek" gutter={16} className={styles.mini_row}>
                                <Col span={2}  className={styles.row_title}>
                                    <Switch checked={this.state.custom} size="small" onChange={this.handleSwitch} />
                                </Col>
                                <Col span={5} className={styles.row_title} >每周：</Col>
                                <Col span={17} >
                                    <Select defaultValue={this.state.flushTime.week} size="small" style={{ width: 75 }} onChange={()=>{}}>
                                        {weeks.map(e=>(<Option key={e} value={e}>{weeksLable[e]}</Option>))}
                                    </Select>
                                    <Select defaultValue={this.state.flushTime.hour} size="small" style={{ width: 75 }} onChange={()=>{}}>
                                        {hours.map(e=>(<Option key={e} value={e}>{e}点</Option>))}
                                    </Select>
                                    <InputNumber size="small" min={0} style={{ width: 75 }} max={59}
                                                 defaultValue={this.state.flushTime.min}
                                                 formatter={value => `${value}分`}
                                                 parser={value => value.replace('分', '')}/>
                                </Col>
                            </Row>,
                            <Row key="everyMonth" gutter={16} className={styles.mini_row}>
                                <Col span={2}  className={styles.row_title}>
                                    <Switch checked={this.state.custom} size="small" onChange={this.handleSwitch} />
                                </Col>
                                <Col span={5} className={styles.row_title} >每月：</Col>
                                <Col span={17} >
                                    <Select defaultValue={this.state.flushTime.day} size="small" style={{ width: 75 }} onChange={()=>{}}>
                                        {days.map(e=>(<Option key={e} value={e}>{e}号</Option>))}
                                    </Select>

                                    <Select defaultValue={this.state.flushTime.hour} size="small" style={{ width: 75 }} onChange={()=>{}}>
                                        {hours.map(e=>(<Option key={e} value={e}>{e}点</Option>))}
                                    </Select>

                                    <InputNumber size="small" min={0} style={{ width: 75 }} max={59}
                                                 defaultValue={this.state.flushTime.min}
                                                 formatter={value => `${value}分`}
                                                 parser={value => value.replace('分', '')}/>
                                </Col>
                            </Row>]
                    }

                </div>)
    }
}