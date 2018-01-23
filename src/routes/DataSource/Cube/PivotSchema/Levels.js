import React from 'react';
import {Icon,Dropdown} from 'antd';
import styles from './fieldsEditor.css'
import { DragSource, DropTarget } from 'react-dnd';

const containerStyle = {
    boxSizing:"border-box",
    borderWidth:'1px',
    borderStyle:'solid'
};

const dustbinTarget = {
    drop(props, monitor){
        const options = monitor.getItem();
        props.onDrop({...options,
            targetLevelIndex:props.index
        })
    },
};

@DropTarget(props => props.accepts,dustbinTarget,(connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class Level extends React.PureComponent {

    render() {

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
        const level = this.props.level;
        const index = this.props.index;

        return connectDropTarget(
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
                        <Item field={e}
                              typeDic={this.props.dimensionTypeDic}
                              fieldIndex={i}
                              levelIndex={index}
                              getMenu={this.props.getMenu}
                              key={i}
                              type={'level'}/>
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
        }
    },
};

@DragSource(props=>props.type, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class Item extends React.Component {
    render() {
        const {isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0.4 : 1;
        const e = this.props.field;

        return connectDragSource(
            <div style={{ opacity }} key={e.fieldId}>
                <Dropdown overlay={this.props.getMenu(e, e, this.props.fieldIndex, this.props.levelIndex)} key={e.fieldId} trigger={['contextMenu']}>
                <li className={this.props.typeDic[e.covertType ? e.covertType : e.dataType]}>{e.alias}
                    <Dropdown overlay={this.props.getMenu(e, e, this.props.fieldIndex, this.props.levelIndex)} trigger={['click']}>
                        <Icon type="caret-down"/>
                    </Dropdown>
                </li>
            </Dropdown></div>)
    }
}