import React from 'react';
import { Row,Col,InputNumber,Icon,Modal} from 'antd';
import isFunc from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import update from 'immutability-helper'
import style from './GraphicStyle.css'
import SymbolEditor from './SymbolEditor'

export default class GraphicStyle extends React.Component{
    constructor(props){
        super(props);
        this.defaultData = this.initDefaultVale(props) ;
        this.state = {
            symbolSize : this.defaultData.symbolSize,
            symbol : this.defaultData.symbol,
            svgPreview:false}
    }

    componentWillReceiveProps(nextProps){

        this.shouldUpdate = !nextProps.defaultData
            ||!isArray(nextProps.defaultData.symbolSize)
            ||nextProps.defaultData.symbolSize.length !== 2
            ||nextProps.defaultData.symbolSize[0] !== this.state.symbolSize[0]
            ||nextProps.defaultData.symbolSize[1] !== this.state.symbolSize[1]
            ||nextProps.defaultData.symbol !== this.state.symbol ;

        if(this.shouldUpdate) {
            this.defaultData = this.initDefaultVale(nextProps);
            this.setState({
                symbolSize : this.defaultData.symbolSize,
                symbol : this.defaultData.symbol});
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.shouldUpdate
            ||this.state.symbolSize !== nextState.symbolSize
            ||this.state.symbol !== nextState.symbol
            ||this.state.currentSymbolIndex !== nextState.currentSymbolIndex
            ||this.state.svgPreview !== nextState.svgPreview;
    }

    componentDidUpdate(){
        this.shouldUpdate = false;
        if(!this.unEmit){
            const newData = update(this.defaultData,{
                symbolSize :{$set:this.state.symbolSize},
                symbol:{$set:this.state.symbol}});
            this.emitChange(newData);
        }else{
            this.unEmit = true
        }

    }
    //
    // componentWillUpdate(nextProps){
    //     this.defaultData = this.initDefaultVale(nextProps);
    // }

    initDefaultVale(props){
        let defaultData = props.defaultData || {} ,valueChange = false;
        if(!isArray(defaultData.symbolSize) || defaultData.symbolSize.length !== 2){
            defaultData.symbolSize = [10,100];
            valueChange = true;
        }
        if(!isArray(defaultData.symbol)){
            defaultData.symbol = ['circle'];
            valueChange = true;
        }
        if(valueChange){
            this.emitChange(defaultData);
        }
        return defaultData
    }

    symbolSizeChangeHandle = (k,v) => {
        let index = 0 ;
        if(k === 'max') {
            index = 1;
        }
        this.setState(update(this.state,{
            symbolSize:{
                [index]:{$set:v}}}));
    };

    handleSymbolEditor = (v) =>{
        this.setState(update(
            this.state,{
                symbol:{
                    [this.state.currentSymbolIndex]:{
                        $set:v}}}));
    };

    handleSymbolSelect = (index) => {
        this.unEmit = true;
        this.setState({
            currentSymbolIndex:index});
    };

    onAddSymbol = () => {
        this.setState(update(this.state,{
            symbol:{$push:['circle']}}));
    };

    onRemoveSymbol = () => {
        this.setState(update(this.state,{
            symbol:{$splice:[[this.state.symbol.length-1,1]]}}));
    };


    emitChange(data){
        if(isFunc(this.props.onChange)){
            this.props.onChange(data);
        }
    }

    render(){
        return (<div className={style.mainWrap}>
            <Row gutter={16} className={style.row}>
                <Col span={6} className={style.row_title}>图元大小：</Col>
                <Col span={18}>
                    <Row gutter={16}>
                        <Col span={10}><InputNumber size="small" value={this.state.symbolSize[0]} onChange={this.symbolSizeChangeHandle.bind(null,'min')}/></Col>
                        <Col span={4}>至</Col>
                        <Col span={10}><InputNumber size="small" value={this.state.symbolSize[1]} onChange={this.symbolSizeChangeHandle.bind(null,'max')}/></Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={6} className={style.row_title}>图元类型：</Col>
                <Col span={18} className={style.symbolRow}>
                    <span onClick={this.onAddSymbol} style={{marginRight:10}} ><Icon type="plus" /></span>
                    {this.state.symbol.length > 0 ? <span onClick={this.onRemoveSymbol} ><Icon type="minus" /></span>:null}
                </Col>
            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={6} className={style.row_title}/>
                <Col span={18} className={style.symbolRow}>
                    {
                        this.state.symbol.map((symbol,i) => {
                            if(symbol.indexOf('path://') === -1){
                                return <span key={i} className={style.symbol + " " + (i === this.state.currentSymbolIndex?style.symbolActive:'')} onClick={this.handleSymbolSelect.bind(null,i)}>{symbol}</span>
                            }else{
                                return (<span key={i}
                                             className={style.symbol + " " + (i === this.state.currentSymbolIndex?style.symbolActive:'')}
                                             onClick={this.handleSymbolSelect.bind(null,i)}>svg</span>)
                            }
                        })
                    }
                </Col>
            </Row>
            {
                isNumber(this.state.currentSymbolIndex) && this.state.symbol[this.state.currentSymbolIndex] &&
                   <SymbolEditor defaultValue = {this.state.symbol[this.state.currentSymbolIndex]} onChange={this.handleSymbolEditor} />
            }
            <Modal
                title="SVG 预览"
                visible={this.state.svgPreview}
                onOk={this.handleOk}
                onCancel={()=>{this.setState({svgPreview:false})}}>
                <div>asdasd</div>
            </Modal>
        </div>)
    }
}