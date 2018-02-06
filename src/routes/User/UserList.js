import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button, Input, Table } from 'antd';
import {fetchWidgetList} from '../../store/Widget/action'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from '../Widget/WidgetList.css';
import Ellipsis from '../../components/Ellipsis'
import {getUserList} from "../../service/user";

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@Form.create()
class UserList extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      data: [],
      pagination: {},
      loading: false,
    }
  }
  componentDidMount() {
    this.fetch();
  }

  fetchMore = () => {
    this.props.dispatch(fetchWidgetList())
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
    console.log('params:', params);
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

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
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
      render: text => <a href="">{text}</a>,
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
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
        <div>
          <Card bordered={false}>
            <Form layout="inline">
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
                      {getFieldDecorator('user', {})(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <Button type={'primary'} icon={'search'}>查询</Button>
                    &nbsp;&nbsp;
                    <Button type={'default'}>重置</Button>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
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
    );
  }
}

export default connect(()=>({}))(UserList)
