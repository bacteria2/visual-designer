import React from 'react';
import { Layout,Button,Popconfirm,message,Spin} from 'antd';
import styles from './tableEditor.css'
import DsSelector from '../DsSelector'
import FieldsEditor from '../FieldsEditor'
import update from 'immutability-helper'
import isArray from 'lodash/isArray'
import {queryFieldsByDBConnAndTablenames} from '../../../../service/DataConnService'
// queryFieldsByDBConnAndTablename

const {Header,Content} = Layout;


export default class TableEditor extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            tableSchema:this.props.value,
            tableMapping:{},
            loading:false,
        };
        this.dsInfo = this.props.dsInfo;
    }

    async componentWillMount(){
        //获取字段信息
        if(this.state.tableSchema && isArray(this.state.tableSchema.tables) && this.dsInfo){

            const tables = this.state.tableSchema.tables.map(e=>e.name);
            const tableMapping = await this.queryFields(this.dsInfo,tables);
            // // 合并字段别名到 mapping 中
            // this.state.tableSchema.tables.forEach(to => {
            //     if(isArray(to.fields) && to.fields.length > 0){
            //         const table = tableMapping[to.name];
            //
            //     }
            // });

            this.setState({tableMapping});

        }
    }

    async componentWillReceiveProps(nextProps){
        const {value,dsInfo} = nextProps;
        this.dsInfo = dsInfo;
        this.setState({loading:true});
        try {
            if(value && isArray(value.tables) && dsInfo){
                const tables = value.tables.map(e=>e.name);
                const tableMapping = await this.queryFields(dsInfo,tables);
                if(tableMapping){
                    this.setState({tableMapping});
                    this.setState({
                        tableSchema:{...value},
                        tableMapping,
                    })
                }
            }else{
                this.setState({
                    tableSchema:{...value},
                })
            }
        }finally {
            this.setState({loading:false});
        }

    }

    async queryFields(conn,tables){
        const fieldsRsp = await queryFieldsByDBConnAndTablenames(conn,tables);
        if(fieldsRsp.success){
            return fieldsRsp.data
        }else{
            message.error("获取字段信息失败");
            return {}
        }
    }

    handleDrop = async (e) => {
        //查询表字段
        const tableMapping = await this.queryFields(this.dsInfo,[e.name]);

        this.setState(update(this.state,{
            tableSchema:{
                tables:{
                    $push:[e],
                },
            },
            tableMapping:{$merge:tableMapping},
        }))
    };

    handleNameChange = (event) => {
        const newName = event.target.value;
        this.setState(update(this.state,{
            tableSchema:{
                name:{
                    $set:newName,
                },
            },
        }))
    };

    handleConnChange = async (conn) => {
        this.setState(update(this.state,{
            tableSchema:{
                connId:{
                    $set:conn._id,
                },
                tables:{$set:[]},
            },
        }));
        this.dsInfo = conn
    };

    handleDeleteTable = (index) => {
        this.setState(update(this.state,{
            tableSchema:{
                tables:{$splice:[[index,1]]},
            },
        }));
    };

    handleTableSchemaUpdate = (tableSchema) => {
        this.setState({
            tableSchema:{...tableSchema},
        });
    };

    render(){
        return (<Spin spinning={this.state.loading} wrapperClassName = {styles.spinStyle}>
            <Layout style={{height: '100%',background: '#fff' }}>
            <Header className={styles.summary_title}>
            <span>
                <input type="text" onChange={this.handleNameChange} className={styles.name} value={this.state.tableSchema ? (this.state.tableSchema.name || ''):''} />
                <Button  icon="save" onClick={this.props.onSave.bind(null,this.state.tableSchema)} style={{margin:'13px 0 10px',float:'right'}} type="primary" size="small">
                    {this.state.tableSchema ? (this.state.tableSchema._id?'保存':'新增'):'保存'}
                </Button>
                <Popconfirm title="确定要删除这个表模型吗?" onConfirm={this.props.onDelete}  okText="确定" cancelText="取消">
                    <Button  icon="delete" style={{margin:'13px 10px 10px',float:'right'}} type="primary" size="small">删除</Button>
                </Popconfirm>
            </span>
            </Header>
            <Content style = {{ height: 'calc(100vh - 128px - 50px )',background: '#fff' ,display:'flex'}}>

                <div className = {styles.dsPanel}>
                    <DsSelector value={this.state.tableSchema}
                                onUpdate={this.handleTableSchemaUpdate}
                                onChange={this.handleConnChange}
                                currentProject = {this.props.currentProject}/>
                </div>
                <div className = {styles.fieldsPanel}>
                    <FieldsEditor accepts={['table']}
                                  value={this.state.tableSchema}
                                  tableMapping={this.state.tableMapping}
                                  onDrop={this.handleDrop}
                                  onDelete = {this.handleDeleteTable}
                                  onUpdate = {this.handleTableSchemaUpdate}/>
                </div>
            </Content>
        </Layout>
        </Spin>)
    }

}