import React from 'react';
import {Modal,Card,Table,message,Icon,Popconfirm,Select} from 'antd';
import cloneDeep from 'lodash/cloneDeep'
import styles from './index.css'
import {queryFieldsByDBConnAndTablename,getDBConnById,queryFieldsByConnIDAndSqlID} from '../../../../service/DataConnService.js'
import uuid from 'uuid/v1'


class EditableCell extends React.Component {

    state = {
        value: this.props.value,
    };

    handleChange = (e) => {
        // const value = e.target.value;
        this.setState({ value:e });
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    edit = () => {
        this.setState({ editable: true });
    };

    render() {
        const { value } = this.state;
        return (
            <div className="editable-cell">

                        <div className="editable-cell-input-wrapper">
                            {/*<Input*/}
                                {/*value={value}*/}
                                {/*onChange={this.handleChange}*/}
                                {/*onPressEnter={this.check}/>*/}
                            <Select
                                showSearch
                                value = {value}
                                style={{ width: 200 }}
                                placeholder="请选择一个作为连接条件的字段"
                                optionFilterProp="children"
                                onChange={this.handleChange.bind(this)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {this.props.fields && this.props.fields.length >0 ? this.props.fields.map(e => (<Select.Option key={e.name} value={e.name}>{e.name}</Select.Option>)):''}

                            </Select>
                        </div>

            </div>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: this.props.leftTable,
            dataIndex: 'left',
            width: '40%',
            className:styles.connect_header,
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'left')}
                    fields = {this.props.leftFields}
                />
            ),
        }, {
            title: '',
            className:styles.connect_header,
            width: '10%',
            render:() => {
                return <span> = </span>
            },
        }, {
            title: this.props.rightTable,
            dataIndex: 'right',
            className:styles.connect_header,
            width: '40%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'right')}
                    fields = {this.props.rightFields}
                />
            ),
        }, {
            title: '',
            dataIndex: 'operation',
            className:styles.connect_header,
            width: '10%',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(record.key)}>
                                <Icon type="delete" className={styles.connect_deleteIcon}/>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: this.props.conditions,
            count: 2,
        };
    }
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    };
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };
    handleAdd = () => {
        const {  dataSource } = this.state;
        const newData = {
            key: uuid(),
            left: '',
            right: '',
        };
        this.setState({
            dataSource: [...dataSource, newData],
        });
    };
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table size="small"
                       loading = {this.props.loading}
                       rowClassName = {styles.connect_row}
                       pagination = {false}
                       dataSource={dataSource}
                       columns={columns} />
                <Icon  type="plus" size="default" onClick={this.handleAdd} className={styles.connect_addIcon}  />
            </div>
        );
    }
}


export default class Connect extends React.PureComponent{

    constructor(props){
        super(props);

        //关联数据
        this.state = {
            joinData : cloneDeep(this.props.rightTable.join),
            loading:true,
        };

    }

    async componentDidMount(){

        //左表
        const leftTable = this.props.leftTable;
        //右表
        const rightTable = this.props.rightTable;

        //通过数据库连接ID，查询数据库连接信息
        const  leftDCID = leftTable.dataSourceId;
        const  rightDCID = rightTable.dataSourceId;
        let leftDBConn,rightDBConn;

        //判断 表是否为SQL视图
        if(leftTable.type === "sql"){
            //查询自定义表的字段
            const leftFieldsRep = await queryFieldsByConnIDAndSqlID(leftDCID,leftTable._id);
            if(leftFieldsRep.success){
                this.setState({leftFields:leftFieldsRep.data});
            }else if(!leftFieldsRep.success){
                message.error(leftFieldsRep.msg);
            }else{
                message.warning('服务器连接错误');
            }
        }else{
            //查询左表数据连接信息
            let leftDBRep = await getDBConnById(leftDCID);

            if(leftDBRep.success){
                leftDBConn = leftDBRep.data;
            }else if(!leftDBRep.success){
                message.error(leftDBRep.msg);
                return
            }else{
                message.warning('服务器连接错误');
                return
            }

            //左表字段信息
            let leftFieldsRep = await queryFieldsByDBConnAndTablename(leftDBConn,leftTable.name);

            if(leftFieldsRep.success){
                const leftFields = leftFieldsRep.data;
                this.setState({leftFields});
            }else if(!leftFieldsRep.success){
                message.error(leftFieldsRep.msg);
            }else{
                message.warning('服务器连接错误');
            }
        }


        //判断 表是否为SQL视图
        if(rightTable.type === "sql"){
            //查询自定义表的字段
            const rightFieldsRep = await queryFieldsByConnIDAndSqlID(rightDCID,rightTable._id);
            if(rightFieldsRep.success){
                this.setState({rightFields:rightFieldsRep.data});
            }else if(!rightFieldsRep.success){
                message.error(rightFieldsRep.msg);
            }else{
                message.warning('服务器连接错误');
            }
        }else{
            //查询右表数据连接信息
            let rightDBRep = await getDBConnById(rightDCID);

            if(rightDBRep.success){
                rightDBConn = rightDBRep.data;
            }else if(!rightDBRep.success){
                message.error(rightDBRep.msg);
                return
            }else{
                message.warning('服务器连接错误');
                return
            }

            //右表字段信息
            let rightFieldsRep = await queryFieldsByDBConnAndTablename(rightDBConn,rightTable.name);

            if(rightFieldsRep.success){
                const rightFields = rightFieldsRep.data;
                this.setState({rightFields});
            }else if(!rightFieldsRep.success){
                message.error(rightFieldsRep.msg);
            }else{
                message.warning('服务器连接错误');
            }
        }

        this.setState({loading:false});

    }

