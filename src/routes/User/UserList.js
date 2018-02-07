import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button, Input, Table,Modal } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import {getUserList, updateStatus} from "../../service/user";
import UserForm from './UserForm';
import {message} from "antd/lib/index";

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

const userTypes = [
  {
    id: 'developer',
    name: '开发人员',
  },
  {
    id: 'pm',
    name: '项目经理',
  },
  {
    id: 'admin',
    name: '管理员',
  },
];

const warning = Modal.warning;

@Form.create()
class UserList extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      data: [],
      selectedRowKeys: [],
      pagination: {},
      loading: false,
      editModal: false,
      editUser: null,
      checkedRows: null,
    }
  }
  componentDidMount() {
    //this.fetch({$or:userTypes.map(item=>{return {userType:item.id}})});
    this.doSearch();
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.doSearch();
  }

  doSearch=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let query = {};
        let types = [];
        for(let item of values.userTypes){
          types.push({userType:item});
        }
        types.length>0?query.$or=types:'';
        values.name?query.name={$regex:values.name}:'';
        this.fetch(query);
      }
    });
  }

  resetForm(){
    this.props.form.resetFields();
  }

  handleTabChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    this.setState({ loading: true });
    getUserList(params ).then((d) => {
      const pagination = { ...this.state.pagination };
      pagination.total = (d.data||[]).length;
      this.setState({
        loading: false,
        data: d.data,
        pagination,
      });
    });
  }

  addUser=()=>{
    this.setState({editModal:true,editUser:null});
  }

  editUser=()=>{
    const len = (this.state.checkedRows||[]).length;
    if(len !== 1){
      warning({
        title: '无效操作',
        content: len===0?'请先勾选一行记录':'只能勾选一行记录',
        onOk() {
          return new Promise(resolve => resolve());
        },
      });
    }else {
      this.setState({editModal: true, editUser: this.state.checkedRows[0]});
    }
  }

  modStatus=async(status)=>{
    const len = (this.state.checkedRows||[]).length;
    if(len < 1){
      warning({
        title: '无效操作',
        content: `请先勾选需要${status===0?'禁用':'启用'}的记录`,
        onOk() {
          return new Promise(resolve => resolve());
        },
      });
    }else{
      const ids = this.state.checkedRows.map(u=>{return u.userid});
      const resp = await updateStatus({ids,status});
      if(resp.success){
        this.setState({selectedRowKeys:[]});
        this.doSearch();
      }else{
        message.error(resp.msg);
      }
    }
  }

  hideUserEditModal=()=>{
    this.setState({editModal:false})
  }

  userSavedHandle=async()=>{
    this.setState({editModal:false,editUser:null});
    this.doSearch();
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const columns = [{
      title: '账号',
      dataIndex: 'userid',
    }, {
      title: '用户名',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text =>{ return text == '1' ? '正常' : '失效'},
    }, {
      title: '类型',
      dataIndex: 'userType',
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({checkedRows: selectedRows,selectedRowKeys});
      },
      getCheckboxProps: record => ({
        disabled: record.userType.includes('admin'),
        name: record.userid,
      }),
    };

    return (
      <React.Fragment>
        <div>
          <Card bordered={false}>
            <Form layout="inline" onSubmit={this.handleSearch}>
              <StandardFormRow
                grid
                last
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <FormItem label={'用户类型'}>
                      {getFieldDecorator('userTypes', {
                        initialValue: [...userTypes.map(type=> type.id)],
                      })(
                        <Select
                          mode="multiple"
                          style={{ maxWidth: 386, width: '100%' }}
                          placeholder="选择用户类型"
                        >
                          {
                            userTypes.map(type =>
                              <Option key={type.id} value={type.id}>{type.name}</Option>
                            )
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label={'用户名'}
                      {...formItemLayout}
                    >
                      {getFieldDecorator('name', {
                        initialValue:'',
                      })(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <Button type={'primary'} icon={'search'} htmlType="submit">查询</Button>
                    &nbsp;&nbsp;
                    <Button type={'default'} onClick={this.resetForm.bind(this)}>重置</Button>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>

            <Row gutter={16} style={{marginTop:'20px'}}>
              <Col xs={24} sm={12} lg={8}>
                <Button type={'primary'} icon={'plus'} onClick={this.addUser}>新建</Button>
                &nbsp;&nbsp;
                <Button type={'default'} icon={'edit'} onClick={this.editUser}>修改</Button>
                &nbsp;&nbsp;
                <Button type={'danger'} icon={'lock'} onClick={()=>this.modStatus(0)}>禁用</Button>
                &nbsp;&nbsp;
                <Button type={'default'} icon={'unlock'} onClick={()=>this.modStatus(1)}>启用</Button>
              </Col>
            </Row>
          </Card>
          <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 10px',overflow:'auto' }}
          >
            <Table columns={columns}
                   rowKey={record => record.userid}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
                   rowSelection={rowSelection}
            />
          </Card>
        </div>

      <Modal
        title="编辑人员信息"
        visible={this.state.editModal}
        onCancel = {this.hideUserEditModal}
        footer={null}
        destroyOnClose
        >
          <Card bordered={false} bodyStyle={{padding:'0px'}}>
            <UserForm savedHandle={this.userSavedHandle} editUser={this.state.editUser}/>
          </Card>
      </Modal>
    </React.Fragment>
    );
  }
}

export default connect(()=>({}))(UserList)
