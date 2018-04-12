import React from 'react';
import styles from './dsSelector.css'
import {Select,message,Modal,Icon,Form,Input,Spin,Popconfirm} from 'antd'
import { DragSource } from 'react-dnd';
import {queryDataConnList,queryTableListByDbConn,updateConn} from '../../../../service/DataConnService'
import {deleteView} from '../../../../service/CubeService'
import isArray from 'lodash/isArray'
import {createView} from '../../../../service/DataConnService.js'
import uuid from 'uuid/v1'
import update from 'immutability-helper'
const {confirm} = Modal;
export default class DsSelector  extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            loading:false,
            connList:null,
            currentTables:null,
            customTableName:'',
            customTableSQL:'',
            sqlModal:false,
            currentConn:null,
           };
        this.editViewIndex = -1 ;

        this.sqlEditType = "add"
    }

    async componentWillReceiveProps({value}){
        const {connList} = this.state;
        let currentConn = null;
        if(value && value.connId && isArray(connList) && connList.length > 0){
            let tables = [];
            const connFilter = connList.filter(e=>e._id === value.connId);
            if(connFilter.length > 0) {
                currentConn = connFilter[0];
                tables =  await DsSelector.getTables(currentConn) || [];
            }
            this.setState({currentTables:[...tables],currentConn});
        }else{
            this.setState({currentTables:null,currentConn});
        }
    }

    async componentWillMount(){
        let connList = await this.queryConnList(),currentConn,tables = [];
        if(isArray(connList) && connList.length > 0) {
            if(this.props.value && this.props.value.connId){
                // 通过属性传递数据源ID
                const connFilter = connList.filter(e=>e._id === this.props.value.connId);
                if(connFilter.length > 0) {
                    currentConn  = connFilter[0];
                    tables =  await DsSelector.getTables(currentConn);
                }
            }
        }
        this.setState({connList,currentTables:tables,currentConn});
    }

    static async  getTables(conn){
        try {
            const tablesRsp = await queryTableListByDbConn(conn);
            if(isArray(tablesRsp)){
                return tablesRsp
            }else{
                return []
            }
        }catch (e){
            message.error("获取数据库表失败！");
        }
    }
    //获取数据连接列表
    async queryConnList(){
        let connRep = await queryDataConnList(this.props.currentProject.get('id'));
        if(connRep.success){
            return connRep.data;
        }else if(!connRep.success){
            message.error(connRep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }

   handleConnChange = (value)=>{
        //提示 修改CUBE将清除所有数据项和相关的样式
       const changeConn = async () => {
           const selectConn = this.state.connList.filter(e=>e._id === value)[0];
           // //重新获取表信息
           // let tables =  null;
           // try {
           //     tables = await DsSelector.getTables(selectConn);
           // }catch (e){
           //     message.error('未查询到表信息')
           // }
           //
           // if(!isArray(tables)) {
           //     tables = [];
           //     message.error('未查询到表信息')
           // }
           //
           // this.setState({
           //     currentTables:[...tables],
           // });

           if(this.props.onChange){
               this.props.onChange(selectConn);
           }
       };

       if(this.props.value && this.props.value.connId){
           confirm({
               title: '确定要切换数据源吗?',
               content: '如果切换了数据源，将清除所有已编辑的数据',
               onOk : changeConn,
               onCancel() {},
           });
       }else{
           changeConn();
       }

    };

    handleCancelCustomTable = ()=>{
        this.setState({
            sqlModal:false,
            customTableSQL:'',
            customTableName:'',
        });
    };

    showAddViewModal = () => {
        this.sqlEditType = 'add';
        this.setState({
            sqlModal:true,
            customTableSQL:'',
            customTableName:'',
        });
    };

    handleSaveCustomTable = async () => {
        try{
            const sql = this.state.customTableSQL,
             name = this.state.customTableName;
            let newState;
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
                let fieldsRep = await createView(this.state.currentConn,name,sql);
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
                    newState = update(this.state,{
                        currentConn:{
                            sqlTables:{$push:[newSqlTable]},
                        },
                    });
                }else if(fieldsRep.success === false){
                    message.error(fieldsRep.msg);
                    return
                }else{
                    message.warning('服务器连接错误');
                }
            }else{

                //删除旧的视图
                try{
                    deleteView(this.state.currentConn,this.state.currentConn.sqlTables[this.editViewIndex].name).then();
                }catch (e){
                    message.warn("删除视图失败");
                }

                //调用服务创建SQL视图
                let fieldsRep = await createView(this.state.currentConn,name,sql);
                let fields = null;
                if(fieldsRep.success){
                    fields = fieldsRep.data.map(e=>({name:e.COLUMN_NAME,type:e.DATA_TYPE,comments:e.COMMENTS}));
                    newState = update(
                        this.state,{
                            currentConn:{
                                sqlTables:{
                                    [this.editViewIndex]:{$merge:{name,sql,fields}},
                                },
                            },
                        }
                    );
                }else if(fieldsRep.success === false){
                    message.error(fieldsRep.msg);
                }else{
                    message.warning('服务器连接错误');
                }
            }

            if(newState){
                //保存
                const updateRep = await updateConn(newState.currentConn);
                if(updateRep.success){
                    message.success('视图创建成功！');
                    //更新列中的数据源信息
                    let connIndex;
                    this.state.connList.forEach((e,i)=>{
                        if(e.name === newState.currentConn.name){
                            connIndex = i;
                        }
                    });
                    newState = update(newState,{
                        connList:{
                            [connIndex]:{$set:newState.currentConn},
                        },
                    });

                    this.setState(newState);
                 }
            }



        }finally  {
            this.setState({loading:false});
        }

    };

    handleDeleteView = async (viewName,index) => {

        const delRsp = await deleteView(this.state.currentConn,viewName);
        if(delRsp.success){
            message.success("删除成功！");
            let newState = update(
                this.state,{
                    currentConn:{
                        sqlTables:{
                            $splice:[[index,1]],
                        },
                    },
                }
            );
            updateConn(newState.currentConn).then();
            let connIndex;
            this.state.connList.forEach((e,i)=>{
                if(e.name === newState.currentConn.name){
                    connIndex = i;
                }
            });
            newState = update(newState,{
                connList:{
                    [connIndex]:{$set:newState.currentConn},
                },
            });
            this.setState(newState);
        }else{
            message.error("删除失败！");
        }
    };

    handleEditView = (viewName,sql,index) => {
        this.editViewIndex = index;
        this.sqlEditType = 'edit';
        this.setState({
            sqlModal:true,
            customTableSQL:sql,
            customTableName:viewName,
        });
    };

    render(){
        let options = [];
        if(isArray(this.state.connList) && this.state.connList.length > 0){
            options = this.state.connList.map(e => (<Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>))
        }

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

        return (<div className = {styles.mainWrap}>

                        <h1 className = {styles.title}>数据源</h1>
                        <div className = {styles.dsSelect}>
                           <Select style={{width:'80%',fontSize:'13px'}}
                                   placeholder="选择一个数据源"
                                   value={this.props.value && this.props.value.connId}
                                   onChange={this.handleConnChange}>{options}</Select>
                        </div>
                        <h1 className = {styles.title}>工作表</h1>
                        <div className = {styles.tableList}>
                            <ul>
                                {this.state.currentTables &&
                                    this.state.currentTables
                                        .filter(e => (!this.state.currentConn.sqlTables.some(view => view.name === e)))
                                        .map(e=>{
                                            let disabled = false;
                                            if(this.props.value && isArray(this.props.value.tables)){
                                                if(this.props.value.tables.some(table=>table.name === e)){
                                                    disabled = true
                                                }
                                            }
                                            return (<LiItem key={e} type="table" disabled={disabled} value={e}/>)
                                        })}
                            </ul>
                        </div>
                        <h1 className = {styles.title} style={{paddingTop:'10px'}}>
                            视图
                            <Icon type="plus" onClick={this.showAddViewModal} style={{float:'right',marginRight:'10px'}} title="添加视图"/>
                        </h1>
                        <div className = {styles.viewList}>
                            <ul>
                            {this.state.currentConn
                                && isArray(this.state.currentConn.sqlTables)
                                && this.state.currentConn.sqlTables.length > 0
                                &&
                            this.state.currentConn.sqlTables.map((e,i)=>{
                                let disabled = false;
                                if(this.props.value && isArray(this.props.value.tables)){
                                    if(this.props.value.tables.some(table=>table.name === e.name)){
                                        disabled = true
                                    }
                                }
                                return (<LiItem key={e.name} type="table" editable edit={()=>this.handleEditView(e.name,e.sql,i)} delete={()=>this.handleDeleteView(e.name,i)}  disabled={disabled} value={e.name}/>)
                            })}

                            </ul>
                        </div>
                        <Modal visible={this.state.sqlModal}
                               title="添加自定义SQL视图"
                               width = "880px"
                               onCancel= {this.handleCancelCustomTable}
                               onOk = {this.handleSaveCustomTable}>
                            <Form>
                                <Form.Item label="视图名称" key="name" {...formItemLayout}>
                                    <Input value={this.state.customTableName} onChange={e=>(this.setState({customTableName:e.target.value}))}  placeholder="输入视图名称" />
                                </Form.Item>
                                <Form.Item label="SQL语句" key="sql" {...formItemLayout}>
                                    <Input.TextArea value={this.state.customTableSQL} onChange={e=>(this.setState({customTableSQL:e.target.value}))}  placeholder="输入视图SQL语句" autosize={{ minRows: 10, maxRows: 6 }} />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                )}
}

const boxSource = {
    beginDrag(props) {
        return {
            name: props.value,
        }
    },
    endDrag(props, monitor, component){

    },
};

@DragSource(props=>props.type, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class LiItem extends React.PureComponent{
    render(){
        const { connectDragSource } = this.props;
        if(this.props.disabled){
            return <li className={styles.row_disabled}>{this.props.value}</li>
        }else{
            return connectDragSource(<li>{this.props.value} {this.props.editable && [
                <Icon type="edit" onClick={this.props.edit} className={styles.edit_icon}/>,
                <Popconfirm title="确定要删除该视图吗?" cancelText="取消" okText="确定" onConfirm={this.props.delete}>
                    <Icon type="delete"  className={styles.delete_icon}/>
                </Popconfirm>]}</li>)
        }
    }
}