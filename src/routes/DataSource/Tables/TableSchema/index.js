import React from 'react'
import styles from './tableSchema.css'
import {Tooltip,Select,Icon,message,Spin} from 'antd'
import {queryTableSchemaList,updateTableSchema} from '../../../../service/tableSchemaService'
import isArray from 'lodash/isArray'
import { connect } from 'react-redux'
import {getDBConnById,queryFieldsByDBConnAndTablenames} from '../../../../service/DataConnService'
import FieldsEditor from '../FieldsEditor'

class TableSchema extends React.PureComponent{
    constructor(props){
        super(props);
        this.projectId = props.project.currentProject.get('id');
        this.state = {
            loading:false,
            tableSchemas:null,
            currentTableSchema:null,
            dsInfo:null,
            tableMapping:null,
        }
    }

    async componentWillMount(){
        const list = await this.queryList();
        if(isArray(list) && list.length > 0){
            let currentTableSchema;
            if(this.props.tableId){
                const tableSchemaFilter = list.filter(e => e._id === this.props.tableId);
                if(isArray(tableSchemaFilter) && tableSchemaFilter.length === 1){
                    currentTableSchema = tableSchemaFilter[0];
                }
            }else{
                currentTableSchema = list[0];

            }

            //获取当前的数据源联系信息 dsInfo
            if(currentTableSchema && currentTableSchema.connId){
                //查询数据连接信息
                const dsInfo = await TableSchema.getDsInfo(currentTableSchema.connId);
                //查询 表 - 字段 映射
                const tables = currentTableSchema.tables.map(e=>e.name);
                const tableMapping = await TableSchema.queryFields(dsInfo,tables);

                this.setState({
                    tableSchemas:list,
                    currentTableSchema,
                    dsInfo,
                    tableMapping,
                });

                if(!this.props.tableId){
                    //提交给上层
                    if(this.props.onChange){
                        this.props.onChange({connInfo:dsInfo,tableSchemaId:currentTableSchema._id});
                    }
                }

            }else{
                this.setState({
                    tableSchemas:list,
                });
            }
        }
    }

    async componentWillReceiveProps({tableId}){
        this.setState({loading:true});
        try{
            if(tableId && tableId !== this.props.tableId){
                //重新获取 表 - 字段 映射
                const tableSchemaFilter = this.state.tableSchemas.filter(e => e._id === this.props.tableId);
                if(isArray(tableSchemaFilter) && tableSchemaFilter.length === 1){
                    const newTableSchema = tableSchemaFilter[0];
                    //查询数据连接信息
                    const dsInfo = await TableSchema.getDsInfo(newTableSchema.connId);
                    //查询 表 - 字段 映射
                    const tables = newTableSchema.tables.map(e=>e.name);
                    const tableMapping = await TableSchema.queryFields(dsInfo,tables);

                    this.setState({
                        currentTableSchema:newTableSchema,
                        dsInfo,
                        tableMapping,
                    });
                }
            }else{
                this.setState({
                    currentTableSchema:null,
                    dsInfo:null,
                    tableMapping:{},
                });
            }
        }finally {
            this.setState({loading:false});
        }

    }

    async queryList(){
        const listRep = await queryTableSchemaList(this.projectId);
        if(listRep.success){
            if(isArray(listRep.data))
            return listRep.data;
        }else{
            message.error("获取表模型列表失败")
        }
    }

    static async getDsInfo(id){
        const connRep = await getDBConnById(id);
        if(connRep.success){
            return connRep.data
        }else{
            message.error("获取数据源信息失败")
        }
    }

    static async queryFields(conn,tables){
        const fieldsRsp = await queryFieldsByDBConnAndTablenames(conn,tables);
        if(fieldsRsp.success){
            return fieldsRsp.data
        }else{
            message.error("获取字段信息失败")
        }
    }

    getTableSchemaOptions = () => {
        return this.state.tableSchemas.map((tableSchema)=> {
            return <Select.Option value={tableSchema._id} key={tableSchema._id}>{tableSchema.name}</Select.Option>
        });
    };

    handleTableSchemaChange = async (tableSchemaId) => {
        const tableSchemaFilter = this.state.tableSchemas.filter(e => e._id === tableSchemaId);
        if(isArray(tableSchemaFilter) && tableSchemaFilter.length === 1){
            const newTableSchema = tableSchemaFilter[0];
            //查询数据连接信息
            const dsInfo = await TableSchema.getDsInfo(newTableSchema.connId);
            //查询 表 - 字段 映射
            const tables = newTableSchema.tables.map(e=>e.name);
            const tableMapping = await TableSchema.queryFields(dsInfo,tables);

            this.setState({
                currentTableSchema:newTableSchema,
                dsInfo,
                tableMapping,
            });
            //提交给上层
            if(this.props.onChange){
                this.props.onChange({connInfo:dsInfo,tableSchemaId:newTableSchema._id});
            }
            this.setState({currentTableSchema:newTableSchema})
            //

        }
    };

    handleTableSchemaUpdate = async (tableSchema) => {
        //提交到数据库更改
        const updateRsp = await updateTableSchema(tableSchema);
        const list = await this.queryList();

        if(updateRsp.success){
            message.success("修改成功");
        }
        this.setState({
            currentTableSchema:{...tableSchema},
            tableSchemas:list,
        });
    };

    render(){
        return (<div  className={styles.container} style={{width:'100%',textAlign:'center'}}>
            {
                isArray(this.state.tableSchemas) &&
                <Select
                    value={this.state.currentTableSchema._id}
                    style={{ width: '80%',margin:'10px auto' }}
                    onChange={this.handleTableSchemaChange}>
                    {this.getTableSchemaOptions()}
                </Select>
            }
            <h1>表 - 字段</h1>
            <div style={{flex:'1 1 0',display:'flex',overflow:'auto'}}>
                <FieldsEditor accepts={['table']}
                              columnModel
                              value={this.state.currentTableSchema}
                              tableMapping={this.state.tableMapping}
                              onUpdate = {this.handleTableSchemaUpdate}/>
            </div>
        </div>)
    }
}

export default connect(state => ({project:state.get('projectized').toObject()}))(TableSchema)