import React from 'react';
import {Icon,Popconfirm} from 'antd';
import { DropTarget } from 'react-dnd';
import styles from './dynamicSeries.css'
import isArray from 'lodash/isArray'

const containerStyle = {
    boxSizing:"border-box",
    borderWidth:'1px',
    borderStyle:'solid',
    flex:'1 1 0',
    overflow:'auto',
    marginBottom: '1px',
};

const dustbinTarget = {
    drop(props, monitor) {
      if(props.onDrop){
          props.onDrop(monitor.getItem())
      }
    },
};

@DropTarget(props => props.accepts,dustbinTarget,(connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class SplitListContainer extends React.PureComponent{

    //获取动态序列拆分维度列表
    getSplitList(){
        const {dimension} = this.props;
        if(dimension){
            const {split} = dimension;
            if(isArray(split) && split.length > 0){
                const items = split.map((e,i)=>(
                    <li key={i + e.alias} onClick={this.props.onClick.bind(null,e,i)} className={
                        styles.splitDimensionItem + ' '
                        + (this.props.editSplit && this.props.editSplit.alias === e.alias?styles.splitDimensionItemActive:'')}>
                        {e.groupName && <span className={styles.level} />}
                        <span>{e.groupName && e.groupName + ' - '}{e.alias}</span>
                        <Popconfirm title="确定要删除?" onConfirm={(e)=>{
                            this.props.onDelete.call(null,i);e.stopPropagation();}}  okText="Yes" cancelText="No">
                            <Icon type="delete" title="删除" style={{marginLeft: 'auto',cursor:'pointer'}}/>
                        </Popconfirm>
                    </li>));
                return (<ul>{items}</ul>)
            }
        }
    }

    render(){
        const {  isOver,canDrop, connectDropTarget } = this.props,
            isActive = isOver && canDrop;

        let backgroundColor = "rgba(0,0,0,0)";
        let borderColor = '#fbfbfb';
        if (isActive) {
            backgroundColor = "rgba(183,221,226,0.5)";
            borderColor = "rgba(183,221,226,0.5)";
        } else if (canDrop) {
            borderColor = 'dodgerblue'
        }

        return connectDropTarget(<div style={{...containerStyle,backgroundColor,borderColor}}>
                <h1  className={styles.modalTitle}>动态序列拆分维度</h1>
                     <div className={styles.modalSplitList}>
                        {this.getSplitList()}
                     </div>
                </div>)

    }
}