    submit = () => {
        let joinData = this.state.joinData;
        joinData.conditions =  this.tableData.state.dataSource;
        this.props.rightTable.join = joinData;
        if(this.props.onCancel) this.props.onCancel();
        if(this.props.onUpdateFields) this.props.onUpdateFields();
    };

    connectClick = (type) => {
        // let innerEle = document.getElementById("connect_inner");
        // innerEle.className = innerEle.className.replace(styles.connect_active,"");
        // let leftEle = document.getElementById("connect_left");
        // leftEle.className = leftEle.className.replace(styles.connect_active,"");
        // let rightEle = document.getElementById("connect_right");
        // rightEle.className = rightEle.className.replace(styles.connect_active,"");
        // let outerEle = document.getElementById("connect_outer");
        // outerEle.className = outerEle.className.replace(styles.connect_active,"");
        //
        // let ele = document.getElementById(type);
        // ele.className += " " + styles.connect_active;
        let joinData = cloneDeep(this.state.joinData);

        switch (type){
            case "connect_inner":
                joinData.method = 'inner';
                break;
            case "connect_left":
                joinData.method = 'left';
                break;
            case "connect_right":
                joinData.method = 'right';
                break;
            case "connect_outer":
                joinData.method = 'outer';
                break;
            default:
                joinData.method = 'inner';
                break;
        }

        this.setState({joinData});
    };

    render(){

        const gridStyle = {
            width: '25%',
            textAlign: 'center',
            height: '70px',
            cursor:'pointer',
        };

        return (<Modal title="关联" visible = {this.props.visible}
                      onCancel = {this.props.onCancel}
                      onOk={this.submit.bind(this)}  width="600px" bodyStyle={{padding:0}}>
            <Card style={{padding:0,borderTop:0,borderBottom:0}}>
                <Card.Grid id="connect_inner" onClick={this.connectClick.bind(this,'connect_inner')} style={gridStyle} className={styles.connect_inner + (this.state.joinData.method === 'inner' ? ' ' + styles.connect_active : "")} />
                <Card.Grid id="connect_left" onClick={this.connectClick.bind(this,'connect_left')} style={gridStyle} className={styles.connect_left + (this.state.joinData.method === 'left' ? ' ' + styles.connect_active : "")} />
                <Card.Grid id="connect_right" onClick={this.connectClick.bind(this,'connect_right')} style={gridStyle} className={styles.connect_right + (this.state.joinData.method === 'right' ? ' ' + styles.connect_active : "")} />
                <Card.Grid id="connect_outer" onClick={this.connectClick.bind(this,'connect_outer')} style={gridStyle} className={styles.connect_outer + (this.state.joinData.method === 'outer' ? ' ' + styles.connect_active : "")} />
            </Card>
            <EditableTable  store={this.joinData}
                            loading = {this.state.loading}
                            leftTable = {this.props.leftTable.name}
                            rightTable = {this.props.rightTable.name}
                            conditions = {this.state.joinData.conditions}
                            leftFields = {this.state.leftFields}
                            rightFields = {this.state.rightFields}
                            ref = {e => (e && (this.tableData = e))}/>
        </Modal>)
    }
}