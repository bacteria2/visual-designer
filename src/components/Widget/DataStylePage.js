import React from 'react'
import { Card, Divider, Button ,Icon,message} from 'antd'
import { DropTarget } from 'react-dnd'
import styles from './DataStylePage.css'

const spec = {
    drop (props, monitor){
        const {configItem:{key,label,type},dataItemId} = props
        const {field:rawField} = monitor.getItem()
        //检查存在field
        if(!rawField){
            message.error(`列信息不完整,field is empty`)
            return
        }
        //拖入检测

        //正常添加
        let {field,alias,fType,groupName}=rawField
        props.onDrop({key,label,type,dataItemId,value:{field,alias},fType,groupName})
    },
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }
}

function WidgetTypes(props){
    const types = props.widgetTypes.map((item,index) =>{
       return <Button style={(props.curSeriesType === item)?{backgroundColor:'#FFF6C2'}:{}} key={`${item}_${index}`} size='small' onClick={ ()=>{props.widgetTypesChange(item,props.dataItemId)}}>{item}</Button>
    })
    return(<div style={{display:'inlineFlex',lineHeight:'30px'}}><span>表现形式: </span><Button.Group>{types}</Button.Group></div>)
}

function VisualItem (props) {
    const {label,onItemClick,configItem,connectDropTarget,dataItemId} = props
    return (<React.Fragment>
           {connectDropTarget(<div className={styles.visualItem} onClick={()=>onItemClick(configItem,dataItemId)}>
               {label}
           </div> )}
           </React.Fragment>)
}

function BindVisualItem(props){
    const {index,value,dataItemId,vItem,label} = props
    return (<li  className={styles.bindVisualItem} onClick={()=>props.onBindVisualItemClick(props)}>
        <div>
            <span className={styles.bindVisualItemLabel}>{label}</span>
            <span>{value.alias}</span>
            <Icon type='delete' onClick={e => {
                e.stopPropagation()
                props.onBindVisualItemDeleteClick({index,dataItemId,vItem})
            }}/>
        </div>
    </li>)
}


let Drop = DropTarget(['Dimension','Measure','level'],spec,collect)(VisualItem)

class DataStylePage extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render () {
           let visualItems = {};
           let othersvd = {};
           const {dataStyleDefine,visualItemClick,dataItemId,widgetTypeChange,widgetTypes,othersSettingClick,onDrop,curSeriesType,visualDataItems,onBindVisualItemClick,onBindVisualItemDeleteClick} = this.props
           if(dataStyleDefine){
               const {visual = [],others = {} } = dataStyleDefine
               visualItems = visual.map((item,index)=>{
                   return (<Drop
                       label={item.label}
                       dataItemId = {dataItemId}
                       configItem = {item}
                       onItemClick ={visualItemClick}
                       key={`${item}_${index}`}
                       onDrop ={onDrop}
                   />)
               })
               const target = others.target
               othersvd = <Button onClick={()=>othersSettingClick(target,dataItemId)} style={{width:'100%'}}>其他设置</Button>
           }
           const VisualItemVnodes = (visualDataItems && visualDataItems.map((item,index)=>{
               const {label,value} = item
               return (<BindVisualItem
                                       value = {value}
                                       key = {index}
                                       label = {label}
                                       dataItemId ={dataItemId}
                                       index = {index}
                                       vItem = {item}
                                       onBindVisualItemClick = {onBindVisualItemClick}
                                       onBindVisualItemDeleteClick = {onBindVisualItemDeleteClick}
               />)
           }))
           return(<div>
               <WidgetTypes dataItemId={dataItemId} widgetTypesChange={widgetTypeChange} widgetTypes={widgetTypes} curSeriesType={curSeriesType}/>
               <div className={styles.visualBox}>
                   {visualItems}
               </div>
               <ul style={{listStyle:'none',padding:0}}>
                   {VisualItemVnodes}
               </ul>
               <div>
                   {othersvd}
               </div>

           </div>)
    }
}

export default DataStylePage