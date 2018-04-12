import React from 'react'
import {message,Modal} from 'antd'
import styles from './tables.css'
import TableEditor from './TableEditor'
import TableList from './TableList'
import { connect } from 'react-redux'
import { DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {queryTableSchemaList,deleteTableSchema,addTableSchema,updateTableSchema} from '../../../service/tableSchemaService'
import {getDBConnById} from '../../../service/DataConnService'
import update from 'immutability-helper'
import isArray from 'lodash/isArray'

@DragDropContext(HTML5Backend)
class Tables extends React.PureComponent{
    constructor(props){
        super(props);
        // const currentTableSchema = demoData[0];
        this.state = {
            tableSchemas:[],
            currentTableSchema:null,
        };
        this.projectId = props.project.currentProject.get('id')
    }

    async componentWillMount(){
        const list = await this.queryList();
        const currentTableSchema = list[0];
        //获取当前的数据源联系信息 dsInfo
        if(currentTableSchema && currentTableSchema.connId){
            const dsInfo = await this.getDsInfo(currentTableSchema.connId);
            this.setState({
                tableSchemas:list,
                currentTableSchema,
                dsInfo,
            });
        }else{
            this.setState({
                tableSchemas:list,
                currentTableSchema,
            });
        }

    }

    async getDsInfo(id){
        const connRep = await getDBConnById(id);
        if(connRep.success){
            return connRep.data
        }else{
            message.error("获取数据源信息失败")
        }
    }

    async queryList(){
        const listRep = await queryTableSchemaList(this.projectId);
        if(listRep.success){
            return listRep.data;
        }else{
            message.error("获取表模型列表失败")
        }
    }

    handleSelect = async (item) => {
        const {key} = item,
            currentTableSchema = this.state.tableSchemas.filter(e=>e.name === key)[0];
        let newState ;

        if(!this.state.currentTableSchema._id){
            //是否保存新增模型
            Modal.confirm({
                title: '提示',
                content: '当前新增模型没有保存，继续前往将不保存当前模型，是否继续?',
                okText:'取消',
                cancelText:'继续',
                onOk() {

                },
                onCancel: async () => {
                    //不保存，则删除当前模型
                    newState = update(this.state,{
                        currentTableSchema:{$set:currentTableSchema},
                        tableSchemas:{$splice:[[this.state.tableSchemas.length-1,1]]},
                    });
                    await updateState.call(this);
                },
            });
        }else{
            newState = update(this.state,{
                currentTableSchema:{$set:currentTableSchema},
            });

            await updateState.call(this);
        }

        async function updateState(){
            //更新数据源信息
            if(newState && newState.currentTableSchema && newState.currentTableSchema.connId){
                const dsInfo = await this.getDsInfo(newState.currentTableSchema.connId);
                newState = update(newState,{
                    dsInfo:{$set:dsInfo},
                });
            }
            this.setState(newState);
        }
    };

    handleDelete = async () => {
        if(this.state.currentTableSchema && this.state.currentTableSchema._id) {
            const delRep = await deleteTableSchema(this.state.currentTableSchema._id);
            if(delRep.success){
                message.success("删除成功");
                //重新获取列表
                const list = await this.queryList();
                const currentTableSchema = list[0];
                this.setState({
                    tableSchemas:list,
                    currentTableSchema,
                });
            }else{
                message.error("删除失败");
            }
        }else{
            this.setState(update(this.state,{
                currentTableSchema:{$set:this.state.tableSchemas[0]},
                tableSchemas:{$splice:[[this.state.tableSchemas.length-1,1]]},
            }))
        }
    };

    handleAddNew = () => {
        const lastTableSchema = this.state.tableSchemas && this.state.tableSchemas[this.state.tableSchemas.length-1],
            {userid,name} = this.props.user;
        if(!lastTableSchema || lastTableSchema._id){
            const count = isArray(this.state.tableSchemas) &&
                this.state.tableSchemas.length > 0 ?
                (this.state.tableSchemas[this.state.tableSchemas.length-1].count + 1 || 1):1,
                newTableSchema = {
                    name : "未命名模型" + count,
                    user : {userid,name},
                    projectId : this.projectId,
                    tables:[],
                    count,
                };
            this.setState(update(this.state,{
                currentTableSchema:{$set:newTableSchema},
                tableSchemas:{$push:[newTableSchema]},
            }))
        }else{
            message.warn("请先保存当前编辑模型")
        }
    };

    handleOnSave = async (tableSchema) => {
        if(tableSchema._id){
            //更新
            const addRep = await updateTableSchema(tableSchema);
            if(addRep.success){
                message.success("修改成功");
                const list = await this.queryList();
                this.setState({
                    tableSchemas:list,
                    currentTableSchema:tableSchema,
                });
            }
        }else{
           //添加
           const addRep = await addTableSchema(tableSchema);
           if(addRep.success){
               message.success("添加成功");
               tableSchema._id = addRep.data._id;
               const list = await this.queryList();
               this.setState({
                   tableSchemas:list,
                   currentTableSchema:tableSchema,
               });
           }
        }
        // this.setState({currentTableSchema:tableSchema});
    };

    render(){
        //空白页
        const blank = (<div className={styles.page_blank} >请选择表模型</div>);

        return (<div className={styles.mainWrap}>
                    <div className={styles.leftWrap}>
                        <TableList value={this.state.tableSchemas}
                                   currentValue = {this.state.currentTableSchema}
                                   currentProject = {this.props.project.currentProject}
                                   onAddNew = {this.handleAddNew}
                                   onSelect={this.handleSelect}/>
                    </div>
                    <div className={styles.rightWrap}>
                        {this.state.currentTableSchema ?
                        <TableEditor value={this.state.currentTableSchema}
                                     currentProject = {this.props.project.currentProject}
                                     dsInfo = {this.state.dsInfo}
                                     onDelete = {this.handleDelete}
                                     onSave = {this.handleOnSave}/> : blank}
                    </div>
                </div>)
    }
}

export default connect(state => ({project:state.get('projectized').toObject(),
    user:state.get('user').get('currentUser').toObject()}))(Tables)