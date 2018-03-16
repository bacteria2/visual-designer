import React from 'react';
import {Icon,Dropdown} from 'antd';
import styles from './fieldsEditor.css'
import  FieldsType from '../FieldsType'
import  isArray from 'lodash/isArray'
import { DragSource, DropTarget } from 'react-dnd';

const containerStyle = {
    boxSizing:"border-box",
    borderWidth:'1px',
    borderStyle:'solid',
};

const dustbinTarget = {
    drop(props, monitor) {
        const options = monitor.getItem();
        if(options.srcLevelIndex === undefined){
            //从度量或维度中移入
            props.onDrop(options);

        }else{

            if(props.type === FieldsType.DIMENSION){
                if(options.field.fType !== props.type){
                    //将属性添加到维度
                    props.onLevelConvert({levelIndex:options.srcLevelIndex,...options},'dimensionTables');
                }else{
                    props.removeLevel({levelIndex:options.srcLevelIndex,fieldIndex:options.fieldIndex});
                }
            }else{
                if(options.field.fType !== props.type){
                    //将属性添加到度量
                    props.onLevelConvert({levelIndex:options.srcLevelIndex,...options},'measureTables');
                }else{
                    props.removeLevel({levelIndex:options.srcLevelIndex,fieldIndex:options.fieldIndex});
                }
            }

        }
    },
};

@DropTarget(props => props.accepts,dustbinTarget,(connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class Dimension extends React.PureComponent {
    constructor(props){
        super(props);

        this.measureTypeDic = { };
        this.measureTypeDic[FieldsType.STRING] = styles.cube_style_measure_str ;
        this.measureTypeDic[FieldsType.INTEGER] = styles.cube_style_measure_int ;
        this.measureTypeDic[FieldsType.DECIMAL] = styles.cube_style_measure_decimal ;
        this.measureTypeDic[FieldsType.DATE] = styles.cube_style_measure_date ;

        this.dimensionTypeDic = { };
        this.dimensionTypeDic[FieldsType.STRING] = styles.cube_style_dimension_str ;
        this.dimensionTypeDic[FieldsType.INTEGER] = styles.cube_style_dimension_int ;
        this.dimensionTypeDic[FieldsType.DECIMAL] = styles.cube_style_dimension_decimal ;
        this.dimensionTypeDic[FieldsType.DATE] = styles.cube_style_dimension_date ;

    }

    fieldInLevel = (field)=>{
        let flag = true;
        if(this.props.levels) this.props.levels.forEach(level=>{
            level.fields.forEach(e=>{
                if(e.fieldId === field.fieldId) flag = false;
            })
        });
        return flag;
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
        const {  isOver,canDrop, connectDropTarget } = this.props,
            isActive = isOver && canDrop,
        tables = this.props.data,
        type = this.props.type;

        let typeDic = null;

        if(type === FieldsType.MEASURE){
            typeDic = this.measureTypeDic
        }else{
            typeDic = this.dimensionTypeDic
        }
        let backgroundColor = "rgba(0,0,0,0)";
        let borderColor = '#fbfbfb';
        if (isActive) {
            backgroundColor = "rgba(183,221,226,0.5)";
            borderColor = "rgba(183,221,226,0.5)";
        } else if (canDrop) {
            borderColor = 'dodgerblue'
        }

        let ele = [];
        for(let key in tables){
            const table = tables[key];
            ele.push(<div className={styles.ds_table} key = {key} >
                <p aria-expanded={table.expanded} onClick={this.props.toggle.bind(null,table.tableId,type)}>
                    <i/> {table.alias}</p>
                <ul style={{display:table.expanded?'block':'none'}}>
                    {table.fields.map((e,i)=> {
                            if (this.fieldInLevel(e)) {
                                return (<Item field={e}
                                             typeDic={typeDic}
                                             table={table}
                                             index={i}
                                             getMenu={this.ifFieldCanEdit(e.fieldId)&&this.props.getMenu}
                                             key={i}
                                             type={this.props.type}
                                              unDrap = {this.props.unDrap}
                                />)
                            }else{
                                return null
                            }
                        }
                    )}
                </ul>
            </div>);
        }

        return connectDropTarget(<div style={{...containerStyle,flex:'auto', borderColor,backgroundColor,marginBottom:'0px' }}>{ele}</div>)
    }
}

const boxSource = {
    beginDrag(props) {
        return {
            srcTable: props.table,
            fieldIndex: props.index,
            field: props.field,
        }
    },
    canDrag(props){
        return !props.field.disable
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
        const typeDic = this.props.typeDic;
        const table = this.props.table;
        const i = this.props.index;
        const dom = (<div style={{ opacity }} key={e.fieldId} onContextMenu={e=>{e.stopPropagation();e.preventDefault()}}>
                {this.props.getMenu ?
                    <Dropdown overlay={this.props.getMenu(table, e, i)}  trigger={['contextMenu']}>
                        <li className={typeDic[e.covertType ? e.covertType : e.dataType] + " " + (e.disable && styles.disable)} >
                            {e.alias}
                            <Dropdown overlay={this.props.getMenu(table, e, i)} trigger={['click']}>
                                <Icon type="caret-down"/>
                            </Dropdown>
                        </li>
                    </Dropdown> :
                    <li onContextMenu={(e)=>{e.preventDefault()}} className={typeDic[e.covertType ? e.covertType : e.dataType]} style={{cursor:'default'}}>{e.alias}</li>
                }
            </div>)

        if(this.props.unDrap){
            //不允许拖动
            return dom
        }else{
            return connectDragSource(dom)
        }
    }
}