import React from 'react'
import {  DragSource, DropTarget } from 'react-dnd';
import styles from './membersSort.css'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'

//函数:用于计算拖拽的对象是位于目标对象的位置（上、下？）
function dragDirection(
    dragIndex,
    hoverIndex,
    initialClientOffset,
    clientOffset,
    sourceClientOffset,
) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        return 'downward';
    }
    if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return 'upward';
    }
}

let DnDRow = (props) => {
    const {
        isOver,
        connectDragSource,
        connectDropTarget,
        value,
        dragRow,
        clientOffset,
        sourceClientOffset,
        initialClientOffset,
        editIndex,
        ...restProps
    } = props;

    let className = '';

    if (isOver && initialClientOffset) {
        const direction = dragDirection(
            dragRow.index,
            restProps.index,
            initialClientOffset,
            clientOffset,
            sourceClientOffset
        );
        if (direction === 'downward') {
            className += styles.drop_over_downward;
        }
        if (direction === 'upward') {
            className += styles.drop_over_upward;
        }
    }

    if(editIndex !== -1){
       className += " " + styles.p_normal;
    }

    if(editIndex === restProps.index) {
        className += " " + styles.edit_p;
    }

    const handleButtonClick = () => {
        if(editIndex === restProps.index ){
            props.onRename(this.newName);
            this.newName = '';
        }else{
            props.onStartRename();
        }
    };

    let renameModal = false,text = value,alias ;

    if(isObject(value)){
        renameModal = true;
        if(isString(value.value)){
            text = value.value;
        }else if(isObject(value.value)){
            text = '';
            // value格式： {年:2017,月:12}
            for(let key in value.value){
                if(value.value.hasOwnProperty(key) && key !== 'key'){
                    text += value.value[key] + '(' + key + ')';
                }
            }
        }
        alias = value.name || text ;
    }

    // return connectDragSource(
    //     connectDropTarget(<div  className={styles.dndRowWrap}>
    //         <p contentEditable={editIndex === restProps.index}
    //            onInput={e => this.newName = e.currentTarget.innerText}
    //            className={className}>{alias} {editIndex !== restProps.index && value.name && <span style={{color:props.disabled?'#eee':'#aaa'}}>{' - ' + text}</span>}</p>
    //         {!props.disabled && renameModal && editIndex === restProps.index && <div className={styles.dndRow_button + ' ' + styles.show} onClick={handleButtonClick}>保存</div>}
    //         {!props.disabled && renameModal && editIndex === -1 && <div className={styles.dndRow_button } onClick={handleButtonClick}>重命名</div>}
    //     </div>)
    // );
    return connectDragSource(
        connectDropTarget(<div  className={styles.dndRowWrap}>
            <p contentEditable={editIndex === restProps.index}
               onInput={e => this.newName = e.currentTarget.innerText}
               className={className}>{alias} {editIndex !== restProps.index && value.name && <span style={{color:'#aaa'}}>{' - ' + text}</span>}</p>
            { renameModal && editIndex === restProps.index && <div className={styles.dndRow_button + ' ' + styles.show} onClick={handleButtonClick}>保存</div>}
            { renameModal && editIndex === -1 && <div className={styles.dndRow_button } onClick={handleButtonClick}>重命名</div>}
        </div>)
    );
};

const rowSource = {
    beginDrag(props) {
        return {
            index: props.index,
        };
    },
    canDrag(props){
        return !props.disabled && (props.editIndex === -1)
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        props.moveRow(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};

export default DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
}))(
    DragSource('row', rowSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        dragRow: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
    }))(DnDRow)
);