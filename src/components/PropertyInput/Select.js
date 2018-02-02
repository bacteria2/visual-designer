/**
 * Created by lenovo on 2018/1/15.
 */
import React from 'react';
import styles from './Select.css';
import PropTypes from 'prop-types';


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
        this.state={
            selected:this.initSelected(),
        }
    }
    handelSelectedChange =(index,activated)=>{
        let option = this.props.options.filter((option,i)=>{
            return i === index
        }),
        value = option[0].value;

        if(this.multiple){//多选
            if(activated){//选上
                this.setState(preState => {
                    let preSelected = preState.selected;
                    if(!preSelected.includes(value)){
                        return {selected:[...preSelected,value]}
                    }
                },this.submitChange)

            }else{//去掉
                if(this.state.selected.length > 1){// 检测最小还选择了一个
                    this.setState(preState => {
                        let preSelected = preState.selected;
                        if(preSelected.includes(value)){
                                return {selected:preSelected.filter(item => {return item !== value})}
                        }
                    },this.submitChange)
                }
            }
        }else{//单值
            if(activated){
                this.setState({selected:value},this.submitChange)
            }
        }
    }

    initSelected=()=>{
        if(!this.props.defaultValue){
            let options = this.props.options;
            if(options && Array.isArray(options) && options.length > 0){
               let defaultSelected = options[0].value;
               if(this.multiple){return [defaultSelected]}
               return defaultSelected
            }
        }else{
            return this.props.defaultValue
        }
    }

    submitChange=()=>{
        this.props.onChange(this.state.selected)
    }

    render(){
        let { options,disabled } = this.props;
        if(!options || !Array.isArray(options) || options.length < 1){
            return <p>options error</p>
        }
        let selectItems = options.map((option,index)=>{
            let activated = false;
            if(Array.isArray(this.state.selected)){
                activated = this.state.selected.includes(option.value);
            }else{
                activated = (this.state.selected == option.value)
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


