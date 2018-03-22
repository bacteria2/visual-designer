import React from 'react';
import PropTypes from 'prop-types';
import style from './slicer.css'
import  FilterDimension from './FilterDimension'
import update from 'immutability-helper'
import FilterEditorModal from './FilterEditorModal'
import GroupFilterEditorModal from './GroupFilterEditorModal'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import { DropTarget } from 'react-dnd'

const dustbinTarget = {
    drop(props, monitor){
        const options = monitor.getItem();
       if(props.onDrop) props.onDrop(options);
    },
};

const recursionTree = (data,key) => {
    if(isObject(data)){
        data.key = key + "";
        if(isArray(data.children)){
            data.children.forEach(e => {
                recursionTree(e,key + '-' + e.value);
            });
        }
    }
};


@DropTarget(props => props.accepts,dustbinTarget,(connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
/* 切片器 */
export default class Slicer extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            showFilterEditorWin:false,
            editFilterItem:{},
            columnData:[],
            dataMap:[],
        }
    }

    getColumnData(fieldsName){

        const {data} = this.props;
        let columnData = [];
        if(data && data.hasOwnProperty(fieldsName)){
            columnData = data[fieldsName];
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
        const columnData = this.getColumnData(editFilterItem.groupName?editFilterItem.groupName:editFilterItem.alias);
        let dataList = [];
        const generateList = (data,parentKey) => {
            for (let i = 0; i < data.length; i++) {
                let node = data[i];
                if(!isObject(node)) node = {key:parentKey + '-' + node,value:node};
                const {key,value,name} = node;
                dataList.push({title:key,value,key,name});
                if (node.children) {
                    generateList(node.children,node.key)
                }
            }
        };

        if(editFilterItem.groupName){
            //递归赋值Key
            if(isArray(columnData)){
                columnData.forEach(e=>{
                    recursionTree(e,e.value);
                });
            }
            generateList(columnData,'');
        }
        this.editIndex = index;
        this.setState({
            showFilterEditorWin:true,
            editFilterItem,
            dataMap:dataList,
            columnData,
        });


    };

    handleValueChange = (v) => {
        const newData = update(this.props.filterData,{[this.editIndex]:{values:{$set:v}}});
        this.setState({
            showFilterEditorWin:false,
        });
        if(this.props.onChange){
            this.props.onChange(newData);
        }
    };

    render(){
        const { isOver, canDrop, connectDropTarget } = this.props,
            isActive = isOver && canDrop;

        let backgroundColor = "rgba(0,0,0,0)";
        let borderColor = 'rgba(0,0,0,0)';
        if (isActive) {
            backgroundColor = "rgba(183,221,226,0.5)";
            borderColor = "rgba(183,221,226,0.5)";
        } else if (canDrop) {
            borderColor = 'dodgerblue';
        }

        return connectDropTarget(<div className={style.mainWrap} style={{borderColor,backgroundColor}}>
                <FilterDimension data={this.props.filterData}
                                 onRemove={this.removeHandle}
                                 onHide = {this.handleHide}
                                 onEdit = {this.handleStartEditor}/>
            {
                this.state.editFilterItem &&
                (this.state.editFilterItem.groupName && isArray(this.state.editFilterItem.groupFields) ?
                    <GroupFilterEditorModal
                        visible = {this.state.showFilterEditorWin}
                        defaultValue = {this.state.editFilterItem.values}
                        groupFields = {this.state.editFilterItem.groupFields}
                        dataList = {this.state.columnData}
                        dataMap = {this.state.dataMap}
                        onOK = {this.handleValueChange}
                        onCancel = {()=>{this.setState({showFilterEditorWin:false})}}/>
                    :
                    <FilterEditorModal
                    visible = {this.state.showFilterEditorWin}
                    defaultValue = {this.state.editFilterItem.values}
                    dataList = {this.state.columnData}
                    onOK = {this.handleValueChange}
                    onCancel = {()=>{this.setState({showFilterEditorWin:false})}}/>)
            }

            </div>)
    }
    
}

Slicer.propTypes = {
    dataSet : PropTypes.array,  //数据集，和数据项对应
    filterData : PropTypes.array,  //数据项
};
