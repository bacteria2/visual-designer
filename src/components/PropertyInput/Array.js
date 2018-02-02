import React from "react";
import styles from './Array.css'
import { Icon,Input} from 'antd'

function onChangeHandler (callback,index) {
  return function (e) {
    e.persist();
    let v = e.target.value;
    if(!isNaN(v)){
      v = Number(v);
    }
    callback(v,index);
  }
}

export class ArrayComponent extends React.PureComponent{
  constructor(props) {
    super(props)
    let {defaultValue,num} = props;
    let vals = [];
    num = num || 2;
    for(let i = 0; i < (num > 2 || num <= 0 ? 2 : num); i++){
      vals.push('');
    }
    this.state = {values: defaultValue||vals}
  }

  handelAddInput = (e) =>{
    if(this.props.disabled)return;
    this.setState(preState =>{
      return {values: [...preState.values,'']}
    },this.handleValueListChange);
  }

  handelRemoveInput = () =>{
    if(this.props.disabled)return;
    this.setState( preState =>{
      let len = Array.from(preState.values).length;
      return {values: [...preState.values.slice(0,len-1)]}
    },this.handleValueListChange);
  }

  handelValueChange =(value,index) =>{
    this.setState(preState =>{
      let values = [...preState.values];
      values[index] = value;
      return {values: values}
    },this.handleValueListChange);
  }

  handleValueListChange = () =>{
    if(typeof this.props.onChange ==='function'){
      this.props.onChange(this.state.values)
    }
  }

  render(){
    let inputList = this.state.values.map((value,index)=>{
      return (<Input key={index}
        defaultValue={value}
        onChange={onChangeHandler(this.handelValueChange,index)}
        size='small'
        className={styles.miniInput}/>)
    });
    let len = Array.from(this.state.values).length;
    let num = this.props.num || 2;
    const fa = !this.props.disabled && len < num;
    const fm = !this.props.disabled && len > 1;
    const astyle = fa ? styles.btnEnable : styles.btnDisable;
    const mstyle = fm ? styles.btnEnable : styles.btnDisable;
    return (
      <div>
        {this.props.num && this.props.num > 2 ?
        <div className={this.props.disabled?styles.actionDisable:styles.actionEnable} style={{height: '28px'}}>
          <span onClick={fa?this.handelAddInput:null} className={astyle}><Icon type="plus"></Icon></span>
          <span onClick={fm?this.handelRemoveInput:null} className={mstyle}><Icon type="minus"></Icon></span>
        </div> :null}
        {this.props.disabled?null: <div style={{display: 'flex',flexFlow: 'row', flexWrap: 'wrap'}}>{inputList}</div>}
      </div>
    )
  }
}
