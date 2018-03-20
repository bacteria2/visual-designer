import React from 'react';
import Slicer from './index'
import CubeSchema from '../../../src/routes/DataSource/Cube/CubeSchema'
import { DragDropContext,DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import  FieldsType from '../../../src/routes/DataSource/Cube/FieldsType'
import update from 'immutability-helper'
const dataSet = [
    ['中国','外国','日本'],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
    ['电话投诉',2,3],
    ['哈哈哈',5,6],
];

const dataFields = ['来源','规格','c'];

@DragDropContext(HTML5Backend)
export default class SlicerDemo extends React.PureComponent{

    state = {
        filterData : [],
    };

    handleDrop = (monitor) => {
        const {field,alias,fieldId} = monitor.field;
        const newFilterDimension = {alias,field,fieldId,hide:false, ftype : "dimension"}
        this.setState(update(this.state,{
            filterData:{$push:[newFilterDimension]},
        }));
    };

    render(){
        const containerStyle = {float:'left',height:'800px',width:'230px',marginLeft:'20px',position:'relative',display:'flex'};

        return (<div><div style={{width:230,height:'100px',float:'left',display:'flex'}}>
            <Slicer accepts={[FieldsType.DIMENSION]}
                    onDrop={this.handleDrop}
                    fields={dataFields}
                    dataSet={dataSet}
                    filterData={this.state.filterData}
                    onChange={(v)=>{
                console.log(v);
                return this.setState({filterData:v});}} />
        </div><div style={containerStyle}>
            <CubeSchema getData={()=>{}} onChange={()=>{}} />
        </div></div>)
    }

}