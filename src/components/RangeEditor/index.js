import React from 'react';
import {Row,Col,Slider,Switch} from 'antd'
import update from 'immutability-helper'
import style from './RangeEditor.css'
import ColorGroup from './ColorGroup'
import isFunc from 'lodash/isFunction'
import isArray from 'lodash/isArray'

const hue = {
    0: '0',
    120: '120',
    240: '240',
    360:'360'};

const saturation = {
    0: '0%',
    0.25: '25%',
    0.50: '50%',
    0.75: '75%',
    1:'100%'};

const defaultValue = {
    colorHue : [0,120],
    colorSaturation : [0,0.5],
    colorLightness : [0,0.5],
    opacity : [0,0.5]};

export default class RangeEditor extends React.PureComponent{
    constructor(props){
        super(props);
        this.range = props.defaultValue;
        this.state = {
            switchState:{
            colorHue:isArray(props.defaultValue.colorHue),
            colorSaturation:isArray(props.defaultValue.colorSaturation),
            colorLightness:isArray(props.defaultValue.colorLightness),
            opacity:isArray(props.defaultValue.opacity),
            color:isArray(props.defaultValue.color)}}
    }

    handleChangeValue = (k,v)=>{
        if(this.state.switchState[k]){
            this.range[k] = v;
            this.updateChiefData();
        }
    };

    updateChiefData(){
        if(isFunc(this.props.onChange)){
            this.props.onChange(this.range)
        }
    }

    handleSwitch = (k,v) => {
        this.setState(update(this.state,{
            switchState:{[k]:{$set:v}}}));
        if(!v) {
            defaultValue[k] = this.range[k];
            delete this.range[k];
        }else{
            this.range[k] = defaultValue[k];
        }
        this.updateChiefData();
    };

    render(){

        return (<div className={style.mainWrap}>
            <ColorGroup disabled={!this.state.switchState.color} defaultValue={this.props.defaultValue.color} onSwitch={this.handleSwitch.bind(null,'color')} onChange={this.handleChangeValue.bind(null,'color')}/>
            <Row gutter={16} >
                <Col span={3}  className={style.row_title}>
                    <Switch defaultChecked={this.state.switchState.colorHue}  size="small" onChange={this.handleSwitch.bind(null,'colorHue')} />
                </Col>
                <Col span={5} className={style.row_title} >色相：</Col>
                <Col span={16} >
                    <div style={{width:'90%'}}>
                        <Slider disabled={!this.state.switchState.colorHue} marks={hue} range  min={0} max={360} step={1} defaultValue={this.range.colorHue||defaultValue.colorHue} onChange={this.handleChangeValue.bind(null,'colorHue')}/>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} >
                <Col span={3}  className={style.row_title}>
                    <Switch defaultChecked={this.state.switchState.colorSaturation} size="small" onChange={this.handleSwitch.bind(null,'colorSaturation')} />
                </Col>
                <Col span={5} className={style.row_title} >饱和度：</Col>
                <Col span={16} >
                    <div style={{width:'90%'}}>
                        <Slider disabled={!this.state.switchState.colorSaturation} marks={saturation} min={0} max={1} range  step={0.1} defaultValue={this.range.colorSaturation||defaultValue.colorSaturation} onChange={this.handleChangeValue.bind(null,'colorSaturation')}/>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} >
                <Col span={3}  className={style.row_title}>
                    <Switch defaultChecked={this.state.switchState.colorLightness} size="small" onChange={this.handleSwitch.bind(null,'colorLightness')} />
                </Col>
                <Col span={5} className={style.row_title} >亮度：</Col>
                <Col span={16} >
                    <div style={{width:'90%'}}>
                        <Slider disabled={!this.state.switchState.colorLightness} marks={saturation} min={0} max={1} range  step={0.1} defaultValue={this.range.colorLightness||defaultValue.colorLightness} onChange={this.handleChangeValue.bind(null,'colorLightness')}/>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} >
                <Col span={3}  className={style.row_title}>
                    <Switch  defaultChecked={this.state.switchState.opacity} size="small" onChange={this.handleSwitch.bind(null,'opacity')} />
                </Col>
                <Col span={5} className={style.row_title} >透明度：</Col>
                <Col span={16} >
                    <div style={{width:'90%'}}>
                        <Slider disabled={!this.state.switchState.opacity} marks={saturation} min={0} max={1} range  step={0.1} defaultValue={this.range.opacity||defaultValue.opacity} onChange={this.handleChangeValue.bind(null,'opacity')}/>
                    </div>
                </Col>
            </Row>
        </div>)
    }
}

RangeEditor.defaultValue = {defaultValue:{}};