import React from 'react';
import {Icon,Dropdown,Modal} from 'antd';
import PropTypes from 'prop-types';
import style from './slicer.css'
import  FilterDimension from './FilterDimension'
import update from 'immutability-helper'
import FilterEditorModal from './FilterEditorModal'
import isArr from 'lodash/isArray'

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
        const {dataSet:data,dataFields} = this.props;

        const columnData = [];

        if(isArr(dataFields) && dataFields.length > 0){
            let columnIndex = 0;
            dataFields.forEach((e,i)=>{
                if(e === fieldsName) columnIndex = i;
            });

            //使用列索引获取数据
            data.forEach(e => {
                columnData.push(e[columnIndex]);
            });
        }

        return columnData
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
        this.setState({
            showFilterEditorWin:false,
        });
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
                        visible = {this.state.showFilterEditorWin}
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
