import React from 'react'
import propTypes from 'prop-types'
import { Card, Icon, message,Switch ,Tooltip ,Popconfirm} from 'antd'
import styles from './index.css'
import { DropTarget } from 'react-dnd'
import { List } from 'immutable'
import classnames from 'classnames/bind';
import Immutable from 'immutable';
import uuid from 'uuid/v1'


const cx=classnames.bind(styles);

const spec = {
  drop (props, monitor, component) {
    const {field:rawField,groupName} = monitor.getItem()
    //判断当前节点是否超过设置上限
    if(props.limit>0&&props.limit<=props.itemList.filter(el=>el.get('key')===props.uniqueId).size){
      message.error(`已达到此节点上限 '${props.limit}'`)
      return
    }
    const {canDynamic = false,isDynamic = false,itemList=List()} = props
    //检测动态序列的情况下只允许1个字段
      if(canDynamic && isDynamic && itemList.filter(el=>el.get('key')===props.uniqueId).size === 2){
          message.warning('动态序列数据绑定不能超过2个字段')
          return
      }
    //检查存在field
    if(!rawField){
      message.error(`列信息不完整,field is empty`)
      return
    }

     const covertType = rawField.covertType || rawField.dataType

    //检查是否符合接受类型
    if(!props.acceptTypes.some(ele=> covertType.toUpperCase() === ele.toUpperCase())){
      message.error(`列类型:${rawField.dataType} 不符合下列接受类型${props.acceptTypes.join(',')}`)
      return
    }

    //正常添加
    let {field,alias,fType,fieldId}=rawField

    //生成id
    let id = uuid();

    //共用的输出
    let commonOut = {id,key:props.uniqueId,value:{field,alias},fType,groupName,fieldId,dataType:covertType}
    if(props.widgetTypes){
        if(canDynamic && isDynamic){
            props.onDynamicDrop(Immutable.fromJS({...commonOut,seriesType:props.widgetTypes[0]}))
        }else{
            props.onDrop(Immutable.fromJS({...commonOut,seriesType:props.widgetTypes[0]}))
        }
    }else{
        props.onDrop(Immutable.fromJS(commonOut))
    }
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
     let { label, onDeleteClick,onDeleteDynamicItem, onItemClick,onDynamicItemClick,uniqueId, isOver, canDrop,connectDropTarget, itemList,dataItemId,canDynamic,isDynamic=false,handleConfirmSetDynamic,handleDynamicSplit} = props
     //const {canDynamic,isDynamic} = this.state
     let extra = (<Tooltip placement="topRight" title='切换动态序列'>
                     <Popconfirm placement="topRight" title='切换面板会清空数据项及其配置，是否继续？' onConfirm={handleConfirmSetDynamic}  okText="继续" cancelText="取消">
                       <div>
                       <Switch size="small" checked = {isDynamic}/>
                       </div>
                     </Popconfirm>
                  </Tooltip>)
     return (<Card title={(canDynamic && isDynamic)?`动态:${label}`:label} className={(canDynamic && isDynamic)?styles.dropBoxDymic:styles.dropBox} bodyStyle={{padding: 0}} extra = {canDynamic?extra:null}>
         { connectDropTarget(<div className={cx({canDrop:canDrop,over:isOver})}>
           <ul>
               {itemList&&itemList.filter(el=>el.get('key')===uniqueId).toJS()
                   .map(({key, value:{alias='item', field},seriesType ,id},index) => {
                       return (<li key={field+index}
                                   className={seriesType?styles.boxItem:styles.boxItemNoClick}
                                   style={(seriesType&&(id===dataItemId))?{backgroundColor:'#FFF6C2'}:{}}
                                   onClick={()=>{
                                       if(seriesType){
                                           if(canDynamic && isDynamic){
                                               onDynamicItemClick(key,id)
                                           }else{
                                               onItemClick(key,id)
                                           }
                                       }
                                       }}>
                         <div>
                           <span className={styles.textTitle}>{alias}</span>
                           <Icon type='delete' onClick={e => {
                               e.stopPropagation()
                               if(canDynamic && isDynamic){
                                   onDeleteDynamicItem(id)
                               }else{
                                   onDeleteClick(id)
                               }
                           }}/>
                             {(canDynamic && isDynamic) && <Icon type='tool' onClick={e=>{e.stopPropagation();handleDynamicSplit(id,alias)}}/>}
                         </div>
                       </li>)})}
           </ul>
         </div>)}
     </Card>)
  }




let Dimension=DropTarget(['Dimension','level'], spec, collect)(DropBox),
    Measure=DropTarget(['Measure','level'], spec, collect)(DropBox),
    All = DropTarget(['Measure','Dimension','level'], spec, collect)(DropBox);


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
  widgetTypes:propTypes.array,
  onDrop:propTypes.func,
  onDynamicDrop:propTypes.func,
  uniqueId:propTypes.string.isRequired,
}

All.propTypes = Dimension.propTypes

export default {Dimension, Measure, All}