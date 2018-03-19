import React from 'react';
import { Tabs} from 'antd';
import update from 'immutability-helper'
import style from './Continuity.css'
import CustomSection from './CustomSection'
import BaseProps from './BaseProps'
import RangeEditor from '../../RangeEditor'
import GraphicStyle from '../../GraphicStyle'
const TabPane = Tabs.TabPane;

export default class Continuity extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            type:props.vm.type ||'continuous', //  continuous|piecewise
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
            pieces:props.vm.pieces});
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
        let newVm = Object.assign(this.props.vm,this.state);
        console.log(newVm.inRange.color);
        this.props.onChange(newVm);
        // console.log(this.state);
    };

    handlePiecesChange = (pieces) => {
        // this.props.onChange(Object.assign(this.props.vm,{pieces}));
        this.state.pieces = pieces;
        this.handleValueChange();
        // const state = {pieces:this.state.pieces?this.state.pieces.splice(0,this.state.pieces.length,pieces):pieces};
        // state.test = pieces.length;
        // this.setState(state,this.handleValueChange);
    };

    render(){

        const {type,min,max,splitNumber,inRange,outOfRange,show} = this.props.vm;

        return (<div className={style.mainWrap}>
            <div className={style.baseWrap}>
                <BaseProps data={{type,min,max,splitNumber,show}} onChange={this.handleChangeBaseProps}/>
            </div>
            <div className={style.colorEditorWrap}>
                <Tabs defaultActiveKey="inRange" >
                    <TabPane tab="范围内" key="inRange">
                        {this.props.graphic ?
                            <GraphicStyle defaultValue={inRange||{}} onChange={this.handleChangeInRange}/>
                            :
                            <RangeEditor defaultValue={inRange||{}} onChange={this.handleChangeInRange}/>
                        }
                        {/*<RangeEditor defaultValue={inRange||{}} onChange={this.handleChangeInRange}/>*/}
                    </TabPane>
                    <TabPane tab="范围外" key="outRange">
                        {this.props.graphic ?
                            <GraphicStyle defaultValue={outOfRange||{}} onChange={this.handleChangeOutRange}/>
                            :
                            <RangeEditor defaultValue={outOfRange||{}} onChange={this.handleChangeOutRange}/>
                        }
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