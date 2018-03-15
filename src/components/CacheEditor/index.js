import React from 'react';
import { Row,Col,Divider,Switch,Radio,InputNumber,Select,message} from 'antd';
import isFunc from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'
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
        }else{
            flushTime = {};
        }

        this.state = {
            type, //0:周期 1:定时
            flushTime,
            enable,
        }
    }


    static analysisEl(el){

        let flushTime = {},hourIndexStart = 0,hourIndexEnd = 1,minIndexStart = 2,minIndexEnd = 3;

        const strArr = el.split("");
        if(strArr.length === 4){
            //每天
            flushTime.type = 'day';

        }else if(strArr.length === 6){
            if(el.startsWith('w')){
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

        if(isFunc(this.props.onChange)){
            this.props.onChange("enable",v);
        }

        if(v){
            this.giveDefaultValue();
        }
        this.setState({enable:v});
    };

    giveDefaultValue(){
        if(this.state.type === 0){
            if(!isNumber(this.props.interval)){
                this.props.onChange("interval",60);
            }
        }else{
            if(!this.state.flushTime.type){
                this.setState(()=>update(this.state,{
                    flushTime:{
                        type:{$set:'day'},
                        hour:{$set:1},
                        min:{$set:0},
                    },
                }),this.submitFlushTimeData);
            }else{
                let {week,day} = this.state.flushTime;
                switch (this.state.flushTime.type){
                    // case 'day':
                    //     if(!isNumber(hour) || !isNumber(min)){
                    //         this.setState(()=>update(this.state,{
                    //             flushTime:{
                    //                 hour:{$set:1},
                    //                 min:{$set:0},
                    //             },
                    //         }),this.submitFlushTimeData);
                    //     }
                    //     break;
                    case 'week':
                        if(!isNumber(week)){
                            this.setState(()=>update(this.state,{
                                flushTime:{
                                    week:{$set:1},
                                },
                            }),this.submitFlushTimeData);
                        }
                        break;
                    case 'month':
                        if(!isNumber(day) ){
                            this.setState(()=>update(this.state,{
                                flushTime:{
                                    day:{$set:1},
                                },
                            }),this.submitFlushTimeData);
                        }
                        break;
                    default:
                }
            }
        }
    }

    handleCacheType = (event) => {
        this.setState(()=>({
            type:event.target.value,
        }),this.giveDefaultValue);
    };

    handleSwitch = (k,v) => {
        if(v){
          this.setState(()=>update(this.state,{
              flushTime:{
                  type:{$set:k},
              },
          }),()=>{this.submitFlushTimeData(),this.giveDefaultValue()});
        }
        // console.log(k,v);
    };

    handleValueChange = (k,v) => {
        this.setState(() => update(this.state,{
            flushTime:{
                [k]:{$set:v},
            },
        }),this.submitFlushTimeData);
        // this.submitFlushTimeData();
    };

    //提交数据
    submitFlushTimeData(){
        //生成表达式
        const el = this.generateEl();

        if(isFunc(this.props.onChange) && el){
            this.props.onChange("flushTime",el);
        }
    }

    //生成表达式
    generateEl(){
        let {week,day,hour,min,type} = this.state.flushTime;

        if(!isNumber(hour)  || !isNumber(min)) return false;

        if(day < 10) day = "0" + day;
        if(hour < 10) hour = "0" + hour;
        if(min < 10) min = "0" + min;

        let el = "" + hour + min;

        if(type === 'week'){
            if(!isNumber(week)) return false;
            el = "w" + week + el ;
        }else if(type === 'month'){
            if(!isNumber(this.state.flushTime.day)) return false;
            el = day + el ;
        }
        return el
    }

    handleInterval = (v) => {
        if(isFunc(this.props.onChange)){
            this.props.onChange("interval",v);
        }
    };

    render(){
        const timeEditor = this.state.type === 0
            ?  (<Row key="interval" gutter={16} className={styles.row}>
                <Col span={6} className={styles.row_title}>缓存频率：</Col>
                <Col span={18}>
                    <InputNumber size="small" min={1}
                                 defaultValue={isNumber(this.props.defaultValue.interval)?this.props.defaultValue.interval:60}
                                 onChange = {this.handleInterval}
                    />  (单位:分钟)
                </Col>
                </Row>)
            :   [<Row key="everyDay" gutter={16} className={styles.mini_row}>
                    <Col span={2}  className={styles.row_title}>
                        <Switch checked={this.state.flushTime.type === 'day'} size="small" onChange={this.handleSwitch.bind(null,"day")} />
                    </Col>
                    <Col span={5} className={styles.row_title} >每天：</Col>
                    <Col span={17} >
                        <Select disabled={this.state.flushTime.type !== 'day'} value={this.state.flushTime.hour} size="small" style={{ width: 75 }}
                                onChange={this.handleValueChange.bind(null,'hour')}>
                            {hours.map(e=>(<Option key={e} value={e}>{e}点</Option>))}
                        </Select>
                        <InputNumber disabled={this.state.flushTime.type !== 'day'} size="small" min={0} style={{ width: 75 }} max={59}
                                     value={this.state.flushTime.min}
                                     onChange={this.handleValueChange.bind(null,'min')}
                                     formatter={value => `${value}分`}
                                     parser={value => value.replace('分', '')}/>
                    </Col>
                </Row>,
                <Row key="everyWeek" gutter={16} className={styles.mini_row}>
                    <Col span={2}  className={styles.row_title}>
                        <Switch checked={this.state.flushTime.type === 'week'} size="small" onChange={this.handleSwitch.bind(null,"week")} />
                    </Col>
                    <Col span={5} className={styles.row_title} >每周：</Col>
                    <Col span={17} >
                        <Select disabled={this.state.flushTime.type !== 'week'} value={this.state.flushTime.week} size="small" style={{ width: 75 }}
                                onChange={this.handleValueChange.bind(null,'week')}>
                            {weeks.map(e=>(<Option key={e} value={e}>{weeksLable[e]}</Option>))}
                        </Select>
                        <Select disabled={this.state.flushTime.type !== 'week'} value={this.state.flushTime.hour} size="small" style={{ width: 75 }}
                                onChange={this.handleValueChange.bind(null,'hour')}>
                            {hours.map(e=>(<Option key={e} value={e}>{e}点</Option>))}
                        </Select>
                        <InputNumber disabled={this.state.flushTime.type !== 'week'} size="small" min={0} style={{ width: 75 }} max={59}
                                     value={this.state.flushTime.min}
                                     onChange={this.handleValueChange.bind(null,'min')}
                                     formatter={value => `${value}分`}
                                     parser={value => value.replace('分', '')}/>
                    </Col>
                </Row>,
                <Row key="everyMonth" gutter={16} className={styles.mini_row}>
                    <Col span={2}  className={styles.row_title}>
                        <Switch checked={this.state.flushTime.type === 'month'} size="small" onChange={this.handleSwitch.bind(null,"month")} />
                    </Col>
                    <Col span={5} className={styles.row_title} >每月：</Col>
                    <Col span={17} >
                        <Select disabled={this.state.flushTime.type !== 'month'} value={this.state.flushTime.day} size="small" style={{ width: 75 }}
                                onChange={this.handleValueChange.bind(null,'day')}>
                            {days.map(e=>(<Option key={e} value={e}>{e}号</Option>))}
                        </Select>
                        <Select disabled={this.state.flushTime.type !== 'month'}
                                onChange={this.handleValueChange.bind(null,'hour')}
                                value={this.state.flushTime.hour} size="small" style={{ width: 75 }}>
                            {hours.map(e=>(<Option key={e} value={e}>{e}点</Option>))}
                        </Select>
                        <InputNumber disabled={this.state.flushTime.type !== 'month'} size="small" min={0} style={{ width: 75 }} max={59}
                                     value={this.state.flushTime.min}
                                     onChange={this.handleValueChange.bind(null,'min')}
                                     formatter={value => `${value}分`}
                                     parser={value => value.replace('分', '')}/>
                    </Col>
                </Row>];
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
                    {this.state.enable &&
                        [<Divider key="Divider">{this.state.type === 0?'周期缓存':'定时缓存'}</Divider>,timeEditor]
                    }

                </div>)
    }
}