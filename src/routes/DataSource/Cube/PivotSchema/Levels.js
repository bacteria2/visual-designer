import React from 'react';
import {Icon,Dropdown} from 'antd';
import styles from './fieldsEditor.css'
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'
import isArray from 'lodash/isArray'

const containerStyle = {
    boxSizing:"border-box",
    borderWidth:'1px',
    borderStyle:'solid',
};

const dustbinTarget = {
    // drop(props, monitor){
    //     const options = monitor.getItem();
    //     props.onDrop({...options,
    //         targetLevelIndex:props.index,
    //     })
    // },
};

// @DropTarget(props => props.accepts,dustbinTarget,(connect, monitor) => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     canDrop: monitor.canDrop(),
// }))
export default class Level extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            hoverIndex:-1,
        }
    }

    move(hoverIndex){
        this.setState({hoverIndex})
    }

    onDrop(){
        this.props.onDrop(...arguments,this.state.hoverIndex);
        this.setState({hoverIndex:-1});
    }

    handleExchangePos = (levelIndex,srcIndex) =>{
        this.props.onExchangePos(levelIndex,srcIndex,this.state.hoverIndex);
        this.setState({hoverIndex:-1});
    };

    ifFieldCanEdit(fieldId){
        let flag = true;
        if(isArray(this.props.unEditFields) && this.props.unEditFields.length > 0){
            this.props.unEditFields.forEach(e=>{
                if(e === fieldId) flag = false;});
        }
        return flag
    }

    render() {

        // const { isOver, canDrop, connectDropTarget } = this.props,
        //     isActive = isOver && canDrop;

        let backgroundColor = "rgba(0,0,0,0)";
        let borderColor = '#fbfbfb';
        // if (isActive) {
        //     backgroundColor = "rgba(183,221,226,0.5)";
        //     borderColor = "rgba(183,221,226,0.5)";
        // } else if (canDrop) {
        //     borderColor = 'dodgerblue'
        // }
        const level = this.props.level;
        const index = this.props.index;

        return (
            <div className={styles.ds_table} style={{ ...containerStyle, borderColor, backgroundColor }}>
                <p aria-expanded={level.expanded} onClick={this.props.toggle}>
                    <i/>
                    <span className={styles.level} style={{display:'inline'}}/>
                    {level.name}
                    <span onClick={this.props.delete} className={styles.level_delete}/>
                    <span onClick={this.props.rename} className={styles.level_update}/>
                </p>

                <ul style={{ display: level.expanded ? 'block' : 'none' }}>
                    {level.fields.map((e, i) => (
                        [ i === this.state.hoverIndex &&
                            <div key="diver"  style={{borderBottom:'dodgerblue 1px solid'}}/>,
                        <Item field={e}
                              accepts = {this.props.accepts.concat(['level'])}
                              typeDic={this.props.dimensionTypeDic}
                              fieldIndex={i}
                              levelIndex={index}
                              move={this.move.bind(this)}
                              getMenu={this.ifFieldCanEdit(e.fieldId) && this.props.getMenu}
                              onExchangePos = {this.handleExchangePos}
                              key={i}
                              groupName = {level.name}
                              type={'level'}
                              onDrop = {this.onDrop.bind(this)}/>]
                    ))}
                </ul>
            </div>);
        }
}

// srcTable,srcLevelIndex,targetLevelIndex,field,fieldIndex
const boxSource = {
    beginDrag(props) {
        return {
            srcLevelIndex: props.levelIndex,
            fieldIndex: props.fieldIndex,
            field: props.field,
            // groupFields:props.groupFields,
            groupName:props.groupName,
        }
    },
    endDrag(props, monitor, component){

    },
};


const itemDustbinTarget = {
    drop(props, monitor){
        const options = monitor.getItem();
        if(!options.groupName ){
            props.onDrop({...options,
                targetLevelIndex:props.levelIndex,
            })
        }else{
            //交换顺序
            props.onExchangePos(props.levelIndex,monitor.getItem().fieldIndex);
        }

    },
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().fieldIndex;
        const hoverIndex = props.fieldIndex;

        // Don't replace items with themselves
        // if (dragIndex === hoverIndex) {
        //     return
        // }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.move(hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
};

@DropTarget(props => props.accepts,itemDustbinTarget,(connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
@DragSource(props=>props.type, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class Item extends React.Component {

    constructor(props){
        super(props);
        this.state={
            hover:false,
        }
    }

    render() {
        const {isDragging, connectDragSource,connectDropTarget } = this.props;
        const opacity = isDragging ? 0.4 : 1;
        const e = this.props.field;

        return connectDragSource(connectDropTarget(
            <div style={{ opacity }} key={e.fieldId}>
                <Dropdown overlay={this.props.getMenu(e, e, this.props.fieldIndex, this.props.levelIndex)} key={e.fieldId} trigger={['contextMenu']}>
                <li className={this.props.typeDic[e.covertType ? e.covertType : e.dataType]}>{e.alias}
                    <Dropdown overlay={this.props.getMenu(e, e, this.props.fieldIndex, this.props.levelIndex)} trigger={['click']}>
                        <Icon type="caret-down"/>
                    </Dropdown>
                </li>
            </Dropdown></div>))
    }
}