import React from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import  {Icon} from 'antd'
import styles_normal from './fieldsEditor.css'
import styles_columnModel from './fieldsEditor_columnModel.css'
import isArray from 'lodash/isArray'
import  FieldsType from '../../Cube/FieldsType'
import update from 'immutability-helper'
import uuid from 'uuid/v1'

const itemDustbinTarget = {
    drop(props, monitor){
        const options = monitor.getItem();
        //交换顺序
       if(props.onDrop) props.onDrop(options);
    },
};

let styles = styles_normal;

@DropTarget(props => props.accepts,itemDustbinTarget,(connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class FieldsEditor extends React.PureComponent{
    constructor(props){
        super(props);
        this.fieldTypeDic = { };
        this.fieldTypeDic[FieldsType.STRING] = styles.field_type_str ;
        this.fieldTypeDic[FieldsType.INTEGER] = styles.field_type_int ;
        this.fieldTypeDic[FieldsType.DECIMAL] = styles.field_type_decimal ;
        this.fieldTypeDic[FieldsType.DATE] = styles.field_type_date ;
        this.state = {
            editField:{
                tableName:'',
                field:'',
                alias:'', //别名
            },
            editTable:{
                tableName:'',
                alias:'',
            },
            shrinkTableSchemas:[],
        };
    }

    componentWillMount(){
        if(this.props.columnModel){
            styles = styles_columnModel
        }else{
            styles = styles_normal
        }
    }

    handleStartRename = (tableName,field,alias) => {
        this.setState(update(this.state,{
            editField:{
                tableName:{$set:tableName},
                field:{$set:field},
                alias:{$set:alias||field},
            },
        }));
    };

    handleStartTableRename = (tableName,alias) => {

        this.setState(update(this.state,{
            editTable:{
                tableName:{$set:tableName},
                alias:{$set:alias||tableName},
            },
        }));
    };

    handleFieldsNameChange = (event) => {
        const alias = event.target.value;
        this.setState(update(this.state,{
            editField:{
                alias:{$set:alias},
            },
        }));
    };

    handleTableNameChange = (event) => {
        const alias = event.target.value;
        this.setState(update(this.state,{
            editTable:{
                alias:{$set:alias},
            },
        }));
    };
    handleTableRenameSave = () => {
        const {tableName,alias} = this.state.editTable;
        let tableIndex = -1,newTableSchema;
        this.props.value.tables.forEach((e,i)=>{if(e.name===tableName) tableIndex=i});
        if(alias === '' || tableName === alias){
            //取消别名
             newTableSchema = update(this.props.value,{
                tables:{
                    [tableIndex]:{
                       $merge:{alias:null},
                    },
                },
            });
        }else{
            //保存别名
             newTableSchema = update(this.props.value,{
                tables:{
                    [tableIndex]:{
                        $merge:{alias},
                    },
                },
            });
        }
        if(this.props.onUpdate){
            this.props.onUpdate(newTableSchema);
        }

        this.setState(update(this.state,{
            editTable:{
                tableName:{$set:''},
                alias:{$set:''},
            },
        }));
    };

    handleRenameSave = () => {
        // "field" : "SUMID",
        //     "role" : "Dimension",
        //     "dataType" : "String",
        //     "alias" : "SUMID",
        //保存别名
        const {tableName,field,alias} = this.state.editField;
        let tableIndex = -1,fieldIndex = -1;
        this.props.value.tables.forEach((e,i)=>{if(e.name===tableName) tableIndex=i});
        if(this.props.value.tables[tableIndex] && isArray(this.props.value.tables[tableIndex].fields)){
            this.props.value.tables[tableIndex].fields.forEach((e,i) => {if(e.field === field) fieldIndex = i});
        }

        if((alias==='' || field === alias) && fieldIndex !== -1){
            //取消别名
            const newTableSchema = update(this.props.value,{
                tables:{
                    [tableIndex]:{
                        fields:{
                            $splice:[[fieldIndex,1]],
                        },
                    },
                },
            });
            if(this.props.onUpdate){
                this.props.onUpdate(newTableSchema);
            }
        }else if(alias !=='' && field !== alias){

            if(fieldIndex === -1){
                let newTableSchema;
                //增加别名
                if(isArray(this.props.value.tables[tableIndex].fields)){
                    //存在 fields 属性
                     newTableSchema = update(this.props.value,{
                        tables:{
                            [tableIndex]:{
                                fields:{
                                    $push:[{field,fieldId:uuid(),alias}],
                                },
                            },
                        },
                    });
                }else{
                    //不存在 fields 属性
                    newTableSchema = update(this.props.value,{
                        tables:{
                            [tableIndex]:{
                                $merge:{fields:[{field,fieldId:uuid(),alias}]},
                            },
                        },
                    });
                }

                if(this.props.onUpdate){
                    this.props.onUpdate(newTableSchema);
                }
            }else{
                //修改别名
                const newTableSchema = update(this.props.value,{
                    tables:{
                        [tableIndex]:{
                            fields:{
                                [fieldIndex]:{
                                    alias:{$set:alias},
                                },
                            },
                        },
                    },
                });
                if(this.props.onUpdate){
                    this.props.onUpdate(newTableSchema);
                }
            }
        }

        this.setState(update(this.state,{
            editField:{
                tableName:{$set:''},
                field:{$set:''},
                alias:{$set:''},
            },
        }));
    };

    getFields(table){
        const {name:tableName,fields:aliasFields} = table;
        if(this.props.tableMapping){
            const fields = this.props.tableMapping[tableName.toUpperCase()];
            if(isArray(fields)) return fields.map(e=>{
                //查询 fields 是否存在别名
                const {COLUMN_NAME:fieldName,DATA_TYPE:dataType} = e;
                let alias = null ;

                if(isArray(aliasFields) && aliasFields.length > 0) {
                    aliasFields.forEach(e=>{
                        if(e.field === fieldName) alias = e.alias
                    });
                }

                let Item = 'li';
                if(this.props.columnModel) Item = dragWrap ;

                if(tableName === this.state.editField.tableName && fieldName === this.state.editField.field){
                    // 重命名编辑状态
                    return(<li key={fieldName}  className={this.fieldTypeDic[dataType]}>
                        <input className={styles.field_rename_input} onChange={this.handleFieldsNameChange} value={ this.state.editField.alias  || ''} />
                        <Icon type="check" onClick={this.handleRenameSave} className={styles.field_save_button}/></li>)
                }else{
                    return(<Item key={fieldName} tableName={tableName} fieldName={fieldName} alias={alias} className={this.fieldTypeDic[dataType]}>{alias?alias:(fieldName||'')} {alias && <span style={{color:'#ccc'}}>({fieldName})</span>}
                        <Icon type="edit" onClick={this.handleStartRename.bind(null,tableName,fieldName,alias)} className={styles.field_rename_button}/></Item>)
                }
            })
        }
    }

    handleToggleShrinkTableSchema = (tableName) => {
        let shrinkTableIndex = -1;
        this.state.shrinkTableSchemas.forEach((e,i)=>{
            if(e === tableName) shrinkTableIndex = i
        });

        if(shrinkTableIndex === -1){
            //收缩
            this.setState(update(this.state,{
                shrinkTableSchemas:{$push:[tableName]},
            }));
        }else{
            //展开
            this.setState(update(this.state,{
                shrinkTableSchemas:{$splice:[[shrinkTableIndex,1]]},
            }));
        }

    };

    getTables(){
       if(this.props.value && isArray(this.props.value.tables)) {
           //获取表的字段
           //***
           return this.props.value.tables.map((e,i)=>{

               const isShrink = this.state.shrinkTableSchemas.some(shrinkTable => shrinkTable === e.name);

               let title =  (<h3 onClick={this.handleToggleShrinkTableSchema.bind(null,e.name)} aria-expanded={!isShrink} className={styles.table_title}>
                   <span><i/></span>
                   <span className={styles.table_title_text}>{e.alias?e.alias:e.name}{e.alias && <span style={{color:'#ccc'}}>({e.name})</span>}</span>
                   <Icon type="edit" onClick={(event)=>{event.stopPropagation();this.handleStartTableRename(e.name,e.alias)}} className={styles.table_rename_button}/>
                   {!this.props.columnModel &&
                    <Icon type="close" onClick={this.props.onDelete.bind(null,i)} className={styles.delete_icon}/>}
               </h3>);

               if(this.state.editTable.tableName === e.name){
                   title =  (<h3 onClick={this.handleToggleShrinkTableSchema.bind(null,e.name)} aria-expanded={!isShrink} className={styles.table_title}>
                       <span><i/></span>
                       <input className={styles.field_rename_input} onChange={this.handleTableNameChange} value={ this.state.editTable.alias || ''}  onClick={(event)=>event.stopPropagation()}/>
                       <Icon type="check" onClick={(event)=>{event.stopPropagation();this.handleTableRenameSave()}} className={styles.table_save_button}/>
                       {!this.props.columnModel &&
                       <Icon type="close" onClick={this.props.onDelete.bind(null,i)} className={styles.delete_icon}/>}
                   </h3>);
               }

               return (<div key={i} className={styles.tablePanel}>
                   {title}
                   <div className={styles.table_fields + ' ' + (isShrink&&styles.isShrink)} >
                       {this.getFields(e)}
                   </div>
               </div>)});
       }
    }

    render(){
        const { isOver, canDrop, connectDropTarget,columnModel } = this.props,
            isActive = isOver && canDrop;
        let backgroundColor = "rgba(0,0,0,0)";
        let borderColor = 'rgba(0,0,0,0)';
        if (isActive && !columnModel) {
            backgroundColor = "rgba(183,221,226,0.5)";
            borderColor = "rgba(183,221,226,0.5)";
        } else if (canDrop && !columnModel) {
            borderColor = 'rgba(183,221,226,1)'
        }

        return connectDropTarget(<div className={styles.mainWrap} style={{backgroundColor,borderColor,flex:'1,1,0'}}>
            {this.getTables()}
        </div>)
    }
}

const boxSource = {
    beginDrag(props) {
        return {
            field: props.fieldName,
            tableName: props.tableName,
            alias: props.alias,
        }
    },
};

@DragSource(()=>'table', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class dragWrap extends React.PureComponent{
    render(){
        const { connectDragSource } = this.props;
        if(this.props.disabled){
            return <li className={this.props.className}>{this.props.children}</li>
        }else{
            return connectDragSource(<li className={this.props.className}>
                {this.props.children}
            </li>)
        }
    }
}