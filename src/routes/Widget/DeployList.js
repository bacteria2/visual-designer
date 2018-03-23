import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Table, Form, Select,Card,Badge, Row, Col, Input,Button ,DatePicker,Popconfirm} from 'antd';
import moment from 'moment';
import zh_CN from 'antd/lib/date-picker/locale/zh_CN';


import {fetchDeployWidgetList, fetchWidgetListAll} from "../../store/Widget/action";
import {message} from "antd/lib/index";
import {queryDataConnList} from "../../service/DataConnService";
import {deployWidget} from "../../service/widget";
const { Option } = Select;
const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const statusMap = ['default', 'processing', 'success'];
const status = ['未发布', '已发布有修改', '已发布'];


const showHeader = true;
const pagination = { position: 'bottom' };

@Form.create()
class DeployList extends PureComponent {
    constructor(props) {
        super(props);
        this.queryConnList=this.queryConnList.bind(this);
        this.deployWidget=this.deployWidget.bind(this);
        this.columns =[{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        }, {
            title: '状态',
            dataIndex: 'status',
            filters: [
                {
                    text: status[0],
                    value: 0,
                },
                {
                    text: status[1],
                    value: 1,
                },
                {
                    text: status[2],
                    value: 2,
                },
            ],
            render(val) {
                return <Badge status={statusMap[val]} text={status[val]} />;
            },
        }, {
            title: '更新时间',
            dataIndex: 'updateTime',
            sorter: true,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        }, {
            title: '操作',
            render: (text, record) => (
                <Popconfirm title="确定从发布列表中移除实例?" onConfirm={() => this.onDelete(record)}>
                    <a href="" >删除</a>
                </Popconfirm>
            ),
        }];
    }
    state = {
        tablePro:{
            bordered: false,
            loading: false,
            pagination,
            size: 'default',
            showHeader,
            scroll: undefined,
        },
        deployList:[...this.props.deployList.toJS()],
        connList:[],
        projectId : this.props.project.currentProject.get('id'),
        conn:'',
        createTable:false,
        widgetName:undefined,
        widgetStatus:undefined,
        widgetUpdateTime:[],
        selectedRows: [],
    }
    async componentDidMount() {
        if(![...this.props.listAll.toJS()].length){
            this.fetchMore();
        }
        this.setState({connList:await this.queryConnList()});
    }
    //获取数据连接列表
    async queryConnList(){
        let connRep = await queryDataConnList(this.state.projectId);
        if(connRep.success){
            return connRep.data;
        }else if(!connRep.success){
            message.error(connRep.msg);
        }else{
            message.warning('服务器连接错误');
        }
    }
    fetchMore(){
        this.props.dispatch(fetchWidgetListAll(this.state.projectId))
    }
    /*数据源选中事件*/
    onConnSelect(value){
        this.setState({ conn:value });
    }
    /*单个删除发布列表实例*/
    onDelete = (record) =>{
        if(record.key){
            const idList=[...this.props.deployList.toJS()];
            idList.map((item,index) => {
                if(item===record.key){
                    idList.splice(index,1);
                    this.props.dispatch(fetchDeployWidgetList(idList));
                    message.success('删除成功');
                }
            })
        }
    }
    /*批量删除发布列表实例*/
    deleteMore = () =>{
        if(!this.state.selectedRows.length){return false;}
        let idList=this.props.deployList.toJS();
        this.state.selectedRows.map((item) => {
            idList = idList.filter(e => {
                return e!==item;
            });
        })
        this.props.dispatch(fetchDeployWidgetList(idList));
        message.success('删除成功');
    }
    /*实例名称改变*/
    widgetNameChange = (e) =>{
        this.setState({widgetName:e.target.value});
    }
    /*实例状态改变*/
    widgetStatusChange = (value) =>{
        this.setState({widgetStatus:value});
    }/*实例状态改变*/
    widgetUpdateTimeChange = (d) =>{
        this.setState({widgetUpdateTime:d});
    }
    /*搜索过滤条件重置*/
    reset = () =>{
        this.setState({widgetName:undefined,widgetStatus:undefined,widgetUpdateTime:[]});
    }

