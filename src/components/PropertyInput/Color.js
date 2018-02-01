/**
 * Created by lenovo on 2018/1/10.
 */
import React from 'react';
import { SketchPicker } from 'react-color'
import styles from './Color.css'
import {toHex} from '../../utils'
import { Button,Icon,Input,InputNumber} from 'antd'

const toRgbStr = function(rgbaObj){
    if(typeof rgbaObj === 'string'){
        return rgbaObj;
    }else{
        if(rgbaObj.a == 1){
            return toHex(rgbaObj)
        }else{
            return `rgba(${rgbaObj.r}, ${rgbaObj.g }, ${rgbaObj.b }, ${rgbaObj.a })`
        }

    }
}

const getOffset = function(el) {
    let x = 0, y = 0, w = 0, h = 0;
    if(el) {
        h = el.offsetHeight
        w = el.offsetWidth
    }
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: y, left: x ,height:h ,width: w };
}

const InputGroup = Input.Group;

//简单的颜色控件
class SimpleColor extends React.PureComponent {
    constructor(props) {
        super(props)
        let {defaultValue,size} = props;
        this.colorStyle = styles.color;
            this.disableStyle = styles.swatchDisable;
               this.enableStyle = styles.swatchEnable;
                 this.boxStyle = {marginTop:'5px'};
        if('mini' === size){
            this.colorStyle = styles.colorList;
            this.disableStyle = styles.swatchListDisable;
            this.enableStyle = styles.swatchListEnable;
            this.boxStyle = null
        }
        this.state = {
            displayColorPicker: false,
            color: defaultValue||{r: '255', g: '255', b: '255', a: '1'},
        }
    }

    handelPopover = () =>{
        this.popoverStyle ={
            zIndex:2,
            position:"fixed",

        }
        let windowSize = {width:window.innerWidth,height:window.innerHeight},
            {top,left,height,width} = this.offSet,
            tdv     = windowSize.height - top,
            ldv     = windowSize.width  - left;
        this.popoverStyle.top=`${top + height +4}px`;
        this.popoverStyle.left=`${left}px`;
        if(tdv < 348) //335:颜色选择器的高度
        {
            this.popoverStyle.top=`${top - 342}px`;
        }
        if(ldv < 220) //220:颜色弹窗宽度
        {
            this.popoverStyle.left=`${left-220+width}px`;
        }
    }

    handleClick = () => {
        if(this.props.disabled) return;
        //处理弹窗位置
        this.handelPopover();
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb },this.handleStateChanged);
    };

    handleStateChanged = () =>{
        if(this.state.color) {
            if (typeof this.props.onChange === 'function') {
                if (typeof this.props.colorIndex !== 'undefined') {
                    this.props.onChange(toRgbStr(this.state.color), this.props.colorIndex);
                } else {
                    this.props.onChange(toRgbStr(this.state.color));
                }
            }
        }
    }

    render() {
        let divStyle={
            background:!this.props.disabled?toRgbStr(this.state.color):null
        }

        return (
            <div style={this.boxStyle}>
                <div className={this.props.disabled?this.disableStyle:this.enableStyle} onClick={ this.handleClick} ref={(el)=>{this.offSet = getOffset(el)}}>
                    <div className={ this.colorStyle } style={divStyle} ></div>
                </div>
                { this.state.displayColorPicker ? <div style = {this.popoverStyle}>
                    <div className={ styles.cover } onClick={ this.handleClose }>{`x:${this.offSet.left} ; y:${this.offSet.top} ; w:${this.offSet.width} ; h:${this.offSet.height}`}</div>
                    <SketchPicker color={ this.state.color } onChange={this.handleChange} />
                </div> : null }
            </div>
        )
    }
}

//颜色列表
class ColorList extends React.PureComponent{
    constructor(props) {
        super(props)
        let {defaultValue} = props;
        this.state = {colors:defaultValue||[]}
    }

