/**
 * Created by lenovo on 2018/1/15.
 */
import React from 'react';
import styles from './Select.css';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray'

function SelectItem (props) {

    function handelClick() {
        if(props.disabled) return;
        if(typeof props.handelSelectedChange === 'function'){
            props.handelSelectedChange(props.index,!props.activated)
        }
    }

    return (<div className={props.activated?styles.selectItemActive:styles.selectItem} onClick={handelClick}>
                <i><em></em></i>
                <span>{props.caption}</span>
            </div>)
}

class Select extends React.PureComponent{
    constructor(props) {
        super(props)
        this.multiple = props.multiple || false
    }
    handelSelectedChange =(index,activated)=>{
        let option = this.props.options.filter((option,i)=>{
            return i === index
        }),
        value = option[0].value;
        let preSelected = this.props.value
        if(this.multiple){//多选
            if(activated){//选上
                if(isArray(preSelected) && !preSelected.includes(value)){
                    preSelected = [...preSelected,value]
                }else{
                    preSelected = [value]
                }
            }else{//去掉
                preSelected = preSelected.filter(item => {return item !== value})
            }
        }else{//单值
            if(activated){
                preSelected = value
            }
        }
        this.props.onChange(preSelected)
    }

    /*initSelected=()=>{
        if(!this.props.value){
            let options = this.props.options;
            if(options && Array.isArray(options) && options.length > 0){
               let defaultSelected = options[0].value;
               if(this.multiple){return [defaultSelected]}
               return defaultSelected
            }
        }else{
            return this.props.value
        }
    }*/

    /*submitChange=()=>{
        this.props.onChange(this.state.selected)
    }
*/
    render(){
        let { options,disabled,value } = this.props;
        if(!options || !Array.isArray(options) || options.length < 1){
            return <p>options error</p>
        }
        let selectItems = options.map((option,index)=>{
            let activated = false;
            if(Array.isArray(value)){
                activated = value.includes(option.value);
            }else{
                activated = (value == option.value)
            }
            return <SelectItem index = {index} disabled={disabled} activated = {activated} caption={option.text} handelSelectedChange={this.handelSelectedChange} key={`s_item_${index}`}/>
        })
        return(
            <div className={disabled ? styles.selectDisabled:null} style={{lineHeight:'18px',marginTop:'6px'}}>
                {selectItems}
            </div>
        )
    }
}

export default Select;

Select.propTypes={
    onChange:PropTypes.func,
}


