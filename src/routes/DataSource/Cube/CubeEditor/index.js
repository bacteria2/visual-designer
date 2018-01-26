import React from 'react';
import { Layout,Card,Button,Modal,Form,Input,message,Spin,Icon,Popconfirm,Select } from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.css'
import cubeData from './demoData/cube.json'
import TableRelEditor from './TableRelEditor'
import uuid from 'uuid/v1'
import {createView,updateConn,queryTableListByDbConn,deleteView} from '../../../../service/DataConnService.js'
import {tableHasUsedByCube,seleteConnByCubeId,seleteCubeById} from '../../../../service/CubeService.js'
import cloneDeep  from 'lodash/cloneDeep'

import PivotSchema from '../PivotSchema'
import { DragDropContext,DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
const {Header,Content,Footer,Sider} = Layout;

@DragDropContext(HTML5Backend)
export default class CubeEditor extends React.PureComponent{
    constructor(props){
        super(props);

        this.tables = [];
        for(let i =0;i<46;i++){
            this.tables.push('ydp_user_info'+i);
        }

        this.state = {
            sqlModal:false,
            loading:true,
            customTableName:'',
            customTableSQL:'',
            dataConn:null,
            tables:this.tables,
            searchData: [],
            searchValue: '',
            cube:null
        };

        this.sqlEditType = "add";
        // this.editSqlTable = null;
    }



    async onDeleteCustom(table,index){
        //删除之前查询 SQL视图是否被应用到CUBE
        const cubeRep = await tableHasUsedByCube(table._id);
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
            const deleteRep = await deleteView(this.state.dataConn,table.name);

            if(deleteRep.success){
                //删除成功
                message.success(deleteRep.msg);
                this.setState(update(this.state,{
                    dataConn:{
                        sqlTables:{
                            $splice:[[index,1]]
                        }
                    }
                }));
                //保存
                const updateRep = await updateConn(this.state.dataConn);
                if(updateRep.success){
                    message.success(deleteRep.msg)
                }
            }else if(deleteRep.success === false){
                message.error(deleteRep.msg);
            }else{
                message.warning('服务器连接错误');
            }

        }
    }

    showEditSqlTable(editTable,tableIndex){
        this.setState({sqlModal:true});
        // this.editSqlTable = editTable;
        this.tableIndex = tableIndex;
        this.sqlEditType = "update";
        this.setState({
            customTableSQL:editTable.sql,
            customTableName:editTable.name
        });
    }


    async componentDidMount(){
        const id = this.props.match.params.id;

        //查询CUBE
        const cubeRep = await  seleteCubeById(id);
        if(cubeRep.success){
            this.setState({cube:cubeRep.data});
        }else if(!cubeRep.success){
            message.error(cubeRep.msg);
        }else{
            message.warning('服务器连接错误');
        }

        //查询数据源信息
        const connRep = await  seleteConnByCubeId(id);
        if(connRep.success){
            this.setState({dataConn:connRep.data});

            //根据数据源信息查询 所有表
            let tables = await getTables(connRep.data);
            this.tables = tables?tables:[];
            this.setState({tables,searchData:tables});

        }else if(!connRep.success){
            message.error(connRep.msg);
        }else{
            message.warning('服务器连接错误');
        }

        this.setState({
            loading:false
        });

        async function getTables(conn){

            return await queryTableListByDbConn(conn);

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
            if(this.sqlEditType === "add"){
                //调用服务创建SQL视图
                let fieldsRep = await createView(this.state.dataConn,name,sql);
                let fields = null;
                if(fieldsRep.success){
                    fields = fieldsRep.data;
                    //保存 自定义SQL视图
                    let newSqlTable = {
                        id:uuid(),
                        type:'sql',
                        name,
                        sql,
                        fields
                    };
                    this.setState(update(this.state,{
                        dataConn:{
                            sqlTables:{$push:[newSqlTable]}
                        }
                    }));
                }else if(fieldsRep.success === false){
                    message.error(fieldsRep.msg);
                    return
                }else{
                    message.warning('服务器连接错误');
                }
            }else{
                //调用服务创建SQL视图
                this.state.dataConn.existsDrop = true;
                let fieldsRep = await createView(this.state.dataConn,name,sql);
                let fields = null;

                if(fieldsRep.success){
                    fields = fieldsRep.data;
                    this.setState(update(
                        this.state,{
                            dataConn:{
                                sqlTables:{
                                    [this.tableIndex]:{$merge:{name,sql,fields}}
                                }
                            }
                        }
                    ));
                }else if(fieldsRep.success === false){
                    message.error(fieldsRep.msg);
                }else{
                    message.warning('服务器连接错误');
                }
            }

            //保存
            const updateRep = await updateConn(this.state.dataConn);
            if(updateRep.success){
                message.success(updateRep.msg)
            }

        }finally  {
            this.setState({loading:false});
        }

    }

    handleChange = (value) => {
        this.setState({ searchValue:value });
        const reg = new RegExp(value,'i');
        this.setState({
            searchData:this.tables.filter(e => reg.test(e) ),
            tables:this.tables.filter(e => reg.test(e) )
        });
    };

    //更新cube
    updateCube(cube){
          this.setState({
              cube
          });
    }

    getTables(){
        return  (<div className={styles.cube_editor_tables_container}><Card  className={styles.cube_editor_tables_wrap} bodyStyle = {{padding:'10px 15px'}}>
            {this.state.tables.map(e=><DsTable key={e} name={e} type="table"/>)}
        </Card></div>)
    }

    getSqlTables(){
        let tables = this.state.dataConn ? this.state.dataConn.sqlTables : [];
        if(tables && tables.length > 0){
            return  (<div className={styles.cube_editor_tables_container}><Card  className={styles.cube_editor_tables_wrap} bodyStyle = {{padding:'10px 15px'}}>
                {tables.map((e,i)=><SqlTable key={e._id} table={e} index={i}
                                             showEditSqlTable={this.showEditSqlTable.bind(this,e,i)}
                                             onDeleteCustom={this.onDeleteCustom.bind(this)}/>)}
            </Card></div>)

        }else{
            return null
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

        const searchOptions = this.state.searchData.map(d => <Select.Option key={d}>{d}</Select.Option>);

        return <Spin size="large" spinning={this.state.loading}>
            <Layout>
            <Header className={styles.cube_editor_title}>
                {cubeData.name}
                <div className={styles.cube_editor_toolBar}>
                    <Button type="primary" icon="copy"  size="small">另保存为</Button>
                    <Button type="primary" icon="save" size="small">保存</Button>
                    <Link  to={'/cubeList'}><Button icon="logout" type="primary" size="small">退出</Button></Link>
                </div>
            </Header>
            <Content>
                   <Layout>
                       <Content style={{overflow:'auto',display:'flex'}}>
                           <Layout>
                            <Footer className={styles.cube_editor_content} style={{padding:'0 0 10px 0',borderBottom: '1px solid rgb(232, 232, 232)'}}>
                                <div className={styles.cube_editor_content_title}>原始表：
                                    {/*<Input.Search size="small"*/}
                                        {/*placeholder="输入表名"*/}
                                        {/*onSearch={value => console.log(value)}*/}
                                        {/*onChange={e => console.log(e.target.value)}*/}
                                        {/*style={{ width: 300,float:'right',lineHeight: '24px' }}*/}
                                    {/*/>*/}
                                    <Select
                                        mode="combobox"
                                        value={this.state.searchValue}
                                        placeholder='输入搜索表名'
                                        style={{width:'300px',float:'right',lineHeight:'24px',marginTop:'3px'}}
                                        defaultActiveFirstOption={false}
                                        size="small"
                                        showArrow={false}
                                        filterOption={false}
                                        onChange={this.handleChange}
                                    >
                                        {searchOptions}
                                    </Select>
                                </div>
                                {this.getTables()}
                                <div className={styles.cube_editor_content_title}> 自定义SQL视图：
                                    <Button  type="dash" icon="plus" size = "small" style={{float:'right',marginTop:'3px'}} onClick= {() => {this.setState({sqlModal:true});this.sqlEditType = "add";}}>添加自定义SQL视图</Button>
                                </div>
                                {this.getSqlTables()}
                            </Footer>
                            <Content className={styles.cube_editor_content}
                                     style={{overflow:'auto',display:'flex'}}>
                                {this.state.cube &&
                                    <TableRelEditor datasource={this.state.dataConn}
                                                    cube={this.state.cube}
                                                    update={this.updateCube.bind(this)}/>
                                }
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
                       </Content>
                       <Sider className={styles.cube_editor_sider} width="250">
                           <PivotSchema data={this.state.cube?this.state.cube:{} }/>
                       </Sider>
                    </Layout>
            </Content>
        </Layout>
        </Spin>
    }
}

//数据源表名可拖拽组件
const tableSource = {
    beginDrag(props) {
        return {
            name: props.name,
            type:props.type,
            _id:uuid()
        }
    },
};
@DragSource(props=>props.type, tableSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class DsTable extends React.Component {
    render() {
        const {isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0.4 : 1;
        return connectDragSource(<div style={{ opacity }} className={"ant-card-grid "+styles.cube_editor_tables_item} title={this.props.name}>{this.props.name}</div>)
    }
}

//自定义SQL视图名可拖拽组件
const sqlSource = {
    beginDrag(props) {
        return {
            name: props.table.name,
            type:props.table.type,
            fields:props.table.fields,
            _id:props.table._id
        }
    },
};
@DragSource(props=>props.table.type, sqlSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class SqlTable extends React.Component {

    render() {
        const {isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return connectDragSource(<div style={{ opacity }} className={"ant-card-grid "+styles.cube_editor_tables_item}>
                {this.props.table.name}
                <p className={styles.custom_table_tools} onMouseDown={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()}>
                    <Icon type="edit" style = {{marginRight:'6px'}}
                          className={styles.custom_table_tools_btn}
                          onClick = {this.props.showEditSqlTable}/>
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.props.onDeleteCustom(this.props.table,this.props.index)}>
                        <Icon type="delete"  className={styles.custom_table_tools_btn}/>
                    </Popconfirm>
                </p>
            </div>)
    }
}