    handelAddColor = (e) =>{
        if(this.props.disabled)return;
        this.setState(preState =>{
            return {colors:[...preState.colors,'#000']}
        },this.handleColorListChange);
    }

    handelRemoveColor = () =>{
        if(this.props.disabled)return;
        this.setState( preState =>{
            let len = preState.colors.length;
            return {colors:preState.colors.slice(0,len-1)}
        },this.handleColorListChange);
    }

    handelSimleColorChange =(color,index) =>{
        this.setState(preState =>{
            let colors = [...preState.colors];
            colors[index] = color;
            return {colors:colors}
        },this.handleColorListChange);
    }

    handleColorListChange = () =>{
        if(typeof this.props.onChange ==='function'){
            this.props.onChange(this.state.colors)
        }
    }

    render(){
        let colorList = this.state.colors.map((color,index)=>{
            return <SimpleColor defaultValue = {color} key={index} colorIndex={index} onChange = {this.handelSimleColorChange} size="mini"/>
        });
        return (
            <div>
                <div className={this.props.disabled?styles.actionDisable:styles.actionEnable} style={{height: '28px'}}>
                    <span onClick={this.handelAddColor}><Icon type="plus"></Icon></span>
                    {this.state.colors.length > 0?<span onClick={this.handelRemoveColor}><Icon type="minus"></Icon></span>:null}
                </div>
                {this.props.disabled?null: <div style={{display: 'flex',flexFlow: 'row', flexWrap: 'wrap'}}>{colorList}</div>}
            </div>
        )
    }
}

//带范围的颜色列表
class RangeColorList extends React.PureComponent{
    constructor(props) {
        super(props)
        let {defaultValue} = props;
        this.state = {values:defaultValue||[]}
    }

    handelAddColor = () =>{
        if(this.props.disabled) return;
        this.setState(preState =>{
            return {values:[...preState.values,[0.2,'#000']]}
        },this.handleColorListChange);
    }

    handelRemoveColor = () =>{
        if(this.props.disabled) return;
        this.setState( preState =>{
            let len = preState.values.length;
            return {values:preState.values.slice(0,len-1)}
        },this.handleColorListChange);
    }

    handelSimleColorChange =(color,index) =>{
        this.setState(preState =>{
            let values = [...preState.values];
            values[index][1] = color;
            return {values:values}
        },this.handleColorListChange);
    }

    handelInputValueChange = (value,index) =>{
        console.log('handelInputValueChange',value,index)
        this.setState(preState =>{
            let values = [...preState.values];
            values[index][0] = value;
            return {values:values}
        },this.handleColorListChange);
    }

    handleColorListChange = () =>{
        if(typeof this.props.onChange ==='function'){
            this.props.onChange(this.state.values)
        }
    }

    render(){
        let colorList = this.state.values.map((value,index)=>{
            return <div key={index} className={styles.rangeColorItem}>
                   <InputGroup compact>
                       <InputNumber size="small"
                                    defaultValue={value[0]}
                                    min={0}
                                    max={1}
                                    formatter={value => `${value*100}%`}
                                    parser={value => value.replace('%', '')/100}
                                    onChange={ v =>{this.handelInputValueChange(v,index)}}/>
                       <div className={styles.rangeColorWrap}>
                           <SimpleColor defaultValue = {value[1]} colorIndex={index} onChange = {this.handelSimleColorChange} size="mini"/>
                       </div>
                   </InputGroup>
                   </div>
        });
        return (
            <div>
                <div className={this.props.disabled?styles.actionDisable:styles.actionEnable} style={{height: '28px'}}>
                    <span onClick={this.handelAddColor}><Icon type="plus"></Icon></span>
                    {this.state.values.length > 0?<span onClick={this.handelRemoveColor}><Icon type="minus"></Icon></span>:null}
                </div>
                {this.props.disabled?null: <div style={{display: 'flex',flexFlow: 'row', flexWrap: 'wrap'}}>{colorList}</div>}
            </div>
        )
    }
}
export {SimpleColor,ColorList,RangeColorList};