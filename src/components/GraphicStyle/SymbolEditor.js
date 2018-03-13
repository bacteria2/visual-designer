import React from 'react';
import { Row,Col,Radio,Switch,Input,Divider,Button,Modal} from 'antd';
import style from './GraphicStyle.css'
import update from 'immutability-helper'
import isFunc from 'lodash/isFunction'
import INITSYMBOL from './InitDefaultSymbol'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const symbolArr = INITSYMBOL.slice(0,3);

const symbolArr2 = INITSYMBOL.slice(4,INITSYMBOL.length);

export default class SymbolEditor extends React.PureComponent{

    constructor(props){
        super(props);

        const custom = this.isCustom(this.props.defaultValue);

        this.state = {
            custom,
            symbol:'',
            customSymbol:'',
            svgPreview:false};

        if(custom){
            this.state.customSymbol = this.props.defaultValue
        }else{
            this.state.symbol = this.props.defaultValue
        }
    }

    componentWillReceiveProps(nextProps){
        const custom = this.isCustom(nextProps.defaultValue);

        if(custom && nextProps.defaultValue){
            this.setState({
                symbol:'',
                customSymbol:nextProps.defaultValue,
                custom})
        }else{
            this.setState({symbol:nextProps.defaultValue,
                customSymbol:'',
                custom})
        }
    }

    componentDidUpdate(){
        let value ;
        if(this.state.custom){
            value = this.state.customSymbol;
            if(!value) value = this.state.symbol
        }else{
            value = this.state.symbol
        }

        if(isFunc(this.props.onChange)){
            this.props.onChange(value);
        }
    }

    isCustom(symbol){
        let filterResult = INITSYMBOL.filter(e=>(e.value === symbol));
        return filterResult.length === 0
    }

    handleSwitch = () => {
        this.setState(update(this.state,{
            $toggle:['custom'],symbol:{$set:this.state.symbol?this.state.symbol:'circle'}}))
    };

    handleSymbolChange = (symbol) => {
        this.setState(update(this.state,{
            symbol:{$set:symbol.target.value}}))
    };

    handleCustomChange = (customSymbol) => {
        this.setState(update(this.state,{
            customSymbol:{$set:customSymbol.target.value}}))
    };

    render(){
        return (<div>
            <Divider >图元图形编辑</Divider>
            <Row gutter={16} className={style.row}>
                <Col span={3}  className={style.row_title}>
                    <Switch checked={!this.state.custom} size="small" onChange={this.handleSwitch} />
                </Col>
                <Col span={5} className={style.row_title} >预定义：</Col>
                <Col span={16} >
                    <div style={{width:'90%'}}>
                        <RadioGroup disabled={this.state.custom} value={this.state.symbol} size="small" onChange={this.handleSymbolChange}>
                            {symbolArr.map(e=><RadioButton key={e.id} value={e.value}>{e.name}</RadioButton>)}
                        </RadioGroup>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={3}  className={style.row_title} />
                <Col span={5} className={style.row_title} />
                <Col span={16} >
                    <div style={{width:'90%'}}>
                        <RadioGroup disabled={this.state.custom} value={this.state.symbol} size="small" onChange={this.handleSymbolChange}>
                            {symbolArr2.map(e=><RadioButton key={e.id} value={e.value}>{e.name}</RadioButton>)}
                        </RadioGroup>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={3}  className={style.row_title}>
                    <Switch checked={this.state.custom} size="small" onChange={this.handleSwitch} />
                </Col>
                <Col span={5} className={style.row_title} >自定义：</Col>
                <Col span={16} >
                    <div style={{width:'90%'}}>
                        <Input.TextArea rows={8} disabled={!this.state.custom} onChange={this.handleCustomChange} size="small" value= {this.state.customSymbol}/>
                    </div>
                </Col>

            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={3}  className={style.row_title}/>
                <Col span={5} className={style.row_title} />
                <Col span={16} >
                    <Button onClick={()=>{this.setState({svgPreview:true})}} disabled={!this.state.custom} size="small">预览</Button>
                </Col>
            </Row>
            <Row gutter={16} className={style.row}>
                <Col span={3}  className={style.row_title}/>
                <Col span={5} className={style.row_title} />
                <Col span={16} >
                    <div style={{width:'90%',color:this.state.custom?'#999':'#eee'}}>
                        (可以通过 'path://' 将图标设置为任意的矢量路径)
                    </div>
                </Col>
            </Row>
            <Modal
                title="SVG 预览"
                visible={this.state.svgPreview}
                footer = {null}

                onCancel={()=>{this.setState({svgPreview:false})}}>
                {
                    this.state.customSymbol &&
                    <svg width="100%" height="100%" style={{padding:'30px'}} version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d={this.state.customSymbol.replace("path://",'')} style={{fill:'red',stroke:'red',strokeWidth:1}} />
                    </svg>
                }
            </Modal></div>)
    }
}