import React from 'react';
import { SketchPicker } from 'react-color'
import styles from './ColorPicker.css'
import {toHex} from '../../utils'
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
};

const getOffset = function(el) {
    let x = 0, y = 0, w = 0, h = 0;
    if(el) {
        h = el.offsetHeight;
        w = el.offsetWidth
    }
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: y, left: x ,height:h ,width: w };
};

export default class ColorPicker extends React.PureComponent {
    constructor(props) {
        super(props);
        let {defaultValue} = props;
        this.boxStyle = {marginTop:'5px'};
        this.state = {
            displayColorPicker: false,
            color: defaultValue||{r: '255', g: '255', b: '255', a: '1'},
        }
    }

    handelPopover = () =>{
        this.popoverStyle ={
            zIndex:2,
            position:"fixed",
        };
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
    };

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
    };

    render() {
        let divStyle={
            backgroundColor:!this.props.disabled?toRgbStr(this.state.color):null,
        };

        return (
            <div style={this.props.style}>
                <div  onClick={ this.handleClick} ref={(el)=>{this.offSet = getOffset(el)}}>
                    <div style={divStyle} className={ styles.colorBoxWrap +" " + (this.props.circle?styles.circle:'') }>
                        {/*<div className={ styles.colorTransparentGround +" " + (this.props.circle?styles.circle:'')  }  />*/}
                    </div>
                </div>
                { this.state.displayColorPicker ? <div style = {this.popoverStyle}>
                    <div className={ styles.cover } onClick={ this.handleClose }>{`x:${this.offSet.left} ; y:${this.offSet.top} ; w:${this.offSet.width} ; h:${this.offSet.height}`}</div>
                    <SketchPicker color={ this.state.color } onChange={this.handleChange} />
                </div> : null }
            </div>
        )
    }
}