    /*确定发布实例*/
    async deployWidget () {
        let data={
            "dbOption":{
                "createTable":this.state.createTable,
            },
            "idList":[...this.props.deployList.toJS()],
        }
        if (!this.state.conn){
            data.dbOption.host=this.state.connList[0].server;
            data.dbOption.user=this.state.connList[0].account;
            data.dbOption.password=this.state.connList[0].pwd;
            if(this.state.connList[0].type==="mysql"){
                data.dbOption.database=this.state.connList[0].database;
            }else if(this.state.connList[0].type==="oracle"){
                data.dbOption.serviceName=this.state.connList[0].database;
            }else{
                message.warning('不支持当前选择的数据库类型，请重新选择！');
                return false;
            }
        }else{
            this.state.connList.map((e) => {
                if(e._id===this.state.conn){
                    data.dbOption.host=e.server;
                    data.dbOption.user=e.account;
                    data.dbOption.password=e.pwd;
                    if(e.type==="mysql"){
                        data.dbOption.database=e.database;
                    }else if(e.type==="oracle"){
                        data.dbOption.serviceName=e.database;
                    }else{
                        message.warning('不支持当前选择的数据库类型，请重新选择！');
                        return false;
                    }
                }
            })
        }
        if(data.dbOption.user){
            const deployWidgetRep =await deployWidget(data);
            if(deployWidgetRep.success){
                message.success('组件发布成功');
                this.setState({showDeployWidget:false})
            }else if(!deployWidgetRep.success){
                message.error(deployWidgetRep.msg);
            }else{
                message.warning('服务器连接错误');
            }
        }
    };
    /*导入所有实例到发布列表*/
    importAll = () =>{
        const list=this.props.listAll.toJS();
        let idList=[];
        if(!list.length){return false}
        list.map(val => {
            idList.push(val._id)
        })
        this.props.dispatch(fetchDeployWidgetList(idList));
    }
    /*情况发布列表*/
    clearDeployWidget  = () =>{
        this.props.dispatch(fetchDeployWidgetList([]));
    }
    /*选中行*/
    handleSelectRow = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    }

    render() {
        const columns = this.columns;
        const { listAll,deployList } = this.props;
        let data=[];
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        /*遍历实例列表，获取发布数据*/
        listAll.toJS().map( (val1) => {
            deployList.toJS().map(val2 => {
                if(val1._id===val2){
                    const deployDate='2018-03-15';//发布时间
                    let status="0";
                    if(!deployDate){
                        status="0";
                    }else {
                        status=moment(val1.updateTime).isBefore(deployDate)?"1":"2";
                    }
                    data.push({
                        key:val1._id,
                        name:val1.name,
                        updateTime:val1.updateTime,
                        status:status,
                    })
                }
            })
        });
        data = data.filter(e => {
            if(this.state.widgetName){
                return e.name.indexOf(this.state.widgetName)!==-1;
            }else {
                return true;
            }

        });
        data = data.filter(e => {
            if(this.state.widgetStatus){
                return e.status===this.state.widgetStatus;
            }else {
                return true;
            }

        });
        data = data.filter(e => {
            if(this.state.widgetUpdateTime.length){
                return this.state.widgetUpdateTime[0].isBefore(e.updateTime)&&!this.state.widgetUpdateTime[1].isBefore(e.updateTime);
            }else {
                return true;
            }

        });
        const rowSelection = {
            onChange: this.handleSelectRow,
        };
        return (
            <div style={{height:'calc(100vh - 116px)',overflow:'hidden',marginTop: -12}}>
              <Card
                bordered={false}
                bodyStyle={{ padding: '12px 24px 0 32px',overflow:'auto',height:'calc(100vh - 116px)'}}
              >
                  <div className="components-table-demo-control-bar" style={{padding:'5px 0 15px 0'}}>
                      <Form layout="inline">
                          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                              <Col md={6} sm={24}>
                                  <FormItem label="名称" {...formItemLayout} style={{width:'100%'}}>
                                      <Input placeholder="请输入实例名称" value={this.state.widgetName} onChange={this.widgetNameChange}/>
                                  </FormItem>
                              </Col>
                              <Col md={6} sm={24}>
                                  <FormItem label="状态" {...formItemLayout} style={{width:'100%'}}>
                                      <Select onChange={this.widgetStatusChange} value={this.state.widgetStatus} placeholder="请选择状态">
                                          <Option value="">全部</Option>
                                          <Option value="0">未发布</Option>
                                          <Option value="1">已发布有修改</Option>
                                          <Option value="2">已发布</Option>
                                      </Select>
                                  </FormItem>
                              </Col>
                              <Col md={8} sm={24} >
                                  <FormItem
                                      label="更新时间"
                                      style={{width:'100%'}}
                                      {...formItemLayout}
                                  >
                                      <div>
                                          <RangePicker showTime locale={{ ...zh_CN}} style={{width:'calc(100% - 80px)'}} value={this.state.widgetUpdateTime} onChange={this.widgetUpdateTimeChange}/>
                                          <Button onClick={this.reset} style={{ marginLeft:15 }}>重置</Button>
                                      </div>

                                  </FormItem>
                              </Col>
                          </Row>
                          <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{marginTop:8}}>
                              <Col md={6} sm={24}>
                                  <FormItem label="数据源" {...formItemLayout} style={{width:'100%'}}>
                                      <div>
                                          <Select key = "conn"
                                                  style={{width:'calc(100% - 80px)'}}
                                                  placeholder="请选择数据源:"
                                                  value = {this.state.conn?this.state.conn:this.state.connList[0]&&this.state.connList[0].name}
                                                  onSelect = {this.onConnSelect.bind(this)}
                                          >
                                              {this.state.connList.map(e => (<Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>))}
                                          </Select>
                                          <Button type="primary" style={{marginLeft:15}} onClick={this.deployWidget}>发布</Button>
                                      </div>
                                  </FormItem>
                              </Col>
                              <Col md={18} sm={24} style={{textAlign:'right'}}>
                                  <Button type="primary" onClick={this.importAll}>导入全部</Button>
                                  <Button style={{ marginLeft: 8 }} onClick={this.clearDeployWidget}>清空</Button>
                                  <Button style={{ marginLeft: 8 }} onClick={this.deleteMore}>批量删除</Button>
                              </Col>
                          </Row>
                      </Form>
                  </div>
                  <Table {...this.state.tablePro}   rowSelection={rowSelection} columns={columns} dataSource={data} />
              </Card>
            </div>
        );
  }
}

export default connect(state=>({
  listAll:state.getIn(['widget','listAll']),
  deployList:state.getIn(['widget','deployList']),
  project:state.get('projectized').toObject(),
  loading:state.getIn(['widget','loadingList'])}
))(DeployList)
