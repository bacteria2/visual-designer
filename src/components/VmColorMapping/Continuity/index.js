import React from 'react';
import { Tabs} from 'antd';
import update from 'immutability-helper'
import style from './Continuity.css'
import CustomSection from './CustomSection'
import BaseProps from './BaseProps'
import RangeEditor from '../../RangeEditor'
const TabPane = Tabs.TabPane;

export default class Continuity extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            type:props.vm.type ||'piecewise', //  continuous|piecewise
            min:props.vm.min,
            max:props.vm.max,
            splitNumber:props.vm.splitNumber || 5,
            inRange:props.vm.inRange || {},
            outOfRange:props.vm.outOfRange || {},
            pieces:props.vm.picecs,
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            pieces:props.pieces});
    }

    handleChangeBaseProps = (key,value) => {
        this.setState((perState) => update(
            perState,{
                [key]:{$set:value}}
        ),this.handleValueChange);
    };

    handleChangeInRange = (range) => {
        this.setState((perState) => update(
            perState,{inRange:{$set:range}}
        ),this.handleValueChange);
    };

    handleChangeOutRange = (range) => {
        this.setState((perState) => update(
            perState,{outOfRange:{$set:range}}
        ),this.handleValueChange);
    };

    handleValueChange = ()=>{
        this.props.onChange(Object.assign(this.props.vm,this.state));
        // console.log(this.state);
    };

    handlePiecesChange = (pieces) => {
        // this.props.onChange(Object.assign(this.props.vm,{pieces}));
        this.setState((perState) =>({pieces}),this.handleValueChange);
    };

    render(){

        const {type,min,max,splitNumber,inRange,outOfRange,show} = this.props.vm;

        return (<div className={style.mainWrap}>
            {/*<button onClick={this.handleSave}>保存</button>*/}
            <div className={style.baseWrap}>
                <BaseProps data={{type,min,max,splitNumber,show}} onChange={this.handleChangeBaseProps}/>
            </div>
            <div className={style.colorEditorWrap}>
                <Tabs defaultActiveKey="inRange" >
                    <TabPane tab="范围内" key="inRange">
                        <RangeEditor defaultValue={inRange||{}} onChange={this.handleChangeInRange}/>
                    </TabPane>
                    <TabPane tab="范围外" key="outRange">
                        <RangeEditor defaultValue={outOfRange||{}} onChange={this.handleChangeOutRange}/>
                    </TabPane>
                </Tabs>
            </div>
            {this.state.type === 'piecewise' &&
                <div className={style.customSectionWrap}>
                    <Tabs defaultActiveKey="customSection" >
                        <TabPane tab="分段" key="customSection">
                            <CustomSection min={this.state.min} section = {this.state.splitNumber} max = {this.state.max} defaultValue={this.state.pieces} onChange={this.handlePiecesChange} />
                        </TabPane>
                    </Tabs>
                </div>
            }
        </div>)
    }
}