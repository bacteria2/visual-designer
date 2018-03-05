import React from 'react';
import CubeSchema from './index'
import { DragDropContext,DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import  FieldsType from '../FieldsType'
import update from 'immutability-helper'

@DragDropContext(HTML5Backend)
export default class demo extends React.PureComponent{

    getMDX(mdx){
        console.log(mdx);
    }

    render(){
        const containerStyle = {float:'left',height:'800px',width:'200px',position:'relative',display:'flex'};
        return (<div style={{height:'800px'}}>
            <div style={containerStyle}>
                <Drop accepts={[FieldsType.DIMENSION,FieldsType.MEASURE]}>拖入元素</Drop>
            </div>
            <div style={{...containerStyle,marginLeft:'20px'}}>
                <CubeSchema getData={this.getMDX.bind(this)} />
            </div>
        </div>)
    }
}

const containerStyle = {
    boxSizing:"border-box",
    borderWidth:'1px',
    borderStyle:'solid',
    minHeight:'300px',
};

const dustbinTarget = {
    drop(props, monitor,el){
        const options = monitor.getItem();
        el.dropItem(options);
    },
};

@DropTarget(props => props.accepts,dustbinTarget,(connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
class Drop extends React.PureComponent {

    state = {
        data:[],
    };

    dropItem(dropOption){
        this.setState(
            update(this.state,{
                data:{$push:[dropOption.field.alias]},
            })
        )
    }

    render(){

        const { isOver, canDrop, connectDropTarget } = this.props,
            isActive = isOver && canDrop;

        let backgroundColor = "rgba(0,0,0,0)";
        let borderColor = '#fbfbfb';
        if (isActive) {
            backgroundColor = "rgba(183,221,226,0.5)";
            borderColor = "rgba(183,221,226,0.5)";
        } else if (canDrop) {
            borderColor = 'dodgerblue'
        }

        return connectDropTarget(<div style={{ ...containerStyle, borderColor, backgroundColor }}>
            {
                this.state.data.length > 0 ?
                <ol>
                    {this.state.data.map(e=>(<li>{e}</li>))}
                </ol>
                :'拖入元素'
            }

        </div>)
    }

}

