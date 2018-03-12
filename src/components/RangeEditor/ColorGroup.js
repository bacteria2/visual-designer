import React from 'react';
import {Row,Col,Icon,Switch} from 'antd'
import ColorPicker from '../ColorPicker'
import isFunc from 'lodash/isFunction'
import update from 'immutability-helper'
import style from './RangeEditor.css'

export default class ColorGroup extends React.PureComponent{

    constructor(props) {
        super(props);
        let {defaultValue} = props;
        this.state = {colors:defaultValue||[]}
    }

    onAddColor = (e) =>{
        this.setState(preState =>{
            return update(preState,{colors:{$push:['#000']}})
        },this.handleColorListChange);
    };

    onRemoveColor = () =>{
        // const newColor = update(this.state,{colors:{$splice:[[this.state.color.length-1,1]]}});
        // consoloe.log('newColor','')
        this.setState( preState => {
            return update(preState,{colors:{$splice:[[preState.colors.length-1,1]]}})
        },this.handleColorListChange);
    };

    onSingleColorChange =(color,index) =>{
        this.setState( preState =>{return update(
                preState,{colors:{[index]:{$set:color}}})
            },this.handleColorListChange);
    };

    handleColorListChange = () =>{
        if(isFunc(this.props.onChange)){
            this.props.onChange(this.state.colors)
        }
    };

    render(){
        let colorList = this.state.colors.map((color,index)=>{
            return <ColorPicker circle={true}  defaultValue = {color} style={{margin:'0 5px 5px 0'}} key={index} colorIndex={index} onChange = {this.onSingleColorChange}/>
        });
        return (<div>
                <Row gutter={16} className={style.row}>
                    <Col span={3}  className={style.row_color_title}>
                        <Switch  defaultChecked={!this.props.disabled} size="small" onChange={this.props.onSwitch} />
                    </Col>
                    <Col span={5} className={style.row_color_title}>颜色：</Col>
                    <Col span={16} className={style.colorRow}>
                        <span onClick={!this.props.disabled?this.onAddColor:null} style={{marginRight:10,cursor:!this.props.disabled?'pointer':'not-allowed'}} ><Icon type="plus" /></span>
                        {this.state.colors.length > 0?<span onClick={!this.props.disabled?this.onRemoveColor:null} style={{cursor:!this.props.disabled?'pointer':'not-allowed'}} ><Icon type="minus" /></span>:null}
                    </Col>
                </Row>
                <Row gutter={16} >
                    <Col span={8} className={style.row_color_title} />
                    <Col span={16} className={style.colorRow}>{!this.props.disabled && colorList}</Col>
                </Row>
            </div>)
    }
}