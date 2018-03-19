import React from 'react';
import { Row,Col,InputNumber,Icon,Modal,Switch} from 'antd';
import isFunc from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import clone from 'lodash/clone'
import update from 'immutability-helper'
import style from './GraphicStyle.css'
import SymbolEditor from './SymbolEditor'
import  {compaireArr} from '../../utils'

const defaultValue = {
    symbolSize : [10,100],
    symbol : ['circle'],
   };

export default class GraphicStyle extends React.Component{
    constructor(props){
        super(props);
        this.range = GraphicStyle.initDefaultVale(props);
        this.state = {
            symbol : this.range.symbol,
            editSymbol:false,
            switchState:{
                symbolSize:isArray(props.defaultValue.symbolSize),
                symbol : isArray(props.defaultValue.symbol),
            }};
            
        // if(result.valueChange) this.submitData();
    }

    static initDefaultVale(props){
        let defaultData = props.defaultData || {} ;
        if(!isArray(defaultData.symbolSize) || defaultData.symbolSize.length !== 2){
            defaultData.symbolSize = defaultValue.symbolSize;
        }
        if(!isArray(defaultData.symbol)){
            defaultData.symbol = defaultValue.symbol;
        }

        return defaultData
    }

    symbolSizeChangeHandle = (k,v) => {
        let index = 0 ;
        if(k === 'max') {
            index = 1;
        }
        this.range.symbolSize[index] = v;
        //提交数据更新
        this.submitData();
        // this.setState(update(this.state,{
        //     symbolSize:{
        //         [index]:{$set:v}}}));
    };

    handleSymbolEditor = (v) =>{
        this.setState(()=>update(
            this.state,{
                editSymbol:{$set:false},
                currentSymbolIndex:{$set:-1},
                symbol:{
                    [this.state.currentSymbolIndex]:{
                        $set:v}}}),this.submitData);
    };

    handleSymbolSelect = (index) => {
        this.unEmit = true;
        this.setState({
            editSymbol:true,
            currentSymbolIndex:index});
    };

    onAddSymbol = () => {
        this.setState(()=>update(this.state,{
            symbol:{$push:['circle']}}),this.submitData);
    };

    onRemoveSymbol = () => {
       this.setState(() => update(this.state,{
           symbol:{$splice:[[this.state.symbol.length-1,1]]}}),this.submitData);
    };

    submitData(){
        if(isFunc(this.props.onChange)){
            let tempData = clone(this.range);
            if(!this.state.switchState.symbolSize) delete tempData.symbolSize;
            if(!this.state.switchState.symbol){
                delete tempData.symbol;
            }else{
                if(isArray(this.state.symbol)) tempData.symbol = this.state.symbol;
            }
            this.props.onChange(tempData);
        }
    }

    handleSwitch = (k,v) => {

        if(!v) {
            defaultValue[k] = this.range[k];
        }else{
            this.range[k] = defaultValue[k];
        }

        this.setState(()=>update(this.state,{
            switchState:{[k]:{$set:v}}}),this.submitData);
    };

    render(){
        return (<div >
            <Row gutter={16} className={style.row}>
                <Col span={3}  className={style.row_title}>
                    <Switch checked={this.state.switchState.symbolSize}  size="small" onChange={this.handleSwitch.bind(null,'symbolSize')} />
                </Col>
                <Col span={5} className={style.row_title}>大小：</Col>
                <Col span={16}>
                    <Row gutter={16}>
                        <Col span={10}><InputNumber disabled={!this.state.switchState.symbolSize} size="small" defaultValue={isArray(this.range.symbolSize)?this.range.symbolSize[0]:defaultValue.symbolSize[0]} onChange={this.symbolSizeChangeHandle.bind(null,'min')}/></Col>
                        <Col span={2}>至</Col>
                        <Col span={10}><InputNumber disabled={!this.state.switchState.symbolSize} size="small" defaultValue={isArray(this.range.symbolSize)?this.range.symbolSize[1]:defaultValue.symbolSize[1]} onChange={this.symbolSizeChangeHandle.bind(null,'max')}/></Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={3}  className={style.row_title}>
                    <Switch defaultChecked={this.state.switchState.symbol}  size="small" onChange={this.handleSwitch.bind(null,'symbol')} />
                </Col>
                <Col span={5} className={style.row_title}>图形：</Col>
                <Col span={16} className={style.symbolRow}>
                    <span onClick={this.state.switchState.symbol ? this.onAddSymbol:null} style={{marginRight:10}} ><Icon type="plus" /></span>
                    {isArray(this.state.symbol) && this.state.symbol.length > 0 &&
                        <span onClick={this.state.switchState.symbol ? this.onRemoveSymbol:null} ><Icon type="minus" /></span>}
                </Col>
            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={8} className={style.row_title}/>
                <Col span={16} className={style.symbolRow}>
                    {
                      isArray(this.state.symbol) && this.state.symbol.length > 0 && this.state.symbol.map((symbol,i) => {
                            if(symbol.indexOf('path://') === -1){
                                return <span key={i} className={style.symbol + " " + (i === this.state.currentSymbolIndex?style.symbolActive:'')} onClick={this.state.switchState.symbol ? this.handleSymbolSelect.bind(null,i):null}>{symbol}</span>
                            }else{
                                return (<span key={i}
                                             className={style.symbol + " " + (i === this.state.currentSymbolIndex?style.symbolActive:'')}
                                             onClick={this.state.switchState.symbol ? this.handleSymbolSelect.bind(null,i):null}>svg</span>)
                            }
                        })
                    }
                </Col>
            </Row>

            {
                isNumber(this.state.currentSymbolIndex) && this.state.symbol[this.state.currentSymbolIndex] &&
                   <SymbolEditor
                       title="图元编辑"
                       visible={this.state.editSymbol}
                       onCancel={()=>{this.setState({editSymbol:false})}}
                       defaultValue = {this.state.symbol[this.state.currentSymbolIndex]}
                       onOk={this.handleSymbolEditor} />
            }

        </div>)
    }
}