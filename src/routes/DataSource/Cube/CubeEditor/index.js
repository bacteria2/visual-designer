import React from 'react';
import { Layout,Card,Button,Modal,Form,Input,message,Spin,Icon,Popconfirm,Select } from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.css'
import TableRelEditor from './TableRelEditor'
import uuid from 'uuid/v1'
import {addMdx,updateMdx,wideTable} from '../../../../service/mdxService.js'
import {createView,updateConn,queryTableListByDbConn,deleteView} from '../../../../service/DataConnService.js'
import {tableHasUsedByCube,seleteConnByCubeId,seleteCubeById,updateCube,creatViewAndMdx} from '../../../../service/CubeService.js'
import PivotSchema from '../PivotSchema'
import { DragDropContext,DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import DynamicTable from '@/components/DynamicTable/DynamicTable'

const {Header,Content,Footer,Sider} = Layout;

@DragDropContext(HTML5Backend)
export default class CubeEditor extends React.PureComponent{
    constructor(props){
        super(props);

        this.tables = [];

        this.state = {
            sqlModal:false,
            loading:true,
            customTableName:'',
            customTableSQL:'',
            dataConn:null,
            tables:this.tables,
            searchData: [],
            searchValue: '',
            cube:null,
            dataViewVisible:false,
            dataViewFields:[],
            dataViewData:[],
        };

        this.sqlEditType = "add";
        // this.editSqlTable = null;
    }



    async onDeleteCustom(table,index){
        //删除之前查询 SQL视图是否被应用到CUBE
        const cubeRep = await tableHasUsedByCube(table._id);
        let cubes


        if(cubes.length > 0){
            let cubeNames = '';
            cubes.forEach((e) => {cubeNames += e.name});
            message.error('视图已经应用于CUBE：' + cubeNames + '；无法删除');
        }else{
            const deleteRep = await deleteView(this.state.dataConn,table.name);

            if(deleteRep.success){
                //删除成功
                this.setState(update(this.state,{
                    dataConn:{
                        sqlTables:{
                            $splice:[[index,1]],
                        },
                    },
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
            customTableName:editTable.name,
        });
    }


    async componentDidMount(){
        try{
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
                let tables =  await getTables(connRep.data);
                this.tables = tables?tables:[];
                if(this.tables.length === 0){message.warn('未查询到表')}
                this.setState({tables,searchData:tables});

            }else if(!connRep.success){
                message.error(connRep.msg);
            }else{
                message.warning('服务器连接错误');
            }
        }catch (e){
            message.error(e.message)
        }finally {
            this.setState({
                loading:false,
            });
        }

        async function getTables(conn){
            try {
                return await queryTableListByDbConn(conn);
            }catch (e){
                throw new Error("获取数据库表失败！");
            }

        }

    }

    hideCustomTableWin(){
        this.setState({
            sqlModal:false,
            customTableSQL:'',
            customTableName:'',
        });
    }

    async saveCustomTableWin(){
        try{
            const sql = this.state.customTableSQL;
            const name = this.state.customTableName;
            this.setState({
                loading:true,
                customTableSQL:'',
                customTableName:'',
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
                    fields = fieldsRep.data.map(e=>({name:e.COLUMN_NAME,type:e.DATA_TYPE,comments:e.COMMENTS}));
                    //保存 自定义SQL视图
                    let newSqlTable = {
                        id:uuid(),
                        type:'sql',
                        name,
                        sql,
                        fields,
                    };
                    this.setState(update(this.state,{
                        dataConn:{
                            sqlTables:{$push:[newSqlTable]},
                        },
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
                    fields = fieldsRep.data.map(e=>({name:e.COLUMN_NAME,type:e.DATA_TYPE,comments:e.COMMENTS}));
                    this.setState(update(
                        this.state,{
                            dataConn:{
                                sqlTables:{
                                    [this.tableIndex]:{$merge:{name,sql,fields}},
                                },
                            },
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
                message.success('视图创建成功！')
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
            tables:this.tables.filter(e => reg.test(e) ),
        });
    };

    //更新cube
    updateCube(cube,){
          this.setState({
              cube,
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
                {tables.map((e,i)=>(<SqlTable key={e.id} table={e} index={i}
                                             showEditSqlTable={this.showEditSqlTable.bind(this,e,i)}
                                             onDeleteCustom={this.onDeleteCustom.bind(this)}/>))}
            </Card></div>)

        }else{
            return null
        }
    }

    updatePivotSchema(pivotSchema){
        this.setState(update(
            this.state,{
                cube:{
                    pivotSchema:{$set:pivotSchema},
                },
            }
        ));
    }

    async save(){
        // const pivotSchema = this.getPivotSchema();
        // const newCube= update(this.state.cube,{
        //         pivotSchema:{$set:pivotSchema}
        // });

        //检测 表关系中是否存在 没有做关联关系的表
        if(this.hasNoneCondition()){
            message.error('保存失败，存在没有关联条件的关联表');
            return
        }
        if(this.state.cube.tables && this.state.cube.tables._id){
            //生成 视图SQL
            this.state.cube.viewSql= this.generateSql(this.state.cube.tables).sql;

            //创建视图
            const rep = await creatViewAndMdx(this.state.dataConn,this.state.cube);

            if(rep.ok){
                message.success("MDX生成成功");

                //保存MDX
                let mdx = rep.other;
                this.state.cube.schemaId = mdx.schemaId;
                this.state.cube.viewName = mdx.factTableName;
                if(this.state.cube.mdxId){
                    //更新MDX
                    mdx._id = this.state.cube.mdxId;
                    const rep = await updateMdx(mdx);
                    if(rep.success){
                        console.log("MDX修改成功");
                    }else if(rep.success === false){
                        message.error(rep.msg)
                    }else{
                        message.error('服务器错误，保存失败')
                    }
                }else{
                    //创建MDX
                    const rep = await addMdx(mdx);
                    if(rep.success){
                        console.log("MDX添加成功");
                        this.state.cube.mdxId = rep.data._id;
                    }else if(rep.success === false){
                        message.error(rep.msg)
                    }else{
                        message.error('服务器错误，保存失败')
                    }
                }
                //更新CUBE
                await update.call(this);

            }else if(rep.success === false){
                message.error(rep.msg);

            }else{
                message.error('服务器错误，保存失败')
            }

        }else{
            //删除CUBE视图
        }

        async function update(){
            const rep = await updateCube(this.state.cube);
            if(rep.success){
                message.success("CUBE保存成功！")

            }else if(rep.success === false){
                message.error(rep.msg)
            }else{
                message.error('服务器错误，保存失败')
            }
        }
    }

    hasNoneCondition(){
        let noneCond = false;

        if(this.state.cube.tables && this.state.cube.tables._id ){
            if(this.state.cube.tables.children && this.state.cube.tables.children.length > 0){
                this.state.cube.tables.children.forEach(e=>{
                    resursion(e);
                })
            }
        }

        function resursion(table){
            if(table.join.conditions.length <= 0){
                noneCond = true;
                if(table.children && table.children.length > 0){
                    table.children.forEach(e=>{
                        resursion(e);
                    })
                }
            }
        }

        return noneCond;
    }

    generateSql= (tables) => {

        return main(tables);

        //拼凑表关系SQL
        function main(tables){

            const currentFields = concatIdnFields(tables.fields,tables);

            let joinFields = "";
            let joinViewFields = "";
            let joinSql = "";
            let joinFieldsDic = [];

            if(tables.children && tables.children.length>0){
                tables.children.forEach((e,i)=>{

                    const result = recursion(e);

                    if(i >0 ) {
                        joinFields+=" , ";
                        joinSql+="  ";
                        // joinFields+=" , \r\n";
                        // joinSql+="  \r\n";
                    }

                    joinFields += result.fields;
                    joinViewFields += result.viewFields;
                    joinSql += result.joinSql;
                    joinFieldsDic = result.fieldsDic;
                });
            }

            const prefix = "select " + currentFields.sqlFields + (joinFields?", " + joinFields:' ') + " from " + tables.name + "  " + tables._id;
            // const prefix = "select " + currentFields.sqlFields + (joinFields?",\r\n" + joinFields:' ') + "\r\n from " + tables.name + " as " + tables._id;

            return {
                    sql:prefix + joinSql,
                    // fields:currentFields.viewFields + ",\r\n" + joinViewFields,
                    fields:currentFields.viewFields + ", " + joinViewFields,
                    fieldsDic:currentFields.fieldsDic.concat(joinFieldsDic),
            }

        }

        //递归表格拼凑JOIN视图SQL
        function recursion(table){

            let joinSql = ' ' +table.join.method.toUpperCase() + ' JOIN ' ;
            // let joinSql = '\r\n ' +table.join.method.toUpperCase() + ' JOIN ' ;

            const concatFields = concatIdnFields(table.fields,table);

            let subFieldsDic = [];

            let childFieldsStr = concatFields.sqlFields;

            let condition = " on ";
            // let condition = "\r\n on ";

            if(table.children && table.children.length>0){
                const subQuery = true;
                const result = main(table,subQuery);

                subFieldsDic = subFieldsDic.concat(result.fieldsDic);
                //生成子查询
                joinSql += '(' + result.sql + ")";
                childFieldsStr = result.fields;

                //生成连接条件
                condition += generateCond(table.join,table._id,true);
            }else{
                condition += generateCond(table.join,table._id,false);
                joinSql +=  table.name ;

            }

            joinSql  += '  ' + table._id;

            joinSql  += condition;

            return {fields:childFieldsStr
                ,joinSql
                ,viewFields:concatFields.viewFields
                ,fieldsDic:concatFields.fieldsDic.concat(subFieldsDic)}

        }

        function concatIdnFields(fields,table){

            let sqlFields = "",viewFields = "",fieldsDic=[];

            //组合sql
            // const sqlFields =  fields.reduce((a,b,i) => {
            //
            //     if(i === 1) a = " " + tableId + "." + a.name + " as " + tableId + "_" + a.name;
            //
            //     return a + " , \r\n " + tableId + "." + b.name + " as " + tableId + "_" + b.name;
            // });
            //
            // const viewFields = fields.reduce((a,b,i) => {
            //
            //     if(i === 1) a = " "  + tableId + "_" + a.name;
            //
            //     return a + " , \r\n "+ tableId + "_" + b.name;
            // });
            fields.forEach((e,i)=>{
                sqlFields += (i===0?' ':" ,  ") + table._id + "." + e.name + " as " + table._id + "_" + e.name;
                // sqlFields += (i===0?' ':" , \r\n ") + table._id + "." + e.name + " as " + table._id + "_" + e.name;
                viewFields += (i===0?' ':" ,  ")+ table._id + "_" + e.name;
                // viewFields += (i===0?' ':" , \r\n ")+ table._id + "_" + e.name;
                fieldsDic.push({
                    alias:e.name,
                    table:table.name,
                    generateField:table._id + "_" + e.name})
            });

            return {sqlFields,viewFields,fieldsDic}
        }

        function generateCond(join,tableId,Subquery){
            const parentId = join.parentId;
            const conditions = join.conditions;
            if(conditions.length > 1){
                return conditions.reduce((a,b,i) => {
                    if(i===1) {
                        a = parentId + "." + a.left + "=" + (Subquery ? tableId + "_" + a.right : tableId + "." + a.right);
                    }
                    return a + " and " + parentId + "." + b.left + "=" + (Subquery ? tableId + "_" + b.right : tableId + "." + b.right);
                });
            }else{
                return  parentId + "." + conditions[0].left + "=" + (Subquery ? tableId + "_" + conditions[0].right : tableId + "." + conditions[0].right);
            }
        }
    };

    dataViewCancel(){
        this.setState({dataViewVisible:false});
    }

    async perView(){
        if(this.hasNoneCondition()){
            message.error('无法预览，存在没有关联条件的关联表');
            return
        }
        const result = this.generateSql(this.state.cube.tables);
        //处理成合并列头的数据结构
        let columns = [];
        result.fieldsDic.forEach(e=>{
            const tables = columns.filter(column=>column.name === e.table);
            let table = {};
            if(tables.length>0){
                //存在表
                table = tables[0];

            }else{
                //不存在，需要新建
                table = {name:e.table};
                table.children = [];
                columns.push(table);
            }

            table.children.push({name:e.generateField
                ,title:e.alias
                ,key:e.generateField
                ,render:columnRender
                ,dataIndex:this.state.dataConn.type === 'oracle'?e.generateField.toUpperCase():e.generateField,
            });

            function columnRender(text){
                return (text&&(text+'').length>10?(text+'').split('').splice(0,10).reduce((a,b)=>(a+b)) + '...':text)
            }

        });
        // const viewFields = result.fieldsDic.map(e=>({name:e.generateField,alias:e.alias,table:e.table}));
        //查询数据
        console.log(result.sql);
        const rep = await wideTable(this.state.dataConn,result.sql);
        if(rep.success){
            this.setState(
                update(this.state,{
                    dataViewVisible:{$set:true},
                    dataViewData:{$set:rep.data},
                    dataViewFields:{$set:columns},
                })
            );

        }else if(rep.success === false){
            message.error(rep.msg)
        }else{
            message.error('服务器错误，保存失败')
        }
        //开启数据预览Modal
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

        return (<Spin size="large" spinning={this.state.loading}>
            <Layout>
            <Header className={styles.cube_editor_title}>
                {this.state.cube && this.state.cube.name}
                <div className={styles.cube_editor_toolBar}>
                    <Button  icon="table"  size="small" onClick={this.perView.bind(this)}>宽表预览</Button>
                    <Button type="primary" icon="copy"  size="small">另保存为</Button>
                    <Button type="primary" icon="save" size="small" onClick={this.save.bind(this)}>保存</Button>
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
                                                    editable={true}
                                                    cube={this.state.cube}
                                                    update={this.updateCube.bind(this)} />
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
                           <div style={{flex:'auto',display:'flex',height: '100%'}}>
                           {this.state.cube&&
                           <PivotSchema data={this.state.cube}
                                        update = {this.updatePivotSchema.bind(this)}
                                        height='100%'/>}
                           </div>
                       </Sider>
                    </Layout>
            </Content>
                <Modal
                    title='宽表数据预览'
                    visible={this.state.dataViewVisible}
                    onCancel={this.dataViewCancel.bind(this)}
                    footer={null}
                    width='80%'
                    bodyStyle={{padding:'0',overflow:'auto'}}
                    maskClosable={false}
                >
                        {this.state.dataViewFields.length &&
                            <DynamicTable
                                conn={this.props.conn}
                                tableName={this.state.dataViewTitle}
                                data = {this.state.dataViewData}
                                fields={this.state.dataViewFields}/>
                            }
                </Modal>
        </Layout>
        </Spin>)
    }
}

//数据源表名可拖拽组件
const tableSource = {
    beginDrag(props) {
        return {
            name: props.name,
            type:props.type,
            _id:uuid().replace(/-/g,'_'),
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
            _id:uuid().replace(/-/g,'_'),
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