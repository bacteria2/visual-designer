import React from 'react'
import propTypes from 'prop-types'
import { Card, Icon, message } from 'antd'
import styles from './index.css'
import { DropTarget } from 'react-dnd'
import { List } from 'immutable'
import classnames from 'classnames/bind';
import Immutable from 'immutable';


const cx=classnames.bind(styles);

const spec = {
  drop (props, monitor, component) {
    const {field:rawField} = monitor.getItem()
    console.log(props, monitor, component, rawField)
    //判断当前节点是否超过设置上限
    if(props.limit>0&&props.limit<=props.itemList.filter(el=>el.get('key')===props.uniqueId).size){
      message.error(`已达到此节点上限 '${props.limit}'`)
      return
    }

    //检查存在field
    if(!rawField){
      message.error(`列信息不完整,field is empty`)
      return
    }

    //检查是否符合接受类型
    if(!props.acceptTypes.some(ele=>rawField.dataType.toUpperCase()===ele.toUpperCase())){
      message.error(`列类型:${rawField.dataType} 不符合下列接受类型${props.acceptTypes.join(',')}`)
      return
    }

    //正常添加
    let {field,alias}=rawField
    props.onDrop(Immutable.fromJS({key:props.uniqueId,value:{field,alias}}))
  },
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

function DropBox(props){
  let { label, onDeleteClick, onItemClick,uniqueId, isOver, canDrop,connectDropTarget, itemList } = props
  return (<Card title={label} className={styles.dropBox} bodyStyle={{padding: 0}}>
      { connectDropTarget(<div className={cx({canDrop:canDrop,over:isOver})}>
        <ul>
          {itemList&&itemList.filter(el=>el.get('key')===uniqueId).toJS().map(({key, value:{alias='item', field}},index) => (
            <li key={field+index} className={styles.boxItem} onClick={e =>onItemClick()}>
              <div>
                <span>{alias}</span>
                <Icon type='delete' onClick={e => {
                  e.stopPropagation()
                  onDeleteClick(uniqueId,field)
                }}/>
              </div>
            </li>))}
        </ul>
      </div>)}
    </Card>
  )
}

let Dimension=DropTarget('Dimension', spec, collect)(DropBox),
  Measure=DropTarget('Measure', spec, collect)(DropBox);

Dimension.defaultProps=Measure.defaultProps = {
  label: 'item',
  acceptTypes: ['STRING'],
  onDrop(){},
}

Dimension.propTypes= Measure.propTypes = {
  label: propTypes.string,
  limit: propTypes.number,
  itemList: propTypes.instanceOf(List),
  id: propTypes.string,
  type: propTypes.string,
  acceptTypes: propTypes.array,
  onDeleteClick: propTypes.func,
  onItemClick: propTypes.func,
  onDrop:propTypes.func,
  uniqueId:propTypes.string.isRequired,
}

export default {Dimension, Measure}