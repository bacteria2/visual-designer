import React from 'react';
import { Layout,Card,Button,Modal,Form,Input,message,Spin,Icon,Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.css'
import cubeData from './demoData/cube.json'
import TableRelEditor from './TableRelEditor'
import uuid from 'uuid/v1'
import {queryFieldsByConnAndSql} from '../../../../service/DataConnService.js'
import {tableHasUsedByCube,seleteConnByCubeId} from '../../../../service/CubeService.js'
import cloneDeep  from 'lodash/cloneDeep'

const {Header,Content,Footer,Sider} = Layout;
export default class CubeEditor extends React.PureComponent{
    constructor(props){
        super(props);
        // this.cube = this.props.location.query;

        // const dataConn = {
        //     id:"as9dc2",
        //     type:"mysql",
        //     name:"本地数据库",
        //     account:"root",
        //     pwd:"root",
        //     port:3306,
        //     server:"192.168.40.234",
        //     sqlTables:[{
        //         id:"1235asd",
        //         name:"AA5BB6BCC",
        //         sql :"select * from ABC",
        //         fields:[
        //             {
        //                 "name":"idd",
        //                 "type":"string",
        //                 "length":null
        //             },
        //             {
        //                 "name":"names",
        //                 "type":"string",
        //                 "length":null
        //             },
        //             {
        //                 "name":"egg",
        //                 "type":"number",
        //                 "length":10
        //             }
        //         ]
        //     }]
        // };

        this.state = {
            sqlModal:false,
            loading:false,
            customTableName:'',
            customTableSQL:'',
            dataConn:null
        };

        this.sqlEditType = "add";
        this.editSqlTable = null;
    }

    getTables(){

        let tables = [];

        for(let i =0;i<50;i++){
            tables.push('ydp_user_info'+i);
        }

        return  (<div><Card  className={styles.cube_editor_tables_wrap} bodyStyle = {{padding:'5px 10px'}}>
            {tables.map(e=><Card.Grid key={e} draggable="true"
                                      onDragStart={ev=>{ev.dataTransfer.setData("name",e);
                                      ev.dataTransfer.setData("type","table");
                                      ev.dataTransfer.setData("id",uuid());}}  className={styles.cube_editor_tables_item}>{e}</Card.Grid>)}
        </Card></div>)
    }

    async onDeleteCustom(tableId){
        //删除之前查询 SQL视图是否被应用到CUBE
        const cubeRep = await tableHasUsedByCube(tableId);
        let cubes = [];
        if(cubeRep.success){
            cubes = cubeRep.data;
        }else if(!cubeRep.success){
            message.error(cubeRep.msg);
        }else{
            message.warning('服务器连接错误');
        }

        if(cubes.length > 0){
            let cubeNames = '';
            cubes.forEach((e) => {cubeNames += e.name});
            message.error('视图已经应用于CUBE：' + cubeNames + '；无法删除');
        }else{
            let dataConn = cloneDeep(this.state.dataConn);
            dataConn.sqlTables = dataConn.sqlTables.filter(e=>e.id !== tableId);
            this.setState({dataConn});
        }
    }

    showEditSqlTable(editTable){
        this.setState({sqlModal:true});
        this.editSqlTable = editTable;
        this.sqlEditType = "update";
        this.setState({
            customTableSQL:editTable.sql,
            customTableName:editTable.name
        });
    }

    getSqlTables(){
        let tables = this.state.dataConn ? this.state.dataConn.sqlTables : [];
        return  (<Card  className={styles.cube_editor_tables_wrap} bodyStyle = {{padding:'5px 10px'}}>
            {tables.map(e=><Card.Grid key={e.id} draggable="true"
                                      onDragStart={ev=>{ev.dataTransfer.setData("name",e.name);
                                                ev.dataTransfer.setData("type",'sql');
                                                ev.dataTransfer.setData("id",e.id);
                                      }}  className={styles.cube_editor_tables_item}>
                {e.name} <p className={styles.custom_table_tools} onMouseDown={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()}>
                <Icon type="edit" style = {{marginRight:'6px'}}
                      className={styles.custom_table_tools_btn}
                      onClick = {this.showEditSqlTable.bind(this,e)}/>
                <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDeleteCustom(e.id)}>
                    <Icon type="delete"  className={styles.custom_table_tools_btn}/>
                </Popconfirm>
            </p>
                </Card.Grid>)}
        </Card>)
    }

    async componentDidMount(){
        // this.props.match.params.cube
        const id = 'as66dc';
        const connRep = await  seleteConnByCubeId(id);
        if(connRep.success){
            this.setState({dataConn:connRep.data});
        }else if(!connRep.success){
            message.error(connRep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

    hideCustomTableWin(){
        this.setState({
            sqlModal:false,
            customTableSQL:'',
            customTableName:''
        });
    }

    async saveCustomTableWin(){
        try{
            const sql = this.state.customTableSQL;
            const name = this.state.customTableName;

            this.setState({
                loading:true,
                customTableSQL:'',
                customTableName:''
            });

            if(!sql || !name) {
                message.warn("视图名和SQL不能为空");
                return false;
            }else{
                this.setState({sqlModal:false})
            }
            // 通过数据库连接信息 和 SQL 语句，查询字段信息

            //查询左表数据连接信息
            let fieldsRep = await queryFieldsByConnAndSql(this.state.dataConn,sql);
            let fields = null;

            if(fieldsRep.success){
                fields = fieldsRep.data;
            }else if(!fieldsRep.success){
                message.error(fieldsRep.msg);
            }else{
                message.warning('服务器连接错误');
            }

            if(this.sqlEditType === "add"){
                //保存 自定义SQL视图
                let newSqlTable = {
                    id:uuid(),
                    type:'sql',
                    name,
                    sql,
                    fields
                };
                this.state.dataConn.sqlTables.push(newSqlTable);
                //保存

            }else{
                this.editSqlTable.name = name;
                this.editSqlTable.sql = sql;
                this.editSqlTable.fields = fields;
            }


        }finally  {
            this.setState({loading:false});
        }

    }

    render(){

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        return <Spin size="large" spinning={this.state.loading}><Layout>
            <Sider className={styles.cube_editor_sider} width="250">Sider</Sider>
            <Layout>
                <Header className={styles.cube_editor_title}>
                    {cubeData.name}
                    <div className={styles.cube_editor_toolBar}>
                        <Button type="primary" icon="copy"  size="small">另保存为</Button>
                        <Button type="primary" icon="save" size="small">保存</Button>
                        <Link  to={'/cubeList'}><Button icon="logout" type="primary" size="small">退出</Button></Link>
                    </div>
                </Header>
                <Footer className={styles.cube_editor_content} style={{padding:'0 0 10px 0',borderBottom: '1px solid rgb(232, 232, 232)'}}>
                    <div className={styles.cube_editor_content_title}>原始表：</div>
                    {this.getTables()}
                    <div className={styles.cube_editor_content_title}> 自定义SQL视图：
                        <Button  type="primary" icon="plus" size = "small" onClick= {() => {this.setState({sqlModal:true});this.sqlEditType = "add";}}>添加</Button>
                    </div>
                    {this.getSqlTables()}
                </Footer>
                <Content className={styles.cube_editor_content}
                         style={{overflow:'auto',display:'flex'}}>
                    <TableRelEditor datasource = {this.state.dataConn}/>
                </Content>
                <Modal visible={this.state.sqlModal}
                       title="添加自定义SQL视图"
                       width = "880px"
                       onCancel= {this.hideCustomTableWin.bind(this)}
                       onOk = {this.saveCustomTableWin.bind(this)}>
                    <Form>
                        <Form.Item label="视图名称" key="name" {...formItemLayout}><Input value={this.state.customTableName} onChange={e=>(this.setState({customTableName:e.target.value}))}  placeholder="输入视图名称" /></Form.Item>
                        <Form.Item label="SQL语句" key="sql" {...formItemLayout}><Input.TextArea value={this.state.customTableSQL} onChange={e=>(this.setState({customTableSQL:e.target.value}))}  placeholder="输入视图SQL语句" autosize={{ minRows: 10, maxRows: 6 }} /></Form.Item>
                    </Form>
                </Modal>
            </Layout>
        </Layout>
        </Spin>
    }
}