import React from 'react';
import {Icon,Dropdown,Modal} from 'antd';
import PropTypes from 'prop-types';
import style from './slicer.css'
import  FilterDimension from './FilterDimension'
import update from 'immutability-helper'
import FilterEditorModal from './FilterEditorModal'

/* 切片器 */
export default class Slicer extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            showFilterEditorWin:false,
            editFilterItem:{},
            columnData:[],
        }
    }

    getColumnData(fieldsName){
        //从 Dataset 中获取列名为 fieldsName 的数据
        

    }

    removeHandle= (index) => {
        const newData = update(this.props.filterData,{$splice:[[index,1]]});
        if(this.props.onChange){
            this.props.onChange(newData);
        }
    };

    handleHide = (index) => {
        const newData = update(this.props.filterData,{[index]:{$toggle:['hide']}});
        if(this.props.onChange){
            this.props.onChange(newData);
        }
    };

    handleStartEditor = (index) => {
        const editFilterItem = this.props.filterData[index];
        const columnData = this.getColumnData(editFilterItem.alias);
        this.editIndex = index;
        this.setState({
            showFilterEditorWin:true,
            editFilterItem,
            columnData,
        })
    };

    handleValueChange = (v) => {
        const newData = update(this.props.filterData,{[this.editIndex]:{$set:v}});
        if(this.props.onChange){
            this.props.onChange(newData);
        }
    };

    render(){
        return (<div className={style.mainWrap}>
                    <FilterDimension data={this.props.filterData}
                                     onRemove={this.removeHandle}
                                     onHide = {this.handleHide}
                                     onEdit = {this.handleStartEditor}/>
                    <FilterEditorModal
                        visable = {this.state.showFilterEditorWin}
                        defaultValue = {this.state.editFilterItem}
                        onOK = {this.handleValueChange}
                        onCancel = {()=>{this.setState({showFilterEditorWin:false})}}/>
                </div>)
    }
    
}

Slicer.propTypes = {
    dataSet : PropTypes.array,  //数据集，和数据项对应
    filterData : PropTypes.array,  //数据项
};
